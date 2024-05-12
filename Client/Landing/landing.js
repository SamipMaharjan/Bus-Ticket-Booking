console.log("landing .js");
const getCookie = (c_name) => {
    const cookie = document.cookie;
    //   console.log("cookie", cookie);
    const ls = cookie.split(";");
    const reqCookie = ls.find((c) => c.includes(c_name));
    if (reqCookie) {
        return reqCookie.split("=")[1];
    }
    return "";
};

document.addEventListener("DOMContentLoaded", () => {
    displayAuthBtnsOrProfile();
    getUpcommingTrip();
});

function displayAuthBtnsOrProfile() {
    const token = getCookie("token");
    const AuthBtns = document.querySelector("#AuthBtns");
    const profileInformation = document.querySelector("#profileInformation");

    console.log("token", token);

    if (token) {
        AuthBtns.style.display = "none";

        profileInformation.style.display = "flex-column";
        profileInformation.style.alignItems = "center";
    } else {
        console.log("display token", token);
        AuthBtns.style.display = "block";
        profileInformation.style.display = "none";
    }
}
// Your deleteAllCookies function definition
const deleteAllCookies = () => {
        var cookies = document.cookie.split(";");
        cookies.forEach(cookie => {
            var cookieName = cookie.split("=")[0].trim();
            document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        });
    }
    // Event listener for the logout button
document.getElementById("logoutButton").addEventListener("click", function() {
    // Call the deleteAllCookies function when the button is clicked
    deleteAllCookies();
    // Redirect to the login page or perform any other actions after logout
    window.location.href = "/Login/login.html";
});