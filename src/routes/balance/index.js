const express = require('express')
const router = express.Router()
const balanceController = require('../../controllers/balance.js')

router.get('/:id', balanceController.getBalancePayable)

module.exports = router