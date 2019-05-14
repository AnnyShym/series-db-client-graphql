const { ApolloError } = require('apollo-server');

const db = require('../main');
const main = require('../main');
const { validateUser } = require('../modules/token_validation');
const { validateData } = require('../modules/data_validation');

const COUNTRIES = require('../modules/countries');

async function getCountries(data, context) {
    validateUser(context);
    return {countries: COUNTRIES};
}

async function getActors(data, context) {

    validateUser(context);

    const sql = `SELECT * FROM actors ORDER BY name, middle_name, last_name, id ASC;`;
    const results = await new Promise((resolve, reject) =>
        main.db.query(sql, (err, rows) => {
            if (err) {
                console.log(err);
                reject(new Error(main.INTERNAL_ERROR_MSG));
            }
            else {
                resolve(rows);
            }
        }
    ));

    return results;

}

async function getActor({id}, context) {

    validateUser(context);

    const sql = `SELECT * FROM actors WHERE id = ${id};`;
    const results = await new Promise((resolve, reject) =>
        main.db.query(sql, (err, row) => {
            if (err) {
                if (err.code === 'ER_BAD_FIELD_ERROR') {
                    reject(new Error(main.INVALID_ID_MSG));
                }
                else {
                    console.log(err);
                    reject(new Error(main.INTERNAL_ERROR_MSG));
                }
            }
            else {
                if (row[0].citizenship === null) {
                    row[0].citizenship = 'NULL';
                }
                resolve(row);
            }
        }
    ));

    return results;

}

async function deleteActor({id}, context) {

    validateUser(context);

    const sql = `DELETE FROM actors WHERE id = ${id};`;
    const results = await new Promise((resolve, reject) =>
        main.db.query(sql, (err, rows) => {
            if (err) {
                if (err.code === 'ER_BAD_FIELD_ERROR') {
                    reject(new Error(main.INVALID_ID_MSG));
                }
                else {
                    console.log(err);
                    reject(new Error(main.INTERNAL_ERROR_MSG));
                }
            }
            else {
                resolve({msg: "Deleted successfully!"});
            }
        }
    ));

    return results;

}

async function insertActor(args, context) {

    validateUser(context);

    const newData = args.actorInput;

    if (newData.citizenship !== 'NULL') {
        newData.citizenship = `"${newData.citizenship}"`;
    }
    const newValues = `name = "${newData.name}", middle_name = "${
        newData.middle_name}", last_name = "${
        newData.last_name}", citizenship = ${newData.citizenship}`;

    const sql = `INSERT INTO actors SET ${newValues};`;
    const results = await new Promise((resolve, reject) =>
        main.db.query(sql, (err, rows) => {
            if (err) {
                reject(new Error(main.INTERNAL_ERROR_MSG));
            }
            else {
                resolve({msg: "Inserted successfully!"});
            }
        }
    ));

    return results;

}

async function updateActor(args, context) {

    validateUser(context);

    const newData = args.actorInput;

    if (newData.citizenship !== 'NULL') {
        newData.citizenship = `"${newData.citizenship}"`;
    }
    const newValues = `name = "${newData.name}", middle_name = "${
        newData.middle_name}", last_name = "${
        newData.last_name}", citizenship = ${newData.citizenship}`;

    const sql = `UPDATE actors SET ${newValues} WHERE id = ${args.id};`;
    const results = await new Promise((resolve, reject) =>
        main.db.query(sql, (err, rows) => {
            if (err) {
                if (err.code === 'ER_BAD_FIELD_ERROR') {
                    reject(new Error(main.INVALID_ID_MSG));
                }
                else {
                    console.log(err);
                    reject(new Error(main.INTERNAL_ERROR_MSG));
                }
            }
            else {
                resolve({msg: "Updated successfully!"});
            }
        }
    ));

    return results;

}

module.exports = {
  getCountries,
  getActors,
  getActor,
  deleteActor,
  insertActor,
  updateActor
};
