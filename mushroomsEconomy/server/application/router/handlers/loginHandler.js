module.exports = (userManager, answer) => {
    return (req, res) => {
        const { login, password } = req.params;

        if (!login || !password) {
            return answer.bad(13);
        }

        const result = userManager.login(login, password);

        return res.send(result);
    }
}