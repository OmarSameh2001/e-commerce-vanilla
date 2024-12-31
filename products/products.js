import {addToCart, getCartItems, removeFromCart} from "../cart/cart.js";
import {addToWishlist, getCartWishlist, removeFromWishlist} from "../wishlist/wishlist.js";


async function fetchProducts() {
    return await fetch('https://gist.githubusercontent.com/OmarSameh2001/9d6452747e0181cdbafa965e511c4d09/raw/41dd38902358e58ba96c0f14e815f674c9405de9/products.json')
        .then(response => response.json())
}

const products = fetchProducts();
const cartItems = getCartItems();
const wishlistItems = getCartWishlist();
products.then(data => {
    const products = data;
    displayProducts(products);
    localStorage.setItem('products', JSON.stringify(products));
})

function displayProducts(products) {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <div class="card d-flex flex-column align-items-center justify-content-center text-center m-1 p-1" style="width: 30vw;">
                <img src="${product.image}" height="200" width="200" alt="${product.name}">
                <h4 style="text-decoration: underline;">${product.name}</h4>
                <p>${product.description}</p>
                <p class="mt-0">Rating: ${product.rating} <i class="fa-solid fa-star" style="color: gold;"></i></p>
                <p>Price: ${product.price} EGP</p>
                <div>
                    <button class="cart_btn btn btn-primary"></button>
                    <button class="wishlist_btn btn btn-success"></button>
                </div>
            </div>
        `;
        if (cartItems.some(item => item.id === product.id)) {
            productDiv.querySelector('.cart_btn').innerText = 'Remove from Cart';
            productDiv.querySelector('.cart_btn').addEventListener('click', () => removeFromCart(product.id));
        }else {
            productDiv.querySelector('.cart_btn').innerText = 'Add to Cart';
            productDiv.querySelector('.cart_btn').addEventListener('click', () => addToCart(product.id, product.name, product.image, product.price));    
        }
        if (wishlistItems.some(item => item.id === product.id)) {
            productDiv.querySelector('.wishlist_btn').innerText = 'Remove from Wishlist';
            productDiv.querySelector('.wishlist_btn').addEventListener('click', () => removeFromWishlist(product.id));
        }else {
            productDiv.querySelector('.wishlist_btn').innerText = 'Add to Wishlist';
            productDiv.querySelector('.wishlist_btn').addEventListener('click', () => addToWishlist(product.id, product.name, product.image, product.price));
        }
        productsContainer.appendChild(productDiv);
    });
}