const md5 = require('md5');
const config = require('../modules/config');

const main = require('../main');

// Some information for queries
const TABLE = 'administrators';

// Some validation messages
const MSG_CANNOT_FIND = 'The administrator hasn\'t been signed up in the system!';
const MSG_INCORRECT_PASSWORD = 'Incorrect password!';

module.exports = {
    signIn: (req, res) => {
        var sql = `SELECT * FROM ${TABLE} WHERE login = "${req.body.login}";`;
        main.db.query(sql, function (err, result) {

            if (err) {
                console.log(err);
                res.status(main.INTERNAL_SERVER_ERROR).json({errors:
                    [{ msg: main.INTERNAL_ERROR_MSG }]});
                return;
            }

            if (result.length === 0) {
                res.status(main.BAD_REQUEST).json({errors:
                    [{ msg: MSG_CANNOT_FIND }]});
                return;
            }

            if (md5(req.body.password) === result[0].password) {

                const token = main.jwt.sign({
                    login: result[0].login,
                    password: result[0].password
                }, config.KEY,
                    { expiresIn: config.TIME_JWT }
                );

                res.cookie('auth', token, { httpOnly: true,
                    maxAge: config.TIME_COOKIE });
                res.sendStatus(main.OK);

            }
            else {
                res.status(main.BAD_REQUEST).json({errors:
                    [{ msg: MSG_INCORRECT_PASSWORD }]});
            }

        });
    }
}
