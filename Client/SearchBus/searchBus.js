document.addEventListener("DOMContentLoaded", (e) => {
  getUpcommingTrip();
});

const getCookie = (c_name) => {
  const cookie = document.cookie;

  const ls = cookie.split(";");
  const reqCookie = ls.find((c) => c.includes(c_name));
  if (reqCookie) {
    return reqCookie.split("=")[1];
  }
  return "";
};

async function getUpcommingTrip() {
  try {
    const res = await fetch("http://localhost:3501/upcommingTrip");
    const upcommingTrips = await res.json();
    const upcommingTripsTable = document.querySelector("#upcommingTripsTable");
    const tbody = upcommingTripsTable.querySelector("tbody");
    console.log("upcommingTrips", upcommingTrips);

    upcommingTrips.forEach((trip, i) => {
      const tableRow = document.createElement("tr");

      tableRow.innerHTML = `
        <td>${trip.departureTime}</td>
        <td>${trip.destination}</td>
        <td>${trip.pickUpPoint}</td>
        <td>${trip.price}</td>
        <td><button id="${trip._id}" class="khaltiBtn"> Book </button></td>
    `;
      tbody.appendChild(tableRow);
    });
    khaltiRedirect();
  } catch (err) {
    console.error(err);
  }
}

function khaltiRedirect() {
  const khaltiBtns = document.querySelectorAll(".khaltiBtn");
  console.log("khaltibrn", khaltiBtns);

  khaltiBtns.forEach((element) => {
    element.addEventListener("click", (event) => {
      // Handle click event here
      //   console.log("auth token", getCookie("token"));
      fetch(`http://localhost:3501/users/bookTrip/${element.id}`, {
        method: "PUT",
        body: JSON.stringify({
          return_url: "http://127.0.0.1:5502/AlreadyBooked/booked.html",
          website_url: "http://127.0.0.1:5502",
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
        .then((res) => res.json())
        .then((resData) => window.open(resData.payment_url))
        .catch((err) => console.error("Khalti booking err:", err));
      //   console.log("Clicked:", event.target.textContent);
      //   window.open();
      // "https://test-pay.khalti.com/?pidx=9N2t58ByDqV2uphX36XbV7";

      // You can perform any actions based on the clicked element
    });
  });
  // window.location.href =
}
