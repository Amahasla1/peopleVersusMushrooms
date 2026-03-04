module.exports = (registrationManager) => {
    return async (req, res) => {
        const username = req.params.username;
        const password = req.params.password;
        const user = await registrationManager.register(username, password);
        if (!user) {
            return res.status(409).send({ error: 'Пользователь с таким именем уже существует' });
        }
        res.send(user);
    };
};
