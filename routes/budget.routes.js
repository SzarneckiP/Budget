const express = require('express');
const router = express.Router();

const budgetController = require('../controllers/budget.controller');

router.route('/budgets').get(budgetController.getAll);

module.exports = router;