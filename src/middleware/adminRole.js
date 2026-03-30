const User = require("../model/user");

const checkRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    // console.log(user);

    if (user.role == "USER") {
      return res.status(401).json({ message: "unathorized, must be an admin" });
    }
    // console.log(req.user, "from role base");
    next();
  } catch (error) {
    res.status(401).json({ message: "unauthorize, admin role only" });
    console.log(error, error.message);
  }
};

module.exports = { checkRole }; 
// so if you wan to access any admin route you have to pass through this middleware and it will check if the user is admin or not if not it will return unauthorised access