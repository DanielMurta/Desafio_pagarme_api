const request = require('supertest')
const app = require('../../../index')

describe("Transactions Controllers", ()=> {
  test('Should be possible create a transaction and payable', async () => {
      const transaction = {
        transaction_value: 3599.00,
        transaction_description: "Playstation 5",
        payment_method: "debit_card",
        number_card: "6331101889997089",
        name: "Daniel Murta",
        card_expiring_date: "2024-07-16",
        cvv: "287"
      }  
  
      const response = await request(app)
        .post('/pagar_me/transactions/save')
        .send(transaction)
      
      expect(response.status).toBe(201)
  })
  
  test('Should be possible return all transactions', async () => {
    const response = await request(app)
      .get('/pagar_me/transactions/allTransactions')
    
    expect(response.status).toBe(200)
  })
  
  test('Should be possible return a balance payable', async () => {
    const response = await request(app)
      .get('/pagar_me/balance/12')
    
    expect(response.status).toBe(200)
  })
})

