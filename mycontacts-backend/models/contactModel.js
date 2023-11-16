const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId, //the Id is created in mongoDb as an object Id
      required: true,
      ref: "User", //reference of the model which is User model
    },
    name: {
      type: String,
      required: [true, "Please add the Contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema); //created a mongoose model named "contact" based on the schema and exported it
