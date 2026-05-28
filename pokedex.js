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
        card.classList.add("border-black", "border-1", "m-2", "p-2", "w-40", "flex", "flex-col", "items-center", "justify-center", "flex-shrink-0");

        const img = document.createElement("img");
        img.src = data.sprites.other.dream_world.front_default;
        img.classList.add("max-h-30", "h-30");

        const name = document.createElement("p");
        name.textContent = "#" + data.id + " " + data.name;

        const grid = document.createElement("div");
        grid.classList.add("grid", "grid-cols-2", "gap-x-2");

        const attackPara = document.createElement("p");
        attackPara.textContent = "⚔️" + attack;

        const defensePara = document.createElement("p");
        defensePara.textContent = "🛡️" + defense;

        const hpPara = document.createElement("p");
        hpPara.textContent = "❤️" + hp;

        const speedPara = document.createElement("p");
        speedPara.textContent = "👟" + speed;

        grid.appendChild(attackPara);
        grid.appendChild(defensePara);
        grid.appendChild(hpPara);
        grid.appendChild(speedPara);

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(grid);
        container.appendChild(card);
    }
}

showPokedex();
