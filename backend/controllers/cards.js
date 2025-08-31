const Card = require("../models/card");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.json(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).json(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).json({ message: "Invalid card data" });
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error("No card found with that id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      // Check if the user owns the card
      if (card.owner.toString() !== req.user._id) {
        const error = new Error(
          "Forbidden: You can only delete your own cards"
        );
        error.statusCode = 403;
        throw error;
      }

      return Card.findByIdAndDelete(req.params.cardId);
    })
    .then((card) => res.json(card))
    .catch((err) => {
      if (err.statusCode === 404 || err.statusCode === 403) {
        return res.status(err.statusCode).json({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(400).json({ message: "Invalid card ID" });
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("No card found with that id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.json(card))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("No card found with that id");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.json(card))
    .catch(next);
};
