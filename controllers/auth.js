exports.getLogin = (req, res, next) => {
  const cookieHeader = req.get("Cookie");
  let isLoggedIn = null;
  if (cookieHeader) {
    const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
    for (const cookie of cookies) {
      if (cookie.startsWith("loggedIn=")) {
        isLoggedIn = cookie.split("=")[1];
        break;
      }
    }
  }
  console.log("loggedIn value:", isLoggedIn);
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true; HttpOnly");
  res.redirect("/");
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
  });
};
