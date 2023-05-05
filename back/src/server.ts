import express from 'express';
import users from './routes/users';
import connection from './connection/connection';

const app = express();

connection();

app.use(express.json());
app.use('/users', users);

const PORT = 3333;

app.listen(PORT, () => console.log(`Executando na porta ${PORT}`));