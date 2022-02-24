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

// funktion der fortæller at når man klikker skal den gå ned til functionen "filtrerkategori"
function start() {
  // console.log("start");
  // alle knapperne
  const filterKnapper = document.querySelectorAll("nav button");
  // looper, der er eventlistener på hver knap
  filterKnapper.forEach((knap) =>
    knap.addEventListener("click", filtrerKategori)
  );
  hentData();
}

// filtrer i vores json (fornavne) og skal vise funktionerne vis() og visBillede()
function filtrerKategori() {
  // console.log("filtrer")
  filter = this.dataset.fornavn;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");

  // overskrifter skifter mellem kategorierne
  header.textContent = this.textContent;
  vis();
  visBillede();
}

// henter vores json data fra rest db
// keramik
async function hentData() {
  const resspons = await fetch(url, options);
  // console.log(resspons);
  keramik = await resspons.json();
  // console.log("keramik");

  // keramiker
  const ressponsKera = await fetch(urlKera, optionsKera);
  // console.log(resspons);
  keramiker = await ressponsKera.json();
  // console.log(keramiker);

  // keramik
  vis();

  // keramiker
  visBillede();
}

// en funktion der indeholder alt indhold fra json, og den filtrer efter hvilket fornavn du klikker på
function vis() {
  // console.log(keramik);
  main.textContent = "";

  // for hver keramik (person) du klikker på. viser den en overskift, korttest og billede. og herefter kloner den og looper forfra
  keramik.forEach((keramik) => {
    // console.log("forEach");
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

// keramiker herunder med indhold
function visBillede() {
  mainKera.textContent = "";
  // mainKera.style.display = "block";
  // console.log("kerA");

  // her sker det samme bare med vores kunstnere, da de skal have hver deres billede når man klikker på deres navn
  keramiker.forEach((kunstner) => {
    // console.log("forEach");

    // for hver gang man klikker på et navn kommer der et fornavn, efternavn og en tekst om personen samt et billede
    if (filter == kunstner.fornavn) {
      // console.log("filter");
      const klonKera = templateKera.cloneNode(true);
      klonKera.querySelector(".fornavn").textContent =
        kunstner.fornavn + " " + kunstner.Efternavn;

      klonKera.querySelector(".om").textContent = kunstner.Om;

      klonKera.querySelector("img").src =
        "/profil/" + kunstner.billede + ".jpg";

      mainKera.appendChild(klonKera);
    }
  });
}
// modal vinduet der kommer frem når man klikker på en af elementerne, her kommer det samme frem dog bare med en lang tekst istedet for en kort
// modal
function visDetaljer(keramik) {
  // console.log("modal");
  modal.querySelector("h2").textContent = keramik.overskrift;
  modal.querySelector(".tekst").textContent = keramik.langtekst;
  modal.querySelector("img").src = "/keramik/" + keramik.billede + ".jpg";

  // det ligger sig ovenpå
  modal.style.display = "block";
}
// så modal vinduet forsvinder når man klikker igen
modal.addEventListener("click", () => (modal.style.display = "none"));
// hentdata();

// burger menu
// Lav en variabel, der refererer til ".toggle-btn"
const btn = document.querySelector(".toggle-btn");
// Lav en variabel, der refererer til "nav"
const headernav = document.querySelector("#headernav");

// Lav en function, der hedder toggleMenu()
function toggleMenu() {
  // console.log("toggleMenu");
  // 1. Toggle en klasse på nav vha. classList.toggle
  headernav.classList.toggle("shown");
  // 2. Toggle en klasse, der hedder "shown"

  // 1. Lav en variabel, der hedder menuShown
  let menuShown = headernav.classList.contains("shown");
  // 2. Den skal være lig med, om nav-variablen indeholder klassen "shown" vha. classList.contains("")

  // 1. Lav en if/else sætning => if (...) {...} else {...}
  // 2. Spørg om menu i if-sætningen => if (menu)
  if (menuShown) {
    btn.textContent = "X";
    // hvis nav har klassen "shown", sæt da btn.textContent til "Luk"
  } else {
    btn.textContent = "☰";
    // hvis IKKE nav har klassen "shown", sæt da btn.textContent til "Menu"
  }
}

/* Tilføj et klik-event til btn, der sætter toggleMenu-funktionen i gang */
btn.addEventListener("click", toggleMenu);
