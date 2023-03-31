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

const addContact = async (body) => {
  const id = nanoid();
  const newContact = { id, ...body };
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ email }) => email === body.email);
  if (index !== -1) {
    return null;
  }
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { ...allContacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  console.log(allContacts);
  const index = allContacts.findIndex(({ id }) => id === contactId);
  console.log(index);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = allContacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
