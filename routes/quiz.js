const router = require("express").Router();
const { Quiz, User, Question } = require("../models/index");

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

    const user = await User.findByPk(id);
    const quiz = await Quiz.create({ title });
    
    quiz.addUser([user]);
    
    if(Array.isArray(questions) && questions.length > 0) {
        Question.bulkCreate(questions.map(question => {
            return { ...question, quizId: quiz.id };
        }));
    }
    
    res.status(200).end();
});

module.exports = router;