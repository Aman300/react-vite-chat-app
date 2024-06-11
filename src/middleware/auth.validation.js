const Joi = require("joi");

exports.loginValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Name is required",
    }),
    email: Joi.string().email().required().messages({
      "any.required": "Email is required",
      "string.email": "Invalid email format",
    }),
    password: Joi.string().required().messages({
      "any.required": "OTP is required",
    }),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details[0].message.replace(/['"]+/g, "");
    return res.status(400).json({ status: false, message: errorMessage });
  }

  next();
};
