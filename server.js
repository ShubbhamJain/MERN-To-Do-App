let express = require("express");
let mongoose = require("mongoose");
let helemt = require("helmet");
let config = require("config");
let path = require("path");
require("dotenv").config();

let app = express();
let port = process.env.PORT || 5000;

mongoose.connect(config.get("MONGO_URI"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
let db = mongoose.connection;
db.on("error", console.error.bind("MongoDB connection error"));

app.use(express.json());
app.use(helemt());

app.get("/favicon.ico", (req, res) => res.status(200).json());
app.use("/api/items", require("./routes/api/items"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
