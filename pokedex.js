import { initSearchDialog } from "./searchDialog.js";

initSearchDialog();

console.log("test");

async function showPokedex() {
    const container = document.querySelector("#pokedex-container");
    const caughtIds = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        if (value === "true") {
            caughtIds.push(key);
        }
    }

    console.log("Gefangene IDs:", caughtIds);

    for (const id of caughtIds) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();

        const hp = data.stats.find((x) => x.stat.name === "hp").base_stat;
        const attack = data.stats.find((x) => x.stat.name === "attack").base_stat;
        const defense = data.stats.find((x) => x.stat.name === "defense").base_stat;
        const speed = data.stats.find((x) => x.stat.name === "speed").base_stat;

        const card = document.createElement("div");
        card.classList.add("border-black", "border-1", "m-2", "p-2", "w-40", "flex", "flex-col", "items-center");

        const img = document.createElement("img");
        img.src = data.sprites.other.dream_world.front_default;

        const name = document.createElement("p");
        name.textContent = "#" + data.id + " " + data.name;

        const stats = document.createElement("p");
        stats.classList.add("text-xs", "text-gray-500");
        stats.textContent = `HP:${hp} ATK:${attack} DEF:${defense} SPD:${speed}`;

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(stats);
        container.appendChild(card);
    }
}

showPokedex();
