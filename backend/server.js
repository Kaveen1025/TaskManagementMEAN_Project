const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 8070;
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection successful");
});

const studentRouter = require("./routes/students.js");
app.use("/student", studentRouter);

const workspaceRouter = require("./routes/workspace");
app.use("/workspace", workspaceRouter);

const workspaceInvitationRouter = require("./routes/workspaceinvitation");
app.use("/workspaceinvitation", workspaceInvitationRouter);


const userRouter = require("./routes/users");
app.use("/user", userRouter);

const ProjectRouter = require("./routes/projects");
app.use("/project", ProjectRouter);

const ProjectInvitationsRouter = require("./routes/projectinvitations");
app.use("/projectinv", ProjectInvitationsRouter);

const ContactUSRouter = require("./routes/contactus");
app.use("/contactus", ContactUSRouter);


const ActivityRouter = require("./routes/activity");
app.use("/activity", ActivityRouter);

const SubtaskRouter = require("./routes/subtasks");
app.use("/subtask", SubtaskRouter);


app.listen(PORT, () => {
  console.log(`Server is up and running on PORT ${PORT}`);
});
