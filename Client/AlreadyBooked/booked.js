document.addEventListener("DOMContentLoaded", (e) => {
    getBookedTrip();
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
async function getBookedTrip() {
    const token = getCookie("token");
    try {
        let id;
        let userpt;
        fetch("http://localhost:3501/users/profile", {headers:{Authorization: `Bearer ${token}`}}).then(res=>res.json()).then(data => {
            console.log("PROFILE DATA ",data);
        // console.log(data);
        // const res = await fetch("http://localhost:3501/users/bookTrip/"+id);
        // const bookedTrips = await res.json();
        // const bookedTrpisTable = document.querySelector("#bookedTripsTable");
        const tbody = document.querySelector("tbody");
        console.log("bookedTrips", data);

        data.success.booked_trips.forEach((trip, i) => {
            console.log("vitra ko trip",trip);
            const tableRow = document.createElement("tr");
      
            tableRow.innerHTML = `
              <td>${trip.departureTime}</td>
              <td>${trip.destination}</td>
              <td>${trip.pickUpPoint}</td>
              <td>${trip.price}</td>
          `;
            tbody.appendChild(tableRow);
          });
        // })
    })

    } catch (error) {
        console.error(error);
    }
}