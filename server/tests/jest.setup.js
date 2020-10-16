require("../models/User");

const mongoose = require("mongoose");
const keys = require("../config/keys");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

afterAll(async function (done) {
  await mongoose.connection.close();
  done();
});
