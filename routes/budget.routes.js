const express = require('express');
const router = express.Router();

router.get('/budgets', (req, res) => {
    req.db.collection('budgets').find().toArray((err, data) => {
        if (err) res.status(500).json({ message: err });
        else res.json(data);
    });
});

module.exports = router;