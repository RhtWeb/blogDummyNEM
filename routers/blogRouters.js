const express = require("express");
const blogController = require("../Controllers/blogController");

const router = express.Router();

router.get("/create", blogController.blog_create_get);

router.post("/", blogController.blog_post);

router.get("/:id", blogController.blog_single_get);

router.delete("/:id", blogController.blog_single_delete);

module.exports = router;