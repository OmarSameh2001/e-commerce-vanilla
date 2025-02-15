import { addToCart, getCartItems, removeFromCart } from "../cart/cart.js";
import {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} from "../wishlist/wishlist.js";

async function fetchProducts() {
  return await fetch(
    "https://gist.githubusercontent.com/OmarSameh2001/9d6452747e0181cdbafa965e511c4d09/raw/b90182914ff32d45424d5bc852ec786b545bdc9a/products.json"
  ).then((response) => response.json());
}

const products = fetchProducts();
const cartItems = getCartItems();
const wishlistItems = getWishlistItems();
products.then((data) => {
  const products = data;
  const urlParams = new URLSearchParams(window.location.search);
  const selectedCategory = urlParams.get("category");
  const categoriesParams =
    selectedCategory && selectedCategory.includes(",")
      ? selectedCategory.split(",")
      : [selectedCategory];
  // Update the title based on the selected category
  const productTitle = document.getElementById("product_title");
  const resetFilter = document.getElementById("reset_btn");
  if (selectedCategory) {
    productTitle.textContent = `${selectedCategory} Products`;
    resetFilter.style = "display: block";
  } else {
    productTitle.textContent = "All Products";
    resetFilter.style = "display: none";
  }

  // Filter products by category if a category is selected
  const filteredProducts = selectedCategory
    ? products.filter((product) => categoriesParams.includes(product.category))
    : products;

  displayProducts(filteredProducts);
  localStorage.setItem("products", JSON.stringify(products));
});

function getProduct(id) {
  const products = JSON.parse(localStorage.getItem("products"));
  const product = products.filter((product) => product.id === id);
  return product[0];
}

function displayProducts(products) {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    productDiv.innerHTML = `
            <div class="card d-flex flex-column align-items-center justify-content-center text-center p-3" style="width: 20rem; height: 400px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); transition: transform 0.3s ease, box-shadow 0.3s ease; overflow: hidden;">
                <div onclick="window.location.href='../product-page/singleproduct.html?id=${product.id}'"> 
                    <img src="${product.image}" class="text-truncate" style="width: 100%; height: 200px; object-fit: cover;" loading="lazy" alt="${product.name}">
                    <h4 style="font-size: 1.1rem; margin: 1rem 0; color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${product.name}</h4>
                    <p style="font-size: 0.9rem; color: #555; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Open the product to see more info about it</p>
                    <p style="font-size: 1rem; font-weight: bold; color: #000;">Price: ${product.price} EGP</p>
                </div>
                <div style="display: flex; gap: 15px;">
                    <button class="cart_btn btn btn-dark active" style="flex: 1; padding: 5px 10px; font-size: 0.8rem; min-width:75px;">Cart</button>
                    <button class="wishlist_btn btn btn-danger active" style="flex: 1; padding: 5px 10px; font-size: 0.8rem; min-width:75px;">Wishlist</button>
                </div>
            </div>
        `;

    const cartBtn = productDiv.querySelector(".cart_btn");
    const wishlistBtn = productDiv.querySelector(".wishlist_btn");

    if (cartItems.some((item) => item.id === product.id)) {
      cartBtn.textContent = "Remove";
      cartBtn.addEventListener("click", () => {
        removeFromCart(product.id);
        window.location.reload();
      });
    } else {
      cartBtn.textContent = "Cart";
      cartBtn.addEventListener("click", () => {
        addToCart(product.id, product.name, product.image, product.price);
        window.location.reload();
      });
    }

    if (wishlistItems.some((item) => item.id === product.id)) {
      wishlistBtn.textContent = "Remove";
      wishlistBtn.addEventListener("click", () => {
        removeFromWishlist(product.id);
        window.location.reload();
      });
    } else {
      wishlistBtn.addEventListener("click", () => {
        addToWishlist(product.id, product.name, product.image, product.price);
        window.location.reload();
      });
    }

    productDiv.querySelector(".card").addEventListener("mouseover", (e) => {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
    });

    productDiv.querySelector(".card").addEventListener("mouseout", (e) => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    });

    productsContainer.appendChild(productDiv);
  });
}

const categories = [
  "T-shirt",
  "Hoodie",
  "Pants",
  "Socks",
  "Shorts",
  "Cap",
  "Sweatshirt",
  "Tracksuit",
];

const categoriesContainer = document.querySelector(".collapse");
const categoriesCollapse = document.createElement("div");
categoriesCollapse.className = "d-flex gap-4";
categoriesContainer.appendChild(categoriesCollapse);
const urlParams = new URLSearchParams(window.location.search);
const selectedCategory = urlParams.get("category");
categories.forEach((category, index) => {
  const categoryDiv = document.createElement("div");
  categoryDiv.className = "category";
  categoryDiv.innerHTML =
    selectedCategory && selectedCategory.includes(category)
      ? `<div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="category-${index}" checked>
                                <label class="form-check-label" for="category-${index}">
                                    ${category}
                                </label>
                             </div>`
      : `<div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="category-${index}">
                                <label class="form-check-label" for="category-${index}">
                                    ${category}
                                </label>
                             </div>`;
  categoriesCollapse.appendChild(categoryDiv);
});
const btnContainer = document.createElement("div");
btnContainer.className =
  "d-flex justify-content-center align-items-center p-1 m-2";
const categoriesBtn = document.createElement("button");
categoriesBtn.className = "btn btn-dark align-self-center";
categoriesBtn.textContent = "Apply Filter";
categoriesContainer.appendChild(btnContainer);
btnContainer.appendChild(categoriesBtn);

categoriesBtn.addEventListener("click", () => {
  const selectedCategories = [];
  categories.forEach((category, index) => {
    const checkbox = document.getElementById(`category-${index}`);
    if (checkbox.checked) {
      selectedCategories.push(category);
    }
  });
  if (selectedCategories.length === 0) {
    window.location.href = window.location.origin + window.location.pathname;
  } else {
    const currentUrl = window.location.origin + window.location.pathname;
    const newUrl = `${currentUrl}?category=${selectedCategories.join(",")}`;
    window.location.href = newUrl;
  }
});

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

    const userName = document.getElementById("userName");
    userName.addEventListener("click", function () {
      window.location.href = "../profilepage/profilepage.html";
    });
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
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
// Navbar and footer---------------

export { getProduct };
