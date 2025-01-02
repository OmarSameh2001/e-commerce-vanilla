// Load navbar and footer dynamically
const navbarHtml = document.querySelector('.navbar');
const footerHtml = document.querySelector('.footer');

fetch('./navbar/nav.html')
    .then(response => response.text())
    .then(html => navbarHtml.innerHTML = html)
    .catch(error => console.error('Error loading navbar:', error));

fetch('./footer/footer.html')
    .then(response => response.text())
    .then(html => footerHtml.innerHTML = html)
    .catch(error => console.error('Error loading footer:', error));

// Handle category clicks
document.querySelectorAll('.category').forEach(category => {
    category.addEventListener('click', () => {
        const selectedCategory = category.getAttribute('data-category');
        window.location.href = `./products/products.html?category=${selectedCategory}`;
    });
});