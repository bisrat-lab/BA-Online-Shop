const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const bookRouter = require('./routes/bookRouter');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use("/books", bookRouter);

// error handler
app.use(function (err, req, res, next) {
  res.json({ error: "error" });
});

const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`Your server runing On ${port}`));
