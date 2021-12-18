const express = require('express');
const router = express.Router();

const transactionsController = require('../controllers/transactions.controller');

router.route('/transactions').get(transactionsController.getAll);

module.exports = router;