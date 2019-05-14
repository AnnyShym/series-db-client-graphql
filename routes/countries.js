const COUNTRIES = require('../modules/countries');

module.exports = {
    getCountries: (root, args, context, info, res) => {
        return COUNTRIES;
    },
}
