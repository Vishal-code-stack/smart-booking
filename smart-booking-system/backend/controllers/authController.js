const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { getDb, createId } = require('../db');

exports.register = async (req, res) => {

  const { name, email, password } = req.body;

  try {
    const db = getDb();
    const existingUser = db.data.users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = { _id: createId('user'), name, email, password: hashed };
    db.data.users.push(user);
    await db.write();

    const payload = { user: { id: user._id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {

      if (err) throw err;

      res.json({ token });

    });

  } catch (err) {

    res.status(500).json({ msg: 'Server error' });

  }

};

exports.login = async (req, res) => {

  const { email, password } = req.body;

  try {

    const db = getDb();
    const user = db.data.users.find(u => u.email === email);

    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { user: { id: user._id } };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {

      if (err) throw err;

      res.json({ token });

    });

  } catch (err) {

    res.status(500).json({ msg: 'Server error' });

  }

};