var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");

var siteList = [];

if (localStorage.getItem("sites") !== null) {
  siteList = JSON.parse(localStorage.getItem("sites"));

  displaysiteList();
}

function addSite() {
  if (validInputs() === true) {
    var website = {
      name: siteNameInput.value,
      url: siteURLInput.value,
    };

    siteList.push(website);

    clearInputs();

    setItemInlocalStorage();

    displaysiteList();
  } else {
    alert(`Please enter a valid Name and URL
    Name: minimum 2 character
    URL: should be start with (https://) or (www.) or both of them
    and end with minimum 2 character after (.)`);
  }
}

function clearInputs() {
  siteNameInput.value = "";
  siteURLInput.value = "";
}

function setItemInlocalStorage() {
  localStorage.setItem("sites", JSON.stringify(siteList));
}

function displaysiteList() {
  var table = ``;

  for (var i = 0; i < siteList.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${siteList[i].name}</td>
    <td><a href="${
      siteList[i].url
    }" target="blank"><button class="btn btn-success"><i class="fa-solid fa-up-right-from-square text-white"></i></button></a></td>
    <td><button class="btn btn-danger" onclick="deleteSite(${i});"><i class="fa-solid fa-trash-can text-white"></i></button></td>
    </tr>
    `;
  }
  document.getElementById("tBody").innerHTML = table;
}

function deleteSite(index) {
  siteList.splice(index, 1);

  setItemInlocalStorage();

  displaysiteList();
}

function validInputs() {
  var paternName = /[a-zA-Z0-9]{2,}/;
  var paternURL = /^(https:\/\/|www\.)[a-z0-9\.]{2,}(\.[a-z]{2,}$)/;
  if (
    paternURL.test(siteURLInput.value) === true &&
    paternName.test(siteNameInput.value) === true
  ) {
    return true;
  } else {
    return false;
  }
}
