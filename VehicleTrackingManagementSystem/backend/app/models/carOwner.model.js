const mongoose = require("mongoose");
const Joi = require('joi');
const { NationalIdPattern } = require("./CarOwner.model");


/**
 * @swagger
 * definitions:
 *   CarOwner:
 *     properties:
 *       _id:
 *         type: string
 *       names:
 *         type: string
 *       address:
 *         type: string
 *       phone:
 *         type: string
 *       nationalId:
 *         type: string
 *     required:
 *       - names
 *       - address
 *       - phone
 *       - nationalId
 */

var schema = mongoose.Schema(
  {
    names: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Model = mongoose.model("carOwner", schema);

module.exports.CarOwner = Model;
module.exports.validateCarOwner = (body) => {
  return Joi.object({
    names: Joi.string().required(),
    phone: Joi.string().required(), // validate phone
    address: Joi.string().required(),
    nationalId: Joi.string().pattern(NationalIdPattern).length(16).required(),
  }).validate(body);
};
