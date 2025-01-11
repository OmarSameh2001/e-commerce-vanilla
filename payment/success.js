const currentUser =
  localStorage.getItem("currentUser").slice(1, -1) ||
  sessionStorage.getItem("currentUser").slice(1, -1);

let cart = JSON.parse(localStorage.getItem(`${currentUser}cart`));
const orders = JSON.parse(localStorage.getItem(`${currentUser}-orders`));
const orderId = Date.now();
const payment = localStorage.getItem("payment");
const price = localStorage.getItem("price");
const address = localStorage.getItem("address");
if (cart && payment) {
  localStorage.removeItem(`${currentUser}cart`);
  localStorage.removeItem("price");
  localStorage.removeItem("payment");
  localStorage.removeItem("address");
  cart = cart.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    color: item.color,
    size: item.size,
    price: item.price,
  }));
  const orderObject = { orderId, cart, date: new Date().toLocaleDateString(), totalPrice: price, address: address, status: "Pending" };
  if (orders) {
    orders.push(orderObject);
    localStorage.setItem(`${currentUser}-orders`, JSON.stringify(orders));
  } else {
    localStorage.setItem(
      `${currentUser}-orders`,
      JSON.stringify([orderObject])
    );
  }
  setTimeout(() => {
    alert("Payment Successful");
    window.location.href = "../orders/orders.html";
  }, 1000);
} else {
  window.location.href = "../cart/cart.html";
}