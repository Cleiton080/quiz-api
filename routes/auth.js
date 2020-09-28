const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");

router.post("/signup", async (req, res) => {
	const password_hash = bcrypt.hashSync(req.body.password, 10);

	await User.create({
		...req.body,
		password: password_hash
    })
    .catch(err => res.status(400).send(err))
	.then(user => res.status(201).send(user));
});


module.exports = router;