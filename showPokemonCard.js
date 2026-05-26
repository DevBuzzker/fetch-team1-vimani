import {
  currentStartIndex,
  currentEndIndex,
  getPokemonAllWithInfos,
  setIndices,
} from "./getPokemonAll.js";
export function showPokemonCard(pokemon) {
  const container = document.querySelector("#pokemons");
  console.log(pokemon);
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

  container.appendChild(div);
}

export function showScrollElements() {
  const container = document.querySelector("#controls");

  const div = document.createElement("div");
  div.classList.add("flex");
  div.classList.add("justify-between");

  const buttonClasses = [
    "px-3",
    "py-2",
    "bg-red-500",
    "text-white",
    "rounded",
    "hover:bg-red-600",
    "transition",
  ];

  const buttonLeft = document.createElement("button");
  buttonLeft.textContent = "<";
  buttonLeft.classList.add(...buttonClasses);
  div.appendChild(buttonLeft);
  buttonLeft.onclick = onLeftButtonClick;

  const cardNumbers = document.createElement("para");
  cardNumbers.textContent = "0/0";
  cardNumbers.id = "card-numbers";
  div.appendChild(cardNumbers);

  const buttonRight = document.createElement("button");
  buttonRight.textContent = ">";
  buttonRight.classList.add(...buttonClasses);
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
