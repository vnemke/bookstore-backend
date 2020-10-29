const router = require('express').Router();
const bookService = require('./book.service');


router.get('/', bookService.getAllBooks)

router.post('/', bookService.addBook)

router.put('/:id', bookService.putBook)

router.get('/:id', bookService.getOneBook)

router.delete('/:id', bookService.deleteBook)


module.exports = router;