import express from 'express';
import eventoRoutes from './Routes/eventoRoutes.js';
import path from 'path';

const app = express();
const host = '0.0.0.0';
const porta = 4000;

app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));  
app.use('/api', eventoRoutes);

app.listen(porta, host, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});
 