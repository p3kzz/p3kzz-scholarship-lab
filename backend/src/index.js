require('dotenv').config();

// console.log('DATABASE_URL:', process.env.DATABASE_URL);

const express = require('express');
const prisma = require('./lib/prisma');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Running');
});

app.get('/test-db', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});