exmaples from
https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314

```js
import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, cb) {
      //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
      return UserModel.findOne({ email, password })
        .then((user) => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          }
          return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch((err) => cb(err));
    }
  )
);
```

sign in

```js
//routes/auth.js
import express from "express";
const authRouter = express.Router();
import jwt from "jsonwebtoken";
/* POST login. */
authRouter.post("/login", function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, msg) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, "your_jwt_secret");
      return res.json({ user, token });
    });
  })(req, res);
});
```

```js
//passport.js
import passportJWT from "passport-jwt";
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    function (jwtPayload, cb) {
      //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
      return UserModel.findOneById(jwtPayload.id)
        .then((user) => {
          return cb(null, user);
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);
```

```js
//routes/user.js

const userRouter = express.Router();

/* GET users listing. */
userRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET user profile. */
userRouter.get("/profile", function (req, res, next) {
  res.send(req.user);
});
```

```js
const app = express();
const auth = require("./routes/auth");
const user = require("./routes/user");
app.use("/auth", auth);
app.use("/user", passport.authenticate("jwt", { session: false }), user);
```

---

from passport
http://www.passportjs.org/packages/passport-jwt/

```js
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
opts.issuer = "accounts.examplesoft.com";
opts.audience = "yoursite.net";
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
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
```
