import { addToCart, getCartItem, removeFromCart } from "../cart/cart.js";
import { getWishlistItem, addToWishlist, removeFromWishlist } from "../wishlist/wishlist.js";

function queryString() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

const id = queryString();
console.log(id);
const products = JSON.parse(localStorage.getItem("products"));
const product = products.find((product) => product.id === id);
console.log(product);

function updateCartButton(productId) {
    const cartBtn = document.querySelector('.cart_btn');
    if (getCartItem(productId)) {
        cartBtn.innerText = 'Remove from Cart';
        cartBtn.onclick = () => {
            removeFromCart(productId);
            updateCartButton(productId);
        };
    } else {
        cartBtn.innerText = 'Add to Cart';
        cartBtn.onclick = () => {
            addToCart(product.id, product.name, product.image, product.price);
            updateCartButton(productId);
        };
    }
}

function updateWishlistButton(productId) {
    const wishlistBtn = document.querySelector('.wishlist_btn');
    if (getWishlistItem(productId)) {
        wishlistBtn.innerText = 'Remove from Wishlist';
        wishlistBtn.onclick = () => {
            removeFromWishlist(productId);
            updateWishlistButton(productId); // Update button state after action
        };
    } else {
        wishlistBtn.innerText = 'Add to Wishlist';
        wishlistBtn.onclick = () => {
            addToWishlist(product.id, product.name, product.image, product.price);
            updateWishlistButton(productId); // Update button state after action
        };
    }
}

if (product) {
    document.querySelector('.productImage').src = product.image;
    document.querySelector('.title').innerText = product.name;
    document.querySelector('.description').innerText = product.description;
    document.querySelector('.price').innerText = `${product.price} EGP`;
    document.querySelector('.rating').innerText = product.rating;

    updateCartButton(product.id);
    updateWishlistButton(product.id);
}

// Navbar and footer-----------
const navbarHtml = document.querySelector('.navbar');

// Use fetch to load the HTML file
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
    .then(() => {
        const currentUser =
          localStorage.getItem("currentUser").slice(1, -1) ||
          sessionStorage.getItem("currentUser").slice(1, -1);
        document.getElementById("userName").innerHTML = currentUser;
        const logoutElement = document.getElementById("logout");
        logoutElement.style.cursor = "pointer";
        if (currentUser) {
          logoutElement.innerHTML = "Logout";
          logoutElement.onclick = () => {
            const confirmLogout = window.confirm(
              "Are you sure you want to logout?"
            );
            if (confirmLogout) {
              localStorage.removeItem("currentUser");
              sessionStorage.removeItem("currentUser");
              window.location.href = "../user/user.html";
            }
          };
        } else {
          document.getElementById("dropdown").display = "none";
        }
      })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

const footerHtml = document.querySelector('.footer');

// Use fetch to load the HTML file
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
// Navbar and footer---------------