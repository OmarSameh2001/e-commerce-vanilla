// Get the current user from local storage
const currentUser = localStorage.getItem("currentUser").slice(1, -1) || sessionStorage.getItem("currentUser").slice(1, -1);

// Fetch the orders data from local storage
const orders = JSON.parse(localStorage.getItem(`${currentUser}-orders`));

// Render the orders data on the page
const ordersTable = document.getElementById("orders-table");
const userNameElement = document.getElementById("user-name");

userNameElement.textContent = currentUser;

if (orders) {
  orders.forEach((order, index) => {
    const orderDate = new Date(order.date);
    const currentDate = new Date();
    const deliveryDate = new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    // Get the orders data
    const orders = JSON.parse(localStorage.getItem(`${currentUser}-orders`));

    // Create the orders table rows
    const orderHtml = `
<tr>
  <td class="align-content-center">${index + 1}</td> <!-- Modified line -->
  <td class="align-content-center">${order.orderId}</td>
  <td class="align-content-center">${order.date}</td>
  <td class="align-content-center">${order.cart.length}</td>
  <td class="align-content-center">${order.totalPrice} EGP</td>
  <td class="align-content-center">${order.address || 'TBD'}</td>
  <td class="align-content-center"><button type="button" class="btn btn-danger state-button ${currentDate > deliveryDate ? 'active' : ''}">${currentDate > deliveryDate ? 'Delivered' : 'Delivering'}</button></td>
  <td class="align-content-center">
    <button
      class="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#flush-collapse-${index}"
      aria-expanded="false"
      aria-controls="flush-collapse-${index}"
    >
      <i class="fas fa-angle-down"></i>
    </button>
  </td>
</tr>
`;
    document.getElementById('orders-table').innerHTML += orderHtml;

    const accordionHtml = `
  <tr>
    <td colspan="8">
      <div id="flush-collapse-${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading-${index}" data-bs-parent="#accordionFlushExample-${index}">
        <div class="accordion-body">
          <table class="table">
            <thead class="table-dark text-center">
              <tr>
                <th>Item Name</th>
                <th>Item Size</th>
                <th>Item Color</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${order.cart.map((item) => `
                <tr>
                  <td class="text-center">${item.name}</td>
                  <td class="text-center">${item.size}</td>
                  <td class="text-center">${item.color}</td>
                  <td class="text-center">${item.quantity}</td>
                  <td class="text-center">${item.price} EGP</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </td>
  </tr>
`;
    document.getElementById('orders-table').innerHTML += accordionHtml;
  });
} else {
  ordersTable.innerHTML = `
    <tr>
      <td colspan="8">No orders found.</td>
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


// Get the names and values from the local storage of currentuser-orders
const ordersData = JSON.parse(localStorage.getItem(`${currentUser}-orders`));
const ordersKeys = Object.keys(ordersData[0]);
const ordersValues = ordersData.map((order) => Object.values(order));

// Navbar and footer loading
const navbarHtml = document.querySelector(".navbar");
const footerHtml = document.querySelector(".footer");

fetch("../navbar/nav.html")
  .then((response) => response.text())
  .then((html) => (navbarHtml.innerHTML = html))
  .then(() => {
    const currentUser = localStorage.getItem("currentUser")
      ? localStorage.getItem("currentUser").slice(1, -1)
      : sessionStorage.getItem("currentUser").slice(1, -1);
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
  .catch((error) => console.error("Error loading navbar:", error));

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