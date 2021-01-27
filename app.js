const listPraticien = document.querySelector('.row');
const nom = document.querySelector('#nom');
const loc = document.querySelector('#localite');
const spe = document.querySelector('#specialite');
const button = document.querySelector('button');
const visiteCheck = document.querySelector('#visite');


const getData = () => {
    const urlPraticien = 'http://localhost:90/gsb/praticien';
    let etatVisite;
    let ville;
    fetch(urlPraticien)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            data.forEach(prat => {
                if(prat.visite){
                    etatVisite = 'Pas encore visité';
                }else{
                    etatVisite = 'Déja visité';
                }
                let villeArray = prat.adresse.split(' ');
                ville = villeArray[villeArray.length - 1];
                    listPraticien.insertAdjacentHTML('beforeend', `
                    <div class="col-xs-12 col-md-6 center">
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
        });
};


const getBySpeLoc = (myUrl) => {
    //const urlPraticien = 'http://localhost:90/gsb/praticien';
    console.log(myUrl);
    let countPrat = 0;
    let etatVisite;
    let ville;
    fetch(myUrl)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            data.forEach(prat => {
                if (prat.visite) {
                    etatVisite = 'Déja visité';
                } else {
                    etatVisite = 'Pas encore visité';
                }
                let villeArray = prat.adresse.split(' ');
                ville = villeArray[villeArray.length - 1];
                    countPrat++;
                    listPraticien.insertAdjacentHTML('beforeend', `
                    <div class="col-xs-12 col-md-6 center">
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
            if (countPrat === 1) {
                const card = document.querySelector('.card-praticien');
                card.parentNode.classList.remove('col-md-6');
            }
        });
};

button.addEventListener('click', (event) => {
    event.preventDefault();
    listPraticien.innerHTML = '';
    let url = `http://localhost:90/gsb/praticien?`;
    let estVisite = visiteCheck.value;
    if (loc.value !== ''){
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
    if (loc.value !== '' && spe.value !== '' && estVisite === 'all'){
        console.log('Veuilez préciser si l\'état des visites');
    }

    getBySpeLoc(url);
    loc.value = '';
    spe.value = '';

});

//getData();


