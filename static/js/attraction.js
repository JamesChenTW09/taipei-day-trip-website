const select = (ele, all = false) => {
  if (all) {
    return document.querySelectorAll(ele);
  } else {
    return document.querySelector(ele);
  }
};

window.onload = () => {
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
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      data = res.data;
      mainImg.style.backgroundImage = `url("${data.images[imageCount]}")`;
      mainTitle.innerText = data.name;
      mainCateMrt.innerText = data.category + " at " + data.mrt;
      section_intro.innerText = data.description;
      section_address.innerText = data.address;
      section_transport.innerText = data.transport;

      //small dots create and click event
      for (let i = 0; i < data.images.length; i++) {
        let imgs_list_out = document.createElement("div");
        let imgs_list_in = document.createElement("div");
        imgs_list_out.classList.add("img_list_out");
        imgs_list_in.classList.add("img_list_in");
        imgs_list_out.appendChild(imgs_list_in);
        dotContainer.appendChild(imgs_list_out);

        imgs_list_out.addEventListener("click", () => {
          mainImg.style.backgroundImage = `url("${data.images[i]}")`;
          imgs_list.forEach((item) => {
            item.children[0].style.backgroundColor = "white";
          });
          imgs_list[i].children[0].style.backgroundColor = "black";
          //make sure imageCount is always on the present image
          imageCount = i;
        });
      }

      //arrow click event
      let imgs_list = select(".img_list_out", true);
      imgs_list[imageCount].children[0].style.backgroundColor = "black";
      right_arrow.addEventListener("click", (e) => {
        imgs_list[imageCount].children[0].style.backgroundColor = "white";
        imageCount++;
        if (imageCount < data.images.length) {
          mainImg.style.backgroundImage = `url("${data.images[imageCount]}")`;
          imgs_list[imageCount].children[0].style.backgroundColor = "black";
        } else {
          imageCount = 0;
          mainImg.style.backgroundImage = `url("${data.images[imageCount]}")`;
          imgs_list[imageCount].children[0].style.backgroundColor = "black";
        }
      });
      left_arrow.addEventListener("click", (e) => {
        imgs_list[imageCount].children[0].style.backgroundColor = "white";
        if (imageCount == 0) {
          imageCount = data.images.length - 1;
          mainImg.style.backgroundImage = `url("${data.images[imageCount]}")`;
          imgs_list[imageCount].children[0].style.backgroundColor = "black";
        } else {
          imageCount--;
          mainImg.style.backgroundImage = `url("${data.images[imageCount]}")`;
          imgs_list[imageCount].children[0].style.backgroundColor = "black";
        }
      });
      // window.setInterval(function () {
      //   imgs_list[imageCount].children[0].style.backgroundColor = "white";
      //   imageCount++;
      //   if (imageCount < data.images.length) {
      //     imageHandler(mainImg, imageCount);
      //     imgs_list[imageCount].children[0].style.backgroundColor = "black";
      //   } else {
      //     imageCount = 0;
      //     imageHandler(mainImg, imageCount);
      //     imgs_list[imageCount].children[0].style.backgroundColor = "black";
      //   }
      // }, 3000);
    });
};
//價錢click event
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
