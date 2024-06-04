const { User } = require("../models").User;

const profileCompletionCheck = async (req, res, next) => {
  const user = await User.findByPk(req.user.id); // Assuming req.user.id contains the logged-in user's ID

  if (!user.isProfileComplete()) {
    return res.status(400).json({
      message:
        "Please complete your profile before proceeding with the application.",
    });
  }

  next();
};

module.exports = profileCompletionCheck;
