// Navbar and footer-----------
const navbarHtml = document.querySelector('.navbar');

// Use fetch to load the HTML file
fetch('../navbar/nav.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(html => {
        navbarHtml.innerHTML = html;
    })
    .then(() => {
        const currentUser =
          localStorage.getItem("currentUser").slice(1, -1) ||
          sessionStorage.getItem("currentUser").slice(1, -1) ;
        document.getElementById("userName").innerHTML = currentUser;
        const logoutElement = document.getElementById("logout");
        logoutElement.style.cursor = "pointer";
        if (currentUser) {
          logoutElement.innerHTML = "Logout";
          logoutElement.onclick = () => {
            const confirmLogout = window.confirm(
              "Are you sure you want to logout?"
            );
            console.log(confirmLogout);
            if (confirmLogout) {
              localStorage.removeItem("currentUser");
              sessionStorage.removeItem("currentUser");
            }
          };
        } else {
          document.getElementById("dropdown").display = "none";
        }
      })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

const footerHtml = document.querySelector('.footer');

// Use fetch to load the HTML file
fetch('../footer/footer.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
    .then(html => {
        footerHtml.innerHTML = html;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
// Navbar and footer---------------