const currentUser =
    localStorage.getItem("currentUser").slice(1, -1) ||
    sessionStorage.getItem("currentUser").slice(1, -1);

const cart = localStorage.getItem(`${currentUser}cart`);
const orders = localStorage.getItem(`${currentUser}orders`);

if (cart) {
  localStorage.removeItem(`${currentUser}cart`);
  if (orders) {
    localStorage.setItem(
      `${currentUser}orders`,
      JSON.stringify([...JSON.parse(orders), ...JSON.parse(cart)])
    );
  } else {
    localStorage.setItem(`${currentUser}-orders`, JSON.stringify([cart]));
  }
}
alert("Payment Successful");
window.location.href = "../orders/orders.html";