const express = require("express");
const { celebrate } = require("celebrate");
const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  updateUserAvatar,
} = require("../controllers/user");
const {
  updateProfileSchema,
  updateAvatarSchema,
  userIdSchema,
} = require("../validation/schemas");

const router = express.Router();

router.get("/", getUsers);
router.get("/me", getCurrentUser); // Get current user info - must come before /:id
router.patch("/me", celebrate(updateProfileSchema), updateUserProfile);
router.patch("/me/avatar", celebrate(updateAvatarSchema), updateUserAvatar);
router.get("/:userId", celebrate(userIdSchema), getUserById); // Changed from :id to :userId for clarity

module.exports = router;
