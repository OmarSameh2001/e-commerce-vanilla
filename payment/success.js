const currentUser =
  localStorage.getItem("currentUser").slice(1, -1) ||
  sessionStorage.getItem("currentUser").slice(1, -1);

let cart = JSON.parse(localStorage.getItem(`${currentUser}cart`));
const orders = JSON.parse(localStorage.getItem(`${currentUser}-orders`));
const orderName = `${currentUser}-Order-${Date.now()}`;
const payment = JSON.parse(localStorage.getItem("payment"));
if (cart && payment) {
  localStorage.removeItem(`${currentUser}cart`);
  cart = cart.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    color: item.color,
    size: item.size,
    price: item.price,
  }));
  const orderObject = { orderName, cart };
  console.log(orderObject);
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
    localStorage.removeItem("payment");
    alert("Payment Successful");
    window.location.href = "../orders/orders.html";
  }, 1000);
} else {
  window.location.href = "../cart/cart.html";
}
