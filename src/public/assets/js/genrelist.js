const genreList = document.getElementById('genre-list');

fetch('http://localhost:3307/api/genres')
    .then(res => res.json())
    .then(fetchedGenres => {
       genresFetchList(fetchedGenres);
    }).catch(err => {
        console.error('Error: ', err);
    });

    
function genresFetchList(genres) {
    let divElement = ''; 
            
    for (let i = 0; i < genres.length; i++) {
            
        divElement += `<div id="genre-${genres[i].id}">
        ${genres[i].id}
        ${genres[i].genreName}
        <a href="/genreedit/?genreId=${genres[i].id}" class="edit">edit</a> 
        <button class="delete" data-genre-id="${genres[i].id}">delete</button>`;
    }
    
    genreList.innerHTML = divElement;

    let deleteButtons = Array.from(document.querySelectorAll('.delete'));

    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteGenre)
    });
}

function deleteGenre(e) {
    let button = e.target;

    let genreId = button.dataset.genreId

    fetch('http://localhost:3307/api/genres/' + genreId, {
        method: 'DELETE',
    })
    .then((data) => {
        const div = button.parentElement;
        div.parentElement.removeChild(div);
    })
    .catch((err) => console.log(err));
}