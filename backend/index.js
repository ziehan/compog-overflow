const express = require("express");
const cors = require("cors");
const questionsRoutes = require("./routes/questions");
const answersRoutes = require("./routes/answers");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/questions", questionsRoutes);
app.use("/api/answers", answersRoutes);

app.listen(PORT, () => {
    console.log(`Server API berjalan di port ${PORT}`);
});