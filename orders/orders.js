// Get the current user from local storage
const currentUser = localStorage.getItem("currentUser").slice(1, -1) || sessionStorage.getItem("currentUser").slice(1, -1);

// Fetch the orders data from local storage
const orders = JSON.parse(localStorage.getItem(`${currentUser}-orders`));

// Render the orders data on the page
const ordersTable = document.getElementById("orders-table");
const userNameElement = document.getElementById("user-name");

userNameElement.textContent = currentUser;

if (orders) {
  orders.forEach((order) => {
    const orderDate = new Date(order.date);
    const currentDate = new Date();
    const deliveryDate = new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    let orderTotalPrice = 0;
    order.cart.forEach((item) => {
      orderTotalPrice += item.price * item.quantity; // Multiply price by quantity
    });

    const orderHTML = `
      <tr>
        <td>${orders.indexOf(order) + 1}</td>
        <td>${order.orderId}</td>
        <td>${orderDate.toLocaleDateString()}</td>
        <td>${order.cart.length}</td>
        <td>${orderTotalPrice} EGP</td>
        <td><button type="button" class="btn btn-outline-danger state-button ${currentDate > deliveryDate ? 'active' : ''}">${currentDate > deliveryDate ? 'Delivered' : 'Delivering'}</button></td>
      </tr>
    `;
    ordersTable.innerHTML += orderHTML;
  });
} else {
  ordersTable.innerHTML = `
    <tr>
      <td colspan="7">No orders found.</td>
    </tr>
  `;
}

// Get the data of the table
const tableData = [];
const rows = ordersTable.rows;
for (let i = 1; i < rows.length; i++) {
  const row = rows[i];
  const rowData = [];
  for (let j = 0; j < row.cells.length; j++) {
    rowData.push(row.cells[j].textContent);
  }
  tableData.push(rowData);
}

console.log(tableData);

// Get the names and values from the local storage of currentuser-orders
const ordersData = JSON.parse(localStorage.getItem(`${currentUser}-orders`));
const ordersKeys = Object.keys(ordersData[0]);
const ordersValues = ordersData.map((order) => Object.values(order));

console.log(ordersKeys);
console.log(ordersValues);

// Navbar and footer loading
const navbarHtml = document.querySelector(".navbar");
const footerHtml = document.querySelector(".footer");

fetch("../navbar/nav.html")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.text();
  })
  .then((html) => {
    navbarHtml.innerHTML = html;
  })
  .then(() => {
    const logoutElement = document.getElementById("logout");
    logoutElement.style.cursor = "pointer";
    if (currentUser) {
      logoutElement.innerHTML = "Logout";
      logoutElement.onclick = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
          localStorage.removeItem("currentUser");
          sessionStorage.removeItem("currentUser");
          window.location.href = "../user/user.html";
        }
      };
    } else {
      document.getElementById("dropdown").display = " none";
    }
  })
  .catch((error) => {
    console.error("Error loading navbar:", error);
  });

fetch("../footer/footer.html")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.text();
  })
  .then((html) => {
    footerHtml.innerHTML = html;
  })
  .catch((error) => {
    console.error("Error loading footer:", error);
  });