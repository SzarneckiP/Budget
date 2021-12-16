const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Budget', budgetSchema);