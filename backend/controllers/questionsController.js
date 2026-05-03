const pool = require("../db");

const createQuestion = async (req, res) => {
    try {
        const { title, body, author } = req.body;
        const result = await pool.query(
            "INSERT INTO questions (title, body, author) VALUES ($1, $2, $3) RETURNING *",
            [title, body, author]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getQuestions = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT q.*, COALESCE(a.answer_count, 0) AS answer_count, la.body AS latest_answer_body FROM questions q LEFT JOIN (SELECT question_id, COUNT(*)::int AS answer_count FROM answers GROUP BY question_id) a ON a.question_id = q.id LEFT JOIN LATERAL (SELECT body FROM answers WHERE question_id = q.id ORDER BY created_at DESC LIMIT 1) la ON true ORDER BY q.created_at DESC"
        );
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const questionResult = await pool.query(
            "SELECT * FROM questions WHERE id = $1",
            [id]
        );

        if (questionResult.rows.length === 0) {
            return res.status(404).json({ message: "Question not found" });
        }

        const answersResult = await pool.query(
            "SELECT * FROM answers WHERE question_id = $1 ORDER BY created_at ASC",
            [id]
        );

        res.status(200).json({
            question: questionResult.rows[0],
            answers: answersResult.rows,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM questions WHERE id = $1", [
            id,
        ]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Question not found" });
        }

        res.status(200).json({ message: "Question deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const { body, author } = req.body;

        const questionCheck = await pool.query(
            "SELECT id FROM questions WHERE id = $1",
            [id]
        );

        if (questionCheck.rows.length === 0) {
            return res.status(404).json({ message: "Question not found" });
        }

        const result = await pool.query(
            "INSERT INTO answers (question_id, body, author) VALUES ($1, $2, $3) RETURNING *",
            [id, body, author]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createQuestion,
    getQuestions,
    getQuestionById,
    deleteQuestion,
    createAnswer,
};
