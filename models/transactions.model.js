const mongoose = require('mongoose');

const transactionsSchema = new mongoose.Schema({
    id: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    categoryId: { type: String, required: true },
    budgetId: { type: String, required: true },
    date: { type: String, required: true },
});

module.exports = mongoose.model('Transactions', transactionsSchema);