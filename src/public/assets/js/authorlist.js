const authorList = document.getElementById('author-list');

fetch('http://localhost:3307/api/authors')
    .then(res => res.json())
    .then(fetchedAuthors => {
        authorsFetchList(fetchedAuthors);
    }).catch(err => {
        console.error('Error: ', err);
    });

    
function authorsFetchList(authors) {
    let divElement = ''; 
            
    for (let i = 0; i < authors.length; i++) {
            
        divElement += `<div id="author-${authors[i].id}">
        ${authors[i].id}
        ${authors[i].authorName}
        <a href="/authoredit/?authorId=${authors[i].id}" class="edit">edit</a> 
        <button class="delete" data-author-id="${authors[i].id}">delete</button>`;
    }

    authorList.innerHTML = divElement;

    let deleteButtons = Array.from(document.querySelectorAll('.delete'));

    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteAuthor)
    });
}

function deleteAuthor(e) {
    let button = e.target;

    let authorId = button.dataset.authorId

    fetch('http://localhost:3307/api/authors/'+authorId, {
        method: 'DELETE',
    })
    .then((data) => {
        const div = button.parentElement;
        div.parentElement.removeChild(div);
    })
    .catch((err) => console.log(err));
}

    // let divElement = '';

    // authorsFetchList.forEach(authors => {
    //     divElement += `<div id="${authors.id}">${authors.authorName}</div>`
    // });

    // authorList.innerHTML = divElement;



    