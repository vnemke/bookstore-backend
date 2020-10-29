const genreForm = document.getElementById('genre-form');
const genreName = document.getElementById('genre-name');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const genreId = urlParams.get('genreId');

Promise.all([
    fetch('http://localhost:3307/api/genres/' + genreId)
])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(response => {
        let fetchedGenre = response[0];

        genreName.value = fetchedGenre.genreName
    })
    .catch(err => {
        console.error('Error: ', err);
    });

genreForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let genreName = document.getElementById('genre-name').value;

    let genre = {
        genreName: genreName
    }

    fetch('http://localhost:3307/api/genres/' + genreId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genre)
    })
        .then((data) => {
            new Noty({
                type: 'success',
                layout: 'bottomRight',
                theme: 'nest',
                text: `${genreName} is succesfully updated`,
                timeout: '4000',
                progressBar: true,
                closeWith: ['click'],
                killer: true,
            }).show();
        })
        .catch((err) => console.log(err))
})