// const categories = document.querySelector('.categories');
// let currentScroll = 0;
// let scrollDirection = 1;

// function slideCategories() {
//     currentScroll += scrollDirection * 1;
//     categories.scrollLeft = currentScroll;

//     if (currentScroll >= categories.scrollWidth - categories.clientWidth || currentScroll <= 0) {
//         scrollDirection *= -1;
//     }

//     requestAnimationFrame(slideCategories);
// }

// slideCategories();
const navbarHtml = document.querySelector('.navbar');

// Use fetch to load the HTML file
fetch('./navbar/nav.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(html => {
        navbarHtml.innerHTML = html;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

const footerHtml = document.querySelector('.footer');

// Use fetch to load the HTML file
fetch('./footer/footer.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(html => {
        footerHtml.innerHTML = html;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });