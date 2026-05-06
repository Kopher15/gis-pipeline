'use strict';

const express = require('express');
const router = express.Router();
const healthRoutes = require('./healthRoutes');
const roadsRoutes = require('./roadsRoutes');

router.use('/health', healthRoutes);
router.use('/roads', roadsRoutes);

module.exports = router;