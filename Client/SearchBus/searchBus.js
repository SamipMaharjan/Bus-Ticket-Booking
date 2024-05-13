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
        <td><button id="${trip._id}" class="khaltiBtn"> View </button></td>
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
      // console.log("Clicked:", event.target.textContent);
      window.location.href =
        "http://127.0.0.1:5502/trips-details/detail.html?tripId=" + element.id;
      // history.pushState(,"","/trips-details/detail.html");

      // You can perform any actions based on the clicked element
    });
  });
  // window.location.href =
}

document
  .getElementById("searchForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    let data;

    const destination = document.getElementById("from").value;
    const pickUpPoint = document.getElementById("to").value;
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;
    console.log(destination);
    // const formData = new FormData(event.target);
    const searchParams = new URLSearchParams({
      destination,
      pickUpPoint,
      minPrice,
      maxPrice,
    });

    try {
      const response = await fetch(`/searchUpcomingTrips?${searchParams}`);
      const data = await response.json();
      if (data.success) {
        displayTrips(data.trips);
      } else {
        console.error("Search failed:", data.message);
      }
    } catch (error) {
      console.error(err);
    }
  });

function displayTrips(trips) {
  const resultsContainer = document.getElementById("searchForm");
  resultsContainer.innerHTML = "";

  if (trips.length === 0) {
    resultsContainer.textContent = "No trips found.";
  } else {
    trips.forEach((trip) => {
      const tripElement = document.createElement("div");
      tripElement.textContent = `From: ${trip.from}, To: ${trip.to}, Date: ${trip.date}, Price: ${trip.price}`;
      resultsContainer.appendChild(tripElement);
    });
  }
}
