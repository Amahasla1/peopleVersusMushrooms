module.exports = (mediator, answer, common) => {
    const { CREATE_PEOPLE_UNIT } = mediator.getEventTypes();

    return async (req, res) => {
        const { x, y, unitType, barracksGuid } = req.body;

        const response = await mediator.call(CREATE_PEOPLE_UNIT, { x, y, unitType, barracksGuid });

        if (response && response.error) {
            return res.json(answer.bad(response.error));
        }
        
        res.json(answer.good(response));
    };
};