const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(routes);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xlqso.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('🚀 server is running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });
