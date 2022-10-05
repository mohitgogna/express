const express = require('express')
const auth=require('../middleware/auth')
const router = express.Router()

router.get('/', auth, (req, res) => {
    console.log(req.query.name);
    res.send('Users list');
})

router.get('/new', (req, res) => {    
    //res.send('user new form');
    res.render("users/new");
})

router.post('/', (req, res) => {
    const isValid = true;
    if (isValid) {
        users.push({ name: req.body.firstName });
        res.redirect(`/user/${users.length - 1}`);
    } else {
        console.log("not valid");
        res.render("users/new", { firstName: req.body.firstName });
    }
})

router.get('/:id', (req, res) => {
    console.log(req.user)
    res.send(`get user with id ${req.params.id} - ${req.user}`);
})

router.post('/:id', (req, res) => {
    res.send(`post user with id ${req.params.id}`);
})

// router.route('/')
//     .get((req, res) => {
//         res.send(`get user with id ${req.params.id}`);
//     })
//     .post((req, res) => {
//         res.send(`post user with id ${req.params.id}`);
//     });

const users = [{ name: "Mohit" }, { name: "Simran" }]
router.param("id", (req, res, next, id) => {
    console.log(users);
    req.user = users[id].name;
    next();
})
module.exports = router;