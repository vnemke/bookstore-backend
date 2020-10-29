const authorForm = document.getElementById('author-form');
const genreForm = document.getElementById('genre-form');
const publisherForm = document.getElementById('publisher-form');


//add author
authorForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let addAuthor = document.getElementById('author-name').value;
    
    let author = {
        authorName: addAuthor
    }

    fetch('http://localhost:3307/api/authors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(author)
        })    
        .then((data) =>  console.log(data))
        .catch((err)=>console.log(err))

    });


//add genre
genreForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let addGenre = document.getElementById('genre-name').value;
    
    let genre = {
        genreName: addGenre
    }

    fetch('http://localhost:3307/api/genres', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genre)
        })    
        .then((data) =>  console.log(data))
        .catch((err)=>console.log(err))

    });

//add publisher
publisherForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let addPublisher = document.getElementById('publisher-name').value;
    
    let publisher = {
       publisherName: addPublisher
    }

    fetch('http://localhost:3307/api/publishers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(publisher)
        })    
        .then((data) =>  console.log(data))
        .catch((err)=>console.log(err))

    });    