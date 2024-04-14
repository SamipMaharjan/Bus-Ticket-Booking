document.addEventListener("DOMContentLoaded", function() {
    const forMyselfBtn = document.getElementById("forMyselfBtn");
    const forCompanyBtn = document.getElementById("forCompanyBtn");
    const createBusYatriAccountForm = document.getElementById("createBusYatriAccountForm");
    const signupForm = document.getElementById("signupForm");
    const forMyselfForm = document.getElementById("forMyselfForm");
    const loginForm = document.getElementById("loginForm");
    const alreadyHaveAccountBtn = document.getElementById("alreadyHaveAccountBtn");
    const alreadyHaveAccount1Btn = document.getElementById("alreadyHaveAccount1Btn");
    const CreateAccount = document.getElementById("CreateAccount");
    const Signupbtn = document.getElementById("Signupbtn");
    const Signupbtnn = document.getElementById("Signupbtnn");

    forCompanyBtn.addEventListener("click", function() {
        // Hide the create BusYatri account form
        createBusYatriAccountForm.style.display = "none";
        // Show the company account form
        signupForm.style.display = "block";
        // Hide the personal account form
        forMyselfForm.style.display = "none";
    });

    forMyselfBtn.addEventListener("click", function() {
        // Hide the create BusYatri account form
        createBusYatriAccountForm.style.display = "none";
        // Show the personal account form
        forMyselfForm.style.display = "block";
        // Hide the company account form
        signupForm.style.display = "none";
    });

    alreadyHaveAccountBtn.addEventListener("click", function() {
        // Hide the signup form
        signupForm.style.display = "none";
        // Show the login form
        loginForm.style.display = "block";
    });
    alreadyHaveAccount1Btn.addEventListener("click", function() {
        // Hide the personal/user form
        forMyselfForm.style.display = "none";
        // Show the login form
        loginForm.style.display = "block";
    });
    CreateAccount.addEventListener("click", function() {
        // Hide the personal/user form
        loginForm.style.display = "none";
        // Show the login form
        createBusYatriAccountForm.style.display = "block";
    });
    Signupbtn.addEventListener("click", function() {
        forMyselfForm.style.display = "none";

        signupForm.style.display = "none";

        loginForm.style.display = "block";
    })
    Signupbtnn.addEventListener("click", function() {
        forMyselfForm.style.display = "none";

        signupForm.style.display = "none";

        loginForm.style.display = "block";
    });
});