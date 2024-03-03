require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user");
const sequelize = require("./utils/database");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRouter);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
