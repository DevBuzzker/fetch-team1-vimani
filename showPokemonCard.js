export function showPokemonCard(pokemon) {
  const container = document.querySelector("main");
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
  div.appendChild(img);

  const titlePara = document.createElement("p");
  titlePara.textContent = "#" + pokemon.id + " " + pokemon.name;
  div.appendChild(titlePara);

  container.appendChild(div);
}
