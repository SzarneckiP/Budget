const Transaction = require('../models/transactions.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Transaction.find());
    } catch (err) {
        res.status(500).json({ message: err });
    }
}