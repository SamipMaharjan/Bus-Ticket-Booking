document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3501/adminLogin", {
    method: "POST",
    body: JSON.stringify({
      email: "admin@gmail.com",
      password: "admin",
    }),
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
});
