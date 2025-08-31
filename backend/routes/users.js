const express = require("express");
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/user");

const router = express.Router();

router.get("/", getUsers);
router.get("/me", getCurrentUser); // Get current user info - must come before /:id
router.patch("/me", updateUserProfile);
router.patch("/me/avatar", updateUserAvatar);
router.get("/:userId", getUserById); // Changed from :id to :userId for clarity

module.exports = router;
