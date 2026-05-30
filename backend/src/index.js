require('dotenv').config();

// console.log('DATABASE_URL:', process.env.DATABASE_URL);

const express = require('express');
const cors = require('cors');
const prisma = require('./lib/prisma');
const authController = require('./controllers/authController');
const profileController = require('./controllers/profileController')
const feedbackController = require("./controllers/feedbackController")
const aiController =
    require("./controllers/aiController")
const recommendationController =
    require(
        "./controllers/recommendationController"
    )
const authMiddleware = require('./middleware/auth');


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Running');
});
app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/auth/google', authController.googleLogin);

app.get('/me', authMiddleware, async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
            id: true,
            name: true,
            email: true,

            profile: {
                select: {
                    isCompleted: true,
                },
            },
        },
    });

    res.json(user);
});

app.post('/onboarding', authMiddleware, profileController.completeOnboarding)
app.post('/feedback', authMiddleware, feedbackController.createFeedback)
app.get('/feedback/status/:scholarshipId', authMiddleware, feedbackController.getFeedbackStatus)
app.get(
    "/ai/health",
    aiController.health
)
app.get(

    "/recommendations",

    authMiddleware,

    recommendationController.getRecommendations
)



app.listen(3000, () => {
    console.log('Server running on port 3000');
});