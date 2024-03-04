require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user");
const sequelize = require("./utils/database");
const chatRouter = require("./routes/chat");
const User = require("./models/user");
const Chat = require("./models/chat");

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

// relations (associations)
User.hasMany(Chat);
Chat.belongsTo(User);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
