const express = require('express')
const router = express.Router()
const TransactionsController = require('../../controllers/transactions.js')

router.post('/save', TransactionsController.createTransactions)
router.get('/allTransactions', TransactionsController.getAlltransactions)

module.exports = router