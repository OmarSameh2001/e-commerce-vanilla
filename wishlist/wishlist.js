function addToWishlist(id, name, picture, price) {
    const wishlist = localStorage.getItem('wishlist')
    if (wishlist) {
        const wishlistItems = JSON.parse(wishlist)
        if (wishlistItems.some(item => item.id === id)) {
            alert('Item already in wishlist')
            return
        }
        wishlistItems.push({id, name, picture, price})
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
    }else {
        localStorage.setItem('wishlist', JSON.stringify([{id, name, picture, price}]))
    }
}
function removeFromWishlist(id) {
    const wishlist = localStorage.getItem('wishlist')
    if (wishlist) {
        const wishlistItems = JSON.parse(wishlist)
        const updatedWishlist = wishlistItems.filter(item => item.id !== id)
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
    }
}

function getWishlistItems() {
    const wishlist = localStorage.getItem('wishlist')
    const res = []
    if (wishlist) {
        for (const i of JSON.parse(wishlist)) {
            res.push(i)
        }
        return res
    }
    return []
}

function getWishlistItem(id) {
    const wishlist = localStorage.getItem('wishlist')
    if (wishlist) {
        for (const i of JSON.parse(wishlist)) {
            if (i.id === id) {
                return i
            }
        }
    }
    return null
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
// Navbar and footer---------------

export {addToWishlist, removeFromWishlist, getWishlistItems, getWishlistItem}