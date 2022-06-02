function populaRanking() {
    for (let i = 0; i < jogadores.length && i < 5; i++) {
        let jogadorAtual = jogadores[i];
        rankingUsernames[i].textContent = jogadorAtual.name;
        rankingScores[i].textContent = jogadorAtual.score;
    }
}

populaRanking();

if(!jogoComecou) {
    backBtnRanking.addEventListener('click', voltaMenuOuVoltaTelaResultado);
}

function voltaMenuOuVoltaTelaResultado() {
    if (jogoAcabou && jogadorVenceu) {
        e_rankingScreen.style.display = "none";
        e_backgroundWinGame.style.display = "block";

    } else if (jogoAcabou && jogadorPerdeu) {
        e_rankingScreen.style.display = "none";
        e_backgroundLoseGame.style.display = "block";

    } else {
        e_initialGameScreen.style.display = "block";
        e_rankingScreen.style.display = "none";
    }
}