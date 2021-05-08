const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const allContacts = JSON.parse(data);
    console.table(allContacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const allContacts = JSON.parse(data);
    const contactById = allContacts.find(
      ({ id }) => String(id) === String(contactId)
    );
    console.table(contactById);
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const allContacts = JSON.parse(data);
    const newContacts = allContacts.filter(
      ({ id }) => String(id) !== String(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    console.table(newContacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const allContacts = JSON.parse(data);
    const newContacts = [...allContacts, { id: uuidv4(), name, email, phone }];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
    console.table(newContacts);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
