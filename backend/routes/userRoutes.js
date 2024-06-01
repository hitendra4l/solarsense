const express = require("express");
const router = express.Router();

const { authGuard } = require("../middleware/authMiddleware");
const {
  signupUser,
  loginUser,
  getProfile,
  deleteUser,
  updateProfile,
  updateProfilePicture,
} = require("../controllers/userControllers");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/getProfile", authGuard, getProfile);
router.put("/updateProfile", authGuard, updateProfile);
router.put("/updateProfilePicture", authGuard, updateProfilePicture);
router.delete("/deleteUser", authGuard, deleteUser);

module.exports = router;
