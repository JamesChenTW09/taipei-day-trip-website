//image changing event, incluing arrow event and small dots events
(function () {
  let attraction_id = window.location.href;
  attraction_id = attraction_id.split("attraction/")[1];

  let mainTitle = select(".main_container h3");
  let mainCateMrt = select(".main_container .cate_and_mrt");
  let mainImg = select(".image_container");
  let dotContainer = select(".dotContainer");
  let section_intro = select(".tour_intro");
  let section_address = select(".tour_address");
  let section_transport = select(".tour_transport");
  let right_arrow = select(".right_arrow");
  let left_arrow = select(".left_arrow");
  let imageCount = 0;

  fetch(`/api/attraction/${attraction_id}`)
    .then((res) => res.json())
    .then((res) => {
      data = res.data;
      let { name, images, category, mrt, description, address, transport } =
        res.data;
      add_remove_animation();
      firstDataRender();

      //small dots create and click event
      for (let i = 0; i < data.images.length; i++) {
        let imgs_dots_out = document.createElement("div");
        let imgs_dots_in = document.createElement("div");
        imgs_dots_out.classList.add("img_dot_out");
        imgs_dots_in.classList.add("img_dot_in");
        imgs_dots_out.appendChild(imgs_dots_in);
        dotContainer.appendChild(imgs_dots_out);

        imgs_dots_out.addEventListener("click", () => {
          add_remove_animation(i);
          imgs_dots.forEach((item) => {
            dot_turn_white(imgs_dots, imageCount, item);
          });
          dot_turn_black(imgs_dots, i);
          //make sure imageCount is always on the present image
          imageCount = i;
        });
      }

      //arrow click event
      let imgs_dots = select(".img_dot_out", true);
      dot_turn_black(imgs_dots, imageCount);
      right_arrow.addEventListener("click", (e) => {
        dot_turn_white(imgs_dots, imageCount);
        imageCount++;
        if (imageCount < data.images.length) {
          add_remove_animation();
          dot_turn_black(imgs_dots, imageCount);
        } else {
          imageCount = 0;
          add_remove_animation();
          dot_turn_black(imgs_dots, imageCount);
        }
      });
      left_arrow.addEventListener("click", (e) => {
        dot_turn_white(imgs_dots, imageCount);
        if (imageCount == 0) {
          imageCount = data.images.length - 1;
          add_remove_animation();
          dot_turn_black(imgs_dots, imageCount);
        } else {
          imageCount--;
          add_remove_animation();
          dot_turn_black(imgs_dots, imageCount);
        }
      });
      //auto change image
      window.setInterval(function () {
        dot_turn_white(imgs_dots, imageCount);
        imageCount++;
        if (imageCount < data.images.length) {
          add_remove_animation();
          dot_turn_black(imgs_dots, imageCount);
        } else {
          imageCount = 0;
          add_remove_animation();
          dot_turn_black(imgs_dots, imageCount);
        }
      }, 10000);

      //start booking button and direct to booking page***********
      on("click", ".tour_booking button", (e) => {
        if (select(".nav_top ul li", true)[2].style.display === "") {
          select(".logIn").classList.add("scaleUp");
          logInSectionShow();
        } else {
          const dateInput = select(".date_choosing input");
          const priceInput = select(".tour_pricing p span");
          let nowDate = new Date().toLocaleDateString();
          let newDateInput = new Date(dateInput.value).toLocaleDateString();

          if (newDateInput < nowDate) {
            dateErrorChoose("請輸入正確的日期!!");
            return;
          } else if (dateInput.value === "") {
            dateErrorChoose("日期忘記填寫囉!!");
          } else {
            const bookingData = {
              attractionId: data["id"],
              date: dateInput.value,
              time: priceInput.textContent == "2500" ? "下半天" : "上半天",
              price: priceInput.textContent,
            };
            fetchWithBody("/api/booking", "POST", bookingData).then((res) => {
              if (res.error) {
                dateErrorChoose("請輸入正確的日期!!");
              } else {
                location.href = "/booking";
              }
            });
          }
        }
      });
      //show error message
      function dateErrorChoose(message) {
        const bookErrorMessage = select(".bookErrorMessage");
        bookErrorMessage.innerText = message;
        bookErrorMessage.style.display = "block";
      }

      //first page data render
      function firstDataRender() {
        mainTitle.innerText = name;
        mainCateMrt.innerText = category + " at " + mrt;
        section_intro.innerText = description;
        section_address.innerText = address;
        section_transport.innerText = transport;
      }
      //image fetch and add/remove animation
      function add_remove_animation(i) {
        if (i == 0 || i) {
          mainImg.classList.add("activeAnimation");
          mainImg.style.backgroundImage = `url("${images[i]}")`;
        } else {
          mainImg.classList.add("activeAnimation");
          mainImg.style.backgroundImage = `url("${images[imageCount]}")`;
        }
        return setTimeout(function () {
          mainImg.classList.remove("activeAnimation");
        }, 300);
      }
      function dot_turn_black(imgs_dots, imageCount) {
        imgs_dots[imageCount].children[0].style.backgroundColor = "black";
      }
      function dot_turn_white(imgs_dots, imageCount, item = false) {
        if (item) {
          item.children[0].style.backgroundColor = "white";
        }
        imgs_dots[imageCount].children[0].style.backgroundColor = "white";
      }
    });
})();

//circle price click event
(function () {
  let clickContainer = select(".clickContainer", true);
  let clickEffect = select(".clickEffect", true);
  let tour_pricing = select(".tour_pricing p span");

  clickContainer[0].addEventListener("click", () => {
    clickEffect[1].classList.add("time_active");
    clickEffect[0].classList.remove("time_active");
    tour_pricing.textContent = "2000";
  });

  clickContainer[1].addEventListener("click", () => {
    clickEffect[1].classList.remove("time_active");
    clickEffect[0].classList.add("time_active");
    tour_pricing.textContent = "2500";
  });
})();
