const router = require('express').Router();
const authorService = require('./author.service');


router.get('/', authorService.getAllAuthors)

router.post('/', authorService.addAuthor)

router.put('/:id', authorService.patchAuthor)

router.get('/:id', authorService.getOneAuthor)

router.delete('/:id', authorService.deleteAuthor)


module.exports = router;