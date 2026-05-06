'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/', routes);

app.use(function (req, res) {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, function () {
  console.log('Server listening on http://localhost:' + PORT);
});