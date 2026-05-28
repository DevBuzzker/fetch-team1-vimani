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

        const noteBtn = document.createElement("button");
        noteBtn.textContent = "📝 Notiz";
        noteBtn.classList.add("bg-gray-200", "rounded", "px-2", "py-1", "text-xs", "mt-2");

        const textarea = document.createElement("textarea");
        textarea.placeholder = "Notiz schreiben...";
        textarea.classList.add("border-1", "border-gray-300", "rounded", "p-1", "text-xs", "w-full", "mt-2");
        textarea.style.display = "none";
        textarea.value = localStorage.getItem("note-" + data.id) || "";

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Speichern";
        saveBtn.classList.add("bg-red-500", "text-white", "rounded", "px-2", "py-1", "text-xs", "mt-1");
        saveBtn.style.display = "none";

        noteBtn.onclick = () => {
            const isOpen = textarea.style.display === "block";
            textarea.style.display = isOpen ? "none" : "block";
            saveBtn.style.display = isOpen ? "none" : "block";
            noteBtn.textContent = isOpen ? "📝 Notiz" : "❌ Schließen";
        };

        saveBtn.onclick = () => {
            localStorage.setItem("note-" + data.id, textarea.value);
            saveBtn.textContent = "✅ Gespeichert!";
            setTimeout(() => saveBtn.textContent = "Speichern", 1500);
        };

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(grid);
        card.appendChild(noteBtn);
        card.appendChild(textarea);
        card.appendChild(saveBtn);
        container.appendChild(card);
    }
}

showPokedex();
