const pokemon = await getPokemonSingle("https://pokeapi.co/api/v2/pokemon/1/");
console.log(pokemon);
// writePokemonInfosToConsole(pokemon);

function writePokemonInfosToConsole(pokemon) {
  console.log(pokemon.name);
  // SVG image
  console.log(pokemon.sprites.other.dream_world.front_default);
  // console.log(pokemon.types);
  console.log("Types: " + pokemon.types.map((x) => x.type.name)); // types as array. E.g. ['grass', 'poison']
  console.log(pokemon.stats);
  const stats = pokemon.stats;
  const hp = stats.find((x) => x.stat.name == "hp").base_stat;
  console.log("hp: " + hp);
  const attack = stats.find((x) => x.stat.name === "attack").base_stat;
  console.log("attack: " + attack);
  const defense = stats.find((x) => x.stat.name === "defense").base_stat;
  console.log("defense: " + defense);
  const speed = stats.find((x) => x.stat.name === "speed").base_stat;
  console.log("speed: " + speed);
}

export async function getPokemonSingle(url) {
  // Es gibt 1350 total.
  var res = await fetch(url);
  // console.log(res);
  var singlePokemonJson = await res.json();
  // console.log(json);
  return singlePokemonJson;
}
export async function getPokemonSingleReduced(url) {
  var pokemonFull = await getPokemonSingle(url);
  return {
    id: pokemonFull.id,
    name: pokemonFull.name,
    hp: pokemonFull.stats.find((x) => x.stat.name == "hp").base_stat,
    attack: pokemonFull.stats.find((x) => x.stat.name === "attack").base_stat,
    defense: pokemonFull.stats.find((x) => x.stat.name === "defense").base_stat,
    speed: pokemonFull.stats.find((x) => x.stat.name === "speed").base_stat,
    image: pokemonFull.sprites.other.dream_world.front_default,
  };
}
