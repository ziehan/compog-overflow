const pool = require("../db");

const deleteAnswer = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM answers WHERE id = $1", [
            id,
        ]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Answer not found" });
        }

        res.status(200).json({ message: "Answer deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { deleteAnswer };
