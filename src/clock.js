




function getTime() {
  const nowTime = new Date();

  clockTitle = document.querySelector("h1");
  clockTitle.innerText = nowTime

}

function init() {
  getTime();
  setInterval(getTime, 1000);
};

init();
