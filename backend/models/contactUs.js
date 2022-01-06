const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactUsSchema = new Schema({

  firstName: {
    type: String,
    required: [true, "ContactUs must have a First name"],
  },

  lastName: {
    type: String,
    required: [true, "ContactUs must have a Last name"],
  },

  email: {
    type: String,
    required: [true, "ContactUs must have a Email"],
  },

  phoneNumber: {
    type: String,
    required: [true, "ContactUs must have a Phone number"],
  },

  message: {
    type: String,
    required: [true, "ContactUs must have a Message"],
  },

  addedDateTime: {
    type: Date,
    required: [true, "ContactUs must have a Added date"],
    default: new Date()
  },

  updatedDateTime: {
    type: date,
    required: false
  },

});

const ContactUs = mongoose.model("ContactUs", contactUsSchema);
module.exports = ContactUs;
