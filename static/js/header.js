let select = (ele, all = false) => {
  if (all) {
    return document.querySelectorAll(ele);
  } else {
    return document.querySelector(ele);
  }
};
let on = (type, ele, listener, all = false) => {
  let selectEle = select(ele, all);
  if (selectEle) {
    if (all) {
      selectEle.forEach((e) => e.addEventListener(type, listener));
    } else {
      selectEle.addEventListener(type, listener);
    }
  }
};
function logInSectionShow() {
  select(".blackBackground").style.height = select("body").offsetHeight + "px";
  select(".logIn").style.opacity = "1";
  select(".logIn").style.zIndex = "30";
  x;
  setTimeout(() => {
    select(".logIn").classList.remove("scaleUp");
  }, 400);
}
async function fetchData(url, method) {
  return await fetch(url, {
    method: method,
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log("There is a problem");
    });
}

async function fetchWithBody(url, method, body) {
  return await fetch(url, {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log("There is a problem");
    });
}

//membership event handler
window.onload = () => {
  const signUpMessage = select(".signUpMessage");
  const logInMessage = select(".logInMessage");
  const signUpSection = select(".signUp");
  const blackBackground = select(".blackBackground");
  const logInSection = select(".logIn");
  const button = select(".nav_top ul li", true);
  //check user is login or not and set event handler to login/logout li
  fetchData("/api/user", "GET").then((res) => {
    if (!res.data) {
      button[0].addEventListener("click", (e) => {
        logInSection.classList.add("scaleUp");
        logInSectionShow();
      });
      button[1].addEventListener("click", (e) => {
        logInSection.classList.add("scaleUp");
        logInSectionShow();
      });
    } else {
      logInAndOutButton();
      button[0].addEventListener("click", (e) => {
        location.href = "/booking";
      });
      button[2].addEventListener("click", (e) => {
        fetchData("/api/user", "DELETE").then((res) => {
          location.reload();
        });
      });
    }
  });

  //login/signup cross / change platform click event
  on("click", ".cross", (e) => {
    messageHandler({ message: "" }, "275px", "11/12", "none");
    messageHandler("", "330px", "13/14", "none", "1");
    crossEffect(logInSection);
    setValueEmpty();
  });
  on("click", ".signUpCross", (e) => {
    messageHandler({ message: "" }, "275px", "11/12", "none");
    messageHandler("", "330px", "13/14", "none", "1");
    crossEffect(signUpSection);
    setValueEmpty();
  });
  on("click", ".loginSpan", (e) => {
    logIN_exchange_signUp(signUpSection, logInSection);
  });
  on("click", ".signUpSpan", (e) => {
    logIN_exchange_signUp(logInSection, signUpSection);
  });

  //check email is valid before submit
  on("focusout", ".signUpEmail", (e) => {
    const checkEmail = { password: "", email: e.target.value, name: "" };
    fetchWithBody("/api/user", "POST", checkEmail).then((res) => {
      if (res.error) {
        messageHandler(res, "365px", "15/16", "block", "重複的信箱!!");
      } else {
        messageHandler("", "330px", "13/14", "none", "1");
      }
    });
  });

  //log in button click event
  on("click", ".logIn button", (e) => {
    const logInValue = {
      email: select(".logInEmail").value,
      password: select(".logInPassword").value,
    };
    const { email, password } = logInValue;
    if (email && password) {
      fetchWithBody("/api/user", "PATCH", logInValue).then((res) => {
        if (res.error) {
          messageHandler(res, "307px", "13/14", "block");
        } else {
          location.reload();
        }
      });
    } else {
      messageHandler(
        { message: "請輸入信箱或密碼" },
        "307px",
        "13/14",
        "block"
      );
      return;
    }
  });

  //signup event
  on("click", ".signUp button", (e) => {
    let valid = select(".signUpEmail").checkValidity();
    if (!valid) {
      messageHandler("", "365px", "15/16", "block", "信箱格式錯誤!!");
      return;
    } else {
      const signUpValue = {
        name: select(".signUpName").value,
        email: select(".signUpEmail").value,
        password: select(".signUpPassword").value,
      };
      const { name, email, password } = signUpValue;
      if (name && email && password) {
        fetchWithBody("/api/user", "POST", signUpValue).then((res) => {
          if (res.error) {
            messageHandler(res, "365px", "15/16", "block", "重複的信箱!!");
          } else {
            messageHandler(res, "365px", "15/16", "block", "註冊成功");
          }
        });
      } else {
        messageHandler("", "365px", "15/16", "block", "有資料未填寫!!!");
        return;
      }
    }
  });

  //button click animation
  on("mousedown", ".logIn button", (e) => {
    e.target.style.animation = "buttonScaleDown 0.2s forwards";
  });
  on("mouseup", ".logIn button", (e) => {
    e.target.style.animation = "buttonScaleUp 0.2s forwards";
  });
  on("mousedown", ".signUp button", (e) => {
    e.target.style.animation = "buttonScaleDown 0.2s forwards";
  });
  on("mouseup", ".signUp button", (e) => {
    e.target.style.animation = "buttonScaleUp 0.2s forwards";
  });

  //function setup
  function logInAndOutButton() {
    button[1].style.display = "none";
    button[2].style.display = "block";
  }
  function crossEffect(action) {
    blackBackground.style.height = "";
    action.style.opacity = "0";
    action.style.zIndex = "-10";
  }
  function logIN_exchange_signUp(upEle, downEle) {
    downEle.style.opacity = "0";
    downEle.style.zIndex = "-10";
    upEle.style.opacity = "1";
    upEle.style.zIndex = "30";
  }
  //處理ajax後相關訊息呈現和css調整
  function messageHandler(data, height, row, display, text = false) {
    if (!text) {
      errorMessage = data.message;
      logInSection.style.height = height;
      select(".changeSignUp").style.gridRow = row;
      logInMessage.style.display = display;
      logInMessage.innerText = errorMessage;
    } else {
      signUpSection.style.height = height;
      select(".changeLogIn").style.gridRow = row;
      signUpMessage.style.display = display;
      signUpMessage.innerText = text;
    }
  }
  function setValueEmpty() {
    select(".logInEmail").value = "";
    select(".logInPassword").value = "";
    select(".signUpName").value = "";
    select(".signUpEmail").value = "";
    select(".signUpPassword").value = "";
  }
};
