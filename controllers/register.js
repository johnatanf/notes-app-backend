const UserAccount = require("../models").UserAccount;
require("dotenv").config();

const createUserAccount = async (req, res, next) => {
  try {
    let newUserAccount;
    let existingUser;
    let user;
    const {
        full_name,
        username,
        email,
        password_hash,
    } = req.body;

    existingUser = await UserAccount.findOne({ where: { email } });

    if (existingUser && existingUser.verified === true) {
      return res.status(200).json({ message: "Email already verified" });
    } else {
      // if email does not exist yet in database
      newUserAccount = await UserAccount.create({
        full_name,
        username,
        email,
        password_hash,
      });
    }

    user = existingUser || newUserAccount;

    res.json({
      message: "User created successfully",
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUserAccount,
};
