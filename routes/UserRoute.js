const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/User');
router.get('/', (req, res) => {
    res.json({
        message: 'User route is working fine',
        status: 'Working',
    });
});

// We'll create a validation middleware 
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists, please use another email address',
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
            });

            await newUser.save();
            res.status(201).json({
                message: 'User created successfully',
                user: newUser
            });
        }
    } catch (error) {
        next("Error Creating User", error);
    }

});
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if (isPasswordCorrect) {
                const token = jwt.sign(
                    { email: existingUser.email }, 
                    'secret', 
                    { expiresIn: '1h' } 
                );
                res.status(200).json({
                    message: 'Login successful',
                    email: existingUser.email,
                    token
                });
            } else {
                res.status(400).json({
                    message: 'Invalid credentials',
                });
            }
        } else {
            res.status(400).json({
                message: 'User not found',
            });
        }
    } catch (error) {
        next("Error Logging In", error);
    }
});
module.exports = router;