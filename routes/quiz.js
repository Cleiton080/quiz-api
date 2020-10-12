const router = require("express").Router();
const { Quiz, User, Question, Alternative } = require("../models/index");

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
    
    const user = await User.findByPk(req.auth.id);
    const quiz = await Quiz.create({ title });

    questions.map(question => ({ ...question, quizId: quiz.id }))
        .forEach(async question => {
            const { alternatives } = question;
            const questionCreated = await Question.create(question);
        
            await Alternative.bulkCreate(alternatives.map(alternative => ({ ...alternative, questionId: questionCreated.id })));
        });

    quiz.addUser([user]);
    
    res.status(200).end();
});

router.get("/:quiz", async (req, res) => {
    const { quiz } = req.params;

    await Quiz.findByPk(quiz, {
        include: {
            model: Question,
            attributes: ["id", "question", "quizId"],
            include: {
                model: Alternative,
                attributes: ["id", "alternative", "questionId"]
            }
        }
    })
    .catch(err => res.status(500).json(err))
    .then(quiz => res.status(200).json(quiz));
});

router.delete("/", async (req, res) => {
    const { quiz } = req.body;
    
    await Quiz.destroy({ where: { id: quiz } })
        .catch(err => res.status(500).json(err))
        .then(() => res.status(200).end());
});

module.exports = router;