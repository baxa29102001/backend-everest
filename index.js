const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./database/db");
const router = require("./src/routes/main");

// const bodyParser = require("body-parser");

// require("./swagger.js")(app);
connectDB();

app.use(express.json());
// app.use(authMiddleWare);

app.use("/api", router);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${port}`);
});
