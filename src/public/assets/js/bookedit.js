const bookForm = document.getElementById('book-form');
let bookName = document.getElementById('book-name');
let bookYear = document.getElementById('book-year');
let publisher = document.getElementById('publishers');
let bookPrice = document.getElementById('book-price');
let bookDescription = document.getElementById('book-description');
let bookCover = document.getElementById('book-cover');

const authorsDropdown = document.getElementById('authors');
const authorBtn = document.getElementById('authorButton');
const listAuthors = document.getElementById('authors-list');
let availableAuthors = [];
let selectedAuthors = [];

const genresDropdown = document.getElementById('genres');
const genreBtn = document.getElementById('genreButton');
const listGenres = document.getElementById('genres-list');
let availableGenres = [];
let selectedGenres = [];

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const bookId = urlParams.get('bookId');

Promise.all([
    fetch('http://localhost:3307/api/books/' + bookId),
    fetch('http://localhost:3307/api/genres'),
    fetch('http://localhost:3307/api/authors')
])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(response => {
        let fetchedBook = response[0];

        bookName.value = fetchedBook.bookName;
        bookYear.value = fetchedBook.releaseYear;
        publisher.value = fetchedBook.PublisherId;
        bookPrice.value = fetchedBook.price;
        bookDescription.value = fetchedBook.description;
        bookCover.value = fetchedBook.coverUrl;
        

        let fetchedAuthors = response[2];
        
        let filteredAuthors = fetchedAuthors.filter(function (author) {
            let result = fetchedBook.Authors.find(bookAuthor => bookAuthor.id === author.id );
            return !result;
        });
        
        authorFetchDropdown(filteredAuthors);
        
        selectedAuthors = fetchedBook.Authors; 
        
        selectedAuthors.forEach(author => {
            
            let list = document.createElement("li");
            
            list.dataset.id = author.id;
        
            list.innerHTML = `${author.authorName} <span class="delete">delete</span>`;
            document.getElementById('authors-list').appendChild(list);
        })

        let fetchedGenres = response[1];

        let filteredGenres = fetchedGenres.filter(function (genre) {
            let result = fetchedBook.Genres.find(Bookgenre => Bookgenre.id === genre.id);
            return !result;
        })

        genreFetchDropdown(filteredGenres);

        selectedGenres = fetchedBook.Genres;

        selectedGenres.forEach(genre => {
            let list = document.createElement("li");
            
            list.dataset.id = genre.id;

            list.innerHTML = `${genre.genreName} <span class="delete">delete</span>`;
            document.getElementById('genres-list').appendChild(list);
        })
        
        
    })
    .catch(err => {
        console.error('Error: ', err);
    });


/*

filtrirati pristigle autore u response-u i iz tog niza izbaciti autore koji se nalaze u fetchedBook.
koristiti array.filter, array.find (malo kompleksniji primer, koristices array.find u okviru array.filter) -||- za zanrove

selected authors ce ti biti autori koji su vraceni u fetchedBook, a available authors rezultat filtriranja.
te availalbe authors stavis u dropdown


*/




function authorFetchDropdown(authors) {
    let options = '';

    for (let i = 0; i < authors.length; i++) {

        options += `<option value= "${authors[i].id}">${authors[i].authorName}</option> `

    }

    availableAuthors = authors;
    authorsDropdown.innerHTML = options;
}


//add author to the list
authorBtn.addEventListener('click', function (e) {
    e.preventDefault();

    let selectedId = authorsDropdown.value;
    let selectedIndex;

    let result = availableAuthors.find((author, index) => {
        selectedIndex = index;
        return author.id == selectedId
    });
    selectedAuthors.push(result);
    availableAuthors.splice(selectedIndex, 1);

    authorFetchDropdown(availableAuthors);

    let list = document.createElement("li");

    list.dataset.id = selectedId;

    list.innerHTML = `${result.authorName} <span class="delete">delete</span>`;
    document.getElementById('authors-list').appendChild(list);

});

//remove author from list
listAuthors.addEventListener('click', function (e) {
    if (e.target.className == 'delete') {
        const li = e.target.parentElement;

        let removedID = li.dataset.id;
        let removedIndex;

        listAuthors.removeChild(li)

        let result = selectedAuthors.find((author, index) => {
            removedIndex = index;
            return author.id == removedID
        });
        availableAuthors.push(result);
        selectedAuthors.splice(removedIndex, 1);

        authorFetchDropdown(availableAuthors);
    }
})

function genreFetchDropdown(genres) {
    let options = '';
    
    for (let i = 0; i < genres.length; i++) {
    
        options += `<option value = "${genres[i].id}">${genres[i].genreName}</option>`
    }
    
    availableGenres = genres;
    genresDropdown.innerHTML = options;
}


//add genre to the list
genreBtn.addEventListener('click', function(e) {
    e.preventDefault();

    let selectedId = genresDropdown.value;
    let selectedIndex;

    let result = availableGenres.find((genre, index) => {
        selectedIndex = index;
        return genre.id == selectedId;
    });
    selectedGenres.push(result);
    availableGenres.splice(selectedIndex,1);

    genreFetchDropdown(availableGenres);

    let list = document.createElement('li');

    list.dataset.id = selectedId;

    list.innerHTML = `${result.genreName} <span class="delete">delete</span>`;
    document.getElementById('genres-list').appendChild(list);
});    


//remove genre from list
listGenres.addEventListener('click', function (e) {
    if(e.target.className == 'delete') {
        const li = e.target.parentElement;

        let removedId = li.dataset.id;
        let removedIndex;

        listGenres.removeChild(li)

        let result = selectedGenres.find((author, index) => {     
            removedIndex = index;
            return author.id == removedId
        });
        availableGenres.push(result);
        selectedGenres.splice(removedIndex,1);

        genreFetchDropdown(availableGenres);
    } 
})


bookForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let bookName = document.getElementById('book-name').value;
    let publisher = document.getElementById('publishers').value;
    let bookYear = document.getElementById('book-year').value;
    let bookPrice = document.getElementById('book-price').value;
    let bookDescription = document.getElementById('book-description').value;
    let bookCover = document.getElementById('book-cover').value;
    
    let book = {
        bookName: bookName,
        PublisherId: publisher,
        releaseYear: bookYear,
        price: bookPrice,
        description: bookDescription,
        coverUrl: bookCover,
        authors: selectedAuthors.map((author) => author.id),
        genres: selectedGenres.map((genre) => genre.id)
    }

    fetch('http://localhost:3307/api/books/' + bookId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
        })    
        .then((data) =>  console.log(data))
        .catch((err)=>console.log(err))

    });





