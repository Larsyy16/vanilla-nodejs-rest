let clients = require("../data/clients.json");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils");

function findAll() {
  return new Promise((resolve, reject) => {
    resolve(clients);
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const client = clients.find((p) => p.id === id);
    resolve(client);
  });
}

function createClient(clientEntry) {
  return new Promise((resolve, reject) => {
    const newClient = { id: uuidv4(), ...clientEntry };
    clients.push(newClient);
    writeDataToFile("./data/clients.json", clients);
    resolve(newClient);
  });
}

function update(id, client) {
  return new Promise((resolve, reject) => {
    const index = clients.findIndex((p) => p.id === id);
    clients[index] = { id, ...client };
    writeDataToFile("./data/clients.json", clients);
    resolve(clients[index]);
  });
}

function del(id) {
  return new Promise((resolve, reject) => {
    clients = clients.filter((client) => client.id !== id);
    writeDataToFile("./data/clients.json", clients);
    resolve();
  });
}

module.exports = {
  findAll,
  findById,
  createClient,
  update,
  del,
};
