const BaseUrl = "http://localhost:3501";

// export { BaseUrl };
// const ROLES_LIST = {
//   Admin: 5150,
//   Company: 3000,
//   Driver: 1984,
//   Passenger: 2001,
// };
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
