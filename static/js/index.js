(function () {
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
  fetch("/api/attraction/1")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    });
})();
