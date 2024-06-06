const http = require("node:http");
const {
  getClients,
  getClient,
  createNewClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

const server = http.createServer((req, res) => {
  if (req.url === "/data/clients" || req.url ==="/" && req.method === "GET") {
    getClients(req, res);
  } else if (
    req.url.match(/\/data\/clients\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    getClient(req, res, id);
  }else if (req.url === "/data/clients" && req.method === "POST") {
    createNewClient(req, res);
  } else if (
    req.url.match(/\/data\/clients\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateClient(req, res, id);
  } else if (
    req.url.match(/\/data\/clients\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteClient(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "not found" }));
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log("running"));
