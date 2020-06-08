const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("home")
});

router.get('/home', (req, res) => {
    res.render("home")
});


router.get('/login', (req, res) => {
    res.render("login")
});

router.get('/admin', (req, res) => {
    res.render("admin")
});

router.get('/pay', (req, res) => {
    res.render("pay")
});
router.get('/inputdetails', (req, res) => {
    res.render("inputdetails")
});

router.get('/login', function(req, res, ) {
    res.render('login')
});

router.get('/signup', function(req, res, ) {
    res.render('signup')
});

module.exports = router;