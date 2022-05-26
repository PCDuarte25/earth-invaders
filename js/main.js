// const t_canhaoX = document.querySelector('.canhaoX');
// const t_canhaoY = document.querySelector('.canhaoY');
// const t_missilX = document.querySelector('.missilX');
// const t_missilY = document.querySelector('.missilY');
// const t_alienX = document.querySelector('.alienX');
// const t_alienY = document.querySelector('.alienY');
// const t_alienAtirador = document.querySelector('.alienAtirador');
const t_mouseX = document.querySelector('.mouseX');
const t_mouseY = document.querySelector('.mouseY');
const t_naveX = document.querySelector('.naveX');
const t_naveY = document.querySelector('.naveY');
const t_laserX = document.querySelector('.laserX');
const t_laserY = document.querySelector('.laserY');
const t_naveApareceu = document.querySelector('.naveApareceu');
const e_vidas = document.querySelector('.vidas');
const vidaUm = document.querySelector('.vida-um');
const vidaDois = document.querySelector('.vida-dois');
const vidaTres = document.querySelector('.vida-tres');
const e_pontuacao = document.querySelector('.pontuacao');
const e_pontuacaoGanha = document.querySelector('.pontuacao-ganha');
const e_pontoNave = document.querySelector('.ponto-nave');

var tela;
var c;
var bc;

var canhao;
var laser;
var alien;
var background;
var backgroundImage;

var canhaoX = 180;
var canhaoY = 529;
var laserX = 193;
var laserY = 520;
var missilX = 0;
var missilY = 0;
var alienX = 0;
var alienY = 0;
var naveY = 15;
var naveX = 399;
var metadeDoAlienX = 5;
var inicioLaser = false;
var missilFoiDisparado = false;
var naveComecou = false
var naveComecouEsquerda = false;
var naveComecouDireita = false;
var jogoAcabou = false;
var acertouNaveEspecial = false;
var impactoLaserX;
var laserMovendo;
var missilMovendo;
var intervalo = 17;
var posicao = 0;
var intervaloAparecerNave;
var intervaloMoverNave = 0;
var vidas = 3;
var pontuacao = 0;

var apagaPontoGanhoIdTimeOut = 0;

var alienLinhas = [10, 38, 66, 94, 122, 150, 178, 206, 234, 262, 290];
var alienColunas = [55, 85, 115, 145, 175];
var aliensRestantes = [];

const C_ALTURA = 600;
const C_LARGURA = 400;

const TECLA_ESQUERDA = 37;
const TECLA_DIREITA = 39;
const TECLA_ACIMA = 38;

// (movimentação)
var map = {};
onkeydown = onkeyup = function(e){
    map[e.keyCode] = e.type == 'keydown';

    if (map[TECLA_ESQUERDA]) {
        if (canhaoX >= 9){
            c.clearRect(canhaoX, 537, 31, 19);
            canhaoX -= 8;
            laserX -= 8;
            c.drawImage(canhao, canhaoX, canhaoY);
        }
    }

    if (map[TECLA_DIREITA]) {
        if (canhaoX <= 360) {
            c.clearRect(canhaoX, 537, 31, 19);
            canhaoX += 8;
            laserX += 8;
            c.drawImage(canhao, canhaoX, canhaoY);
        }
    }

    if (map[TECLA_ACIMA]) {
        if (!inicioLaser) {
            inicioLaser = true;
            c.drawImage(laser, laserX, laserY);
            impactoLaserX = laserX;
            laserMovendo = setInterval("dispararLaser()", 10);
        }   
    }
}

iniciar(); 


// Sub-rotinas (funções)

// (telas)
function iniciar() {
    tela = document.getElementById("tela");
    background = document.getElementById("background");
    bc = background.getContext("2d");

    c = tela.getContext("2d");
    
    posicionarAlien();
    carregarImagens();
    
	setInterval("moverAliens()", intervalo);
    setInterval("alienAtingido()", 6);
    
    intervaloAparecerNave = setInterval(defineChanceAparecerNave, 5000);
    intervaloMoverNave = setInterval(moverNave, 18);

    tela.addEventListener('mousemove', (e) => {
        t_mouseX.textContent = `mouseX = ${e.offsetX}`;
        t_mouseY.textContent = `mouseY = ${e.offsetY}`;
    });
}

// (nave-especial)
function defineChanceAparecerNave() {
    if(naveComecou) return;

    let chanceNaveAparecer = parseFloat(Math.random().toFixed(1));
    if(chanceNaveAparecer <= 0.2) {
        t_naveApareceu.textContent = `nave apareceu = sim, numero sorteado = ${chanceNaveAparecer}`
        defineComecoNave();
    } else {
        t_naveApareceu.textContent = `nave apareceu = não, numero sorteado = ${chanceNaveAparecer}`
    }
}

