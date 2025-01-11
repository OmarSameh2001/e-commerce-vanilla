// const currentUser = localStorage.getItem("currentUser")
//     ? localStorage.getItem("currentUser").slice(1, -1)
//     : sessionStorage.getItem("currentUser").slice(1, -1);
// document.getElementById("userName").innerHTML = currentUser;
// const logoutSmallElement = document.getElementById("logoutSmall");
// logoutSmallElement.style.cursor = "pointer";
// if (currentUser) {
//     logoutSmallElement.innerHTML = "Logout";
//     logoutSmallElement.onclick = () => {
//         const confirmLogoutSmall = window.confirm(
//             "Are you sure you want to logout?"
//         );
//         if (confirmLogoutSmall) {
//             localStorage.removeItem("currentUser");
//             sessionStorage.removeItem("currentUser");
//             window.location.href = "../user/user.html";
//         }
//     };
// } else {
//     document.getElementById("dropdown").display = "none";
// }