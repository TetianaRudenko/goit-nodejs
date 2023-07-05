const contacts = require("./contacts");

const { program } = require('commander');

program
  .option("-a, --action, <type>", 'choose action')
  .option("-i, --id, <type>", 'user id')
  .option("-n, --name, <type>", 'user name')
  .option("-e, --email, <type>", 'user email')
  .option("-p, --phone, <type>", 'user phone');

program.parse();

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "read":
      const allContacts = await contacts.readContacts();
      return console.table(allContacts);
    
    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
    
    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      return console.log(newContact);
    
    case "update":
      const updateContact = await contacts.updateContact(id, {name, email, phone});
      return console.log(updateContact);
    
    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);
  
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);





