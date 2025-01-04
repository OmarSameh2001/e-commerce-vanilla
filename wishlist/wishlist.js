// Function to add an item to the wishlist
function addToWishlist(id, name, picture, price) {
    const wishlist = localStorage.getItem('wishlist');
    let wishlistItems = wishlist ? JSON.parse(wishlist) : [];

    if (wishlistItems.some(item => item.id === id)) {
        alert('Item already in wishlist');
        return;
    }

    wishlistItems.push({ id, name, picture, price });
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    updateWishlistCount();
    loadWishlist();  // Update the displayed wishlist
    alert('Item added to wishlist');
}

// Function to remove an item from the wishlist
function removeFromWishlist(id) {
    const wishlist = localStorage.getItem('wishlist');
    if (wishlist) {
        const wishlistItems = JSON.parse(wishlist);
        const updatedWishlist = wishlistItems.filter(item => item.id !== id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        updateWishlistCount();
        loadWishlist();  // Update the displayed wishlist after removal
    }
}

// Function to get the wishlist items
function getCartWishlist() {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
}

// Function to update the wishlist item count
function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlist-count');
    const wishlistItems = getCartWishlist();
    wishlistCount.textContent = `${wishlistItems.length} items`;
}

// Function to load the wishlist items into the HTML
function loadWishlist() {
    const wishlistContainer = document.getElementById('wishlist-container');
    const wishlistItems = getCartWishlist();
    wishlistContainer.innerHTML = '';

    if (wishlistItems.length === 0) {
        wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }

    wishlistItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'row mb-4 d-flex justify-content-between align-items-center';

        itemElement.innerHTML = `
            <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="${item.picture}" class="img-fluid rounded-3" alt="${item.name}" />
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
                <h6 class="text-muted">${item.name}</h6>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2">
                <h6 class="mb-0">€ ${item.price}</h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#" class="text-muted" onclick="removeFromWishlist(${item.id})">
                    <i class="fa-solid fa-x"></i>
                </a>
            </div>
        `;

        wishlistContainer.appendChild(itemElement);
    });
}

// Initial loading of the wishlist on page load
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
    loadWishlist();
});

// Fetch navbar and footer dynamically
const navbarHtml = document.querySelector('.navbar');
fetch('../navbar/nav.html').then(response => response.text()).then(html => navbarHtml.innerHTML = html);

const footerHtml = document.querySelector('.footer');
fetch('../footer/footer.html').then(response => response.text()).then(html => footerHtml.innerHTML = html);

// Export functions for external use
export { addToWishlist, removeFromWishlist, getCartWishlist };
