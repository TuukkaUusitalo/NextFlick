const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogControllers");
 
// GET /cars
router.get("/", getAllBlogs);

// POST /cars
router.post("/", createBlog);

// GET /cars/:carId
router.get("/:blogId", getBlogById);

// PUT /cars/:carId
router.put("/:blogId", updateBlog);

// DELETE /cars/:carId
router.delete("/:blogId", deleteBlog);

// Update car using PATCH 
// router.patch('/:carId', patchCar)

module.exports = router;