const express = require("express");
const {
    createQuestion,
    getQuestions,
    getQuestionById,
    deleteQuestion,
    createAnswer,
} = require("../controllers/questionsController");

const router = express.Router();

router.post("/", createQuestion);
router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.delete("/:id", deleteQuestion);
router.post("/:id/answers", createAnswer);

module.exports = router;
