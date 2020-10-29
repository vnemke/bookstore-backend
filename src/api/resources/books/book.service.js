const { Book, Author, Genre, Publisher } = require('../../../../models');


const getAllBooks = async (req, res) => {

    try {
        const books = await Book.findAll({
            include: [
                {
                    model: Author,
                    attributes: ['id', 'authorName'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Genre,
                    attributes: ['id', 'genreName'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Publisher,
                    attributes: ['id', 'publisherName']
                }
            ]
        });
        res.json(books);

    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

const getOneBook = async (req, res) => {

    try {
        const book = await Book.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Author,
                    attributes: ['id', 'authorName'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Genre,
                    attributes: ['id', 'genreName'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Publisher,
                    attributes: ['id', 'publisherName']
                }
            ]
        });
        res.json(book);

    } catch (error) {
        res.status(500).send()
    }
}

const addBook = async (req, res) => {
    try {
        const book = await Book.create(req.body)
        await book.setAuthors(req.body.authors);
        await book.setGenres(req.body.genres);

        const fullBook = await Book.findOne({
            where: {
                id: book.id
            },
            include: [
                {
                    model: Author,
                    attributes: ['id', 'authorName'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Genre,
                    attributes: ['id', 'genreName'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Publisher,
                    attributes: ['id', 'publisherName']
                }
            ]
        });

        res.send(fullBook)

    } catch (error) {
        res.status(400).send()
        //console.log(error);
    }
}

const putBook = async (req, res) => {

    try {

        const result = await Book.update(req.body,
            {
                where: { id: req.params.id }

            });

            const book = await Book.findOne({
                where: {
                    id: req.params.id
                },
            });
        
        await book.setAuthors(req.body.authors);
        await book.setGenres(req.body.genres);

        const fullBook = await Book.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Author,
                    attributes: ['id', 'authorName'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Genre,
                    attributes: ['id', 'genreName'],
                    through: {
                        attributes: []
                    }
                },
                {
                    model: Publisher,
                    attributes: ['id', 'publisherName']
                }
            ]
        });


        res.send(fullBook)

    } catch (error) {
        res.status(400).send()
    }
}

const deleteBook = async (req, res) => {

    try {
        const book = await Book.destroy(
            {
                where: { id: req.params.id },

            })

        res.send()

    } catch (error) {
        res.status(400).send()
    }
}

module.exports = {
    getAllBooks,
    addBook,
    putBook,
    getOneBook,
    deleteBook
}