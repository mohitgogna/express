const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    console.log("Main page");
    res.render('index', {text: "This is main page from main.js"})
})

router.get('/dashboard', (req, res)=>{
    res.json({message:"Dashboard details"});
})

module.exports = router;