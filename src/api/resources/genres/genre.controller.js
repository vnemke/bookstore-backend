const router = require('express').Router();
const genreService = require('./genre.service');



router.get('/', genreService.getAllGenres)

router.post('/', genreService.addGenre)

router.put('/:id', genreService.patchGenre)

router.get('/:id', genreService.getOneGenre)

router.delete('/:id', genreService.deleteGenre)
 


module.exports = router;