const dbPool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const registerUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || password.length <8) {
    return res.status(400).json({ message: 'Invalid email or password (minimum 8 characters).' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await dbPool.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    res.status(201).json({ message: 'User created.' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'A user with this email already exists.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Enter email and password.' });
  }

  try {
    const [rows] = await dbPool.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });
    const decoded = jwt.decode(token);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 60 * 1000
    });

    res.json({ email: user.email, exp: decoded.exp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getMe = (req, res) => {
    res.json({ email: req.user.email, exp: req.user.exp });
};

const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({ message: 'Logout successful.' });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  logoutUser
};