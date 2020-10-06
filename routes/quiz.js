const router = require("express").Router();
const { Quiz, User } = require("../models/index");

router.get("/", async (req, res) => {
    const userId = req.auth.id;

    await User.findOne({
        where: { id: userId },
        include: {
            model: Quiz
        }
    }).then(quizzes => {
        res.status(200).json(quizzes);
    });
});

router.post("/", async (req, res) => {
    const { title, questions } = req.body;
    const { id } = req.auth;

    await User.findByPk(id)
        .then(async user => {
            
            const quiz = await Quiz.create({ title });

            quiz.addUser([user]).then(() => res.status(201));
        });
});

module.exports = router;