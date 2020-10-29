const publisherList = document.getElementById('publisher-list');

fetch('http://localhost:3307/api/publishers')
    .then(res => res.json())
    .then(fetchedPublishers => {
        publishersFetchList(fetchedPublishers);
    }).catch(err => {
        console.error('Error: ', err);
    });

    
function publishersFetchList(publishers) {
    let divElement = ''; 
            
    for (let i = 0; i < publishers.length; i++) {
            
        divElement += `<div id="author-${publishers[i].id}">
        ${publishers[i].id}
        ${publishers[i].publisherName}
        <a href="/publisheredit/?publisherId=${publishers[i].id}" class="edit">edit</a> 
        <button class="delete" data-publisher-id="${publishers[i].id}">delete</button>`;

        publisherList.innerHTML = divElement;

        let deleteButtons = Array.from(document.querySelectorAll('.delete'));

        deleteButtons.forEach(button => {
            button.addEventListener('click', deletePublisher)
        });
    }
}

function deletePublisher(e) {
    let button = e.target;

    let publisherId = button.dataset.publisherId 

    fetch('http://localhost:3307/api/publishers/' + publisherId, {
        method: 'DELETE',
    })
    .then((data) => {
        const div = button.parentElement;
        div.parentElement.removeChild(div);
    })
    .catch((err) => console.log(err));
}