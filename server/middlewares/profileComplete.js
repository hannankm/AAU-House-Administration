const User = require("../models").User;

const profileCompletionCheck = async (req, res, next) => {
  const user = await User.findOne({ where: { user_id: req.user.user_id } });

  if (!user.isProfileComplete()) {
    return res.status(400).json({
      message:
        "Please complete your profile before proceeding with the application.",
    });
  }

  next();
};

module.exports = profileCompletionCheck;
