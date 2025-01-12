const currentUser =
  localStorage.getItem("currentUser").slice(1, -1) ||
  sessionStorage.getItem("currentUser").slice(1, -1);
function addToCart(id, name, picture, price) {
  const cart = localStorage.getItem(`${currentUser}cart`);
  if (cart) {
    const cartItems = JSON.parse(cart);
    if (cartItems.some((item) => item.id === id)) {
      alert("Item already in cart");
      return;
    }
    cartItems.push({ id, name, picture, price });
    alert(`${name} has been added to cart successfully`);
    localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
  } else {
    localStorage.setItem(
      `${currentUser}cart`,
      JSON.stringify([{ id, name, picture, price }])
    );
  }
}
function addToWishlist(id, name, picture, price) {
  const wishlist = localStorage.getItem(`${currentUser}wishlist`);
  if (wishlist) {
    const wishlistItems = JSON.parse(wishlist);
    if (wishlistItems.some((item) => item.id === id)) {
      alert("Item already in wishlist");
      return;
    }
    wishlistItems.push({ id, name, picture, price });
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
function removeFromWishlist(id) {
  const wishlist = localStorage.getItem(`${currentUser}wishlist`);
  if (wishlist) {
    const wishlistItems = JSON.parse(wishlist);
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    localStorage.setItem(
      `${currentUser}wishlist`,
      JSON.stringify(updatedWishlist)
    );
  }
}

function getWishlistItems() {
  const wishlist = localStorage.getItem(`${currentUser}wishlist`);
  const res = [];
  if (wishlist) {
    for (const i of JSON.parse(wishlist)) {
      res.push(i);
    }
    return res;
  }
  return [];
}

function getWishlistItem(id) {
  const wishlist = localStorage.getItem(`${currentUser}wishlist`);
  if (wishlist) {
    for (const i of JSON.parse(wishlist)) {
      if (i.id === id) {
        return i;
      }
    }
  }
  return null;
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
// Navbar and footer---------------
function viewWishlist() {
  try {
    // Retrieve wishlist items
    const Items = getWishlistItems();

    // Check if the parentDiv is selected correctly
    const parentDiv = document.querySelector(".parent-cart");

    // Set the title of the wishlist
    document.querySelector(".user-name").innerText = `WISHLIST`;

    // Update Wishlist Summary
    parentDiv.firstElementChild.lastElementChild.textContent = `${Items.length} Items`;

    // Loop through the items and display them
    Items.forEach((item) => {
      const row = document.createElement("div");
      row.className =
        "row mb-4 d-flex justify-content-between align-items-center";
      row.innerHTML = `
        <hr class="my-4">
        <div class="col-md-2 col-lg-2 col-xl-2">
          <img src="${item.picture}" class="img-fluid rounded-3" alt="${item.name}">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3">
          <h6>${item.name}</h6>
        </div>
        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
          <h6 class="mb-0">${item.price} EGP</h6>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
          <div class="icon-box">
            <a href="#" class="text-muted"><i class="fas fa-cart-shopping"></i></a>
            <span class="tooltip">Add to Cart</span>
          </div>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
          <div class="icon-box">
            <a href="#" class="text-muted"><i class="fas fa-times"></i></a>
            <span class="tooltip">Remove from Wishlist</span>
          </div>
        </div>
        `;

      parentDiv.appendChild(row);

      // Remove from Wishlist Button
      row.querySelector(".fa-times").onclick = () => {
        removeFromWishlist(item.id);
        location.reload(); // Reload to refresh the list
      };

      // Add to Cart Button
      row.querySelector(".fa-cart-shopping").onclick = () => {
        addToCart(item.id, item.name, item.picture, item.price);
      };
    });
  } catch (error) {
    console.error(error);
  }
}
viewWishlist();
export { addToWishlist, removeFromWishlist, getWishlistItems, getWishlistItem };
