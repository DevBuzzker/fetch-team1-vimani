import { getPokemonAllWithInfos } from "./getPokemonAll.js";
import { initSearchDialog } from "./searchDialog.js";

console.log("main.js");
const bodyElement = document.querySelector("body");
console.log(bodyElement);

getPokemonAllWithInfos(0, 10).then((pokemons) => {
  console.log(pokemons);
  pokemons.forEach((pokemon) => {
    const para = document.createElement("p");
    // console.log(pokemon);
    para.textContent = pokemon.name + " Attack: " + pokemon.attack;
    bodyElement.appendChild(para);
  });
});
console.log("test");

initSearchDialog();
