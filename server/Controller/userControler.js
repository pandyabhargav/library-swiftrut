import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; 

const SECRET_KEY = 'my_jwt_secret';


export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.log('User already exists:', existingUser); 
      return res.status(400).json({ message: 'Username or email already exists' });
    }


    const newUser = new User({ username, email, password }); 
    await newUser.save();
    console.log('New user created:', newUser); 


    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login attempt:', req.body); 

    const user = await User.findOne({ email });
    console.log('Found user:', user); 

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('User password in DB:', user.password); 
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

