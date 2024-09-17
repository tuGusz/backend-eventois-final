import Evento from './Model/events.js';
import express from 'express';
import eventoRoutes from './Routes/eventoRoutes.js';

const app = express();
const host = '0.0.0.0';
const porta = 4000;

app.use(express.json());
app.use('/api', eventoRoutes);

app.listen(porta, host, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
 