const { Joi } = require("celebrate");
const validator = require("validator");

// Custom URL validation function
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// User validation schemas
const signupSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const signinSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
};

const updateProfileSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
};

const updateAvatarSchema = {
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
};

const userIdSchema = {
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
};

// Card validation schemas
const createCardSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
};

const cardIdSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
};

module.exports = {
  signupSchema,
  signinSchema,
  updateProfileSchema,
  updateAvatarSchema,
  userIdSchema,
  createCardSchema,
  cardIdSchema,
};
