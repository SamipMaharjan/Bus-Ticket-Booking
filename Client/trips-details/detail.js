const getCookie = (c_name) => {
  const cookie = document.cookie;

  const ls = cookie.split(";");
  const reqCookie = ls.find((c) => c.includes(c_name));
  if (reqCookie) {
    return reqCookie.split("=")[1];
  }
  return "";
};
document.addEventListener("DOMContentLoaded", (e) => {
  // getUpcommingTrip();

  getTripById();
  document.querySelector(".book").addEventListener("click", (e) => {
    let searchParams = new URLSearchParams(location.search);
    console.log("clicked");
    fetch(
      `http://localhost:3501/users/bookTrip/${searchParams.get("tripId")}`,
      {
        method: "PUT",
        body: JSON.stringify({
          return_url: "http://127.0.0.1:5502/AlreadyBooked/booked.html",
          website_url: "http://127.0.0.1:5502/",
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((resData) => window.open(resData.payment_url))
      .catch((err) => console.error("Khalti booking err:", err));
  });
});

async function getTripById() {
  let searchParams = new URLSearchParams(location.search);

  console.log("paramObject", searchParams.get("tripId"));
  const res = await fetch(
    "http://localhost:3501/upcommingTrip/" + searchParams.get("tripId"),
    {
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    }
  );
  const json = await res.json();
  const tripData = json.trip;

  const pickUpPoint = document.querySelector("#pick-up-point");
  const destination = document.querySelector("#destination");
  const departureTime = document.querySelector("#departure-time");
  const description = document.querySelector("#description");
  console.log("upcomming trip res", tripData.departureTime);
  pickUpPoint.textContent = tripData.pickUpPoint;
  destination.textContent = tripData.destination;
  departureTime.textContent = tripData.departureTime;
  description.textContent = tripData.description;
}
