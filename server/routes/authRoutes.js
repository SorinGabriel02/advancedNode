const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      successRedirect: "http://localhost:3000/blogs",
      failureRedirect: "/",
    }),
    (req, res) => {
      res.json({ message: "Success" });
    }
  );

  app.get("/auth/logout", (req, res) => {
    console.log(req.logout);
    req.logout();
    res.json({ success: true });
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
