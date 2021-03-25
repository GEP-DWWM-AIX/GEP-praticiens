const swithMode = document.querySelector('.mode');
const body = document.querySelector('body');
let mode = 'streets-v11';
swithMode.addEventListener('change', (event) => {
    if (event.target.checked) {
        mode = 'dark-v10';
        body.classList.add('dark');
        body.classList.remove('light');
    } else {
        mode = 'streets-v11';
        body.classList.add('light');
        body.classList.remove('dark');
    }
});