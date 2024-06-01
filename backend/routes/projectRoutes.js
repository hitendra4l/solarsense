const express = require("express");
const router = express.Router();

const { authGuard } = require("../middleware/authMiddleware");
const {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
} = require("../controllers/projectControllers");

router.route("/").post(authGuard, createProject).get(authGuard, getAllProjects);
router
  .route("/:projectId")
  .get(authGuard, getProject)
  .put(authGuard, updateProject);
// router
//   .route("/:projectId")
//   .put(authGuard, adminGuard, updatePost)
//   .delete(authGuard, adminGuard, deletePost)
//   .get(getPost);

module.exports = router;
