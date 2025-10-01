const express = require("express");


const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  addWatchedMovie,
  addYetToWatchMovie,
  updatePreferences,
  deleteUser,
  // patchUser
} = require("../controllers/userControllers");
const {generateList} = require("../controllers/recommendControllers");
const { requireAuth } = require("../middleware/requireAuth");
 
// // GET /users
router.get("/", getAllUsers);

// POST /users/signup
router.post("/signup", createUser);

//POST /users/login
router.post("/login",  loginUser);

// GET /users/:userId
router.get("/:userId", getUserById);

// POST /users/recommend/:userId
router.post("/recommend/:userId",requireAuth, generateList);

// PUT /users/:userId
router.put("/:userId",requireAuth, updateUser);

router.put("/preferences/:userId",requireAuth, updatePreferences);

router.put("/watched/:userId",requireAuth, addWatchedMovie);

router.put("/yettowatch/:userId",requireAuth, addYetToWatchMovie);

// DELETE /users/:userId
router.delete("/:userId",requireAuth, deleteUser,
);

// Update user using PATCH 
// router.patch('/:userId', patchUser)

module.exports = router;
