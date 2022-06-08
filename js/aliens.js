function posicionarAlien() {
    for (var i = 0; i < ALIEN_LINHAS.length; i++){
        for (var j = 0; j < ALIEN_COLUNAS.length; j++){
            var novoAlien = {
                posX : ALIEN_LINHAS[i],
                posY : ALIEN_COLUNAS[j],
                foiAtingido : false
			};
			
            aliensRestantes[aliensRestantes.length] = novoAlien;
        }
    }
}

function moverAliens(){
    if (posicao <= 65){
        alienX += VELOCIDADE_ALIEN;
        posicao += VELOCIDADE_ALIEN;
    } else if ((posicao > 65) && (posicao <= 80)){
        alienX += VELOCIDADE_ALIEN;
        alienY += VELOCIDADE_ALIEN;
        posicao += VELOCIDADE_ALIEN;           
    } else if ((posicao > 80) && (posicao <= 147)){
        if (alienX <= 0) {
            alienX = 0;
        }
        alienX -= VELOCIDADE_ALIEN;
        posicao += VELOCIDADE_ALIEN;
    } else if ((posicao > 147) && (posicao < 162)){
        if (alienX <= 0) {
            alienX = 0;
        }
        alienX -= VELOCIDADE_ALIEN;
        alienY += VELOCIDADE_ALIEN;
        posicao += VELOCIDADE_ALIEN;
    } else {
        posicao = 0 + VELOCIDADE_ALIEN;
    }

    for (var i = 0; i < aliensRestantes.length; i++){

        if (!aliensRestantes[i].foiAtingido){
            if (i % 5 === 0 || i % 5 === 1) {
                c.clearRect((alienX + aliensRestantes[i].posX - VELOCIDADE_ALIEN), (alienY + aliensRestantes[i].posY - VELOCIDADE_ALIEN), 21, 25);
                c.drawImage(alien3, (alienX + aliensRestantes[i].posX), (alienY + aliensRestantes[i].posY));
            } else if (i % 5 === 2 || i % 5 === 3) {
                c.clearRect((alienX + aliensRestantes[i].posX - VELOCIDADE_ALIEN), (alienY + aliensRestantes[i].posY - VELOCIDADE_ALIEN), 21, 25);
                c.drawImage(alien2, (alienX + aliensRestantes[i].posX), (alienY + aliensRestantes[i].posY));
            } else {
                c.clearRect((alienX + aliensRestantes[i].posX - VELOCIDADE_ALIEN), (alienY + aliensRestantes[i].posY - VELOCIDADE_ALIEN), 21, 25);
                c.drawImage(alien, (alienX + aliensRestantes[i].posX), (alienY + aliensRestantes[i].posY));
            }
            
            if ((aliensRestantes[i].posY + alienY + 23) >= CANHAO_Y_ORIGINAL){
                fimDeJogoDerrota();
            }

            if(jogoAcabou) {
                c.clearRect(alienX, alienY, 400, 600);
            }
            
            alienAcertouBarreira2();
            alienAcertouBarreira();
        }            
    }

    if (Date.now() > INTERVALO_ENTRE_DISPAROS_MISSIL + ultimoDateDoDisparoMissil) {
        for (let i = 0; i < aliensRestantes.length; i++) {
            if (!aliensRestantes[i].foiAtingido){
                enfileraMissil();
                break;
            }
        }
        ultimoDateDoDisparoMissil = Date.now();
    }
}

function alienAtingido(){
    for(var i = 0; i < aliensRestantes.length; i++){
        const aa = aliensRestantes[i];
        const posicaoRealY = alienY + aa.posY
        const posicaoRealX = alienX + aa.posX
        
        if ((laserY >= posicaoRealY) 
                && (laserY <= (posicaoRealY + 20)) 
                && (impactoLaserX >= (posicaoRealX - 5)) 
                && (impactoLaserX <= (posicaoRealX + 18))){

                              
            if (!aa.foiAtingido) { 
                if (i % 5 === 0 || i % 5 === 1) {
                    pontuacao += PONTUACAO_ALIEN_3;
                    mostraPontoGanho(PONTUACAO_ALIEN_3);
                }
                if (i % 5 === 2 || i % 5 === 3) {
                    pontuacao += PONTUACAO_ALIEN_2;
                    mostraPontoGanho(PONTUACAO_ALIEN_2);
                }
                if (i % 5 === 4) {
                    pontuacao += PONTUACAO_ALIEN;
                    mostraPontoGanho(PONTUACAO_ALIEN);
                }
            }
            
            e_pontuacao.textContent = `SCORE: ${pontuacao.toString().padStart(5, '0')}`
            
            if (!aa.foiAtingido){
                aliensAbatido++;
                c.clearRect((alienX + aliensRestantes[i].posX - 1), (alienY + aliensRestantes[i].posY - 1), 20, 25);
                aliensRestantes[i].foiAtingido = true;
                alienHit.play();
                c.clearRect(impactoLaserX, laserY, 6, 19);
                laserY = 0;
                checaSeJogadorGanhou() 
            }
            
            aceleraAliens(aliensAbatido);
            
        }
    }    
}

function missilAcertouCanhao(){
    if ((missilY - 27 >= canhaoY) 
            && (missilY - 27 <= canhaoY + 30) 
            && (missilX >= canhaoX - 5)
            && (missilX <= canhaoX + 25)){
        canonHit.play();
        vidas--;
        if(vidas === 0) {
            fimDeJogoDerrota();
        }
        return true;
    }
    return false;
}

