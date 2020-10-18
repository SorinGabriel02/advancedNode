const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const morgan = require("morgan");
const cors = require("cors");

require("./models/User");
require("./models/Blog");
require("./services/passport");
require("./services/cache");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

if (process.env.NODE_ENG !== "production") app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    maxAge: 10 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/blogRoutes")(app);

// if (["production", "ci"].includes(process.env.NODE_ENV)) {
const rootDir = __dirname + "/../";
const path = require("path");
app.use(express.static(path.join(rootDir, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(rootDir, "client", "build", "index.html"));
});
// }

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
