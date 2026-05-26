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

let allNoInfosCache = [];

export async function getPokemonAllWithInfos(startIndex, endIndex) {
  if (allNoInfosCache.length === 0) {
    allNoInfosCache = await getPokemonAll();
  }

  const allWithInfos = [];

  for (let i = startIndex; i < endIndex; i++) {
    const pokemonNoInfo = allNoInfosCache[i];
    const pokemonWithInfo = await getPokemonSingleReduced(pokemonNoInfo.url);
    allWithInfos.push(pokemonWithInfo);
  }

  const indexLabel = document.getElementById("card-numbers");
  if (indexLabel) {
    indexLabel.textContent = `${startIndex + 1}-${endIndex}`;
  }

  return allWithInfos;
}
