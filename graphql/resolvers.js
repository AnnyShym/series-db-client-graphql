const actorsServices = require('../services/actors');

const rootResolver = {
    ...actorsServices
};

module.exports = rootResolver;
