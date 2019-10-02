const express = require('express');
const Sequelize = require('sequelize');
const dbConfig = require('./db.config');

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

const app = express();

app.use('/', express.static('client'));

app.get('/test', (req, res, next) => {
    res.send('hello world');
});

const port = 3000;

app.listen(port, () => console.log(`Server listening on port: ${port}`));