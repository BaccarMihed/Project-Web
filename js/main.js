var xhr = new XMLHttpRequest();
var types = document.getElementsByClassName("list-group-item");

function load(url) {
  xhr.open("GET", url, true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      remplir(xhr.responseXML);
    }
  };
}

function remplir(data) {
  let tbody = document.querySelector("tbody");
  let elements = data.getElementsByTagName("pfe");
  tbody.innerHTML = "";
  for (let i = 0; i < elements.length; i++) {
    let tr = document.createElement("tr");
    let id = document.createElement("td");
    let titre = document.createElement("td");
    let type = document.createElement("td");
    id.innerHTML = elements[i].getAttribute("id");
    titre.innerHTML = elements[i].getAttribute("titre");
    type.innerHTML = elements[i].getAttribute("type");
    tr.appendChild(id);
    tr.appendChild(titre);
    tr.appendChild(type);
    tbody.appendChild(tr);
  }
}

function onClickType(event) {
    document.querySelector(".active").classList.remove("active");
    let active=document.querySelector(".badge-warning");
    active.classList.remove("badge-warning");
    active.classList.add("badge-info");
  //this.classList.add('active');
  event.currentTarget.classList.add("active");
    let current = event.currentTarget.querySelector(".badge-info");
    current.classList.remove("badge-info");
    current.classList.add("badge-warning");
  switch (event.currentTarget.getAttribute("id")) {
    case "Tous les PFEs": {
      load("https://appessat707.000webhostapp.com/pfes.php");

      break;
    }
    case "PFEs Télécom": {
      load(
        "https://appessat707.000webhostapp.com/pfespartypes.php?type=Telecom"
      );
      break;
    }
    case "PFEs Réseaux": {
      load(
        "https://appessat707.000webhostapp.com/pfespartypes.php?type=reseaux"
      );
      break;
    }
    case "PFEs Déveleppement": {
      load(
        "https://appessat707.000webhostapp.com/pfespartypes.php?type=Developpement"
      );
      break;
    }
    case "PFEs Embarqués et Iot": {
      load(
        "https://appessat707.000webhostapp.com/pfespartypes.php?type=Embarques et IoT"
      );
      break;
    }
    default: {
      console.log("erorr");
      break;
    }
  }
}

function firstLoad() {
  let all = 0;
  let telecom = 0;
  let dev = 0;
  let res = 0;
  let iot = 0;
  xhr.open("GET", "https://appessat707.000webhostapp.com/pfes.php", true);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      let elements = xhr.responseXML.getElementsByTagName("pfe");
      remplir(xhr.responseXML);

      for (let i = 0; i < elements.length; i++) {
        switch (elements[i].getAttribute("type")) {
          case "Telecom": {
            telecom++;
            all++;
            break;
          }
          case "Developpement": {
            dev++;
            all++;
            break;
          }
          case "Reseaux": {
            res++;
            all++;
            break;
          }
          case "Embarques et IoT": {
            iot++;
            all++;
            break;
          }
        }
      }

      document.getElementById("all").textContent = all;
      document.getElementById("dev").textContent = dev;
      document.getElementById("res").textContent = res;
      document.getElementById("iot").textContent = iot;
      document.getElementById("telecom").textContent = telecom;
    }
  };
}

for (let i = 0; i < types.length; i++) {
  types[i].addEventListener("click", onClickType);
}

firstLoad();
