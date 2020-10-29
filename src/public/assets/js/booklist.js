const bookList = document.getElementById('book-list');

fetch('http://localhost:3307/api/books')
    .then(res => res.json())
    .then(fetchedBooks => {
        booksFetchList(fetchedBooks);
    }).catch(err => {
        console.error('Error: ', err);
    });

function  booksFetchList(books) {
    let divElement = ''; 
            
    for (let i = 0; i < books.length; i++) {
            
        divElement += `<div id="book-${books[i].id}">
        ${books[i].id}
        ${books[i].bookName}
        ${books[i].releaseYear}
        ${books[i].Publisher.publisherName}
        <a href="/bookedit/?bookId=${books[i].id}" class="edit">edit</a> 
        <button class="delete" data-book-id="${books[i].id}" >delete</button>`;

        // authors

        let showAuthors = '';

        books[i].Authors.forEach(author => {
            showAuthors += `<div id="${author.id}">${author.authorName}</div>`
        });

        divElement += showAuthors;

        // genres

        showGenres = '';

        for (let j = 0; j < books[i].Genres.length; j++) {
            showGenres += `<div id="${books[i].Genres[j].id}">${books[i].Genres[j].genreName}</div>`
        };   

        divElement += showGenres;
        divElement +='</div>';

    }// End books for
    
    bookList.innerHTML = divElement;
    
    let deleteButtons = Array.from(document.querySelectorAll('.delete'));

    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteBook)
    });
}

function deleteBook(e) {
    let button = e.target; //this

    let bookId = button.dataset.bookId

    fetch('http://localhost:3307/api/books/'+bookId, {
        method: 'DELETE',
    })    
    .then((data) =>  {
        const div = button.parentElement;
        div.parentElement.removeChild(div);
    })
    .catch((err)=>console.log(err))


} 



