import { getPokemonSingle } from "./getPokemonSingle.js";

export const initSearchDialog = () => {
  const searchInput = document.querySelector("#searchInput");
  const searchButton = document.querySelector("#searchButton");

  const dialog = document.querySelector("#pokemonDialog");
  const dialogName = document.querySelector("#dialogName");
  const dialogImage = document.querySelector("#dialogImage");
  const dialogStats = document.querySelector("#dialogStats");
  const closeDialog = document.querySelector("#closeDialog");

  closeDialog.addEventListener("click", () => {
    dialog.close();
  });

  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      searchButton.click();
    }
  });

  searchButton.addEventListener("click", async () => {
    const value = searchInput.value.trim();
    searchInput.value = "";

    if (!value) return;

    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`;
      const pokemon = await getPokemonSingle(url);

      //Name
      dialogName.textContent = pokemon.name;

      //Bild
      dialogImage.src = pokemon.sprites.other.dream_world.front_default;

      //Stats (hp, attack, defense)
      const hp = pokemon.stats.find((s) => s.stat.name === "hp").base_stat;
      const attack = pokemon.stats.find(
        (s) => s.stat.name === "attack",
      ).base_stat;
      const defense = pokemon.stats.find(
        (s) => s.stat.name === "defense",
      ).base_stat;

      dialogStats.textContent = `HP: ${hp} | Attack: ${attack} | Defense: ${defense}`;

      dialog.showModal();
    } catch (error) {
      dialogName.textContent = "Not found";
      dialogImage.src =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0XXGh-imC7d71CHDy39Q1FHCpoMURRD4gtw&s";
      dialogStats.textContent = "No Pokémon found with this name or ID.";

      dialog.showModal();
    }
  });
};
