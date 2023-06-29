const express = require("express");

const cors = require("cors");

const noticeRouter = require("./routers/noticeRouter");

const userRouter = require("./routers/userRouter");

const roleRouter = require("./routers/roleRouter");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", roleRouter);
app.use("/", noticeRouter);
app.use("/", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
