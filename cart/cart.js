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
    window.location.reload()
    return
}
function removeFromCart(id) {
    const cart = localStorage.getItem('cart')
    if (cart) {
        const cartItems = JSON.parse(cart)
        const updatedCart = cartItems.filter(item => item.id !== id)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
    window.location.reload()
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
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
// Navbar and footer---------------

export {addToCart, removeFromCart, getCartItems}