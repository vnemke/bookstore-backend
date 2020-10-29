const router = require('express').Router();

const authCheck = require('../../middleware/auth')
const authRouter = require('../resources/auth/auth.controller');
const userRouter = require('../resources/users/user.controller');
const bookRouter = require('../resources/books/book.controller');
const authorRouter = require('../resources/authors/author.controller');
const publisherRouter = require('../resources/publishers/publisher.controller');
const genreRouter = require('../resources/genres/genre.controller');


router.use('/auth', authRouter);
//router.use('/', authCheck.jwtCheck)

router.use('/books', bookRouter);

router.use('/users', userRouter);

router.use('/authors', authorRouter);

router.use('/genres', genreRouter);

router.use('/publishers', publisherRouter);



module.exports = router