import { getPokemonSingle } from "./getPokemonSingle.js";

export const initSearchDialog = () => {
  const searchInput = document.querySelector("#searchInput");
  const searchButton = document.querySelector("#searchButton");

  const dialog = document.querySelector("#pokemonDialog");
  const dialogId = document.querySelector("#dialogId");
  const dialogName = document.querySelector("#dialogName");
  const dialogImage = document.querySelector("#dialogImage");
  const dialogStats = document.querySelector("#dialogStats");
  const closeDialog = document.querySelector("#closeDialog");
  const dialogCatchContainer = document.querySelector("#dialogCatchContainer");

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

      //Id
      dialogId.textContent = `#${pokemon.id}`;

      //Name
      dialogName.textContent = pokemon.name;

      //Bild
      dialogImage.src = pokemon.sprites.other.dream_world.front_default;

      //Stats (hp, attack, defense, speed)
      const hp = pokemon.stats.find((s) => s.stat.name === "hp").base_stat;
      const attack = pokemon.stats.find(
        (s) => s.stat.name === "attack",
      ).base_stat;
      const defense = pokemon.stats.find(
        (s) => s.stat.name === "defense",
      ).base_stat;
      const speed = pokemon.stats.find(
        (s) => s.stat.name === "speed",
      ).base_stat;

      dialogStats.textContent = `Attack: ${attack} | Defense: ${defense} | HP: ${hp} | Speed: ${speed}`;

      // Catch Btn
      dialogCatchContainer.innerHTML = "";
      const catchBtn = document.createElement("button");
      catchBtn.classList.add("px-4", "py-2", "rounded", "text-white", "mt-2");

      //catchbtn funktion
      const switchCatchBtn = () => {
        const caught = localStorage.getItem(String(pokemon.id));
        const caughtBool = caught === "true";

        if (!caughtBool) {
          catchBtn.classList.remove("bg-green-500");
          catchBtn.classList.add("bg-red-500");
          catchBtn.textContent = "Catch!";
        } else {
          catchBtn.classList.remove("bg-red-500");
          catchBtn.classList.add("bg-green-500");
          catchBtn.innerHTML = "<b>✓</b> in Dex";
        }
      };

      switchCatchBtn();

      catchBtn.onclick = () => {
        const caught = localStorage.getItem(String(pokemon.id));
        const newValue = !(caught === "true");
        localStorage.setItem(String(pokemon.id), String(newValue));
        switchCatchBtn();
      };

      dialogCatchContainer.appendChild(catchBtn);

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
