const { Transaction, Payable } = require('../database/database.js')

async function createTransactions (req, res) {
    const { transaction_value, transaction_description, payment_method, 
        number_card, name, card_expiring_date, cvv } = req.body

    const maskedNumberCard = '*'.repeat(number_card.length - 4) + number_card.slice(-4)

    try {
        const transaction = await Transaction.create({ 
            transaction_value: transaction_value, 
            transaction_description: transaction_description,
            payment_method: payment_method,
            number_card: maskedNumberCard,
            name: name,
            card_expiring_date: card_expiring_date,
            cvv: cvv
        })  
        
        const transaction_id = transaction.dataValues["id"]
        const transaction_Value = transaction.dataValues["transaction_value"]
        const transaction_payment_method = transaction.dataValues["payment_method"]
        let status
        let fee
        let balance

        switch (transaction_payment_method) {
            case "debit_card":
                status = "paid"
                fee = parseFloat(transaction_Value) - (parseFloat(transaction_Value) * 0.03)
                balance = "available"
                break
            default:
                status = "waiting_funds"
                fee = parseFloat(transaction_Value) - (parseFloat(transaction_Value) * 0.05)
                balance = "waiting_funds"
                break
        }

        const payable = await Payable.create({
            transaction_id: transaction_id,
            status: status,
            payment_date: Date.now(),
            fee: fee,
            balance: balance
        })
        
        return res.sendStatus(201)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

async function getAlltransactions (req, res) {
    try {
        const transactions = await Transaction.findAll()
        return res.status(200).json(transactions)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
}

module.exports = {
    createTransactions,
    getAlltransactions
}
