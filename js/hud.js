function mostraPontoGanho(pontosGanhos) {
    if (apagaPontoGanhoIdTimeOut > 0) {
        clearTimeout(apagaPontoGanhoIdTimeOut);
        apagaPontoGanhoIdTimeOut = 0;
        e_pontuacaoGanha.classList.remove('ganhar-ponto');
    }

    e_pontuacaoGanha.textContent = `+ ${pontosGanhos}`;
    e_pontuacaoGanha.style.display = 'block';
    e_pontuacaoGanha.classList.add('ganhar-ponto');
    apagaPontoGanhoIdTimeOut = setTimeout(() => {
        e_pontuacaoGanha.style.display = 'none';
        e_pontuacaoGanha.classList.remove('ganhar-ponto');
        apagaPontoGanhoIdTimeOut = 0;
    }, 1000);
}

function removeVida(vidas) {
    if (vidas === 2) {
        vidaUm.classList.add("perder-vida", "sumir");
    }
    if (vidas === 1) {
        vidaDois.classList.add("perder-vida", "sumir");
    }
    if (vidas === 0) {
        vidaTres.classList.add("sumir");
    }
}