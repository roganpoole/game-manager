const title = document.querySelector(".title");

const games=[];

function addGames(game, genre, popularity) {
    let isDuplicate = false;

    for (let i = 0; i < games.length; i++) {
        if (games[i].game === game) {
            isDuplicate = true;
            break;
        }
    }

    if (isDuplicate) {
        console.log("Game sudah ada!");
        return;
    }

    const newGame = {
        game: game,
        genre: genre,
        popularity: popularity
    };

    games.push(newGame);
}
function searchGames(searchValue) {
    const query = searchValue.trim().toLowerCase();

    
    if (query === "") {
        return null;
    }
    let bestMatch = null;
    let bestDistance = Infinity;
    
    for (let i = 0; i < games.length; i++) {
        const gameName = games[i].game.toLowerCase();
        if (gameName.includes(query)) {
            return games[i];
        }
        const distance = getEditDistance(query, gameName);
   
        if (distance < bestDistance){
            bestDistance = distance;
            bestMatch = games[i];
        }

    }
    if(bestDistance <= 2) {
            return bestMatch;
        }
    
        return null;
}

const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector("#searchButton");
const searchResult = document.querySelector("#searchResult");
searchButton.addEventListener("click", function() {
    const searchValue = searchInput.value;
    const gameFound = searchGames(searchValue);
    
    if (gameFound !== null) {
        searchResult.textContent = `${gameFound.game} | ${gameFound.genre} | ${gameFound.popularity}`;
    } else {
        searchResult.textContent = "Game tidak ditemukan!";
    }
});

function getEditDistance (a,b) {
    const dp = [];
    
    for (let i = 0; i <= a.length; i++){
        dp [i] = [];
        dp [i][0] = i;
    }

    for (let j = 0; j <= b.length; j++){
        dp[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++){
        for (let j = 1; j <= b.length; j++){
            const cost = a[i - 1] === b[j - 1]? 0 : 1;

            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost,
            );
        }

    }
    return dp[a.length][b.length];
}

addGames("Raft", "Survival Adventure", "Medium To High");
addGames("Minecraft", "Survival Adventure", "High");
addGames("Robloc", "Sandbox", "High");
addGames("Subnautica", "Survival Adventure", "High");
addGames("Stardew Valley", "Simulation", "Medium");
addGames("Terraria", "Sandbox Survival", "Medium");
addGames("The Forest", "Survival Adventure", "Medium");
addGames("The Sims 4", "Simulation", "High");
addGames("Valheim", "Survival Adventure", "Medium");
addGames("dying light", "Survival Adventure", "Medium");
addGames("elden ring", "Action RPG", "High");
addGames("god of war", "Action Adventure", "High");
addGames("Red Dead Redemption 2", "Action Adventure", "High");
addGames("EA Sports FC", "Sports Simulation", "High");
addGames("Efootball", "Sports Simulation", "High");
addGames("Ark: Survival Evolved", "Survival Adventure", "Medium");
addGames("Forza Horizon 6", "Racing Simulation", "High");
