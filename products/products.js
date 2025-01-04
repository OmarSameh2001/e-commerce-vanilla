import { addToCart, getCartItems, removeFromCart } from "../cart/cart.js";
import { addToWishlist, getCartWishlist, removeFromWishlist } from "../wishlist/wishlist.js";

async function fetchProducts() {
    return await fetch('https://gist.githubusercontent.com/OmarSameh2001/9d6452747e0181cdbafa965e511c4d09/raw/41dd38902358e58ba96c0f14e815f674c9405de9/products.json')
        .then(response => response.json());
}

let cartItems = getCartItems();
let wishlistItems = getCartWishlist();

async function loadProducts() {
    const products = await fetchProducts();
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');

    const productTitle = document.getElementById('product_title');
    productTitle.textContent = selectedCategory ? `${selectedCategory} Products` : 'All Products';

    const filteredProducts = selectedCategory ? products.filter(product => product.category === selectedCategory) : products;
    displayProducts(filteredProducts);
    localStorage.setItem('products', JSON.stringify(products));
}

function displayProducts(products) {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <div class="card" style="width: 15rem;">
                <img src="${product.image}" alt="${product.name}" class="card-img-top" style="height:200px">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-ellipsis">${product.name}</h5>
                    <p class="card-text">Price: ${product.price} EGP</p>
                    <button class="btn btn-outline-dark cart-btn mb-2">Cart</button>
                    <button class="btn btn-outline-danger wishlist-btn">Wishlist</button>
                </div>
            </div>
        `;

        // Cart Button Logic
        const cartBtn = productDiv.querySelector('.cart-btn');
        const updateCartButton = () => {
            cartBtn.textContent = cartItems.some(item => item.id === product.id) ? 'Remove' : 'Cart';
        };

        updateCartButton(); // Initial button text based on cart state
        cartBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default behavior to avoid page reload

            if (cartItems.some(item => item.id === product.id)) {
                removeFromCart(product.id);
            } else {
                addToCart(product.id, product.name, product.image, product.price);
            }
            cartItems = getCartItems(); // Update cartItems state
            updateCartButton(); // Update button text after modification
        });

        // Wishlist Button Logic
        const wishlistBtn = productDiv.querySelector('.wishlist-btn');
        const updateWishlistButton = () => {
            wishlistBtn.textContent = wishlistItems.some(item => item.id === product.id) ? 'Remove' : 'Wishlist';
        };

        updateWishlistButton(); // Initial button text based on wishlist state
        wishlistBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default behavior to avoid page reload

            if (wishlistItems.some(item => item.id === product.id)) {
                removeFromWishlist(product.id);
            } else {
                addToWishlist(product.id, product.name, product.image, product.price);
            }
            wishlistItems = getCartWishlist(); // Update wishlistItems state
            updateWishlistButton(); // Update button text after modification
        });

        productsContainer.appendChild(productDiv);
    });
}

const navbarHtml = document.querySelector('.navbar');
fetch('../navbar/nav.html').then(response => response.text()).then(html => navbarHtml.innerHTML = html);
const footerHtml = document.querySelector('.footer');
fetch('../footer/footer.html').then(response => response.text()).then(html => footerHtml.innerHTML = html);

// Load products on page load
loadProducts();
