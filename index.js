const express = require('express')
const transactionsRouter = require('./src/routes/transactions/index.js')
const balanceRouter = require('./src/routes/balance/index.js')
const app = express()
const PORT = 8000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Home')
})

app.use('/pagar_me/transactions', transactionsRouter)
app.use('/pagar_me/balance', balanceRouter)

module.exports = app

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}`)
})
   