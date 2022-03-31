(function () {
  fetchData("api/user", "GET").then((res) => {
    if (!res.data) {
      location.href = "/";
    } else {
      data = res.data;
      setInitialData(data);
    }
  });
  fetchData("api/booking", "GET").then((res) => {
    if (!res.data) {
      noBookingData();
    } else {
      data = res.data;
      showBookingData(data);
    }
  });
  on("click", ".trashIcon", deleteBooking);
  //function
  //set css for no booking data
  function noBookingData() {
    select("footer").style.height = "61vh";
    select("footer p").style.top = "45px";
    select("main").style.display = "none";
    select(".bookingContact").style.display = "none";
    select(".noBooking").style.display = "block";
  }
  function showBookingData(data) {
    select("footer").style.height = "104px";
    select("footer p").style.top = "50%";
    select(
      ".bookingImage"
    ).style.backgroundImage = `url("${data["attraction"]["image"]}")`;
    select(".bookingDate span").innerText = data["date"];
    select(".bookingTime span").innerText = data["time"];
    select(".bookingPrice span").innerText = data["price"];
    select(".bookingPlace span").innerText = data["attraction"]["address"];
    select(".bookingTitle").innerText = data["attraction"]["name"];
  }
  function deleteBooking() {
    fetchData("api/booking", "DELETE").then((res) => {
      select("main").style.display = "none";
      select(".bookingContact").style.display = "none";
      select(".noBooking").style.display = "block";
      select(".nullBookingName").innerText = userName;
      select("footer").style.height = "61vh";
      select("footer p").style.top = "45px";
    });
  }
  function setInitialData(data) {
    select(".contactName input").setAttribute("value", data.name);
    select(".contactEmail input").setAttribute("value", data.email);
    select(".nullBookingName").innerText = data.name;
    userName = data.name;
    select(".bookingName").innerText = data.name;
  }
})();
