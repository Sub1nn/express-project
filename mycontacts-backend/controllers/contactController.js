const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @ desc Get all contacts
// @ route Get /api/contacts
// @ access public (access to the api) (will be made private after integrating the authentication)

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id }); // fetch all the contacts of a logged in user (the user_id is from the contactModel)
  res.status(200).json(contacts);
});

// Get a single contact
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

// @ desc create new contact
// @ route Post /api/contacts
// @ access private

const addContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @ desc update a contact
// @ route Put /api/contacts
// @ access private

const updateContact = asyncHandler(async (req, res) => {
  //fetch contact from our database with the help of id. This contact will contain the user id of a user who has created.
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  //Before updating the contact we have to check if the contact which we have just fetched matches the req.user.id
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    //This is a Mongoose method used to find a document by its ID and update it. It takes three parameters:
    req.params.id,
    req.body,
    { new: true } //By default, findByIdAndUpdate returns the original document before the update. Setting { new: true } ensures that it returns the modified or the updated document.
  );
  res.status(200).json(updatedContact);
});

// @ desc delete a contact
// @ route Delete /api/contacts
// @ access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete other user contacts");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};
