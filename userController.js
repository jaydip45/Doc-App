const userSchema = require('../schema/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const getUserData = async (req, res) => {
  try {
    const data = await userSchema.find();
    res.status(200).json({
      message: "Data fetched successfully",
      data: data
    });
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    res.status(404).json({
      message: "Error in fetching data",
    });
  }
};


const addUser = async (req, res) => {
  try {
    const user = new userSchema(req.body);
    const data = await user.save();
    res.status(201).json({
      message: "User added successfully",
      data: data
    });
  } catch (error) {
    console.error(`Error adding user: ${error.message}`);
    res.status(500).json({
      message: "Error in adding user",
    });
  }
};


const registerUser = async (req, res) => {
  try {
    const { name, email, password,role } = req.body;
    const existingUser = await userSchema.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userSchema({ name, email, password: hashedPassword,role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(`Error registering user: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email }).populate('role');

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(200).json({ token,user });
  } catch (error) {
    console.error(`Error logging in user: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    await userSchema.findByIdAndUpdate(id, req.body);
    res.status(200).json({
      message: "User is updated successfully",
    });
  } catch (error) {
    console.error(`Error updating user: ${error.message}`);
    res.status(404).json({
      message: "User is not updated",
    });
  }
};


const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await userSchema.findByIdAndDelete(id);
    res.status(200).json({
      message: "User is removed successfully",
    });
  } catch (error) {
    console.error(`Error deleting user: ${error.message}`);
    res.status(404).json({
      message: "User is not removed",
    });
  }
};


module.exports = {
  getUserData,
  addUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser
};

// rohit
// gill
// virat 
// kl rahul
// ishan 
// hardik 
// tilak
// jadeja 
// kuldip 
// bumrah 
// siraj