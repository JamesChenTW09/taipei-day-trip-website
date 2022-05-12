(function () {
  let bookingNumber = window.location.href;
  bookingNumber = bookingNumber.split("?number=")[1];

  const finalTourNumber = select(".finalTourNumber");
  const finalTourName = select(".finalTourName");
  const finalTourTime = select(".finalTourTime");
  const finalTourPlace = select(".finalTourPlace");
  const finalTourPrice = select(".finalTourPrice");

  fetchData("/api/order/" + bookingNumber, "GET").then((res) => {
    select(".loading").style.display = "none";
    const { address, name } = res.data.trip.attraction;
    const { number, price } = res.data;
    const { time, date } = res.data.trip;

    finalTourNumber.innerText = number;
    finalTourName.innerText = name;
    finalTourPlace.innerText = address;
    finalTourPrice.innerText = price;
    finalTourTime.innerText = `${date} ${time}`;
  });

  //button animation
  on("mousedown", "main button", (e) => {
    e.target.style.animation = "buttonScaleDown 0.2s forwards";
  });
  on("mouseup", "main button", (e) => {
    e.target.style.animation = "buttonScaleUp 0.2s forwards";
    location.href = "/";
  });
})();
