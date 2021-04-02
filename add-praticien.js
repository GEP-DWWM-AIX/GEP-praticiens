// const inputPrenom = document.querySelector('#inputPrenom');
// const inputNom = document.querySelector('#inputNom');
// const inputAddress = document.querySelector('#inputAddress');
// const inputSpe = document.querySelector('#inputSpe');
// const inputState = document.querySelector('#inputState');
// const sendForm = document.querySelector('.add-prat');

// sendForm.addEventListener('click', (event) => {
//     event.preventDefault();
//     const data = {
//         nom: inputNom.value,
//         prenom: inputPrenom.value,
//         adresse: inputAddress.value,
//         specialite: inputSpe.value,
//         visite: true
//     }

//     fetch('http://localhost:90/gsb/praticien', {
//         method: 'POST',
//         headers:{
//             "Content-Type": "application/json; charset=utf-8",
//             "Accept": "application/json"
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then((data) => {
//         console.log(data)
//     })
// })


const form = document.querySelector('.form-add-prat');
console.log(form);
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // formData.append('is_visite', true)
    var object = {};
    formData.forEach((value, key) => object[key] = value);
    if (object.is_visite === 'Jamais visité'){
        object.visite = false;
    }else{
        object.visite = true;
    }
    
    var json = JSON.stringify(object);
    console.log(json)
    fetch('http://localhost:90/gsb/praticien', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json; charset=utf-8',  
        },
        body: json
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data);
    })
});