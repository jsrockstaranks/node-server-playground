const express = require('express')
const fs = require("fs");
var path = require('path');
const process = require('process')
const app = express()
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/files/:path", (req, res) => {
    const { params } = req;
    const { path } = params;
    console.log(path);
    const files = fs.readdirSync(path);
    
    res.status(200).json({files})
})

app.get('/api/users', async (req, res) => {
  const filepath = path.join("data-assets", "users.json");
  console.log(filepath, ' /api/users');
  fs.readFile(filepath, "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      res.status(404).json('Not Found')
    }
    res.status(200).json(JSON.parse(jsonString))
  });
})

app.get('/api/users/:user', (req, res) => {
  const {params} = req;
  const {user} = params;
  const filepath = path.join("data-assets", "users", `${user}.json`);
  console.log(filepath, ' /api/users/:user');
  fs.readFile(filepath, "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      res.status(404).json('Not Found')
    }
    res.status(200).json(JSON.parse(jsonString))
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log('live reload updated server, success!');