// (aliens)
function posicionarAlien() {
    for (var i = 0; i < alienLinhas.length; i++){
        for (var j = 0; j < alienColunas.length; j++){
            var novoAlien = {
                posX : alienLinhas[i],
                posY : alienColunas[j],
                foiAtingido : false
			};
			
            aliensRestantes[aliensRestantes.length] = novoAlien;
        }
    }
}

// (telas)
function carregarImagens() {
    canhao = new Image();
    canhao.src = "sprites/canhao.png";
    canhao.onload = function(){
        c.drawImage(canhao, canhaoX, canhaoY);
    }
    
    laser = new Image();
    laser.src = "sprites/laser.png";
    
    alien = new Image();
    alien.src = "sprites/rocket1.png";

    alien2 = new Image();
    alien2.src = "sprites/rocket2.png";

    alien3 = new Image();
    alien3.src = "sprites/rocket3.png";

    missil = new Image();
    missil.src = "sprites/missil.png"

    naveEspecial = new Image();
    naveEspecial.src = "sprites/special-ship.png"

    backgroundImage = new Image()
    backgroundImage.src = "sprites/background.png";
    backgroundImage.onload = function(){
        bc.drawImage(backgroundImage, 0, 0);
    }
}

// (aliens)
function moverAliens(){
    if (posicao <= 65){
        alienX += 1;
        posicao += 1;
    } else if ((posicao > 65) && (posicao <= 80)){
        alienX += 1;
        alienY += 1
        posicao += 1;            
    } else if ((posicao > 80) && (posicao <= 147)){
        alienX -= 1;
        posicao += 1;
    } else if ((posicao > 147) && (posicao < 162)){
        alienX -= 1;
        alienY += 1;
        posicao += 1;
    } else {
        posicao = 0;
    }
    
    // t_alienX.textContent = `alienX = ${alienX}` 
    // t_alienY.textContent = `alienY = ${alienY}` 

    for (var i = 0; i < aliensRestantes.length; i++){

        if (!aliensRestantes[i].foiAtingido){
            if (i % 5 === 0 || i % 5 === 1) {
                c.clearRect((alienX + aliensRestantes[i].posX - 1), (alienY + aliensRestantes[i].posY - 1), 20, 25);
                c.drawImage(alien3, (alienX + aliensRestantes[i].posX), (alienY + aliensRestantes[i].posY));
            } else if (i % 5 === 2 || i % 5 === 3) {
                c.clearRect((alienX + aliensRestantes[i].posX - 1), (alienY + aliensRestantes[i].posY - 1), 20, 25);
                c.drawImage(alien2, (alienX + aliensRestantes[i].posX), (alienY + aliensRestantes[i].posY));
            } else {
                c.clearRect((alienX + aliensRestantes[i].posX - 1), (alienY + aliensRestantes[i].posY - 1), 20, 25);
                c.drawImage(alien, (alienX + aliensRestantes[i].posX), (alienY + aliensRestantes[i].posY));
            }
            
            if ((aliensRestantes[i].posY + alienY + 23) >= 530){
                fimDeJogo();
            }
        }
    }

    for (let i = 0; i < aliensRestantes.length; i++) {
        if (!aliensRestantes[i].foiAtingido){
            enfileraMissil();
            break;
        }
    }
}

// (nave-especial)
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
        naveX = 400;
    }
}
// (nave-especial)
function moverNave() {
    if(!naveComecou) return;

    laserAcertouNave()

    if (naveComecouEsquerda) {
        naveX += 3;
    } 

    if(naveX > 400 && naveComecouEsquerda) {
        naveComecou = false;
    }

    if(naveComecouDireita) {
        naveX -= 3;
    }

    if(naveX < -52 && naveComecouDireita) {
        naveComecou = false;
    }

    t_naveX.textContent = `naveX = ${naveX}`;
    t_naveY.textContent = `naveY = ${naveY}`;
    
    const offset = naveComecouEsquerda ? -3 : 3;

    if(acertouNaveEspecial) return;

    c.clearRect(naveX + offset, naveY, 52, 37);
    c.drawImage(naveEspecial, naveX, naveY);
}

// (nave-especial)
function laserAcertouNave(){
    if ((laserY <= naveY + 30 && laserY !== 0) && (laserY >= naveY) && (impactoLaserX >= naveX) && (impactoLaserX + 6 <= naveX + 55)) {
        acertouNaveEspecial = true;
        c.clearRect(naveX - 1, naveY - 1, 400, 37);
        naveComecou = false;
        c.clearRect(impactoLaserX, laserY, 6, 19);
        laserY = 0;
        const pontoNave = Math.floor((Math.random() * 50)) + 50;
        pontuacao += pontoNave;
        mostraPontoGanho(pontoNave);
        e_pontuacao.textContent = `SCORE: ${pontuacao.toString().padStart(5, '0')}`
        e_pontoNave.textContent = `+ ${pontoNave}`;
        e_pontoNave.style.top = naveY + 10;
        e_pontoNave.style.left = naveX + 10;
        e_pontoNave.style.display = "block";
        e_pontoNave.classList.add('ganhar-ponto');
        setTimeout(() => {
            e_pontoNave.style.display = 'none';
        }, 1500);
    }
}

