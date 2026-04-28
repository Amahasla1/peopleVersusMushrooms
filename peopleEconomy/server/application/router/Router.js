//GLOBAL
const { URLS } = require('../../../../global/globalConfig');
//..

//LOCAL
const express = require('express');
const router = express.Router();


const {
    notFoundHandler,
	useLobbyUpdatedHandler,
    useCreateBarracks,
    useCreatePeopleUnit,
    useCreatePipeline,
} = require('./handlers');

function Router({ mediator, answer, common }) {
    // ============ ECONOMY ROUTES ============
    router.post(URLS.CREATE_BARRACKS, useCreateBarracks(mediator, answer, common));
    router.post(URLS.CREATE_PEOPLE_UNIT, useCreatePeopleUnit(mediator, answer, common));
    router.post(URLS.CREATE_PIPELINE, useCreatePipeline(mediator, answer, common));

    // ============ LOBBY ROUTES ============
	router.post(URLS.LOBBY_UPDATED, useLobbyUpdatedHandler(mediator, answer, common));

    // ============ NOT FOUND ============
    router.all('/*path', notFoundHandler);
    return router;
}

module.exports = Router;