Promise.all([
  fetch("../navbar/nav.html").then((response) => response.text()),
  fetch("../footer/footer.html").then((response) => response.text()),
])
  .then(([navbarHtmlText, footerHtmlText]) => {
    const navbarHtml = document.querySelector(".navbar");
    navbarHtml.innerHTML = navbarHtmlText;

    const footerHtml = document.querySelector(".footer");
    footerHtml.innerHTML = footerHtmlText;

    const currentUser = localStorage.getItem("currentUser")
      ? localStorage.getItem("currentUser").slice(1, -1)
      : sessionStorage.getItem("currentUser").slice(1, -1);

    const ordersTable = document.getElementById("orders-table");
    const userNameElement = document.getElementById("user-name");
    userNameElement.textContent = currentUser;

    const orders = JSON.parse(localStorage.getItem(`${currentUser}-orders`));

    if (orders && orders.length > 0) {
      orders.forEach((order, index) => {
        const orderDate = new Date(order.date);
        const currentDate = new Date();
        const deliveryDate = new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000);

        const orderHtml = `
          <tr>
            <td class="align-content-center">${index + 1}</td>
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
        ordersTable.innerHTML += orderHtml;

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
        ordersTable.innerHTML += accordionHtml;
      });
    } else {
      ordersTable.innerHTML = `
        <tr>
          <td colspan="8">No orders found.</td>
        </tr>
      `;
    }

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
      const userName = document.getElementById("userName");
      userName.addEventListener("click", function () {
        window.location.href = "../profilepage/profilepage.html";
      })
      userName.style.cursor = "pointer";
    
      const logoutmini = document.getElementById("logout-mini");
      logoutmini.addEventListener("click", function () {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
          localStorage.removeItem("currentUser");
          sessionStorage.removeItem("currentUser");
          window.location.href = "../user/user.html";
        }
      });
    } else {
      document.getElementById("dropdown").display = "none";
    }
  })
  .catch