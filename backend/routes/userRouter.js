const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  // patchUser
} = require("../controllers/userControllers");
const { requireAuth } = require("../middleware/requireAuth");
 
// // GET /users
router.get("/", getAllUsers);

// POST /users
router.post("/", createUser);

//POST /users/login
router.post("/login",  loginUser);

// GET /users/:userId
router.get("/:userId", getUserById);

// PUT /users/:userId
router.put("/:userId",requireAuth, updateUser);

// DELETE /users/:userId
router.delete("/:userId",requireAuth, deleteUser,
);

// Update user using PATCH 
// router.patch('/:userId', patchUser)

module.exports = router;
