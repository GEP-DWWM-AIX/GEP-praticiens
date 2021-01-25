const listPraticien = document.querySelector('.row');
const nom = document.querySelector('#nom');
const button = document.querySelector('button');

const getData = () => {
    const urlPraticien = 'http://localhost:90/gsb/praticien';
    fetch(urlPraticien)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            data.forEach(prat => {
                    listPraticien.insertAdjacentHTML('beforeend', `
                    <div class="col-xs-12 col-md-6 center">
                        <div class="card-praticien" id="praticien-${prat.id}">
                            <div class="avatar">
                                <img src="./assets/images/dentiste.jpg" class="avatar" alt="">
                                <div class="nom">${prat.nom} ${prat.prenom}</div>
                            </div>            
                            <div class="specialite">${prat.specialite}</div>
                            <div class="visite">Déjà visité</div>
                            <div class="localite">${prat.adresse}</div>
                        </div>
                    </div>
                `);
            });
        });
};

const getByName = (nomPrat) => {
    const urlPraticien = 'http://localhost:90/gsb/praticien';
    fetch(urlPraticien)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            data.forEach(prat => {
                if (prat.nom === nomPrat){
                    listPraticien.insertAdjacentHTML('beforeend', `
                    <div class="col-xs-12 col-md-6 center">
                        <div class="card-praticien">
                            <div class="avatar">
                                <img src="./assets/images/dentiste.jpg" class="avatar" alt="">
                                <div class="nom">${prat.nom} ${prat.prenom}</div>
                            </div>            
                            <div class="specialite">${prat.specialite}</div>
                            <div class="visite">Déjà visité</div>
                            <div class="localite">${prat.adresse}</div>
                        </div>
                    </div>
                `);
                }    
            });
        });
};

button.addEventListener('click', (event) => {
    event.preventDefault();
    listPraticien.innerHTML = '';
    getByName(nom.value);
});

getData();
