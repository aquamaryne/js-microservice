require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get('/db', async(req, res) => {
    try{
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        });

        const [rows] = await connection.execute(`SELECT * FROM cars`);

        res.status(200).json(rows);
    } catch(error){
        console.error(error);
        res.status(500).send({ error: 'Internal server error' })
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server starts on port ${port}`);
})

