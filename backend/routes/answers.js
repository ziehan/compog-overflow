const express = require("express");
const { deleteAnswer } = require("../controllers/answersController");

const router = express.Router();

router.delete("/:id", deleteAnswer);

module.exports = router;
