document.addEventListener("DOMContentLoaded", (e) => {
  // getUpcommingTrip();
});

function getTripById() {
  const searchParams = location.search;

  searchParams = searchParams.replace("?", "");
  const paramsPair = searchParams.split("=");
  console.log("paramsPair", paramsPair);
}
