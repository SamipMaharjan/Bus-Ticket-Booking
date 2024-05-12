document.addEventListener("DOMContentLoaded", (e) => {
  getUpcommingTrip();
});

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
        <td><button class="khaltiBtn"> Book </button></td>
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
      console.log("Clicked:", event.target.textContent);
      window.location.href =
        "https://test-pay.khalti.com/?pidx=9N2t58ByDqV2uphX36XbV7";

      // You can perform any actions based on the clicked element
    });
  });
  // window.location.href =
}
