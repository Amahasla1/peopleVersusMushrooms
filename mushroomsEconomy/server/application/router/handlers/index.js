const useRegistrationHandler = require("./useRegistrationHandler");
const notFoundHandler = require("./notFoundHandler");
const getAllMushroomsHandler = require("./getAllMushroomsHandler");
const createMushroomHandler = require("./createMushroomHandler");
const updateMushroomHandler = require("./updateMushroomHandler");
const deleteMushroomHandler = require("./deleteMushroomHandler");
const getAllUnitsHandler = require("./getAllUnitsHandler");
const createUnitHandler = require("./createUnitHandler");
const updateUnitHandler = require("./updateUnitHandler");
const deleteUnitHandler = require("./deleteUnitHandler");
const updateMatrixHandler = require("./updateMatrixHandler");
const registrationHandler = require("./registrationHandler");
const loginHandler = require("./loginHandler");
const logoutHandler = require("./logoutHandler");

module.exports = {
    notFoundHandler,
    useRegistrationHandler,
    getAllMushroomsHandler,
    createMushroomHandler,
    updateMushroomHandler,
    deleteMushroomHandler,
    getAllUnitsHandler,
    createUnitHandler,
    updateUnitHandler,
    deleteUnitHandler,
    updateMatrixHandler,
    registrationHandler,
    loginHandler,
    logoutHandler
};