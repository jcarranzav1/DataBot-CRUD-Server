const express = require('express');
const user = require('./posts/routes');

const router = express.Router();

router.use('/user', user);

module.exports = router;
