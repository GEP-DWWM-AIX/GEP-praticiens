const listPraticien = document.querySelector('.row');
const nom = document.querySelector('#nom');
const loc = document.querySelector('#localite');
const spe = document.querySelector('#specialite');
const button = document.querySelector('button');
const visiteCheck = document.querySelector('#visite');
let userProfile = document.querySelector('.user-profile');
let blocPraticien = document.querySelector('.praticiens');
const villeList = document.querySelector('.ville-liste');
const card = document.querySelector('.card-autocomplete');
const titre = document.querySelector('.praticiens h3');
const userInfos = document.querySelector('.user-infos');

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
            getMap(adresses, data, mode, 6)
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
                    .then((dataPrat) => {
                        const tempArrayCity = [];
                        const tempDataPrat = [];
                        tempDataPrat.push(dataPrat);
                        tempArrayCity.push(dataPrat.adresse)
                        getMap(tempArrayCity, tempDataPrat, mode, 6);
                        if (dataPrat.visite){
                            document.querySelector('.alert-warning').style.display = 'none';
                            document.querySelector('.alert-success').style.display = 'block';
                        }else{
                            document.querySelector('.alert-warning').style.display = 'block';
                            document.querySelector('.alert-success').style.display = 'none';
                        }
                       userInfos.innerHTML = '';
                        userInfos.insertAdjacentHTML('beforeend', `
                        <div class="card-bloc">
                            <div class="card card-prat" style="width: 18rem;">
                                <img src="./assets/images/avatar-praticien.png" class="card-img-top avatar-show-prat" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${dataPrat.prenom} ${dataPrat.nom}</h5>
                                    <p class="card-text">${dataPrat.specialite}</p>
                                    <p class="card-text">${dataPrat.adresse}</p>
                                    <a href="#" class="btn btn-warning btn-show">Modifier les informations</a>
                                    <a href="#" class="btn btn-danger btn-show">Supprimer ce praticien</a>
                                </div>
                            </div>
                            <div class="card card-infos" style="width: 70%;">
                                <div class="card-body">
                                   <strong>Prénom et nom: </strong><span>${dataPrat.prenom} ${dataPrat.nom}</span>
                                   <hr>
                                   <strong>Email: </strong><span>soins-medecin-sud@gmail.com</span>
                                   <hr>
                                   <strong>Spécialité: </strong><span>${dataPrat.specialite}</span>
                                   <hr>
                                   <strong>Adresse du cabinet: </strong><span>${dataPrat.adresse}</span>
                                </div>
                            </div>
                        </div>
                        `) ;
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
       // getMap(loc.value, mode);
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
