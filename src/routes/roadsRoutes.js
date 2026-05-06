'use strict';

const express = require('express');
const router = express.Router();
const roadsController = require('../controllers/roadsController');

router.get('/', roadsController.getAllRoads);

module.exports = router;