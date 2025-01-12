const currentUser =
  localStorage.getItem("currentUser").slice(1, -1) ||
  sessionStorage.getItem("currentUser").slice(1, -1);

const users = JSON.parse(localStorage.getItem("usersData"));

const user = users.find((user) => user.username === currentUser);

function addToWishlist(id, name, picture, price) {
  const wishlist = localStorage.getItem(`${currentUser}wishlist`);
  if (wishlist) {
    //if wishlist doesn't exist
    const wishlistItems = JSON.parse(wishlist); //convert from JSON string to an array of objects.
    //check if the item already exist in the wishlist or no.
    if (wishlistItems.some((item) => item.id === id)) {
      //.some returns true if any item in the array matches the condition (item.id === id).
      alert("Item already in wishlist");
      return;
    }
    //if it doesn't exist, add it to the end of the array using push method.
    wishlistItems.push({ id, name, picture, price }); //If the item is not already in the wishlist, a new item will be added to the array.
    alert(`Sucessfully added to wishlist`);
    localStorage.setItem(
      `${currentUser}wishlist`,
      JSON.stringify(wishlistItems) //convert it back to JSON string and add it to local storage under currentUserWishlist key.
    );
  } else {
    //if wishlist doesn't exist
    localStorage.setItem(
      `${currentUser}wishlist`,
      JSON.stringify([{ id, name, picture, price }])
    );
  }
}
//similar to addToWishlist logic.
function addToCart(id, name, picture, price) {
  const cart = localStorage.getItem(`${currentUser}cart`);
  if (cart) {
    //if cart already exist
    const cartItems = JSON.parse(cart);
    if (cartItems.some((item) => item.id === id)) {
      //if item already exist in cart
      alert("Item already in cart");
      return;
    }
    cartItems.push({ id, name, picture, price }); //if item doesn't exist in the cart add it to the end using push method.
    localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
  } else {
    //if cart doesn't exist.
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
    const updatedCart = cartItems.filter((item) => item.id !== id); //return all cartItems except for the selected Item.
    localStorage.setItem(`${currentUser}cart`, JSON.stringify(updatedCart)); //add updated cart in localStorage.
  }
}

function getCartItems() {
  const cart = localStorage.getItem(`${currentUser}cart`);
  const res = []; // Initialize an empty array to store the cart items
  if (cart) {
    for (const i of JSON.parse(cart)) {
      // Loop through each item in the parsed cart data
      res.push(i);
    }
    return res;
  }
  return []; // If no cart data was found, return an empty array
}
function getCartItem(id) {
  const cart = localStorage.getItem(`${currentUser}cart`);
  if (cart) {
    for (const i of JSON.parse(cart)) {
      if (i.id === id) {
        //Check if the current item's id matches the given id
        return i;
      }
    }
  }
  return null;
}

try {
  const addressButton = document.getElementById("save-address"); //get the save address button
  addressButton.addEventListener("click", () => {
    const address = document.getElementById("shipping-address").value; // Get the value of the 'shipping-address' input field
    if (address && user.address !== address) {
      //checks if address is not empty and if the new address is different from the current user address.
      user.address = address; //update address with new value.
      localStorage.setItem("usersData", JSON.stringify(users));
    }
  });
} catch (e) {}
function viewCart() {
  try {
    const userAddress = user.address;
    document.getElementById("shipping-address").value = userAddress || ""; // Get the user's saved address and display it in the shipping address input field
    const cartItems = getCartItems(); //get cart items from local storage.
    document.querySelector(".user-name").innerText = `SHOPPING CART`; // Update the page header to "SHOPPING CART".
    document.querySelector(".user-name").classList.add(`mt-5`, `mb-0`);
    // Select the parent containers for the cart and summary sections
    const parentDiv = document.querySelector(".parent-cart");
    const parentSummary = document.querySelector(".parent-summary");
    parentSummary.classList.add("mt-5");
    const promoCode = "trendify";
    let totalPrice = 0;
    let originalPrice = 0;

    // Function to update cart total price and apply discount if applicable
    const updateCart = () => {
      totalPrice = cartItems.reduce(
        //calculate totalPrice.
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      originalPrice = totalPrice; // Store the original total price before applying any discount.
      const discount =
        document.querySelector(".discount").value === promoCode ? 0.25 : 0; // If promoCode matches, apply a 25% discount (0.25), otherwise, no discount (0).
      totalPrice *= 1 - discount; //apply discount
      document.querySelector(".total-price").innerText = `${totalPrice} EGP`; // Update the displayed total price in the HTML
      document.querySelector(".total-price-label").innerText = discount //// Update the label for the total price in case its discounted or not.
        ? "Discounted price"
        : "Total price";
      document.querySelector(".proceed-to-checkout").disabled = // Disable the "Proceed to Checkout" button if the total price is 0
        totalPrice === 0;
    };

    // Add onchange event to promo code input to update cart price.
    const promoInput = document.querySelector(".discount");
    if (promoInput) {
      promoInput.onchange = updateCart;
    }
    // Loop through each cart item to generate the cart UI
    cartItems.forEach((item, i) => {
      // Set default values for optional item properties
      item.size = item.size || "Small";
      item.quantity = item.quantity || 1;
      item.color = item.color || "Red";

      // Create a new row for each item in the cart
      const row = document.createElement("div");
      row.className =
        "row mb-4 d-flex justify-content-between align-items-center";
      row.innerHTML = `
        <hr class="mb-4">
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img src="${item.picture}" class="img-fluid rounded-3" alt="${
        item.name
      }" onclick="window.location.href='../product-page/singleproduct.html?id=${
        item.id
      }'"style="cursor: pointer;">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
          <h6 onclick="window.location.href='../product-page/singleproduct.html?id=${
            item.id
          }'"style="cursor: pointer;">${item.name}</h6>
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
                    color === item.color ? "selected" : "" // Conditionally set the 'selected' attribute if the color matches the item's color
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

      // Create a summary row for each item and insert it before the promo code input
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

    updateCart(); // Initial call to updateCart to ensure correct total price

    document.querySelector(".total-price").innerText = `${totalPrice} EGP`; //set total price text.
    if (totalPrice == 0) {
      // Enable or disable the proceed to checkout button based on total price
      document.querySelector(".proceed-to-checkout").disabled = true;
    } else {
      document.querySelector(".proceed-to-checkout").disabled = false;
    }
    const cash = document.getElementById("cash");
    document.querySelector(".proceed-to-checkout").onclick = function () {
      if (!user.address) {
        alert("Please enter your address");
        return;
      }

      localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
      localStorage.setItem("price", totalPrice);
      localStorage.setItem("address", user.address);
      // Check if the cash payment option is selected
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
