const authorsDropdown = document.getElementById('authors');
const authorBtn = document.getElementById('authorButton');
const listAuthors = document.getElementById('authors-list');
let availableAuthors = [];
let selectedAuthors = [];

fetch('http://localhost:3307/api/authors')
    .then(res => res.json())
    .then(fetchedAuthors => {
        authorFetchDropdown(fetchedAuthors);
    }).catch(err => {
        console.error('Error: ', err);
    });

function authorFetchDropdown(authors) {
    let options = ''; 
            
    for (let i = 0; i < authors.length; i++) {
            
        options += `<option value= "${authors[i].id}">${authors[i].authorName}</option> ` 
            
    }
    
    availableAuthors = authors;
    authorsDropdown.innerHTML = options;
}


//add author to the list
authorBtn.addEventListener('click', function(e) {
    e.preventDefault();

    let selectedId = authorsDropdown.value;
    let selectedIndex;

    let result = availableAuthors.find((author, index) => {     
        selectedIndex = index;
        return author.id == selectedId
    });
    selectedAuthors.push(result);
    availableAuthors.splice(selectedIndex,1);

    authorFetchDropdown(availableAuthors);

    let list = document.createElement("li");

    list.dataset.id = selectedId;

    list.innerHTML = `${result.authorName} <span class="delete">delete</span>`;
    document.getElementById('authors-list').appendChild(list);
    
});

//remove author from list
listAuthors.addEventListener('click', function (e) {
    if(e.target.className == 'delete') {
        const li = e.target.parentElement;

        let removedID = li.dataset.id;
        let removedIndex;

        listAuthors.removeChild(li)

        let result = selectedAuthors.find((author, index) => {     
            removedIndex = index;
            return author.id == removedID
        });
        availableAuthors.push(result);
        selectedAuthors.splice(removedIndex,1);

        authorFetchDropdown(availableAuthors);
    } 
})