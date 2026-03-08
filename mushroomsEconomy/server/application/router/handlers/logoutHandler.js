module.exports = (userManager, answer) => {
    return (req, res) => {
        const { token } = req.params;

        if (!token) {
            return answer.bad(13);
        }

        const result = userManager.logout(token);

        return res.send(result);
    }
}