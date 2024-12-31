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

export {addToCart, removeFromCart, getCartItems}