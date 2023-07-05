const fs = require('fs').promises;
const path = require("path");
const { nanoid } = require("nanoid");


const contactsPath = path.join(__dirname, "db", "contacts.json");

const readContacts= async() => {
  const jsonResult = await fs.readFile(contactsPath);
  return JSON.parse(jsonResult);
}

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  
  const result = contacts.find(contact => contact.id === contactId);
  return result || null;
}

const addContact = async(newName, newEmail, newPhone) => {
  const contacts = await readContacts();
  
  const newContact = {id: nanoid(), name: newName, email: newEmail, phone: newPhone}
  contacts.push(newContact);
  
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, data) => {
  const contacts = await readContacts();
  
  const index = contacts.findIndex((contact) => contact.id === contactId);
  
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const removeContact = async(contactId) => {
  const contacts = await readContacts();
  
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1); 
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}


module.exports = {
  readContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};