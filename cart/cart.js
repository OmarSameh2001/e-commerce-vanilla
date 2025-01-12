const currentUser =
  localStorage.getItem("currentUser").slice(1, -1) ||
  sessionStorage.getItem("currentUser").slice(1, -1);

const users = JSON.parse(localStorage.getItem("usersData"));

const user = users.find((user) => user.username === currentUser);

function addToWishlist(id, name, picture, price) {
  const wishlist = localStorage.getItem(`${currentUser}wishlist`);
  if (wishlist) {
    const wishlistItems = JSON.parse(wishlist);
    if (wishlistItems.some((item) => item.id === id)) {
      alert("Item already in wishlist");
      return;
    }
    wishlistItems.push({ id, name, picture, price });
    alert(`Sucessfully added to wishlist`);
    localStorage.setItem(
      `${currentUser}wishlist`,
      JSON.stringify(wishlistItems)
    );
  } else {
    localStorage.setItem(
      `${currentUser}wishlist`,
      JSON.stringify([{ id, name, picture, price }])
    );
  }
}
function addToCart(id, name, picture, price) {
  const cart = localStorage.getItem(`${currentUser}cart`);
  if (cart) {
    const cartItems = JSON.parse(cart);
    if (cartItems.some((item) => item.id === id)) {
      alert("Item already in cart");
      return;
    }
    cartItems.push({ id, name, picture, price });
    localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
  } else {
    localStorage.setItem(
      `${currentUser}cart`,
      JSON.stringify([{ id, name, picture, price }])
    );
  }
}
function removeFromCart(id) {
  const cart = localStorage.getItem(`${currentUser}cart`);
  if (cart) {
    const cartItems = JSON.parse(cart);
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem(`${currentUser}cart`, JSON.stringify(updatedCart));
  }
}

function getCartItems() {
  const cart = localStorage.getItem(`${currentUser}cart`);
  const res = [];
  if (cart) {
    for (const i of JSON.parse(cart)) {
      res.push(i);
    }
    return res;
  }
  return [];
}
function getCartItem(id) {
  const cart = localStorage.getItem(`${currentUser}cart`);
  if (cart) {
    for (const i of JSON.parse(cart)) {
      if (i.id === id) {
        return i;
      }
    }
  }
  return null;
}

