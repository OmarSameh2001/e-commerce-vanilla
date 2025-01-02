import { addToCart, getCartItems, removeFromCart } from "../cart/cart.js";
import { addToWishlist, getCartWishlist, removeFromWishlist } from "../wishlist/wishlist.js";

async function fetchProducts() {
    return await fetch('https://gist.githubusercontent.com/OmarSameh2001/9d6452747e0181cdbafa965e511c4d09/raw/41dd38902358e58ba96c0f14e815f674c9405de9/products.json')
        .then(response => response.json());
}

const products = fetchProducts();
const cartItems = getCartItems();
const wishlistItems = getCartWishlist();

products.then(data => {
    const products = data;
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');

    // Update the title based on the selected category
    const productTitle = document.getElementById('product_title');
    if (selectedCategory) {
        productTitle.textContent = `${selectedCategory} Products`;
    } else {
        productTitle.textContent = 'All Products';
    }

    // Filter products by category if a category is selected
    const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

    displayProducts(filteredProducts);
    localStorage.setItem('products', JSON.stringify(products));
});

function displayProducts(products) {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        productDiv.innerHTML = `
            <div class="card d-flex flex-column align-items-center justify-content-center text-center p-3" style="width: 20rem; height: 400px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease, box-shadow 0.3s ease; overflow: hidden;">
                <img src="${product.image}" class="text-truncate" style="width: 100%; height: 200px; object-fit: cover;" alt="${product.name}">
                <h4 style="font-size: 1.1rem; margin: 1rem 0; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${product.name}</h4>
                <p style="font-size: 0.9rem; color: #555; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Open the product to see more info about it</p>
                <p style="font-size: 1rem; font-weight: bold; color: #000;">Price: ${product.price} EGP</p>
                <div style="display: flex; gap: 15px;">
                    <button class="cart_btn btn btn-outline-dark" style="flex: 1; padding: 5px 10px; font-size: 0.8rem;">Cart</button>
                    <button class="wishlist_btn btn btn-outline-danger" style="flex: 1; padding: 5px 10px; font-size: 0.8rem;">Wishlist</button>
                </div>
            </div>
        `;

        const cartBtn = productDiv.querySelector('.cart_btn');
        const wishlistBtn = productDiv.querySelector('.wishlist_btn');

        if (cartItems.some(item => item.id === product.id)) {
            cartBtn.textContent = 'Remove';
            cartBtn.addEventListener('click', () => removeFromCart(product.id));
        } else {
            cartBtn.textContent = 'Cart';
            cartBtn.addEventListener('click', () => addToCart(product.id, product.name, product.image, product.price));
        }

        if (wishlistItems.some(item => item.id === product.id)) {
            wishlistBtn.textContent = 'Remove';
            wishlistBtn.addEventListener('click', () => removeFromWishlist(product.id));
        } else {
            wishlistBtn.addEventListener('click', () => addToWishlist(product.id, product.name, product.image, product.price));
        }

        productDiv.querySelector('.card').addEventListener('mouseover', (e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
        });

        productDiv.querySelector('.card').addEventListener('mouseout', (e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });

        productsContainer.appendChild(productDiv);
    });
}

// Navbar and footer loading
const navbarHtml = document.querySelector('.navbar');
const footerHtml = document.querySelector('.footer');

fetch('../navbar/nav.html')
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

fetch('../footer/footer.html')
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