// const currentUser = localStorage.getItem("currentUser");
// const userNameElement = document.getElementById("userName");
// const logoutElement = document.getElementById("logout");
// const navIconsContainer = document.querySelector(".d-none.d-lg-flex");

// if (currentUser) {
//   const cleanedUserName = currentUser.slice(1, -1);
//   document.getElementById("userName").innerHTML = cleanedUserName;
//   logoutElement.innerHTML = "Logout";
//   logoutElement.onclick = () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (confirmLogout) {
//       localStorage.removeItem("currentUser");
//       window.location.reload();
//     }
//   };
//   navIconsContainer.classList.remove("d-none");
//   navIconsContainer.style.display = "flex";
// }