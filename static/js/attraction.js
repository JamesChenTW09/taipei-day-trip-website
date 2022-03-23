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
