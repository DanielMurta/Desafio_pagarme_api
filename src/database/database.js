const { Sequelize, DataTypes } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
})

const Transaction = sequelize.define('Transaction', {
    transaction_value: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    transaction_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number_card: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_expiring_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'transactions',
    timestamps: false, 
})

const Payable = sequelize.define('payable', {
    transaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fee: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    balance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'payables',
    timestamps: false, 
})

module.exports = {
  Transaction,
  Payable,
}

