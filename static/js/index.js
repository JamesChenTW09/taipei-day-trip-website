const attractionList = select("main");
//searshScroll to check which onscroll to use, fetchComplete to check whether fetch is complete
let searchScroll, nextPage;
let fetchComplete = true;

//home page loaded first 12 datas
(function () {
  fetch("/api/attractions?page=0")
    .then((res) => {
      fetchComplete = false;
      return res.json();
    })
    .then((res) => {
      updatePageAndShow(res.data, res.nextPage, show12Datas);
      searchScroll = false;
      fetchComplete = true;
    });
})();

//search button
on("click", ".searchButton", function (e) {
  fetchComplete = false;
  keyword = e.target.parentElement.children[0].value;
  if (!keyword) {
    e.preventDefault();
    fetchComplete = true;
    select(".searchErrorMessage").innerText = "請輸入關鍵字!!!";
    return;
  }
  //clear all content in main
  attractionList.innerHTML = "";
  fetchData(`/api/attractions?keyword=${keyword}&page=0`, "GET").then((res) => {
    if (res.error) {
      showNoSearchData(attractionList);
      nextPage = null;
      fetchComplete = true;
      return;
    } else {
      updatePageAndShow(res.data, res.nextPage, show12Datas);
      searchScroll = true;
      fetchComplete = true;
    }
  });
});

//handle DOM of adding 12 datas in main
function show12Datas(data, i) {
  let firstImage = data[i]["images"][0];
  let tour_name = document.createTextNode(data[i]["name"]);
  let tour_mrt = document.createTextNode(data[i]["mrt"]);
  let tour_category = document.createTextNode(data[i]["category"]);

  let divContainer = document.createElement("div");
  divContainer.setAttribute("title", "點擊獲得更多景點資訊");
  let imageContainer = document.createElement("img");
  let txtContainer = document.createElement("section");
  let nameContainer = document.createElement("h4");
  let mrtContainer = document.createElement("p");
  let categoryContainer = document.createElement("p");

  imageContainer.setAttribute("src", firstImage);
  nameContainer.appendChild(tour_name);
  mrtContainer.appendChild(tour_mrt);
  categoryContainer.appendChild(tour_category);

  txtContainer.appendChild(nameContainer);
  txtContainer.appendChild(mrtContainer);
  txtContainer.appendChild(categoryContainer);
  divContainer.appendChild(imageContainer);
  divContainer.appendChild(txtContainer);
  attractionList.appendChild(divContainer);

  divContainer.addEventListener("click", function () {
    location.href = "/attraction/" + data[i]["id"];
  });
  return attractionList;
}

//handle no search data match
function showNoSearchData(attractionList) {
  noDataContainer = document.createElement("p");
  noDataContainer.innerText = "無相關資料";
  noDataContainer.classList.add("noDataCss");
  attractionList.appendChild(noDataContainer);
}
//handle home page and search page scoll event

window.onscroll = debounce(scrollEvent);
function scrollEvent() {
  const footers = select("footer");

  if (!nextPage) {
    return;
  }
  if (
    footers.getBoundingClientRect().bottom <= window.innerHeight + 1 &&
    fetchComplete
  ) {
    fetchComplete = false;
    if (!searchScroll) {
      keyword = "";
    }
    fetchData(
      `/api/attractions?keyword=${keyword}&page=${nextPage}`,
      "GET"
    ).then((res) => {
      if (!res.nextPage) {
        nextPage = null;
      }
      updatePageAndShow(res.data, res.nextPage, show12Datas);
      fetchComplete = true;

      //extend the black background when doing login and scroll at the same time
      const blackBackground = select(".blackBackground");
      const body = select("body");
      if (blackBackground.style.height !== "") {
        blackBackground.style.height = body.offsetHeight + "px";
      }
    });
  }
}

function debounce(cb, delay = 300) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

function updatePageAndShow(newData, newNextPage, cb) {
  data = newData;
  nextPage = newNextPage;
  totalLength = Object.keys(data).length;
  for (let i = 0; i < totalLength; i++) {
    cb(data, i);
  }
}
