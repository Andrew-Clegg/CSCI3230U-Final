const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const pollsRouter = require("./routes/ajaxrouting/polls");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
    .connect("mongodb://localhost:27017/myappDB", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", pollsRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