try {
  const addressButton = document.getElementById("save-address");
  addressButton.addEventListener("click", () => {
    const address = document.getElementById("shipping-address").value;
    if (address && user.address !== address) {
      user.address = address;
      localStorage.setItem("usersData", JSON.stringify(users));
    }
  });
} catch (e) {}
function viewCart() {
  try {
    const userAddress = user.address;
    document.getElementById("shipping-address").value = userAddress;
    const cartItems = getCartItems();
    document.querySelector(".user-name").innerText = `SHOPPING CART`;
    document.querySelector(".user-name").classList.add(`mt-5`, `mb-0`);
    const parentDiv = document.querySelector(".parent-cart");
    const parentSummary = document.querySelector(".parent-summary");
    parentSummary.classList.add("mt-5");
    const promoCode = "trendify";
    let totalPrice = 0;
    let originalPrice = 0;

    const updateCart = () => {
      totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      originalPrice = totalPrice;
      const discount =
        document.querySelector(".discount").value === promoCode ? 0.25 : 0;
      totalPrice *= 1 - discount;
      document.querySelector(".total-price").innerText = `${totalPrice} EGP`;
      document.querySelector(".total-price-label").innerText = discount
        ? "Discounted price"
        : "Total price";
      document.querySelector(".proceed-to-checkout").disabled =
        totalPrice === 0;
    };

    // Add onchange event to promo code input
    const promoInput = document.querySelector(".discount");
    if (promoInput) {
      promoInput.onchange = updateCart;
    }

    cartItems.forEach((item, i) => {
      item.size = item.size || "Small";
      item.quantity = item.quantity || 1;
      item.color = item.color || "Red";

      const row = document.createElement("div");
      row.className =
        "row mb-4 d-flex justify-content-between align-items-center";
      row.innerHTML = `
        <hr class="mb-4">
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img src="${item.picture}" class="img-fluid rounded-3" alt="${
        item.name
      }">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
          <h6>${item.name}</h6>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
          <button class="btn btn-link px-2"><i class="fas fa-minus"></i></button>
          <input type="number" id="form1" name="quantity" min="0" class="form-control form-control-sm" value="${
            item.quantity
          }">
          <button class="btn btn-link px-2"><i class="fas fa-plus"></i></button>
        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h6 class="mb-0">${item.price} EGP</h6>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
          <div class="icon-box">
            <a href="#" class="text-muted addToWishlist"><i class="fa-regular fa-heart"></i></a>
            <span class="tooltip">Add to Wishlist</span>
          </div>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
          <div class="icon-box">
            <a href="#" class="text-muted removeFromCart"><i class="fas fa-times "></i></a>
            <span class="tooltip">Remove from Cart</span>
          </div>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3 mt-3">
          <label class="form-label">Select Color</label>
          <select id="colorSelect" class="form-select">
            ${[
              "Red",
              "Blue",
              "Green",
              "Yellow",
              "Orange",
              "Purple",
              "Pink",
              "Brown",
              "Gray",
              "black",
            ]
              .map(
                (color) =>
                  `<option value="${color}" ${
                    color === item.color ? "selected" : ""
                  }>${color}</option>`
              )
              .join("")}
          </select>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3 mt-3">
          <label class="form-label">Select Size</label>
          <select id="sizeSelect" class="form-select">
            ${["Small", "Medium", "Large", "XL", "XXL", "XXXL"]
              .map(
                (size) =>
                  `<option value="${size}" ${
                    size === item.size ? "selected" : ""
                  }>${size}</option>`
              )
              .join("")}
          </select>
        </div>`;

      parentDiv.appendChild(row);
      const quantityInput = row.querySelector("input[type=number]");
      const minusButton = row.querySelector("button:nth-child(1)");
      const plusButton = row.querySelector("button:nth-child(3)");
      const colorSelect = row.querySelector("#colorSelect");
      const sizeSelect = row.querySelector("#sizeSelect");
      const deleteFromCart = row.querySelector(".removeFromCart");
      const insertToWishlist = row.querySelector(".addToWishlist");
      console.log(insertToWishlist);
      const updateItem = () => {
        if (quantityInput.value >= 1) {
          item.quantity = +quantityInput.value;
          document.querySelectorAll(".items-price")[i].textContent = `${
            item.price
          } EGP x ${item.quantity} = ${item.price * item.quantity} EGP`;
          updateCart();
          localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
        }
      };

      minusButton.onclick = () => {
        if (quantityInput.value > 1) {
          quantityInput.stepDown();
          updateItem();
        }
      };
      plusButton.onclick = () => {
        quantityInput.stepUp();
        updateItem();
      };
      quantityInput.onchange = updateItem;
      colorSelect.onchange = () => {
        item.color = colorSelect.value;
        localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
      };
      sizeSelect.onchange = () => {
        item.size = sizeSelect.value;
        localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
      };
      deleteFromCart.onclick = (e) => {
        e.preventDefault();
        removeFromCart(item.id);
        location.reload();
      };
      insertToWishlist.onclick = (e) => {
        e.preventDefault();
        addToWishlist(item.id, item.name, item.picture, item.price);
      };

      const summaryChild = document.createElement("div");
      summaryChild.className = "d-flex justify-content-between mb-4";
      summaryChild.innerHTML = `<h5>Item ${
        i + 1
      }: </h5><h5 class="items-price">${item.price} EGP x ${item.quantity} = ${
        item.price * item.quantity
      } EGP</h5>`;
      parentSummary.insertBefore(
        summaryChild,
        document.querySelector(".promo-code")
      );
    });

    updateCart();

    document.querySelector(".total-price").innerText = `${totalPrice} EGP`;
    if (totalPrice == 0) {
      document.querySelector(".proceed-to-checkout").disabled = true;
    } else {
      document.querySelector(".proceed-to-checkout").disabled = false;
    }
    const cash = document.getElementById("cash");
    document.querySelector(".proceed-to-checkout").onclick = async function () {
      if (user.address == null) {
        alert("Please enter your address");
        return;
      }

      localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
      localStorage.setItem("price", totalPrice);
      localStorage.setItem("address", user.address);

      if (!cash.checked) {
        createStripeCheckout();
      } else {
        localStorage.setItem(`payment`, true);
        window.location.href = "../payment/success.html";
      }
    };
  } catch (error) {
    console.error(error);
  }
}

async function createStripeCheckout() {
  localStorage.setItem(`payment`, true);
  const stripe = Stripe(
    "pk_test_51Qf2mnIwjKw1YrKEsCYF20iCcPID6WHM1ordjrcR7C63qXEUehDRcGR4eL86aC8J73gfM0CZXTFrbgrmPsv47qde00rZe3WHFU",
    {
      apiVersion: "2024-12-18.acacia",
    }
  );
  const baseUrl = window.location.origin;
  stripe.redirectToCheckout({
    mode: "payment",
    successUrl: baseUrl + "/payment/success.html",
    cancelUrl: baseUrl + "/payment/reject.html",
    lineItems: [{ price: "price_1QfkWeIwjKw1YrKEiJKWk3SN", quantity: 1 }],
  });
}

// Navbar and footer-----------
const navbarHtml = document.querySelector(".navbar");
// Use fetch to load the HTML file
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
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });

const footerHtml = document.querySelector(".footer");

// Use fetch to load the HTML file
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
    console.error("There was a problem with the fetch operation:", error);
  });
// Navbar and footer---------------

viewCart();
export { addToCart, removeFromCart, getCartItems, getCartItem };
