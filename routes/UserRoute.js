const express = require('express');

const router = express.Router();
const User = require('../model/user');

router.get('/', (req, res) => {
    res.json({
        message: 'User route is working fine',
        status: 'Working',
    });
});