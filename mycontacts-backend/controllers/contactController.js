const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// @ desc Get all contacts
// @ route Get /api/contacts
// @ access public (access to the api) (will be made private after integrating the authentication)

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(201).json(contacts);
});
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get contact with id ${req.params.id}` });
});

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
  });
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Updated contact with id ${req.params.id}` });
});

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted contact with id ${req.params.id}` });
});

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};
