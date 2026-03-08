module.exports = (userManager, answer) => {
    return async (req, res) => {
        const { token } = req.params;

        if (!token) {
            return answer.bad(13);
        }

        const result = await userManager.logout(token);

        return res.send(result);
    }
}