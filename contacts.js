const fs = require("fs").promises;
const path = require("node:path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error(err.message);
  }
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === String(id));
  return contact ? contact : null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === String(id));
  const contactToRemove = contacts[index];
  if (index !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  }
  return contactToRemove ? contactToRemove : 'ID not found';
};

const addContact = async (name, email, phone) => {
  const contact = {
    id: uuid.v4(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
