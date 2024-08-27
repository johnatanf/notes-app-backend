require("dotenv").config();

const checkAuthentication = async (req, res, next) => {
  try {
    return res.json({ authenticated: true, email: req.user.email });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkAuthentication,
};
