const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uploadPicture = require("../middleware/uploadPictureMiddleware");
const fileRemover = require("../utils/fileRemover");

const User = require("../models/User");

const signupUser = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    // Does this user already exist
    let user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exists...");
    }

    // Creating new user
    password = await bcryptjs.hash(password, 10);

    user = await User.create({ name, email, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    // Does this user exist
    let user = await User.findOne({ email });

    // if user doesn't exist
    if (!user) {
      throw new Error("User does not exists...");
    }

    // is user exists and password doesn't match
    if (!(await bcryptjs.compare(password, user.password))) {
      throw new Error("Incorrect email or password...");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token,
    });
  } catch (error) {
    // console.log(error.message);
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    // fetching user
    let user = await User.findById(req.user._id);

    // does user exists
    if (user) {
      return res.status(200).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
      });
    } else {
      const err = new Error("User not found...");
      err.statusCode = 404;
      next(err);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    // fetching user
    let user = await User.findById(req.user._id);

    // if user doesn't exist
    if (!user) {
      throw new Error("User not found...");
    }

    // deleting user
    await user.deleteOne();

    return res.json({ message: "User is deleted successfully" });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    // fetching user
    let user = await User.findById(req.user._id);

    // if user doesn't exist
    if (!user) {
      throw new Error("User not found...");
    }

    user.name = req.body?.name || user.name;
    user.email = req.body?.email || user.email;

    if (req.body?.password && req.body.password.length < 8) {
      throw new Error("Password must be at least 8 characters!");
    }
    if (req.body.password) {
      const newPassword = await bcryptjs.hash(req.body?.password, 10);
      user.password = newPassword || user.password;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    await user.save();

    return res.status(200).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");
    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occurred during uploading... " + err.message
        );
        next(error);
      } else {
        if (req.file) {
          let filename;
          const updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          if (filename) {
            fileRemover(filename);
          }
          updatedUser.avatar = req.file.filename;
          await updatedUser.save();

          const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
          });

          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            token,
          });
        } else {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          updatedUser.avatar = "";
          await updatedUser.save();
          fileRemover(filename);

          const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
          });

          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            token,
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupUser,
  loginUser,
  getProfile,
  deleteUser,
  updateProfile,
  updateProfilePicture,
};
