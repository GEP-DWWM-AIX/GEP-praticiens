const thumb = document.querySelector('.thumb');
thumb.addEventListener('change', (event) => {
    const cardXs = document.querySelectorAll('.card-praticien');
    cardXs.forEach((card) => {
        card.parentNode.classList.toggle('thumb-xl');
    });
    console.log(cardXs);
});