const client = require("../models/clientModel");

const { getPostData } = require("../utils");

async function getClients(req, res) {
  try {
    const clients = await client.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(clients));
  } catch (error) {
    console.log(error);
  }
}

async function getClient(req, res, id) {
  try {
    const singleClient = await client.findById(id);

    if (!singleClient) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Client not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ singleClient }));
    }
  } catch (error) {
    console.log(error);
  }
}

async function createNewClient(req, res) {
  try {
    const body = await getPostData(req);

    const { name, email, phone } = JSON.parse(body);

    const clientEntry = {
      name,
      email,
      phone,
    };

    const newClient = await client.createClient(clientEntry);

    res.writeHead(201, { "Content-Type": "application/json" });

    return res.end(JSON.stringify(newClient));
  } catch (error) {
    console.log(error);
  }
}

async function updateClient(req, res, id) {
  try {
    const updClient = await client.findById(id);

    if (!updClient) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Client not found" }));
    } else {
      const body = await getPostData(req);

      const { name, email, phone } = JSON.parse(body);

      const clientData = {
        name: name || updClient.name,
        email: email || updClient.email,
        phone: phone || updClient.phone,
      };

      const updateClientEntry = await client.update(id, clientData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updateClientEntry));
    }
  } catch (error) {
    console.log(error);
  }
}
async function deleteClient(req, res, id) {
  try {
    const delClient = await client.findById(id);

    if (!delClient) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Client not found" }));
    } else {
      await client.del(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `client ${id} deleted` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getClients,
  getClient,
  createNewClient,
  updateClient,
  deleteClient,
};
