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

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	let token;
	
	const user = await User.findOne({
		attributes: ["id", "username", "email", "password"],
		where: { email }
	});

	if(user && bcrypt.compareSync(password, user.password)) {
		token = jwt.sign({auth: user}, "private_key", {expiresIn: "1h"});
	}

	token 
		? res.status(200).json({ token }) 
		: res.status(404).json({ msg: "Credentials don't match!" });
});

module.exports = router;