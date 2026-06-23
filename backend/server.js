
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

// conexion bd //
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


app.get('/api/contenido', async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM tb_contenido');
        res.json(results); 
    } catch (error) {
        res.status(500).json({ error: "Error en la base de datos" });
    }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
