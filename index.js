const operations = require("./contacts.js");

const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await operations.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await operations.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await operations.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await operations.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
