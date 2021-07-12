const express = require("express");
const cors = require('cors')
const bookRouter = require('./routes/bookRouter');
const usersRouter = require("./routes/usersRouter");
const authRoutes = require("./routes/authoRoute")

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(usersRouter);
app.use(authRoutes);

app.use("/books", bookRouter);



// error handler
app.use(function (err, req, res, next) {
  res.json({ error: "error" });
});

const port = process.env.PORT || 3006;
app.listen(port, () => console.log(`Your server runing On ${port}`));
