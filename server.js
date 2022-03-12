require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const app = express();

const PORT = process.env.PORT || 8080;
const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Now live at http://localhost:${PORT}/`))
  )
  .catch(() => console.log(`Unable to connect to MongoDB Atlas`));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use(errorMiddleware);
