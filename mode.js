const swithMode = document.querySelector('.mode');
const body = document.querySelector('body');
swithMode.addEventListener('change', (event) => {
    if (event.target.checked) {
        body.classList.add('dark');
        body.classList.remove('light');
    } else {
        body.classList.add('light');
        body.classList.remove('dark');
    }
});