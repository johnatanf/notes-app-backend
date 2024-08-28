const UserAccount = require("../models").UserAccount;
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
require("dotenv").config();

const createUserAccount = async (req, res, next) => {
  try {
    let newUserAccount;
    let existingUser;
    let user;
    let token;
    const { full_name, username, email, password } = req.body;

    existingUser = await UserAccount.findOne({ where: { email } });

    if (existingUser && existingUser.verified === true) {
      return res.status(409).json({ message: "Email already verified" });
    } else {
      // if email does not exist yet in database
      newUserAccount = await UserAccount.create({
        full_name,
        username,
        email,
        password_hash: password,
      });
    }

    user = existingUser || newUserAccount;

    token = jwt.sign(
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

    res.json({
      message: "User created successfully",
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUserAccount,
};
