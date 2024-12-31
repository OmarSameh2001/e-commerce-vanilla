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
    window.location.reload()
    return
}
function removeFromWishlist(id) {
    const wishlist = localStorage.getItem('wishlist')
    if (wishlist) {
        const wishlistItems = JSON.parse(wishlist)
        const updatedWishlist = wishlistItems.filter(item => item.id !== id)
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
    }
    window.location.reload()
}

function getCartWishlist() {
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

export {addToWishlist, removeFromWishlist, getCartWishlist}