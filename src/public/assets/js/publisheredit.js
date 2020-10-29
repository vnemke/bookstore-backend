const publisherForm = document.getElementById('publisher-form');
const publisherName = document.getElementById('publisher-name');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const publisherId = urlParams.get('publisherId');


Promise.all([
    fetch('http://localhost:3307/api/publishers/' + publisherId)
])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(response => {
        let fetchedPublisher = response[0];

       publisherName.value = fetchedPublisher.publisherName
    })
    .catch(err => {
        console.error('Error: ', err);
    });

publisherForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let publisherName = document.getElementById('publisher-name').value;

    let publisher = {
        publisherName: publisherName
    }

    fetch('http://localhost:3307/api/publishers/' + publisherId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(publisher)
        })    
        .then((data) => {
            new Noty({
                type: 'success',
                layout: 'bottomRight',
                theme: 'nest',
                text: `${publisherName} is succesfully updated` ,
                timeout: '4000',
                progressBar: true,
                closeWith: ['click'],
                killer: true,
             }).show();
        })
        .catch((err)=>console.log(err))
})