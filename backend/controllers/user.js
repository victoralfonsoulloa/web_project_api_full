const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.json(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.json(user))
    .catch((err) => {
      if (err.statusCode === 404) {
        return res.status(404).json({ message: err.message });
      }
      if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      return next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ message: 'Invalid user data' });
      }
      return next(err);
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('No user found with that id');
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
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('No user found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.json(user))
    .catch(next);
};
