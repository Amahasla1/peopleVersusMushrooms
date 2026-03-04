const express = require('express');
const router = express.Router();

const {
    useRegistrationHandler,
    notFoundHandler,
} = require('./handlers');

function Router({ registrationManager }) {
    router.get('/reg/:username/:password', useRegistrationHandler(registrationManager));
    router.all('/*path', notFoundHandler);
    return router;
}

module.exports = Router;