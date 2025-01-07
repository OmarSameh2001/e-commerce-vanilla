function addToCart(id, name, picture, price) {
  const cart = localStorage.getItem("cart");
  if (cart) {
    const cartItems = JSON.parse(cart);
    if (cartItems.some((item) => item.id === id)) {
      alert("Item already in cart");
      return;
    }
    cartItems.push({ id, name, picture, price });
    alert(`${name} has been added to cart successfully`);
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } else {
    localStorage.setItem(
      "cart",
      JSON.stringify([{ id, name, picture, price }])
    );
  }
}
function addToWishlist(id, name, picture, price) {
  const wishlist = localStorage.getItem("wishlist");
  if (wishlist) {
    const wishlistItems = JSON.parse(wishlist);
    if (wishlistItems.some((item) => item.id === id)) {
      alert("Item already in wishlist");
      return;
    }
    wishlistItems.push({ id, name, picture, price });
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  } else {
    localStorage.setItem(
      "wishlist",
      JSON.stringify([{ id, name, picture, price }])
    );
  }
  const wishlist = localStorage.getItem("wishlist");
  if (wishlist) {
    const wishlistItems = JSON.parse(wishlist);
    if (wishlistItems.some((item) => item.id === id)) {
      alert("Item already in wishlist");
      return;
    }
    wishlistItems.push({ id, name, picture, price });
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  } else {
    localStorage.setItem(
      "wishlist",
      JSON.stringify([{ id, name, picture, price }])
    );
  }
}
function removeFromWishlist(id) {
  const wishlist = localStorage.getItem("wishlist");
  if (wishlist) {
    const wishlistItems = JSON.parse(wishlist);
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  }
  const wishlist = localStorage.getItem("wishlist");
  if (wishlist) {
    const wishlistItems = JSON.parse(wishlist);
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  }
}

function getWishlistItems() {
  const wishlist = localStorage.getItem("wishlist");
  const res = [];
  if (wishlist) {
    for (const i of JSON.parse(wishlist)) {
      res.push(i);
  const wishlist = localStorage.getItem("wishlist");
  const res = [];
  if (wishlist) {
    for (const i of JSON.parse(wishlist)) {
      res.push(i);
    }
    return res;
  }
  return [];
    return res;
  }
  return [];
}

function getWishlistItem(id) {
  const wishlist = localStorage.getItem("wishlist");
  if (wishlist) {
    for (const i of JSON.parse(wishlist)) {
      if (i.id === id) {
        return i;
      }
    }
  }
  return null;
  const wishlist = localStorage.getItem("wishlist");
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
    const currentUser =
      localStorage.getItem("currentUser").slice(1, -1) ||
      sessionStorage.getItem("currentUser").slice(1, -1);
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
    const currentUser =
      localStorage.getItem("currentUser").slice(1, -1) ||
      sessionStorage.getItem("currentUser").slice(1, -1);
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
  let cartItems = getWishlistItems();

  let firstChild;
  let horizontalLine;
  let secondChild;
  let secondChildImg;
  let thirdChild;
  let thirdChildH6;
  let fifthChild;
  let fifthChildH6;
  let sixthChild;
  let SixthChildDiv;
  let SixthChildDivAnchor;
  let SixthChildDivSpan;
  let SeventhChild;
  let SeventhChildDiv;
  let SeventhChildDivAnchor;
  let SeventhChildDivSpan;
  let LastChild;

  const parentDiv = document.querySelector(".parent-cart");
  parentDiv.firstElementChild.lastElementChild.textContent = `${cartItems.length} Items`;
  for (let i = 0; i < cartItems.length; i++) {
    cartItems[i].quantity = 1;
    cartItems[i].color = "";
    console.log(cartItems);
    firstChild = document.createElement("div");
    firstChild.classList.add(
      "row",
      "mb-4",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    horizontalLine = document.createElement("hr");
    horizontalLine.classList.add("my-4");
    parentDiv.appendChild(horizontalLine);
    parentDiv.appendChild(firstChild);
    secondChild = document.createElement("div");
    secondChild.classList.add("col-md-2", "col-lg-2", "col-xl-2");
    secondChildImg = document.createElement("img");
    secondChildImg.src = `${cartItems[i].picture}`;
    secondChildImg.classList.add("img-fluid", "rounded-3");
    secondChildImg.alt = `${cartItems[i].name}`;
    secondChild.appendChild(secondChildImg);
    firstChild.appendChild(secondChild);
    thirdChild = document.createElement("div");
    thirdChild.classList.add("col-md-3", "col-lg-3", "col-xl-3");
    thirdChildH6 = document.createElement("h6");
    thirdChildH6.textContent = `${cartItems[i].name}`;
    thirdChild.appendChild(thirdChildH6);
    firstChild.appendChild(thirdChild);

    fifthChild = document.createElement("div");
    fifthChild.classList.add("col-md-3", "col-lg-2", "col-xl-2", "offset-lg-1");
    fifthChildH6 = document.createElement("h6");
    fifthChildH6.classList.add("mb-0");
    fifthChildH6.innerText = `${cartItems[i].price} EGP`;
    fifthChild.appendChild(fifthChildH6);
    firstChild.appendChild(fifthChild);
    sixthChild = document.createElement("div");
    sixthChild.classList.add("col-md-1", "col-lg-1", "col-xl-1", "text-end");
    SixthChildDiv = document.createElement("div");
    SixthChildDiv.classList.add("icon-box");
    SixthChildDivAnchor = document.createElement("a");
    SixthChildDivAnchor.href = "#!";
    SixthChildDivAnchor.classList.add("text-muted");
    SixthChildDivAnchor.onclick = function (e) {
      e.preventDefault();
      addToCart(
        cartItems[i].id,
        cartItems[i].name,
        cartItems[i].picture,
        cartItems[i].price
      );
    };
    SixthChildDivAnchor.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>';
    SixthChildDivSpan = document.createElement("span");
    SixthChildDivSpan.classList.add("tooltip");
    SixthChildDivSpan.textContent = "Add to Cart";
    SixthChildDiv.appendChild(SixthChildDivAnchor);
    SixthChildDiv.appendChild(SixthChildDivSpan);
    sixthChild.appendChild(SixthChildDiv);
    firstChild.appendChild(sixthChild);
    SeventhChild = document.createElement("div");
    SeventhChild.classList.add("col-md-1", "col-lg-1", "col-xl-1", "text-end");
    SeventhChildDiv = document.createElement("div");
    SeventhChildDiv.classList.add("icon-box");
    SeventhChildDivAnchor = document.createElement("a");
    SeventhChildDivAnchor.href = "#";
    SeventhChildDivAnchor.classList.add("text-muted");
    SeventhChildDivAnchor.onclick = function (e) {
      e.preventDefault();
      console.log(cartItems[i].id);
      removeFromWishlist(cartItems[i].id);
      location.reload();
    };
    SeventhChildDivAnchor.innerHTML = '<i class="fas fa-times"></i>';
    SeventhChildDivSpan = document.createElement("span");
    SeventhChildDivSpan.classList.add("tooltip");
    SeventhChildDivSpan.textContent = "Remove from Cart";
    SeventhChildDiv.appendChild(SeventhChildDivAnchor);
    SeventhChildDiv.appendChild(SeventhChildDivSpan);
    SeventhChild.appendChild(SeventhChildDiv);
    firstChild.appendChild(SeventhChild);

    LastChild = document.createElement("hr");
    LastChild.classList.add("my-4");
  }
}
viewWishlist();
export { addToWishlist, removeFromWishlist, getWishlistItems, getWishlistItem };
