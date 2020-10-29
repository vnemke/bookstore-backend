const genresDropdown = document.getElementById('genres');
const genreBtn = document.getElementById('genreButton');
const listGenres = document.getElementById('genres-list');
let availableGenres = [];
let selectedGenres = [];


fetch('http://localhost:3307/api/genres')
    .then(res => res.json())
    .then(fetchedGenres => {
        genreFetchDropdown(fetchedGenres);

    }).catch(err => {
        console.log('Error: ', err);
    });

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