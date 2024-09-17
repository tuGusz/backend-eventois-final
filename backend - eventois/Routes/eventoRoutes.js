import express from 'express';
import eventoController from '../controllers/eventoController.js';

const router = express.Router();

router.post('/eventos', eventoController.criar);
router.get('/eventos', eventoController.listar);
router.get('/eventos/:id', eventoController.buscarPorId);
router.put('/eventos/:id', eventoController.atualizar);
router.delete('/eventos/:id', eventoController.deletar);

export default router;
