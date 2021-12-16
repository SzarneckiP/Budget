const Budget = require('../models/budget.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Budget.find());
    } catch (err) {
        res.status(500).json({ message: err });
    }
}