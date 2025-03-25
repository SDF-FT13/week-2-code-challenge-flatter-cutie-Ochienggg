// Your code here
document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const voteCountElement = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const resetButton = document.getElementById("reset-btn");

    let currentCharacter = null;

    fetch("https://flatacuties-server-vercel-ochiengs-projects-d19fc4ec.vercel.app/characters")
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.style.cursor = "pointer";
                span.addEventListener("click", () => displayCharacter(character));
                characterBar.appendChild(span);
            });
        });

    function displayCharacter(character) {
        currentCharacter = character;
        nameElement.textContent = character.name;
        imageElement.src = character.image;
        imageElement.alt = character.name;
        voteCountElement.textContent = character.votes;
    }

    votesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!currentCharacter) return;

        const votesInput = document.getElementById("votes");
        const votesToAdd = parseInt(votesInput.value) || 0;

        currentCharacter.votes += votesToAdd;
        voteCountElement.textContent = currentCharacter.votes;
        votesInput.value = "";
fetch("https://flatacuties-server-vercel-ochiengs-projects-d19fc4ec.vercel.app/characterss")
        fetch(`/http:///characters${currentCharacter.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ votes: currentCharacter.votes })
        });
    });

    resetButton.addEventListener("click", () => {
        if (!currentCharacter) return;
        currentCharacter.votes = 0;
        voteCountElement.textContent = 0;

        fetch(`https://flatacuties-server-vercel-ochiengs-projects-d19fc4ec.vercel.app/characters${currentCharacter.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ votes: 0 })
        });
    });
});