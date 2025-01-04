if(sessionStorage.getItem("currentUser") === null && localStorage.getItem("currentUser") === null) {
    alert("Please login first");
    window.location.href = "../user/user.html";
}