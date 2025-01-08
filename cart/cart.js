const currentUser =
  localStorage.getItem("currentUser").slice(1, -1) ||
  sessionStorage.getItem("currentUser").slice(1, -1);

const users = JSON.parse(localStorage.getItem("usersData"));
console.log(users);

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
      console.log(users);
      localStorage.setItem("usersData", JSON.stringify(users));
    }
  });
} catch (e) {}
function viewCart() {
  try {
    const userAddress = user.address;
    document.getElementById("shipping-address").value = `${userAddress}`;
    console.log(currentUser);
    let cartItems = getCartItems();
    document.querySelector(
      ".user-name"
    ).innerText = `${currentUser} \nSHOPPING CART`;
    let firstChild;
    let horizontalLine;
    let secondChild;
    let secondChildImg;
    let thirdChild;
    let thirdChildH6;
    let fourthChild;
    let fourthChildButtonMinus;
    let fourthChildInput;
    let fourthChildButtonPlus;
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
    let EighthChild;
    let EighthChildLabel;
    let EighthChildSelect;
    let EighthChildSelectOption;
    let NinthChild;
    let NinthChildLabel;
    let NinthChildSelect;
    let NinthChildSelectOption; //10items
    let Colors = [
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
    ];
    let Sizes = ["Small", "Medium", "Large", "XL", "XXL"];
    let LastChild;
    let SummaryChild;
    let FirstSummaryChildH5;
    let FirstSummaryChild2H5;
    let totalPrice = 0;

    const promoCodeh5 = document.querySelector(".promo-code");
    const parentDiv = document.querySelector(".parent-cart");
    parentDiv.firstElementChild.lastElementChild.textContent = `${cartItems.length} Items`;
    const parentSummary = document.querySelector(".parent-summary");
    for (let i = 0; i < cartItems.length; i++) {
      cartItems[i].size = cartItems[i].size || "Small";
      cartItems[i].quantity = cartItems[i].quantity || 1;
      cartItems[i].color = cartItems[i].color || "Red";
      localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
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

      fourthChild = document.createElement("div");
      fourthChild.classList.add("col-md-3", "col-lg-3", "col-xl-2", "d-flex");
      fourthChildButtonMinus = document.createElement("button");
      fourthChildButtonMinus.classList.add("btn", "btn-link", "px-2");
      // fourthChildButtonMinus.addEventListener("onclick", function () {});
      fourthChildButtonMinus.innerHTML = '<i class="fas fa-minus"></i>';
      fourthChildInput = document.createElement("input");
      fourthChildInput.id = "form1";
      fourthChildInput.min = "0";
      fourthChildInput.name = "quantity";
      fourthChildInput.value = `${cartItems[i].quantity}`;
      fourthChildInput.type = "number";
      fourthChildInput.onchange = function () {
        cartItems[i].quantity = this.value;
        document.querySelectorAll(".items-price")[i].textContent = `${
          cartItems[i].price
        } EGP x ${cartItems[i].quantity} = ${
          cartItems[i].price * cartItems[i].quantity
        } EGP`;
        totalPrice = 0;
        cartItems.forEach((item) => {
          totalPrice += item.price * item.quantity;
        });
        document.querySelector(".total-price").innerText = `${totalPrice} EGP`;
        localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
      };
      fourthChildInput.classList.add("form-control", "form-control-sm");
      fourthChildButtonPlus = document.createElement("button");
      fourthChildButtonPlus.classList.add("btn", "btn-link", "px-2");
      fourthChildButtonMinus.onclick = function (e) {
        this.parentNode.querySelector("input[type=number]").stepDown();
        cartItems[i].quantity =
          this.parentNode.querySelector("input[type=number]").value;
        document.querySelectorAll(".items-price")[i].textContent = `${
          cartItems[i].price
        } EGP x ${cartItems[i].quantity} = ${
          cartItems[i].price * cartItems[i].quantity
        } EGP`;
        totalPrice = 0;
        cartItems.forEach((item) => {
          totalPrice += item.price * item.quantity;
        });
        document.querySelector(".total-price").innerText = `${totalPrice} EGP`;
        localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
      };
      fourthChildButtonPlus.innerHTML = '<i class="fas fa-plus"></i>';
      fourthChildButtonPlus.onclick = function (e) {
        this.parentNode.querySelector("input[type=number]").stepUp();
        cartItems[i].quantity =
          this.parentNode.querySelector("input[type=number]").value;
        document.querySelectorAll(".items-price")[i].textContent = `${
          cartItems[i].price
        } EGP x ${cartItems[i].quantity} = ${
          cartItems[i].price * cartItems[i].quantity
        } EGP`;
        totalPrice = 0;
        cartItems.forEach((item) => {
          totalPrice += item.price * item.quantity;
        });
        document.querySelector(".total-price").innerText = `${totalPrice} EGP`;
        localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
      };
      fourthChild.appendChild(fourthChildButtonMinus);
      fourthChild.appendChild(fourthChildInput);
      fourthChild.appendChild(fourthChildButtonPlus);
      firstChild.appendChild(fourthChild);
      fifthChild = document.createElement("div");
      fifthChild.classList.add(
        "col-md-3",
        "col-lg-2",
        "col-xl-2",
        "offset-lg-1"
      );
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
        addToWishlist(
          cartItems[i].id,
          cartItems[i].name,
          cartItems[i].picture,
          cartItems[i].price
        );
      };
      SixthChildDivAnchor.innerHTML = '<i class="fa-regular fa-heart"></i>';
      SixthChildDivSpan = document.createElement("span");
      SixthChildDivSpan.classList.add("tooltip");
      SixthChildDivSpan.textContent = "Add to Wishlist";
      SixthChildDiv.appendChild(SixthChildDivAnchor);
      SixthChildDiv.appendChild(SixthChildDivSpan);
      sixthChild.appendChild(SixthChildDiv);
      firstChild.appendChild(sixthChild);
      SeventhChild = document.createElement("div");
      SeventhChild.classList.add(
        "col-md-1",
        "col-lg-1",
        "col-xl-1",
        "text-end"
      );
      SeventhChildDiv = document.createElement("div");
      SeventhChildDiv.classList.add("icon-box");
      SeventhChildDivAnchor = document.createElement("a");
      SeventhChildDivAnchor.href = "#";
      SeventhChildDivAnchor.classList.add("text-muted");
      SeventhChildDivAnchor.onclick = function (e) {
        e.preventDefault();
        removeFromCart(cartItems[i].id);
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
      EighthChild = document.createElement("div");
      EighthChild.classList.add("col-md-3", "col-lg-3", "col-xl-3", "mt-3");
      EighthChildLabel = document.createElement("label");
      EighthChildLabel.htmlFor = "colorSelect";
      EighthChildLabel.classList.add("form-label");
      EighthChildLabel.innerText = "Select Color";
      EighthChildSelect = document.createElement("select");
      EighthChildSelect.id = "colorSelect";
      EighthChildSelect.classList.add("form-select");
      EighthChildSelect.onchange = function () {
        cartItems[i].color = this.value;
        localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
      };
      for (let j = 0; j < 10; j++) {
        EighthChildSelectOption = document.createElement("option");
        EighthChildSelectOption.value = `${Colors[j]}`;
        EighthChildSelectOption.textContent = `${Colors[j]}`;
        EighthChildSelect.appendChild(EighthChildSelectOption);
      }
      EighthChildSelect.value = cartItems[i].color;
      EighthChild.appendChild(EighthChildLabel);
      EighthChild.appendChild(EighthChildSelect);
      EighthChild.appendChild(EighthChildSelect);
      firstChild.appendChild(EighthChild);

      NinthChild = document.createElement("div");
      NinthChild.classList.add("col-md-3", "col-lg-3", "col-xl-3", "mt-3");
      NinthChildLabel = document.createElement("label");
      NinthChildLabel.htmlFor = "colorSelect";
      NinthChildLabel.classList.add("form-label");
      NinthChildLabel.innerText = "Select Size";
      NinthChildSelect = document.createElement("select");
      NinthChildSelect.id = "colorSelect";
      NinthChildSelect.classList.add("form-select");
      NinthChildSelect.onchange = function () {
        cartItems[i].size = this.value;
        console.log(
          `item ${cartItems[i].name} has a ${cartItems[i].size} size`
        );
        localStorage.setItem(`${currentUser}cart`, JSON.stringify(cartItems));
      };
      for (let j = 0; j < Sizes.length; j++) {
        NinthChildSelectOption = document.createElement("option");
        NinthChildSelectOption.value = `${Sizes[j]}`;
        NinthChildSelectOption.textContent = `${Sizes[j]}`;
        NinthChildSelect.appendChild(NinthChildSelectOption);
      }
      NinthChildSelect.value = cartItems[i].size;
      NinthChild.appendChild(NinthChildLabel);
      NinthChild.appendChild(NinthChildSelect);
      NinthChild.appendChild(NinthChildSelect);
      firstChild.appendChild(NinthChild);

      LastChild = document.createElement("hr");
      LastChild.classList.add("my-4");
      SummaryChild = document.createElement("div");
      SummaryChild.classList.add("d-flex", "justify-content-between", "mb-4");
      FirstSummaryChildH5 = document.createElement("h5");
      FirstSummaryChildH5.textContent = `Item ${i + 1}: `;
      FirstSummaryChild2H5 = document.createElement("h5");
      FirstSummaryChild2H5.classList.add("items-price");
      FirstSummaryChild2H5.textContent = `${cartItems[i].price} EGP x ${
        cartItems[i].quantity
      } = ${cartItems[i].price * cartItems[i].quantity} EGP`;
      SummaryChild.appendChild(FirstSummaryChildH5);
      SummaryChild.appendChild(FirstSummaryChild2H5);
      parentSummary.insertBefore(SummaryChild, promoCodeh5);
      totalPrice += cartItems[i].price * cartItems[i].quantity;
    }
    document.querySelector(".total-price").innerText = `${totalPrice} EGP`;
    document.querySelector(".proceed-to-checkout").onclick = function () {
      console.log(cartItems, user.address);
    };
  } catch (error) {
    console.log(error);
  }
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
