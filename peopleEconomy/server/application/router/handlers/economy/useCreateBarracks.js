module.exports = (mediator, answer, common) => {
    const { CREATE_BARRACKS } = mediator.getEventTypes();

    return async (req, res) => {
        const { x, y } = req.body;

        const response = await mediator.call(CREATE_BARRACKS, { x, y });

        if (response && response.error) {
            return res.json(answer.bad(response.error));
        }
        
        res.json(answer.good(response));
    };
};