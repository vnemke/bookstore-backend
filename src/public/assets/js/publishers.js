const publishersDropdown = document.getElementById('publishers');

fetch('http://localhost:3307/api/publishers')
    .then(res => res.json())
    .then(data => {

        let options = "";

        for (let i = 0; i < data.length; i++) {
            options += `<option value = "${data[i].id}">${data[i].publisherName}</option>`
        }

        publishersDropdown.innerHTML = options;

    }).catch(err => {
        console.log('Error: ', err);
        
    });