document.addEventListener("DOMContentLoaded", (e) => {
  getUpcommingTrip();
  document
    .querySelector("#searchForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      let data;

      const destination = document.querySelector("#to").value;
      const pickUpPoint = document.querySelector("#from").value;
      const minPrice = document.querySelector("#minPrice").value;
      const maxPrice = document.querySelector("#maxPrice").value;      
      // const formData = new FormData(event.target);
      const searchParams = new URLSearchParams();
      if (destination) searchParams.set('destination', destination);
      if (pickUpPoint) searchParams.set('pickUpPoint', pickUpPoint);
      if (minPrice && maxPrice) {
        searchParams.set('priceMin', minPrice);
        searchParams.set('priceMax', maxPrice);
      } else if (minPrice) {
        searchParams.set('priceMin', minPrice);
      } else if (maxPrice) {
        searchParams.set('priceMax', maxPrice);
      }
      console.log("searchParams", searchParams);

      try {
        const response = await fetch(
          `http://localhost:3501/searchUpcommingTrips?${searchParams}`
        );
        console.log("response", response);
        const data = await response.json();
        if (data.success) {
          displayTrips(data.trips);
        } else {
          console.error("Search failed:", data.message);
        }
      } catch (error) {
        console.error(error);
      }
    });
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
    // console.log("upcommingTrips", upcommingTrips)
    tbody.innerHTML = "";

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

function displayTrips(trips) {
  console.log("TRIPS",trips);
  
  const resultsContainer = document.getElementById("upcommingTripsTable").querySelector("tbody");
  resultsContainer.innerHTML = ""
  // const tableRow = document.createElement("tr");

  if (trips.length === 0) {
    const noTripsRow = document.createElement("tr");
    noTripsRow.innerHTML = `<td colspan='5'>No trips found.</td>`;
    resultsContainer.appendChild(noTripsRow);
  } else {
    trips.forEach((trip) => {
      const tableRow = document.createElement("tr");

      tableRow.innerHTML = `
        <td>${trip.departureTime}</td>
        <td>${trip.destination}</td>
        <td>${trip.pickUpPoint}</td>
        <td>${trip.price}</td>
        <td><button id="${trip._id}" class="khaltiBtn">View</button></td>
      `;
      resultsContainer.appendChild(tableRow);
    });
  }
}
