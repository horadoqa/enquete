require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch(err => {
    console.error("Erro ao conectar ao MongoDB", err);
    process.exit(1); // Encerra o servidor se a conexão falhar
  });

// Middlewares
app.use(cors());
app.use(express.json());  // Express já tem o body parser integrado

// Definindo o esquema do banco de dados para a enquete
const votoSchema = new mongoose.Schema({
  framework: String,
  votos: { type: Number, default: 0 },
});

const Voto = mongoose.model('Voto', votoSchema);

// Endpoint para enviar votos
app.post('/enquete', async (req, res) => {
  const { framework } = req.body;
  
  try {
    let voto = await Voto.findOne({ framework });

    if (voto) {
      // Se já existe, incrementar o número de votos
      voto.votos += 1;
    } else {
      // Caso contrário, criar uma nova entrada
      voto = new Voto({ framework, votos: 1 });
    }

    await voto.save();
    res.status(200).send({ message: 'Voto registrado com sucesso!' });
  } catch (error) {
    console.error("Erro ao salvar o voto:", error);
    res.status(500).send({ message: 'Erro ao salvar o voto.' });
  }
});

// Endpoint para obter os resultados
app.get('/resultados', async (req, res) => {
  try {
    const resultados = await Voto.find();
    res.status(200).json(resultados);
  } catch (error) {
    console.error("Erro ao buscar resultados:", error);
    res.status(500).send({ message: 'Erro ao buscar resultados.' });
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
