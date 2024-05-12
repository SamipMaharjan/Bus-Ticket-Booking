const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie =
        name + "=" + encodeURIComponent(value) + "; path=/; expires=" + expires;
};

// import { BaseUrl } from "../constants";
// import { setCookie } from "../CookieHelper.js";
// function passengerLogin(event) {
//   event.preventDefault(); // Prevent default form submission
//   console.log("setCookie", setCookie);
//   try {
//     const form = document.getElementById("loginForm");
//     const formData = new FormData(form);
//     console.log("form data", formData);
//     let formDataObject = {};
//     formData.forEach((value, key) => {
//       formDataObject[key] = value;
//     });
//     console.log("formDataObject", formDataObject);
//     fetch(`http://localhost:3501/login`, {
//       method: "POST",
//       body: JSON.stringify(formDataObject),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())
//       .then((data) => console.log("resdata", data.message))
//       .catch((err) => console.error(err.message));
//   } catch (err) {
//     console.error("Error in passenverIsngup", err);
//   }
// }

document.addEventListener("DOMContentLoaded", function() {
    console.log("js loaded");
    const forMyselfBtn = document.getElementById("forMyselfBtn");
    const forCompanyBtn = document.getElementById("forCompanyBtn");
    const createBusYatriAccountForm = document.getElementById(
        "createBusYatriAccountForm"
    );
    const signupForm = document.getElementById("signupForm");
    const forMyselfForm = document.getElementById("forMyselfForm");
    const loginForm = document.getElementById("loginForm");
    const alreadyHaveAccountBtn = document.getElementById(
        "alreadyHaveAccountBtn"
    );
    const alreadyHaveAccount1Btn = document.getElementById(
        "alreadyHaveAccount1Btn"
    );
    const CreateAccount = document.getElementById("CreateAccount");
    const Signupbtn = document.getElementById("Signupbtn");
    const Signupbtnn = document.getElementById("Signupbtnn");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission
        try {
            const form = document.getElementById("loginForm");
            const formData = new FormData(form);
            console.log("form data", formData);
            let formDataObject = {};
            formData.forEach((value, key) => {
                formDataObject[key] = value;
            });
            console.log("formDataObject", formDataObject);
            fetch(`http://localhost:3501/login`, {
                    method: "POST",
                    body: JSON.stringify(formDataObject),
                    headers: { "Content-Type": "application/json" },
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log("data", data)
                    console.log("resdata", data.message);
                    setCookie("token", data.token, 5);
                    window.location.href = "/Landing/Landing.html";
                })
                .catch((err) => console.error(err.message));
        } catch (err) {
            console.error("Error in passenverIsngup", err);
        }
    });

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
    Boolean(Signupbtn) && Signupbtn.addEventListener("click", function() {
        forMyselfForm.style.display = "none";

        signupForm.style.display = "none";

        loginForm.style.display = "block";
    });
    Signupbtnn.addEventListener("click", function() {
        forMyselfForm.style.display = "none";

        signupForm.style.display = "none";

        loginForm.style.display = "block";
    });
    forMyselfForm.addEventListener("submit", (event) => {
        console.log("submit form");
        event.preventDefault(); // Prevent default form submission
        const form = document.getElementById("forMyselfForm");
        const formData = new FormData(form);
        console.log("fr,data.entire", formData);

        let formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        formDataObject = {...formDataObject, roles: { Passenger: 2001 } };
        console.log("formDataObject", formDataObject);
        fetch(`http://localhost:3501/registerUser`, {
                method: "POST",
                body: JSON.stringify(formDataObject),
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("resdata", data);
                alert(data);
            })
            .catch((err) => console.error(err));
    });
});