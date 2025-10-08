const express = require("express");


const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  loginUser,
  updateUser,
  addWatchedMovie,
  addYetToWatchMovie,
  updatePreferences,
  deleteUser,
  addRecommendsMovie,
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

// GET /users/username/:username
router.get("/username/:username", getUserByUsername);

// FOR AI ?
// POST /users/recommend/:userId
router.post("/recommend/:userId",requireAuth, generateList);

// Add movie to user's own recommendations list
// PUT /users/recommends/:userId
router.put("/recommends/:userId",requireAuth, addRecommendsMovie);

// PUT /users/:userId
router.put("/:userId",requireAuth, updateUser);

router.put("/preferences/:userId",requireAuth, updatePreferences);

// GET /users/preferences/:userId
router.get("/preferences/:userId", requireAuth, async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("preferences");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching preferences:", err);
    res.status(500).json({ message: "Failed to fetch user preferences" });
  }
});


router.put("/watched/:userId",requireAuth, addWatchedMovie);

router.put("/yettowatch/:userId",requireAuth, addYetToWatchMovie);

// DELETE /users/:userId
router.delete("/:userId",requireAuth, deleteUser,);


module.exports = router;
