const listPraticien = document.querySelector('.row');
const nom = document.querySelector('#nom');
const loc = document.querySelector('#localite');
const spe = document.querySelector('#specialite');
const button = document.querySelector('button');
const visiteCheck = document.querySelector('#visite');
let userProfile = document.querySelector('.user-profile');
let blocPraticien = document.querySelector('.praticiens');
const villeList = document.querySelector('.ville-liste');
const card = document.querySelector('.card');
const titre = document.querySelector('.praticiens h3');

const getBySpeLoc = (myUrl) => {
    let countPrat = 0;
    let etatVisite;
    let ville;
    const adresses = [];
    fetch(myUrl)
        .then(response => response.json())
        .then((data) => {
            if(data.length > 0){
                titre.innerText = 'Voici vos praticiens';
            }else{
                titre.innerText = 'Aucun praticien concernant cette recherche';
            }
            data.forEach(prat => {
                if (prat.visite) {
                    etatVisite = 'Déja visité';
                } else {
                    etatVisite = 'Pas encore visité';
                }
                adresses.push(prat.adresse);
                let villeArray = prat.adresse.split(' ');
                ville = villeArray[villeArray.length - 1];
                    countPrat++;
                    listPraticien.insertAdjacentHTML('beforeend', `
                    <div class="col-xs-12 col-md-6 myCard center">
                        <div class="card-praticien" id="${prat.id}">
                            <div class="avatar">
                                <img src="./assets/images/dentiste.jpg" class="avatar" alt="">
                                <div class="nom">${prat.nom} ${prat.prenom}</div>
                            </div>            
                            <div class="specialite">${prat.specialite}</div>
                            <div class="visite">${etatVisite}</div>
                            <div class="localite">${ville}</div>
                        </div>
                    </div>
                `);    
            });
            getMap(adresses, mode, 6)
            if (countPrat === 1) {
                const card = document.querySelector('.card-praticien');
                card.parentNode.classList.remove('col-md-6');
            }
            const cards = document.querySelectorAll('.myCard');
            cards.forEach((card) => {
                card.addEventListener('click', (event) => {
                    blocPraticien.style.display = 'none';
                    userProfile.style.display = 'block';
                    let id = card.querySelector('.card-praticien').id;
                    let userUrl = `http://localhost:90/gsb/praticien/${id}`;    
                    fetch(userUrl)
                    .then(response => response.json())
                    .then((data) => {
                        userProfile.insertAdjacentHTML('beforeend', `
                            <div class="card" style="width: 18rem; margin-top: 100px;">
                                <img src="..." class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${data.prenom} ${data.nom}</h5>
                                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">${data.specialite}</li>
                                    <li class="list-group-item">${data.adresse}</li>
                                    <li class="list-group-item">${data.visite}</li>
                                </ul>
                                <div class="card-body">
                                    <a href="#" class="card-link">Mettre à jour</a>
                                    <a href="#" class="card-link">Supprimer</a>
                                </div>
                            </div>
                        `);
                    })
                    .catch((err) => {
                        console.log('Erreur:' + err);
                    });          
                });
            });
        });
};

button.addEventListener('click', (event) => {
    event.preventDefault();
    card.style.display = 'none';
    userProfile.style.display = 'none';
    blocPraticien.style.display = '';
    listPraticien.innerHTML = '';
    let url = `http://localhost:90/gsb/praticien?`;
    let estVisite = visiteCheck.value;
    if (loc.value !== ''){
        getMap(loc.value, mode);
        let ville = `ville=${ loc.value }`;
        url += ville;
    }
    if (spe.value !== ''){
        let specialite = `&specialite=${spe.value}`; 
        url += specialite;
    }
    if(estVisite !== 'all'){
        let etatVisite = `&visite=${estVisite}`;
        url += etatVisite;
    }
    if (loc.value.length <= 0 && spe.value.length <= 0 && estVisite === 'all'){
        getMap('France', mode);
    }
    getBySpeLoc(url);
    loc.value = '';
    spe.value = '';
});

// loc.addEventListener('blur', (event) => {
//     card.style.display = 'none';
// });

loc.addEventListener("keyup", () => {
    if(loc.value <= 0){
        card.style.display = 'none';
    }else{
        card.style.display = 'block';
    }
    searchAlgoliaPlaces(loc.value)
});
