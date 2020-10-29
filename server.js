const path = require('path')
const express = require('express')
const hbs = require('hbs')
const apiRouter = require('./src/api/router/api.routes');
const publicRouter = require('./src/public/router/public.routes');
const db = require('./models');
const connection = db.sequelize;

const app = express()
const port = 3307


// Define paths for Express config
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/parts')
const assets = path.join(__dirname, 'src/public/assets');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(assets));

app.use(express.json());

app.use('/', publicRouter);
app.use('/api', apiRouter);


// Seeders ------------------------------------
const authors = require('./seeders/seed_authors.json');
const books = require('./seeders/seed_books.json');
const genres = require('./seeders/seed_genres.json');
const publishers = require('./seeders/seed_publishers.json');
const users = require('./seeders/seed_users.json');

//-------------------------------


connection
    .sync({
        // force: true
    })
    .then(async () => {
        console.log('Connection has been established successfully.');

        // await db.User.bulkCreate(users, { individualHooks: true });
        // await db.Author.bulkCreate(authors);
        // await db.Genre.bulkCreate(genres);
        // await db.Publisher.bulkCreate(publishers);
        // await db.Book.bulkCreate(books).then(()=>{

        //     books.forEach( async(book)=>{
        //         const _book = await db.Book.findOne({
        //             where: {
        //                 bookName: book.bookName
        //             }
        //         });
        //         _book.setAuthors(book.authors);
        //         _book.setGenres(book.genre);
        //     })

        // });


    })
    .catch(err => {
        console.error('Unable to connect to the database:', err)
    });

app.listen(port, () => {
    console.log('Running server on port ' + port)
});