function defineAtirador() {
    const colunaAtiradora = Math.floor(Math.random() * ALIEN_LINHAS.length);

    for (let j = ALIEN_COLUNAS.length - 1; j >= 0; j--) {
        const linhaAtual = j % 5;
        const indiceAlienAtual = colunaAtiradora * 5 + linhaAtual;
        var alienAtual = aliensRestantes[indiceAlienAtual];
        if (!alienAtual.foiAtingido) {
            // Debugger na tela
            
            // t_alienAtirador.textContent = `alien atirador = ${indiceAlienAtual} | linha = ${linhaAtual} | coluna = ${colunaAtiradora}`
            return alienAtual;
            c.drawImage(missil, metadeDoAlienX + alienAtual.posX, alienAtual.posY + 33 + missilY);
        } 
    }
    return defineAtirador();
}

function enfileraMissil(){
    if (!missilFoiDisparado) {
        var alienAtual = defineAtirador();
        missilFoiDisparado = true;
        missilY = alienY + alienAtual.posY + 68;
        missilX = alienX + alienAtual.posX + metadeDoAlienX;
        missilMovendo = setInterval(disparaMissil, INTERVALO_MISSIL, alienAtual, missilX);
    }
}

function disparaMissil(alienAtual, posX){
    c.clearRect((posX), (missilY - VELOCIDADE_MISSIL - 27), 10, 27);
    c.drawImage(missil, posX, missilY - 27);
    missilY += VELOCIDADE_MISSIL;

    if(missilAcertouCanhao()) {
        clearInterval(missilMovendo);
        missilFoiDisparado = false;
        c.clearRect((posX), (missilY - VELOCIDADE_MISSIL - 27), 10, 27);
        if (vidas != 0) {
            c.drawImage(canhao, canhaoX, canhaoY);
        }
    }

    if(quadradoAtingidoPorMissil()) {
        clearInterval(missilMovendo);
        missilFoiDisparado = false;
        c.clearRect((posX), (missilY - VELOCIDADE_MISSIL - 27), 10, 27);
        desenhaBarreira();
    }

    if(quadradoAtingidoPorMissil2()) {
        clearInterval(missilMovendo);
        missilFoiDisparado = false;
        c.clearRect((posX), (missilY - VELOCIDADE_MISSIL - 27), 10, 27);
        desenhaBarreira();
    }

    removeVida(vidas);
    
    if (missilY >= C_ALTURA + 35) {
        clearInterval(missilMovendo);
        missilFoiDisparado = false;
        missilY = alienY + alienAtual.posY + 33;
    }
}

function alienAcertouBarreira() {
    for (let i = 0; i < aliensRestantes.length; i++) {
        let alien = aliensRestantes[i];
        if (alien.foiAtingido) continue;

        for (let j = 0; j < quadradosRestantes.length; j++) {
            let quadrado = quadradosRestantes[j];

            if (!quadrado.quadradoFoiAtingido) {
                if (
                    (alienY + alien.posY + 23 >= quadrado.posY) 
                    // && (alienY + alien.posY + 23 <= quadrado.posY - 5) 
                    && (quadrado.posX + 5 >= alienX + alien.posX)
                    && (quadrado.posX <= alienX + alien.posX + 18)
                ) {
                    apagaBarreira(quadradosRestantes);
                    alien.foiAtingido = true;
                    c.clearRect(alienX + alien.posX, alienY + alien.posY, 18, 23);
                }
            } 
        }
    }
}

function alienAcertouBarreira2() {
    for (let i = 0; i < aliensRestantes.length; i++) {
        let alien = aliensRestantes[i];
        if (alien.foiAtingido) continue;

        for (let j = 0; j < quadradosRestantes2.length; j++) {
            let quadrado = quadradosRestantes2[j];

            if (!quadrado.quadradoFoiAtingido) {
                if (
                    (alienY + alien.posY + 23 >= quadrado.posY)  
                    // && (alienY + alien.posY + 23 <= quadrado.posY - 5) 
                    && (quadrado.posX + 5 >= alienX + alien.posX)
                    && (quadrado.posX <= alienX + alien.posX + 18)
                ) {
                    apagaBarreira(quadradosRestantes2);
                    alien.foiAtingido = true;
                    c.clearRect(alienX + alien.posX, alienY + alien.posY, 18, 23);
                }
            } 
        }
    }
}

function aceleraAliens(aliensAbatido) {
    if(aliensAbatido === 10) {
        VELOCIDADE_ALIEN = 0.5;
        clearInterval(intervaloSomAlienSeMexendo);
        intervaloSomAlienSeMexendo = setInterval(somAlienMexendo, 500);
    }
    if(aliensAbatido === 20) {
        VELOCIDADE_ALIEN = 0.7;
        clearInterval(intervaloSomAlienSeMexendo);
        intervaloSomAlienSeMexendo = setInterval(somAlienMexendo, 300);
    }
    if(aliensAbatido === 30) {
        VELOCIDADE_ALIEN = 0.9;
        clearInterval(intervaloSomAlienSeMexendo);
        intervaloSomAlienSeMexendo = setInterval(somAlienMexendo, 100);
    }
    if(aliensAbatido === 40) {
        VELOCIDADE_ALIEN = 1.1;
        clearInterval(intervaloSomAlienSeMexendo);
        intervaloSomAlienSeMexendo = setInterval(somAlienMexendo, 20);
    }
}

function apagaBarreira(array) {
    for (let k = 0; k < array.length; k++) {
        let quadrado = array[k];
        if(!quadrado.quadradoFoiAtingido) {
            quadrado.quadradoFoiAtingido = true;
            c.clearRect(quadrado.posX, quadrado.posY, 5, 5);
        }
    }
}