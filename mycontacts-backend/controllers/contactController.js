// @ desc Get all contacts
// @ route Get /api/contacts
// @ access public (access to the api) (will be made private after integrating the authentication)

const getContacts = (req, res) => {
  res.status(201).json({ message: "Get all contacts" });
};
const getContact = (req, res) => {
  res.status(200).json({ message: `Get contact with id ${req.params.id}` });
};

const addContact = (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Create Contact" });
};

const updateContact = (req, res) => {
  res.status(200).json({ message: `Updated contact with id ${req.params.id}` });
};

const deleteContact = (req, res) => {
  res.status(200).json({ message: `Deleted contact with id ${req.params.id}` });
};

module.exports = {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};
