const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await db('users').select('*').where({ username }).first();

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ username: user.username, user_id: user.id }, '123321132Aa', { expiresIn: '1h' });

        res.cookie('token', token);

        res.status(200).send({ message: 'Login successful!' });
    });
}

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await db('users').select('*').where({username: username}).first();

    if (user) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db('users').insert({username, email, password: hashedPassword });

    res.status(200).json({ message: 'Registration successful!' });
}


module.exports = {
    login,
    signup
}


