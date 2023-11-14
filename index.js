const express = require("express");
const mongoose = require("mongoose");
const yourRoutes = require("./routs/EmplooyeeRouter");
const taskRoutes = require("./routs/task");
const dotenv = require("dotenv");

const cors = require("cors");
const app = express();
dotenv.config();

app.use(cors());
// Connect to MongoDB
// mongoose.connect(
//   "mongodb+srv://issahaddad:<pass>@cluster0.seqjalt.mongodb.net/?retryWrites=true&w=majority",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
// Middleware
app.use(express.json());

// Routes
app.use("/user", yourRoutes);
app.use("/task", taskRoutes);

// Start the server
const port = process.env.PORT ;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
