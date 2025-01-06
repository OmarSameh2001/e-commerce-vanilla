function addToCart(id, name, picture, price) {
    const cart = localStorage.getItem('cart')
    if (cart) {
        const cartItems = JSON.parse(cart)
        if (cartItems.some(item => item.id === id)) {
            alert('Item already in cart')
            return
        }
        cartItems.push({id, name, picture, price})
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }else {
        localStorage.setItem('cart', JSON.stringify([{id, name, picture, price}]))
    }
}
function removeFromCart(id) {
    const cart = localStorage.getItem('cart')
    if (cart) {
        const cartItems = JSON.parse(cart)
        const updatedCart = cartItems.filter(item => item.id !== id)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
}

function getCartItems() {
    const cart = localStorage.getItem('cart')
    const res = []
    if (cart) {
        for (const i of JSON.parse(cart)) {
            res.push(i)
        }
        return res
    }
    return []
}
function getCartItem(id) {
    const cart = localStorage.getItem('cart')
    if (cart) {
        for (const i of JSON.parse(cart)) {
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

export {addToCart, removeFromCart, getCartItems, getCartItem}