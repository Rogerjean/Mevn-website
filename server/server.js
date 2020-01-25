const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = "movieratingapplicationsecretkey";

// Déclaration du middleware pour Passport
passport.use(
  new JwtStrategy(jwtOptions, function(jwt_payload, done) {
    console.log(jwt_payload.sub);

    User.findOne({ id: jwt_payload.sub }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

const app = express();
const router = express.Router();
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

mongoose
  .connect(
    "mongodb://localhost/movie_rating_app",
    { useNewUrlParser: true, useUnifiedTopology: true },
    function() {
      console.log("connection has been made");
    }
  )
  .catch(err => {
    console.error("App starting error:", err.stack);
    process.exit(1);
  });

fs.readdirSync("controllers").forEach(function(file) {
  if (file.substr(-3) == ".js") {
    const route = require("./controllers/" + file);
    route.controller(app);
  }
});

router.get("/", function(req, res) {
  res.json({ message: "API initialized!" });
});

const port = process.env.API_PORT || 8081;
app.use("/", router);
app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
