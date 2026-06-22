import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'; 
import { fileURLToPath } from 'url'; 

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url)); 

app.use(express.json());
app.use(cors());


app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

const PORT = process.env.PORT || 3000;

// BD
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10
});

app.get('/api/categorias', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tb_categoria');
        res.json(rows);
    } catch (error) {
        console.error('Error en la base de datos:', error);
        res.status(500).json({ error: 'Error al conectar con la base de datos' });
    }
});

app.get('/api/contenido', async (req, res) => {
    try {
        const query = `
            SELECT cont.*, cat.degradado_css 
            FROM tb_contenido cont 
            JOIN tb_categoria cat ON cont.categoria_id = cat.id
            ORDER BY cont.orden ASC
        `;
        const [results] = await pool.query(query);
        res.json(results);
    } catch (error) {
        console.error("Error en BD:", error);
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});