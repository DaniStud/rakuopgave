const main = document.querySelector("#info");
const template = document.querySelector("template").content;
const header = document.querySelector("h1");
const modal = document.querySelector("#modal");
// const section = document.querySelector;

const url = "https://keramik-b835.restdb.io/rest/keramik";

const options = {
  headers: {
    "x-apikey": "620e544834fd621565858733",
  },
};

let json;
let filter = "Alle";
let keramik;
let kategori;

document.addEventListener("DOMContentLoaded", start);

function start() {
  console.log("start");
  // alle knapperne
  const filterKnapper = document.querySelectorAll("nav button");
  // looper, der er eventlistener på hver knap
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerKategori)
  );
  hentData();
}

function filtrerKategori() {
  console.log("filtrer");
  filter = this.dataset.kunstnere;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  // overskrifter skifter mellem kategorierne
  header.textContent = this.textContent;
  vis();
}

async function hentData() {
  const resspons = await fetch(url, options);
  // console.log(resspons);
  keramik = await resspons.json();
  // console.log("keramik");
  vis();
}

function vis() {
  // console.log(keramik);
  main.textContent = "";

  keramik.forEach((keramik) => {
    console.log("forEach");
    if (filter == keramik.kunstnere || filter == "Alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("h2").textContent = keramik.overskrift;
      klon.querySelector(".tekst").textContent = keramik.tekst;
      klon.querySelector(".billede").textContent = keramik.billede;

      klon.querySelector("img").src = "/keramik/" + keramik.billede + ".jpg";

      // klon.querySelector("img").src =
      // "/keramik/rie/" + keramik.billede + ".jpg";
      // laver en anonym funktion ()=> som kan kalde en ny fuktion nedeudner - så kommer dataten (JSON) med ned i funktionen
      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(keramik));

      main.appendChild(klon);
    }
  });
}

// modal
function visDetaljer(keramik) {
    console.log("modal");
    modal.querySelector("h2").textContent = keramik.overskrift;
    modal.querySelector("img").src = "/keramik/" + keramik.billede;
    modal.style.display = "block";
  }

  modal.addEventListener("click", () => (modal.style.display = "none"));
  hentdata();

