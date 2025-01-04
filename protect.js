if(sessionStorage.getItem("currentUser") === null){
    alert("Please login first");
    window.location.href = "../user/user.html";
}