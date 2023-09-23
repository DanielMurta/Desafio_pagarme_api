const { Payable } = require('../database/database.js')

async function getBalancePayable (req, res) {
    const transactionId = req.params.id

    try {
        const payableBalance = await Payable.findOne({ where: { transaction_id: transactionId  } })
        return res.status(200).json(payableBalance["balance"])
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

module.exports = { getBalancePayable }