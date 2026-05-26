import { getPokemonSingle } from "./getPokemonSingle.js";
import { getPokemonSingleReduced } from "./getPokemonSingle.js";

// var allPokeNameUrl = await getPokemonAll();
// console.log(allPokeNameUrl);
// var allWithInfos = await getPokemonAllWithInfos(10, 20);
// console.log(allWithInfos);

// gives 1350 objects like
// {name:"bulbasaur", url:"https://pokeapi.co/api/v2/pokemon/1/"}
async function getPokemonAll() {
  // Es gibt 1350 total.
  var res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=9999");
  var json = await res.json();
  return json.results;
  // fetch("https://pokeapi.co/api/v2/pokemon?limit=9999")
  //   .then((res) => res.json())
  //   .then((json) => console.log(json.results));
}

export let currentStartIndex = 0;
export let currentEndIndex = 10;

export function setIndices(start, end) {
  currentStartIndex = start;
  currentEndIndex = end;
}

export async function getPokemonAllWithInfos(startIndex, endIndex) {
  const allNoInfos = await getPokemonAll();
  // console.log(allNoInfos);
  const allWithInfos = [];
  // let i = startIndex;
  currentStartIndex = startIndex;
  currentEndIndex = endIndex;

  for (let i = startIndex; i < endIndex; i++) {
    // console.log(pokemonNoInfo.name);
    const pokemonNoInfo = allNoInfos[i];
    var pokemonWithInfo = await getPokemonSingleReduced(pokemonNoInfo.url);
    allWithInfos.push(pokemonWithInfo);
  }

  var indexLabel = document.getElementById("card-numbers");
  indexLabel.textContent = `${startIndex + 1}-${endIndex}`;

  return allWithInfos;
}
