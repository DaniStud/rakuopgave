// keramik
const main = document.querySelector("#info");
const template = document.querySelector("#info template").content;
const header = document.querySelector("h1");
const modal = document.querySelector("#modal");
// const section = document.querySelector;

// keramiker
const mainKera = document.querySelector("#personer");
const templateKera = document.querySelector("#personer template").content;

// -------------------------------------------

// keramik
const url = "https://keramik-b835.restdb.io/rest/keramik";
// keramikere
const urlKera = "https://keramiker-bb19.restdb.io/rest/keramiker";

// -------------------------------------------

// keramik - key
const options = {
  headers: {
    "x-apikey": "620e544834fd621565858733",
  },
};

// keramikere - key
const optionsKera = {
  headers: {
    "x-apikey": "6214e9df34fd621565858906",
  },
};

// -------------------------------------------

// keramik
let json;
let filter = "Alle";
let keramik;
let kategori;

// keramikere
let keramiker;
let fornavn;

// -------------------------------------------

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
  filter = this.dataset.fornavn;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  // overskrifter skifter mellem kategorierne
  header.textContent = this.textContent;
  vis();
  visBillede();
}

async function hentData() {
  const resspons = await fetch(url, options);
  // console.log(resspons);
  keramik = await resspons.json();
  // console.log("keramik");

  // keramiker herunder
  const ressponsKera = await fetch(urlKera, optionsKera);
  // console.log(resspons);
  keramiker = await ressponsKera.json();
  console.log(keramiker);
  vis();
  // keramiker
  visBillede();
}

function vis() {
  // console.log(keramik);
  main.textContent = "";

  keramik.forEach((keramik) => {
    console.log("forEach");
    if (filter == keramik.fornavn || filter == "Alle") {
      const klon = template.cloneNode(true);
      klon.querySelector("h2").textContent = keramik.overskrift;
      klon.querySelector(".tekst").textContent = keramik.korttekst;
      // klon.querySelector(".billede").textContent = keramik.billede;

      klon.querySelector("img").src = "/keramik/" + keramik.billede + ".jpg";

      klon
        .querySelector("article")
        .addEventListener("click", () => visDetaljer(keramik));

      main.appendChild(klon);
    }
  });
}

// keramiker herunder
function visBillede() {
  mainKera.textContent = "";
  // mainKera.style.display = "block";
  console.log("kerA");

  keramiker.forEach((kunstner) => {
    console.log("forEach");
    if (filter == kunstner.fornavn) {
      console.log("filter");
      const klonKera = templateKera.cloneNode(true);
      klonKera.querySelector(".fornavn").textContent = kunstner.fornavn;
      klonKera.querySelector(".efternavn").textContent = kunstner.Efternavn;
      klonKera.querySelector(".om").textContent = kunstner.Om;

      klonKera.querySelector("img").src =
        "/profil/" + kunstner.billede + ".jpg";

      mainKera.appendChild(klonKera);
    }
  });
}

// modal
function visDetaljer(keramik) {
  console.log("modal");
  modal.querySelector("h2").textContent = keramik.overskrift;
  modal.querySelector(".tekst").textContent = keramik.langtekst;
  modal.querySelector("img").src = "/keramik/" + keramik.billede + ".jpg";
  modal.style.display = "block";
}

modal.addEventListener("click", () => (modal.style.display = "none"));
// hentdata();
