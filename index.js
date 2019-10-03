const express = require('express');
const Sequelize = require('sequelize');
const dbConfig = require('./db.config');
const bodyParser = require('body-parser');

const sequelize = new Sequelize('checkout', dbConfig.username, dbConfig.password, {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const Address = sequelize.define('address', {
  streetAddress1: {
    type: Sequelize.STRING,
    allowNull: true
  },
  streetAddress2: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: true
  },
  state: {
    type: Sequelize.STRING,
    allowNull: true
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const PaymentInfo = sequelize.define('paymentInfo', {
  creditCardNum: {
    type: Sequelize.STRING,
    allowNull: true
  },
  expDate: {
    type: Sequelize.STRING,
    allowNull: true
  },
  cvv: {
    type: Sequelize.STRING,
    allowNull: true
  },
  billingZipcode: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

Address.belongsTo(User);
PaymentInfo.belongsTo(User);

User.sync({alter: true});
Address.sync({alter: true});
PaymentInfo.sync({alter: true});

const app = express();

app.use('/', express.static('client'));
app.use(bodyParser.json());

app.post('/user', (req, res, next) => {
  let userInfo = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  User.findOrCreate({where: userInfo})
    .then((user) => res.json(user[0]))
    .catch(err => next(err));
});

app.put('/user', (req, res, next) => {
  let userInfo = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  let userId = req.body.userId;

  User.update(userInfo, {
    where: {id: userId}
  })
  .then((rowsUpdated) => User.findByPk(userId))
  .then((user) => res.json(user))
  .catch((err)=> next(err));
});

app.post('/address', (req, res, next) => {
  let address = {
    streetAddress1: req.body.streetAddress1,
    streetAddress2: req.body.streetAddress2,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    userId: req.body.userId
  };

  Address.findOrCreate({where: address})
    .then((address) => res.json(address[0]))
    .catch(err => next(err));
});

app.put('/address', (req, res, next) => {
  let address = {
    streetAddress1: req.body.streetAddress1,
    streetAddress2: req.body.streetAddress2,
    city: req.body.city,
    state: req.body.state,
    zipcode: req.body.zipcode,
    userId: req.body.userId
  };

  let addressId = req.body.addressId;

  Address.update(address, {
    where: {id: addressId}
  })
  .then((rowsUpdated) => Address.findByPk(addressId))
  .then((address) => res.json(address))
  .catch((err)=> next(err));
});

app.post('/paymentinfo', (req, res, next) => {
  let paymentInfo = {
    creditCardNum: req.body.creditCardNum,
    expDate: req.body.expDate,
    cvv: req.body.cvv,
    billingZipcode: req.body.billingZipcode,
    userId: req.body.userId
  };

  PaymentInfo.findOrCreate({where: paymentInfo})
    .then((paymentInfo) => res.json(paymentInfo[0]))
    .catch(err => next(err));
});

app.put('/paymentinfo', (req, res, next) => {
  let paymentInfo = {
    creditCardNum: req.body.creditCardNum,
    expDate: req.body.expDate,
    cvv: req.body.cvv,
    billingZipcode: req.body.billingZipcode,
    userId: req.body.userId
  };

  let paymentInfoId = req.body.paymentInfoId;

  PaymentInfo.update(paymentInfo, {
    where: {id: paymentInfoId}
  })
  .then((rowsUpdated) => PaymentInfo.findByPk(paymentInfoId))
  .then((paymentInfo) => res.json(paymentInfo))
  .catch((err)=> next(err));
});

const port = 3000;

app.listen(port, () => console.log(`Server listening on port: ${port}`));