// (alien)
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
                    pontuacao += 40;
                    mostraPontoGanho(40);
                }
                if (i % 5 === 2 || i % 5 === 3) {
                    pontuacao += 20;
                    mostraPontoGanho(20);
                }
                if (i % 5 === 4) {
                    pontuacao += 10;
                    mostraPontoGanho(10);
                }
            }

            e_pontuacao.textContent = `SCORE: ${pontuacao.toString().padStart(5, '0')}`

            if (!aa.foiAtingido){
                c.clearRect((alienX + aliensRestantes[i].posX - 1), (alienY + aliensRestantes[i].posY - 1), 20, 25);
                aliensRestantes[i].foiAtingido = true;
                c.clearRect(impactoLaserX, laserY, 6, 19);
                laserY = 0;
            }

        }
    }    
}

// (hud)
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

// (aliens) (aliens-atirar)
function missilAcertouCanhao(){
    if ((missilY - 27 >= canhaoY) 
            && (missilY - 27 <= canhaoY + 30) 
            && (missilX >= canhaoX - 5)
            && (missilX <= canhaoX + 25)){
        vidas--;
        if(vidas === 0) {
            fimDeJogo();
        }
        return true;
    }
    return false;
}

// (telas)
function fimDeJogo(){
    clearInterval(intervaloAparecerNave);
    laserX = 193;
    laserY = 520;
    alienX = 0;
    alienY = 0;
    posicao = 0;
    naveX = 0;
    naveY = 0;
    aliensRestantes = [];
    inicioLaser = false;
    missilFoiDisparado = false;
    naveComecou = false;
    missilY = 650;
    e_vidas.style.display = 'none';
	
    c.fillStyle = "black";
	c.fillRect(0, 0, C_LARGURA, C_ALTURA);
    
    c.textAlign = "center";
    c.font = "24px Koulen Regular";
    c.fillStyle = "white";
    c.fillText("Fim de Jogo", C_LARGURA/2, C_ALTURA/2);

    onkeydown = null;
}

// (movimentação)
function dispararLaser(){
    if (inicioLaser && (laserY >= 0)){
        laserY -= 20;
        c.clearRect(impactoLaserX, (laserY + 20), 6, 19);
		
        if (laserY >= 0){
            c.drawImage(laser, impactoLaserX, laserY);
        }
    }
	
    if (laserY < 0){
        clearInterval(laserMovendo);
        inicioLaser = false;
        laserY = 520;
    }

    t_laserX.textContent = `laserX = ${laserX}`
    t_laserY.textContent = `laserY = ${laserY}`
}

// (aliens) (aliens-atirar)
function defineAtirador() {
    const colunaAtiradora = Math.floor(Math.random() * alienLinhas.length);

    for (let j = alienColunas.length - 1; j >= 0; j--) {
        const linhaAtual = j % 5;
        const indiceAlienAtual = colunaAtiradora * 5 + linhaAtual;
        alienAtual = aliensRestantes[indiceAlienAtual];
        if (!alienAtual.foiAtingido) {
            // t_alienAtirador.textContent = `alien atirador = ${indiceAlienAtual} | linha = ${linhaAtual} | coluna = ${colunaAtiradora}`
            return alienAtual;
            c.drawImage(missil, metadeDoAlienX + alienAtual.posX, alienAtual.posY + 33 + missilY);
        } 
    }
    return defineAtirador();
}

// (aliens) (aliens-atirar)
function enfileraMissil(){
    if (!missilFoiDisparado) {
        var alienAtual = defineAtirador();
        missilFoiDisparado = true;
        missilY = alienY + alienAtual.posY + 68;
        missilX = alienX + alienAtual.posX + metadeDoAlienX;
        missilMovendo = setInterval(disparaMissil, 40, alienAtual, missilX);
    }
}

// (aliens) (aliens-atirar)
function disparaMissil(alienAtual, posX){
    c.clearRect((posX), (missilY - 37), 10, 27);
    c.drawImage(missil, posX, missilY - 27);
    missilY += 10;

    if(missilAcertouCanhao()) {
        clearInterval(missilMovendo);
        missilFoiDisparado = false;
        c.clearRect((posX), (missilY - 37), 10, 27);
        if (vidas != 0) {
            c.drawImage(canhao, canhaoX, canhaoY);
        }
    }

    removeVida();
    // t_missilY.textContent = `missilY = ${missilY}`
    // t_missilX.textContent = `missilX = ${missilX}`
    
    if (missilY >= 635) {
        clearInterval(missilMovendo);
        missilFoiDisparado = false;
        missilY = alienY + alienAtual.posY + 33;
    }
}

// (hud)
function removeVida() {
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