require('dotenv').config();

// console.log('DATABASE_URL:', process.env.DATABASE_URL);

const express = require('express');
const prisma = require('./lib/prisma');
const authController = require('./controllers/authController');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Running');
});
app.post('/register', authController.register);
app.post('/login', authController.login);

app.get('/me', authMiddleware, async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });

    res.json(user);
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