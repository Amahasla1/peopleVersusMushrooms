const express = require('express');
const router = express.Router();
const {
} = require('./handlers');

function Router(mediator, answer) {
    // ============ LOBBY ROUTES ============
    // для http методов из LobbyManager

    // ============ BUILDING ROUTES ============
    // для http методов из BuildingManager

    // ============ NOT FOUND ============
    router.all('/*path', (_, res) => {
        res.json(answer.bad(404));
    });


    return router;
}

module.exports = Router;