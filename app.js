require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user");
const sequelize = require("./utils/database");
const chatRouter = require("./routes/chat");
const newGroupRouter = require("./routes/new-group");
const groupRouter = require("./routes/groups");
const User = require("./models/User");
const Chat = require("./models/chat");
const GroupChat = require("./models/groupchat");

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/new-group", newGroupRouter);
app.use("/groups", groupRouter);

// relations (associations)
User.hasMany(Chat);
Chat.belongsTo(User);

GroupChat.hasMany(Chat);
Chat.belongsTo(GroupChat);

User.belongsToMany(GroupChat, { through: "usergroup" });
GroupChat.belongsToMany(User, { through: "usergroup" });

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
