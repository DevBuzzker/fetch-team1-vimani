import {
  currentStartIndex,
  currentEndIndex,
  getPokemonAllWithInfos,
  setIndices,
} from "./getPokemonAll.js";

const buttonClasses = ["px-3", "py-2", "rounded", "transition", "text-white"];
const buttonRedClasses = ["bg-red-500", "hover:bg-red-600"];
const buttonGreenClasses = ["bg-green-500", "hover:bg-green-600"];

export function showPokemonCard(pokemon) {
  const container = document.querySelector("#pokemons");
  // console.log(pokemon);
  const div = document.createElement("div");
  div.classList.add("border-black");
  div.classList.add("border-1");
  div.classList.add("m-2");
  div.classList.add("p-2");
  div.classList.add("w-40");

  // align images and texts to center
  div.classList.add("flex");
  div.classList.add("flex-col");
  div.classList.add("items-center");
  div.classList.add("justify-center");

  div.classList.add("flex-shrink-0");

  const img = document.createElement("img");
  img.src = pokemon.image;
  img.classList.add("max-h-30");
  img.classList.add("h-30");
  div.appendChild(img);

  const titlePara = document.createElement("p");
  titlePara.textContent = "#" + pokemon.id + " " + pokemon.name;
  div.appendChild(titlePara);

  const catchBtn = document.createElement("button");
  catchBtn.classList.add(...buttonClasses);
  catchBtn.classList.add("mt-2");
  div.appendChild(catchBtn);
  styleCatchBtn(catchBtn, pokemon);

  catchBtn.onclick = () => {
    const caught = localStorage.getItem(String(pokemon.id));
    const caughtBool = caught === "true";
    const newValue = !caughtBool;
    localStorage.setItem(String(pokemon.id), String(newValue));
    styleCatchBtn(catchBtn, pokemon);
  };

  container.appendChild(div);
}

function styleCatchBtn(catchBtn, pokemon) {
  const caught = localStorage.getItem(String(pokemon.id));
  const caughtBool = caught === "true";
  if (!caughtBool) {
    catchBtn.classList.remove(...buttonGreenClasses);
    catchBtn.classList.add(...buttonRedClasses);
    catchBtn.textContent = "Catch!";
  } else {
    catchBtn.classList.remove(...buttonRedClasses);
    catchBtn.classList.add(...buttonGreenClasses);
    catchBtn.innerHTML = "<b>✓</b> in Dex"; // bold Tick (Hacken) ✓
  }
}

export function showScrollElements() {
  const container = document.querySelector("#controls");

  const div = document.createElement("div");
  div.classList.add("flex");
  div.classList.add("justify-between");

  const buttonLeft = document.createElement("button");
  buttonLeft.textContent = "<";
  buttonLeft.classList.add(...buttonClasses);
  buttonLeft.classList.add(...buttonRedClasses);
  div.appendChild(buttonLeft);
  buttonLeft.onclick = onLeftButtonClick;

  const cardNumbers = document.createElement("para");
  cardNumbers.textContent = "0/0";
  cardNumbers.id = "card-numbers";
  div.appendChild(cardNumbers);

  const buttonRight = document.createElement("button");
  buttonRight.textContent = ">";
  buttonRight.classList.add(...buttonClasses);
  buttonRight.classList.add(...buttonRedClasses);
  div.appendChild(buttonRight);
  buttonRight.onclick = onRightButtonClick;

  container.appendChild(div);
}

const shift = 10;

function onLeftButtonClick(event) {
  if (currentStartIndex - shift < 0) return;
  onButtonClick(event, -shift);
}

function onRightButtonClick(event) {
  if (currentEndIndex + shift > 1350) return;
  onButtonClick(event, shift);
}

function onButtonClick(event, shift) {
  // event.preventDefault();
  const label = document.getElementById("card-numbers");
  setIndices(currentStartIndex + shift, currentEndIndex + shift);
  // const lastStartIndex = getPokemonAll.currentStartIndex;

  getPokemonAllWithInfos(currentStartIndex, currentEndIndex).then(
    (pokemons) => {
      const container = document.querySelector("#pokemons");
      container.innerHTML = "";
      pokemons.forEach((pokemon) => {
        showPokemonCard(pokemon);
      });
    },
  );
}
