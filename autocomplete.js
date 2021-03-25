const searchAlgoliaPlaces = (letter) => {
    villeList.innerText = '';
    fetch("https://places-dsn.algolia.net/1/places/query", {
        method: "POST",
        body: JSON.stringify({ query: letter })
    })
    .then(response => response.json())
    .then((data) => {
        for (let index = 0; index < 9; index++) {
            villeList.insertAdjacentHTML('beforeend', `
                <li>
                    <h6 class="card-title"><i class="fas fa-globe-africa"></i>${data.hits[index].locale_names.default[0]}</h6>
                </li>
            `)
        }
        const villes = document.querySelectorAll('.ville-liste li');
        villes.forEach((ville) => {
            ville.addEventListener('click', (event) => {
                event.preventDefault();
                const arrayCity = ville.innerText.split(' ');
                loc.value = arrayCity[0];
                card.style.display = 'none';
            });
        });
    });
}