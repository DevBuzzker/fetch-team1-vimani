import {
  currentStartIndex,
  currentEndIndex,
  getPokemonAllWithInfos,
} from "./getPokemonAll.js";
import { showPokemonCard, showScrollElements } from "./showPokemonCard.js";

console.log("main.js");
const bodyElement = document.querySelector("body");
// bodyElement.classList.add("flex");
// bodyElement.classList.add("flex-auto");
// bodyElement.classList.add("my-6");
// bodyElement.classList.add("auto-rows-auto");
// bodyElement.classList.add("mx-4");
console.log(bodyElement);
showScrollElements();

getPokemonAllWithInfos(currentStartIndex, currentEndIndex).then((pokemons) => {
  // console.log(pokemons);
  pokemons.forEach((pokemon) => {
    // const para = document.createElement("p");
    // // console.log(pokemon);
    // para.textContent = pokemon.name + " Attack: " + pokemon.attack;
    // bodyElement.appendChild(para);
    showPokemonCard(pokemon);
  });
});
console.log("test");
