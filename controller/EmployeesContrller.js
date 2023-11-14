const userModel = require("../modals/Employee");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    const token = generateToken(newUser);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.read = async (req, res) => {
  try {
    const data = await userModel.find({ is_deleted: false });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedData = await userModel.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedData = await userModel.findOneAndUpdate(
      { _id: req.params._id },
      { $set: { is_deleted: true } },
      { new: true } // يعيد الوثيقة المحدثة بدلاً من الوثيقة القديمة
    );

    res.status(200).json(deletedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getuserkById = async (req, res) => {
  try {
    // Assuming userId is available from authentication
    const userId = req.params.userId;

    const task = await userModel.findOne({ userId });
    console.log(task);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await userModel.findOne({ email: email });
    console.log(user);
    if (!user.email) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(user.password);
    if (passwordMatch) {
      const token = generateToken(user);
      const userID = user._id;
      res
        .status(200)
        .json({ message: "Login successful", user, token, userID });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function generateToken(user) {
  const token = jwt.sign({ userId: user._id }, "your-secret-key", {
    expiresIn: "1h",
  });
  return token;
}
