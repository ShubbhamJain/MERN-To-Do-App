let express = require("express");
let config = require("config");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

router = express.Router();

let User = require("../../models/UserModel");

router.post("/", async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  let checkUser = await User.findOne({ email });

  if (checkUser) {
    return res.status(400).json({ msg: "User already exists" });
  } else {
    let newUser = new User({
      name,
      email,
      password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save((err) => console.error(err));

        jwt.sign(
          { id: newUser._id },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                list: newUser.list,
              },
            });
          }
        );
      });
    });
  }
});

module.exports = router;
