const router = require('express').Router();
const { Book, Author, Genre, Publisher } = require('../../../models/');



router.get('/register', (req, res) => {
    res.render('register.hbs')
})

router.get('/login', (req, res) => {
    res.render('login.hbs')
})

router.get('/booklist', (req, res) => {
    res.render('booklist.hbs')
})

router.get('/authorlist', (req, res) => {
    res.render('authorlist.hbs')
})

router.get('/genrelist', (req, res) => {
    res.render('genrelist.hbs')
})

router.get('/publisherlist', (req, res) => {
    res.render('publisherlist.hbs')
})

router.get('/bookedit', (req, res) => {
    res.render('bookedit.hbs')
})

router.get('/authoredit', (req, res) => {
    res.render('authoredit.hbs')
})

router.get('/genreedit', (req, res) => {
    res.render('genreedit.hbs')
})

router.get('/publisheredit', (req, res) => {
    res.render('publisheredit.hbs')
})

router.get('/addcontent', (req, res) => {
    res.render('addcontent.hbs')
})


router.get('/', (req, res) => {
    res.render('admin.hbs')
})

module.exports = router;