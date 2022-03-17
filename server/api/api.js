const express = require('express');
const user = require('./users/routes');

const router = express.Router();

router.use('/user', user);

module.exports = router;
