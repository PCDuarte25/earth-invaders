function defineChanceAparecerNave() {
    if(naveComecou) return;

    let chanceNaveAparecer = parseFloat(Math.random().toFixed(1));
    if(chanceNaveAparecer <= CHANCE_APARECER_NAVE) {
        spaceShipMoving.play();
        t_naveApareceu.textContent = `nave apareceu = sim, numero sorteado = ${chanceNaveAparecer}`
        defineComecoNave();
    } else {
        t_naveApareceu.textContent = `nave apareceu = não, numero sorteado = ${chanceNaveAparecer}`
    }
}

function defineComecoNave() {
    naveComecou = true;
    acertouNaveEspecial = false;
    let comecoOuFim = Math.floor(Math.random() * 2);
    if (comecoOuFim === 1) {
        naveX = 0;
        naveComecouEsquerda = true;
        naveComecouDireita = false;
    } else {
        naveComecouDireita = true;
        naveComecouEsquerda = false;
        naveX = C_LARGURA;
    }
}

function moverNave() {
    if(!naveComecou) return;

    laserAcertouNave()

    if (naveComecouEsquerda) {
        naveX += VELOCIDADE_NAVE;
    } 

    if(naveX > 400 && naveComecouEsquerda) {
        naveComecou = false;
        spaceShipMoving.loop = false;
        spaceShipMoving.pause();
    }

    if(naveComecouDireita) {
        naveX -= VELOCIDADE_NAVE;
    }

    if(naveX < -52 && naveComecouDireita) {
        naveComecou = false;
        spaceShipMoving.loop = false;
        spaceShipMoving.pause();
    }

    // Debugger tela incial
    t_naveX.textContent = `naveX = ${naveX}`;
    t_naveY.textContent = `naveY = ${naveY}`;
    
    const offset = naveComecouEsquerda ? -VELOCIDADE_NAVE : VELOCIDADE_NAVE;

    if(acertouNaveEspecial) return;

    c.clearRect(naveX + offset, naveY, 52, 37);
    c.drawImage(naveEspecial, naveX, naveY);
}

function laserAcertouNave(){
    if ((laserY <= naveY + 30 && laserY !== 0) && (laserY >= naveY) && (impactoLaserX >= naveX) && (impactoLaserX + 6 <= naveX + 55)) {
        acertouNaveEspecial = true;
        spaceShipHit.play();
        spaceShipMoving.loop = false;
        spaceShipMoving.pause();
        c.clearRect(naveX, naveY, 400, 37);
        naveComecou = false;
        c.clearRect(impactoLaserX, laserY, 6, 19);
        laserY = 0;
        const pontoNave = Math.floor((Math.random() * 50)) + 50;
        pontuacao += pontoNave;
        mostraPontoGanho(pontoNave);
        e_pontuacao.textContent = `SCORE: ${pontuacao.toString().padStart(5, '0')}`
        e_pontoNave.textContent = `+ ${pontoNave}`;
        e_pontoNave.style.display = "block";
        e_pontoNave.style.top = `${naveY + 10}px`
        e_pontoNave.style.left = `${naveX + 10}px`
        e_pontoNave.classList.add('ganhar-ponto');
        setTimeout(() => {
            e_pontoNave.style.display = 'none';
        }, 1500);
    }
}