const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  let { name, email, password, role } = req.body;

  // ❌ Prevent admin creation from public API
  if (role === "admin") {
    role = "viewer";
  }

  const user = await User.create({ name, email, password, role });

  res.status(201).json({
    token: generateToken(user),
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log("USER:", user);
  console.log("INPUT PASSWORD:", password);

  if (!user) {
    console.log("❌ User not found");
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await user.comparePassword(password);
  console.log("MATCH:", isMatch);

  if (!isMatch) {
    console.log("❌ Password mismatch");
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({ token: generateToken(user) });
};