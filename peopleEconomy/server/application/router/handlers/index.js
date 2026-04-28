const notFoundHandler = require("./notFoundHandler");
const useLobbyUpdatedHandler = require('./lobby/useLobbyUpdatedHandler');

const useCreateBarracks = require('./economy/useCreateBarracks');
const useCreatePeopleUnit= require('./economy/useCreatePeopleUnit');
const useCreatePipeline= require('./economy/useCreatePipeline');

module.exports = {
    notFoundHandler,
    useLobbyUpdatedHandler,

    useCreateBarracks,
    useCreatePeopleUnit,
    useCreatePipeline,
};