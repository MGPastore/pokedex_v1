const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/pokemon', (req, res) => {
  const filePath = path.join(__dirname, 'allpokemon.json');
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(filePath);
});

app.listen(3000, () => {
  console.log('API escuchando en el puerto 3000');
});
