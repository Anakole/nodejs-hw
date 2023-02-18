const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);

    if (!contact) {
      return null;
    }

    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
