setTimeout(() => {
    alert("Unfortunately your Payment Failed");
    localStorage.removeItem("payment");
    window.location.href = "../cart/cart.html";
}, 3000);