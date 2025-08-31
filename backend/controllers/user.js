const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Use development secret if NODE_ENV is not production
const JWT_SECRET =
  process.env.NODE_ENV === "production"
    ? process.env.JWT_SECRET
    : "dev-secret-key";

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.json(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("No user found with that id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.json(user))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      return next(err);
    });
};

// GET /users/me - get current user info
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error("No user found with that id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.json(user))
    .catch(next);
};

// POST /signup - create new user
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      // Return user without password
      const { password: hashedPassword, ...userWithoutPassword } =
        user.toObject();
      res.status(201).json(userWithoutPassword);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).json({ message: "Email already exists" });
      }
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Invalid user data" });
      }
      return next(err);
    });
};

// POST /signin - login user
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Incorrect email or password" });
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res
            .status(401)
            .json({ message: "Incorrect email or password" });
        }

        // Create JWT token that expires in 7 days
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        res.json({ token });
      });
    })
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("No user found with that id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.json(user))
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("No user found with that id");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.json(user))
    .catch(next);
};
