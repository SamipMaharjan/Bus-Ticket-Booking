// Event listener for the logout button
document.getElementById("logoutButton").addEventListener("click", function() {
    // Call the deleteAllCookies function when the button is clicked
    deleteAllCookies();
    // Redirect to the login page or perform any other actions after logout
    window.location.href = "/Login/login.html";
});