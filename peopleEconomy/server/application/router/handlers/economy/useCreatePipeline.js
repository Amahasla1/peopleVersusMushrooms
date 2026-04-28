module.exports = (mediator, answer, common) => {
    const { CREATE_PIPELINE } = mediator.getEventTypes();

    return async (req, res) => {
        const { startX, startY, endX, endY } = req.body;

        const response = await mediator.call(CREATE_PIPELINE, { startX, startY, endX, endY });

        if (response && response.error) {
            return res.json(answer.bad(response.error));
        }
        
        res.json(answer.good(response));
    };
};