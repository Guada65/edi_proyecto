import express from 'express';
import mysql from 'mysql2/promise'; 
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config(); 

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors()); 
app.use(express.json());


app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

app.get('/api/contenido/:categoria', async (req, res) => {
    const categoria = req.params.categoria; 
    const query = `
        SELECT c.*, cat.degradado_css 
        FROM tb_contenido c
        JOIN tb_categoria cat ON c.categoria_id = cat.id
        WHERE c.categoria_id = ?
    `;

    try {
        const [results] = await pool.query(query, [categoria]);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: "Error al filtrar contenido" });
    }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));

