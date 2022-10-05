const express = require('express');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const router = express.Router();

const users = [];
let loggedInUser = [];

router.post('/register', async (req, res) => {
    const {user, email, password} = req.body;

    if (!(user && email && password)) {
        return res.status(400).send({message: "All inputs are required"})
    }

    const existingUser = users.find(a => a.email === email);

    if (existingUser) {
        console.log(...users);
        return res.send({message: "User already exist"});
    }

    //Encrypt password
    const encryptPassword = await bcrypt.hash(password, 10);
    users.push({user: user, email: email, password: encryptPassword});

    //jwt token
    const token = jwt.sign(
        {
            user_id: user, email
        },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h"
        },
        "");

    users[0].token = token;

    res.status(201).json(users[0]);
    //res.send({message: "User registered"});

})

router.post('/login', (req, res) => {
    const {user, password} = req.body;

    if (!(user && password)) {
        return res.status(400).send({message: "All inputs are required"})
    }

    const currentUser = users.find(a => a.user === user);

    console.log(currentUser);
    if (currentUser && (bcrypt.compare(password, currentUser.password))) {
        res.status(200).json(currentUser);

    } else{
        res.status(400).send("Invalid credentials");
    }

})


router.post('/logout', (req, res) => {
    if (loggedInUser.length > 0) {
        console.log(...loggedInUser);
    }
    loggedInUser = [];
    res.json({message: "Log out successfully!"})
})
module.exports = router;
