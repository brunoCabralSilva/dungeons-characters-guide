const express = require('express');
const users = require('./routes/users');
const connection = require('./connection/connection');

const app = express();

connection();

app.use(express.json());
app.use('/users', users);

const PORT = 3333;

app.listen(PORT, () => console.log(`Executando na porta ${PORT}`));