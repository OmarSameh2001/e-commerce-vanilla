// Load navbar and footer dynamically
const navbarHtml = document.querySelector(".navbar");
const footerHtml = document.querySelector(".footer");
const aboutHtml = document.querySelector(".about");
const categoriesHtml = document.querySelector(".categories");

fetch("./navbar/nav.html")
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

fetch("./categories/categories.html")
  .then((response) => response.text())
  .then((html) => (categoriesHtml.innerHTML = html))
  .then(() => {
    // Handle category clicks
    document.querySelectorAll(".category").forEach((category) => {
      category.addEventListener("click", () => {
        const selectedCategory = category.getAttribute("data-category");
        window.location.href = `../products/products.html?category=${selectedCategory}`;
      });
    });
  })
  .catch((error) => console.error("Error loading categories:", error));

fetch("./about/about.html")
  .then((response) => response.text())
  .then((html) => (aboutHtml.innerHTML = html))
  .catch((error) => console.error("Error loading about:", error));

fetch("./footer/footer.html")
  .then((response) => response.text())
  .then((html) => (footerHtml.innerHTML = html))
  .catch((error) => console.error("Error loading footer:", error));

// Handle category clicks
document.querySelectorAll(".category").forEach((category) => {
  category.addEventListener("click", () => {
    const selectedCategory = category.getAttribute("data-category");
    window.location.href = `./products/products.html?category=${selectedCategory}`;
  });
});
