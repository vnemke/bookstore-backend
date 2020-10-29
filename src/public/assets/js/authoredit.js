const authorForm = document.getElementById('author-form');
const authorName = document.getElementById('author-name');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const authorId = urlParams.get('authorId');


Promise.all([
    fetch('http://localhost:3307/api/authors/' + authorId)
])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(response => {
        let fetchedAuthor = response[0];

        authorName.value = fetchedAuthor.authorName
    })
    .catch(err => {
        console.error('Error: ', err);
    });

authorForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let authorName = document.getElementById('author-name').value;

    let author = {
        authorName: authorName
    }

    fetch('http://localhost:3307/api/authors/' + authorId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(author)
        })    
        .then((data) => {
            new Noty({
                type: 'success',
                layout: 'bottomRight',
                theme: 'nest',
                text: `${authorName} is succesfully updated` ,
                timeout: '4000',
                progressBar: true,
                closeWith: ['click'],
                killer: true,
             }).show();
        })
        .catch((err)=>console.log(err))
})