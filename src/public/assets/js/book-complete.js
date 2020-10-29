const bookForm = document.getElementById('book-form');

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

    fetch('http://localhost:3307/api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
        })    
        .then((data) =>  console.log(data))
        .catch((err)=>console.log(err))

});



