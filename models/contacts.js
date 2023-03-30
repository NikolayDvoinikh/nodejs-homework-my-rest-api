const fs = require("fs/promises");

const { nanoid } = require("nanoid");

const path = require("path");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find(({ id }) => id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();

  const index = allContacts.indexOf(contactId);

  if (index === -1) {
    return null;
  }
  const [deletedContact] = allContacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedContact;
};
const addContact = async (body) => {
  const id = nanoid();
  const newContact = { id, ...body };

  await fs.appendFile(contactsPath, newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.indexOf(contactId);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
