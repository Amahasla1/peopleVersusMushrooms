module.exports = (userManager, answer) => {
    return async (req, res) => {
        const { login, password, username } = req.params;

        if (!login || !password || !username) {
            return answer.bad(13);
        }

        const result = await userManager.registration(login, password, username);

        return res.send(result);
    }
}