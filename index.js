const contacts = require("./contacts");

const { program } = require('commander');

program
  .option("-a, --action, <type>")
  .option("-i, --id, <type>")
  .option("-n, --name, <type>")
  .option("-e, --email, <type>")
  .option("-p, --phone, <type>");

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


//invokeAction({ action: "list" })
//invokeAction({ action: "getById", id: "vza2RIzNGIwutCVCs4mCL" });
//invokeAction({ action: "add", name: "Anna", email: "Anna@gmail.com", phone: "5115-51" });
//invokeAction({ action: "updateById", id: "qdggE76Jtbfd9eWJHrssH", name: "Chaim Lewis", email: "dui.in@ukr.net", phone: "(294) 840-6685" });
//invokeAction({ action: "remove", id: "AeHIrLTr6JkxGE6SN-0Rw"});



