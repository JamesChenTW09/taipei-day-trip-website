TPDirect.setupSDK(
  123979,
  "app_K1WabJfGbdMJpUsbllqrOhM2Sqo218qg5QZDlCPqLP6KIvIWcaegpsSYP9sA",
  "sandbox"
);

TPDirect.card.setup({
  // Display ccv field
  fields: {
    number: {
      // css selector
      element: "#card-number",
      placeholder: "**** **** **** ****",
    },
    expirationDate: {
      // DOM object
      element: document.getElementById("card-expiration-date"),
      placeholder: "MM / YY",
    },
    ccv: {
      element: "#card-ccv",
      placeholder: "ccv",
    },
  },
});
document
  .querySelector(".payComfirmButton button")
  .addEventListener("click", (e) => {
    select(".loading").style.display = "flex";
    let warnMessage = select(".warnMessage");
    TPDirect.card.getPrime(function (result) {
      if (result.status !== 0) {
        warnMessage.style.opacity = "1";
        warnMessage.innerText = "資料有誤，請確認再試";
        select(".loading").style.display = "none";
        return;
      }
      let prime = result.card.prime;
      let phone = select(".contactPhone input").value;
      if (!phone) {
        warnMessage.style.opacity = "1";
        warnMessage.innerText = "請輸入連絡電話";
        select(".loading").style.display = "none";
        return;
      } else {
        warnMessage.style.display = "none";
        let { price, date, time } = tourData;
        let { id, name, address, image } = tourData.attraction;
        let body = {
          prime,
          order: {
            price,
            trip: {
              attraction: {
                id,
                name,
                address,
                image,
              },
              date,
              time,
            },
            contact: {
              name: userData.name,
              email: userData.email,
              phone,
            },
          },
        };
        fetchWithBody("/api/orders", "POST", body).then((res) => {
          if (res.error) {
            select(".loading").style.display = "none";
            warnMessage.style.opacity = "1";
            warnMessage.innerText = "資料有誤，請確認再試";
          } else {
            bookingNumber = res.data.number;
            noBookingData();
            location.href = "/thankyou?number=" + bookingNumber;
          }
        });
      }
    });
  });

on("mousedown", ".payComfirmButton button", (e) => {
  e.target.style.animation = "buttonScaleDown 0.2s forwards";
});
on("mouseup", ".payComfirmButton button", (e) => {
  e.target.style.animation = "buttonScaleUp 0.2s forwards";
});
