const UserAccount = require("../models").UserAccount;
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
require("dotenv").config();

const loginUser = async (req, res, next) => {
  try {
    const { email, password_hash } = req.body;

    const user = await UserAccount.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.validPassword(password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours,
      path: "/",
    });

    return res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  loginUser,
};
