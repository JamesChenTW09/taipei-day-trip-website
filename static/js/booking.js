//below two for storing user and tour data and pass to order.js
let userData;
let tourData;
(function () {
  fetchData("api/user", "GET").then((res) => {
    if (!res.data) {
      location.href = "/";
    } else {
      let data = res.data;
      userData = data;
      setInitialData(data);
      select(".loading").style.display = "none";
    }
  });
  fetchData("api/booking", "GET").then((res) => {
    console.log(res.data);
    if (!res.data) {
      noBookingData();
    } else {
      let data = res.data;
      tourData = data;
      showBookingData(data);
    }
  });
  on("click", ".trashIcon", deleteBooking);
  //function
  //set css for no booking data
  const main = select("main");
  const footer = select("footer");
  const footerP = select("footer p");
  const bookingContact = select(".bookingContact");
  const cardInfo = select(".cardInfo");
  const payComfirmButton = select(".payComfirmButton");
  const noBooking = select(".noBooking");
  const nullBookingName = select(".nullBookingName");

  function noBookingData() {
    footer.style.height = "61vh";
    footerP.style.top = "45px";
    main.style.display = "none";
    bookingContact.style.display = "none";
    cardInfo.style.display = "none";
    payComfirmButton.style.display = "none";
    noBooking.style.display = "block";
  }
  function showBookingData(data) {
    footer.style.height = "104px";
    footerP.style.top = "50%";
    select(
      ".bookingImage"
    ).style.backgroundImage = `url("${data["attraction"]["image"]}")`;
    select(".bookingDate span").innerText = data["date"];
    select(".bookingTime span").innerText = data["time"];
    select(".bookingPrice span").innerText = data["price"];
    select(".bookingPlace span").innerText = data["attraction"]["address"];
    select(".bookingTitle").innerText = data["attraction"]["name"];
  }
  function setInitialData(data) {
    select(".contactName input").setAttribute("value", data.name);
    select(".contactEmail input").setAttribute("value", data.email);
    nullBookingName.innerText = data.name;
    userName = data.name;
    select(".bookingName").innerText = data.name;
  }
  function deleteBooking() {
    fetchData("api/booking", "DELETE").then((res) => {
      main.style.display = "none";
      bookingContact.style.display = "none";
      cardInfo.style.display = "none";
      payComfirmButton.style.display = "none";
      noBooking.style.display = "block";
      nullBookingName.innerText = userName;
      footer.style.height = "61vh";
      footerP.style.top = "45px";
    });
  }
})();

function noBookingData() {
  select("footer").style.height = "61vh";
  select("footer p").style.top = "45px";
  select("main").style.display = "none";
  select(".bookingContact").style.display = "none";
  select(".cardInfo").style.display = "none";
  select(".payComfirmButton").style.display = "none";
  select(".noBooking").style.display = "block";
}
