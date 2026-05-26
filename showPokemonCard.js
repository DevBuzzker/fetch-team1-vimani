export function showPokemonCard(pokemon) {
  const container = document.querySelector("main");
  console.log(pokemon);
  const div = document.createElement("div");
  div.classList.add("border-black");
  div.classList.add("border-1");
  div.classList.add("m-2");
  div.classList.add("p-2");
  div.classList.add("w-40");
  div.classList.add("text-center");
  div.classList.add("flex-shrink-0");

  const img = document.createElement("img");
  img.src = pokemon.image;
  div.appendChild(img);

  const titlePara = document.createElement("p");
  titlePara.textContent = "#" + pokemon.id + " " + pokemon.name;
  div.appendChild(titlePara);

  container.appendChild(div);
}
