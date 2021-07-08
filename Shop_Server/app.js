const express = require("express");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", indexRouter);
app.use("/users", usersRouter);

// error handler
app.use(function (err, req, res, next) {
  res.json({ error: "error" });
});

const port = process.env.PORT || 3004;
app.listen(port, () => console.log(`Your server runing On ${port}`));
