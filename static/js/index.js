const select = (ele, all = false) => {
  if (all) {
    return document.querySelectorAll(ele);
  } else {
    return document.querySelector(ele);
  }
};
const on = (type, ele, listener, all = false) => {
  let selectEle = select(ele, all);
  if (selectEle) {
    if (all) {
      selectEle.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEle.addEventListener(type, listener);
    }
  }
};
//handle DOM of adding 12 datas in main
function sortData(data, i) {
  let firstImage = data[i]["images"][0];
  let tour_name = document.createTextNode(data[i]["name"]);
  let tour_mrt = document.createTextNode(data[i]["mrt"]);
  let tour_category = document.createTextNode(data[i]["category"]);

  let divContainer = document.createElement("div");
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

  return attractionList;
}
//handle home page and search page scoll event
window.onscroll = () => {
  if (!nextPage) {
    return;
  }
  if (
    footers.getBoundingClientRect().bottom <= window.innerHeight + 1 &&
    fetchComplete
  ) {
    if (!searchScroll) {
      keyword = "";
    }
    fetch(`/api/attractions?keyword=${keyword}&page=${nextPage}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        fetchComplete = false;
        if (!res.nextPage) {
          nextPage = null;
        }
        nextPage = res.nextPage;
        data = res.data;
        let totalLength = Object.keys(data).length;
        for (let i = 0; i < totalLength; i++) {
          sortData(data, i);
        }
        fetchComplete = true;
      });
  }
};

const footers = select("footer");
const attractionList = select("main");
//searshScroll to check which onscroll to use, fetchComplete to check whether fetch is complete
let searchScroll;
let fetchComplete = true;

//home page loaded first 12 datas
(function () {
  fetch("/api/attractions?page=0")
    .then((res) => {
      fetchComplete = false;
      return res.json();
    })
    .then((res) => {
      data = res.data;
      nextPage = res.nextPage;
      totalLength = Object.keys(data).length;
      for (let i = 0; i < totalLength; i++) {
        sortData(data, i);
      }
      //set boolean to decide which onscroll to run
      searchScroll = false;
      fetchComplete = true;
    });
})();

//search button
on("click", ".search_button", function (e) {
  keyword = e.target.parentElement.children[0].value;
  if (keyword == "") {
    e.preventDefault();
    alert("請輸入搜尋關鍵字");
    return;
  }
  attractionList.innerHTML = "";
  fetch(`/api/attractions?keyword=${keyword}&page=0`)
    .then((res) => {
      fetchComplete = false;
      return res.json();
    })
    .then((res) => {
      if (res.error == true) {
        noDataContainer = document.createElement("p");
        noDataContainer.innerText = "無相關資料";
        noDataContainer.classList.add("noDataCss");
        attractionList.appendChild(noDataContainer);
        //set nextPage to null to prevent onscroll event happen
        nextPage = null;
        fetchComplete = true;
        return;
      } else {
        data = res.data;
        nextPage = res.nextPage;
        totalLength = Object.keys(data).length;
        for (let i = 0; i < totalLength; i++) {
          sortData(data, i);
        }
        //set boolean to decide which onscroll to run
        searchScroll = true;
        fetchComplete = true;
      }
    });
});
