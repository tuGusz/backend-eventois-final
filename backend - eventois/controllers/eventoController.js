import Evento from '../Model/events.js';

const eventoController = {
    async criar(req, res) {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: "Método não permitido. Utilize POST para criar um evento." });
        }

        const { nome, cidade, estado, data, horario, preco, quantidade, descricao } = req.body;
        if (!nome || !data || !horario) {
            return res.status(400).json({ error: "Parâmetros obrigatórios ausentes: nome, data e horario são obrigatórios." });
        }

        try {
            const evento = new Evento(nome, cidade, estado, data, horario, preco, quantidade, descricao);
            await evento.gravar();
            res.status(201).json({ id: evento.id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async listar(req, res) {
        if (req.method !== 'GET') {
            return res.status(405).json({ error: "Método não permitido. Utilize GET para listar eventos." });
        }

        try {
            const eventos = await new Evento().consultar('');
            res.status(200).json(eventos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async buscarPorId(req, res) {
        if (req.method !== 'GET') {
            return res.status(405).json({ error: "Método não permitido. Utilize GET para buscar um evento por ID." });
        }

        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido." });
        }

        try {
            const evento = await new Evento().getById(id);
            if (evento) {
                res.status(200).json(evento);
            } else {
                res.status(404).json({ message: 'Evento não encontrado' });
            }
        } catch (erro) {
            res.status(500).json({ error: erro.message });
        }
    },


    async atualizar(req, res) {
        if (req.method !== 'PUT') {
            return res.status(405).json({ error: "Método não permitido. Utilize PUT para atualizar um evento." });
        }

        const id = parseInt(req.params.id, 10);
        const { nome, cidade, estado, data, horario, preco, quantidade, descricao } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido." });
        }
        if (!nome || !data || !horario) {
            return res.status(400).json({ error: "Parâmetros obrigatórios ausentes: nome, data e horario são obrigatórios." });
        }

        try {
            const evento = new Evento(nome, cidade, estado, data, horario, preco, quantidade, descricao);
            evento.id = id;
            await evento.alterar(id);
            res.status(200).json({ message: 'Evento atualizado com sucesso' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deletar(req, res) {
        if (req.method !== 'DELETE') {
            return res.status(405).json({ error: "Método não permitido. Utilize DELETE para deletar um evento." });
        }

        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido." });
        }

        try {
            const evento = new Evento();
            await evento.deletar(id);
            res.status(200).json({ message: 'Evento deletado com sucesso' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async cadastrarEvento(evento) {
        const { nome, data, local } = evento;
        const query = 'INSERT INTO eventos (nome, data, local) VALUES (?, ?, ?)';
        const values = [nome, data, local];
        conexao = await connect();
        
        try {
            const [result] = await conexao.execute(query, values);
            return { id: result.insertId, nome, data, local };
        } catch (error) {
            console.error('Erro ao inserir evento:', error);
            throw error;
        }
    }
};

export default eventoController;
