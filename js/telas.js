function preIniciar() {
    tela = document.getElementById("tela");
    background = document.getElementById("background");
    bc = background.getContext("2d");
    c = tela.getContext("2d");

    e_initialGameScreen.style.display = "none";
    e_hud.style.display = 'block';

    e_btnMenuWin.addEventListener('click', voltaMenu);
    e_btnMenuWin.addEventListener('mouseover', function(){
        menuNavigate.play();
    })

    e_btnMenuLose.addEventListener('click', voltaMenu);
    e_btnMenuLose.addEventListener('mouseover', function(){
        menuNavigate.play();
    })

    e_rankingLose.addEventListener('click', abreRanking);
    e_rankingLose.addEventListener('mouseover', function(){
        menuNavigate.play();
    });

    e_rankingWin.addEventListener('click', abreRanking);
    e_rankingWin.addEventListener('mouseover', function(){
        menuNavigate.play();
    });
    
    e_playAgainLose.addEventListener('click', jogarDeNovo);
    e_playAgainLose.addEventListener('mouseover', function(){
        menuNavigate.play();
    });
    e_rankingLose.addEventListener('mouseover', function(){
        menuNavigate.play();
    });
    
    e_playAgainWin.addEventListener('click', jogarDeNovo);
    e_playAgainWin.addEventListener('mouseover', function(){
        menuNavigate.play();
    });
    e_rankingWin.addEventListener('mouseover', function(){
        menuNavigate.play();
    });
    
    iniciar();
    frameDoJogo();
}

function iniciar() {
    jogoRodando = true;

    posicionarAlien();
    carregarImagens();
    carregarSons();
    posicionarMatriz();

    backgroundMusic.play();
    
    intervaloAparecerNave = setInterval(defineChanceAparecerNave, INTERVALO_CHANCE_APARECER_NAVE);
}

function carregarImagens() {
    canhao = new Image();
    canhao.src = "sprites/canhao.png";
    canhao.onload = function(){
        c.drawImage(canhao, canhaoX, canhaoY);
    }
    
    backgroundImage = new Image()
    backgroundImage.src = "sprites/background.png";
    backgroundImage.onload = function(){
        bc.drawImage(backgroundImage, 0, 0);
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

    barreira = new Image();
    barreira.src = "sprites/barrier.png";
    barreira.onload = function() {
        desenhaBarreira();
    }
}

function carregarSons() {
    laserShoot = new Audio("sounds/laser-shoot.wav");
    laserShoot.volume = 0.07; // default 0.07

    alienHit = new Audio("sounds/alien-hit.wav");
    alienHit.volume = 0.07; // default 0.07

    backgroundMusic = new Audio("sounds/background-music.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.04; // default 0.04

    spaceShipMoving = new Audio('sounds/space-ship-moving.wav');
    spaceShipMoving.loop = true;
    spaceShipMoving.volume = 0.2; // default 0.2

    spaceShipHit = new Audio('sounds/space-ship-hit.wav');
    spaceShipHit.volume = 0.1; // default 0.1

    gameOver = new Audio('sounds/game-over.mp3');
    gameOver.volume = 0.1; // default 0.1

    gameWin = new Audio("sounds/game-win.wav");
    gameWin.volume = 0.1; // default 0.1

    canonHit = new Audio("sounds/canon-explosion.wav");
    canonHit.volume = 0.1; // default 0.1

    scoreCounter = new Audio("sounds/score-calculation.mp3");
    scoreCounter.volume = 0.5; // default 0.5

    alienMove = new Audio("sounds/alien-move.wav");
    alienMove.volume = 0.1; // default 0.01
}

function checaSeJogadorGanhou() {
    for (let i = 0; i < aliensRestantes.length; i++) {
        if (!aliensRestantes[i].foiAtingido) {
            return false;
        }
    }
    fimDeJogoVitoria();
}

function fimDeJogoVitoria() {
    jogoRodando = false;
    jogoAcabou = true;
    jogadorVenceu = true;

    backgroundMusic.loop = false;
    backgroundMusic.pause();
    spaceShipMoving.loop = false;
    spaceShipMoving.pause()
    gameWin.play();
    scoreCounter.play();

    aliensRestantes = [];
    quadradosRestantes = [];
    quadradosRestantes2 = [];
    map = {};

    e_backgroundWinGame.style.display = "block";
    e_bonus.textContent = `${vidas}X`;
    
    intervaloContadorDePontos = setInterval(contadorDePontos, 10);
    
    if (pontuacao > jogadorAtual.score) {
        jogadorAtual.score = pontuacao * vidas;
        ordenaRanking(jogadores);
        const peopleJson = JSON.stringify(jogadores);
        localStorage.setItem('jogadores', peopleJson);
    }

    populaRanking();
    definePosicaoRanking()

    clearInterval(missilMovendo);
    clearInterval(intervaloSomAlienSeMexendo);
    c.clearRect(canhaoX, canhaoY, 35, 35);
    c.clearRect(naveX, naveY, 50, 37);
    c.clearRect(alienX, alienY, 400, 200);
    c.clearRect(laserX, laserY, 30, 30);

    canhaoX = CANHAO_X_ORIGINAL;
    canhaoY = CANHAO_Y_ORIGINAL;
    
    inicioLaser = false;
    missilFoiDisparado = false;
    naveComecou = false;
    e_vidas.style.display = 'none';
}

function fimDeJogoDerrota() {
    jogoRodando = false;
    jogoAcabou = true;
    jogadorPerdeu = true;

    backgroundMusic.loop = false;
    backgroundMusic.pause();
    spaceShipMoving.loop = false;
    spaceShipMoving.pause()
    gameOver.play();

    aliensRestantes = [];
    quadradosRestantes = [];
    quadradosRestantes2 = [];
    map = {};

    e_backgroundLoseGame.style.display = "block";
    e_finalScoreLose.textContent = `${pontuacao.toString().padStart(5, '0')}`;
    
    if (pontuacao > jogadorAtual.score) {
        jogadorAtual.score = pontuacao;
        ordenaRanking(jogadores);
        const peopleJson = JSON.stringify(jogadores);
        localStorage.setItem('jogadores', peopleJson);
    }
    
    populaRanking();
    definePosicaoRanking();

    clearInterval(missilMovendo);
    clearInterval(intervaloSomAlienSeMexendo);
    c.clearRect(canhaoX, canhaoY, 35, 35);
    c.clearRect(naveX, naveY, 50, 37);
    c.clearRect(alienX, alienY, 400, 200);
    c.clearRect(laserX, laserY, 400, 600);

    canhaoX = CANHAO_X_ORIGINAL;
    canhaoY = CANHAO_Y_ORIGINAL;

    inicioLaser = false;
    missilFoiDisparado = false;
    naveComecou = false;
    e_vidas.style.display = 'none';
}

function jogarDeNovo() {
    jogoRodando = true;
    jogoAcabou = false;
    jogadorVenceu = false;
    jogadorPerdeu = false;

    VELOCIDADE_ALIEN = 0.2;
    aliensAbatido = 0;
    pontuacao = 0;
    alienX = 0;
    alienY = 0;
    posicao = 0;
    somador = 0;
    vidas = VIDAS_INICIAL;

    c.drawImage(canhao, canhaoX, canhaoY);
    laserX = CANHAO_X_ORIGINAL + 13;

    scoreCounter.pause();
    gameWin.pause();
    gameOver.pause();
    
    e_backgroundLoseGame.style.display = "none";
    e_backgroundWinGame.style.display = "none";
    e_vidas.style.display = 'block';
    vidaUm.classList.remove("perder-vida", "sumir");
    vidaDois.classList.remove("perder-vida", "sumir");
    vidaTres.classList.remove("sumir");
    e_pontuacao.textContent = `SCORE: ${pontuacao.toString().padStart(5, '0')}`;
    e_finalScoreWin.textContent = `SCORE: ${pontuacao.toString().padStart(5, '0')}`;

    intervaloSomAlienSeMexendo = setInterval(somAlienMexendo, INTERVALO_SOM_ALIEN_MEXENDO);
    iniciar()
}

function contadorDePontos() {
    somador += 10;
    e_finalScoreWin.textContent = `${(somador).toString().padStart(5, '0')}`;

    if(somador >= pontuacao * vidas) {
        clearInterval(intervaloContadorDePontos);
        scoreCounter.pause();
        e_finalScoreWin.textContent = (pontuacao * vidas).toString().padStart(5, '0');
    }
}

function somAlienMexendo() {
    if(!jogoRodando) return;
    alienMove.play();
}

function ordenaRanking(array) {
    let jogadorMenorPonto;
    let posicaoJogadorMenorponto;

    for (let i = 0; i < array.length; i++) {
        jogadorMenorPonto = array[i];
        posicaoJogadorMenorponto = i;

        for (let j = i + 1; j < array.length; j++) {
            if (array[j].score > jogadorMenorPonto.score) {
                jogadorMenorPonto = array[j];
                posicaoJogadorMenorponto = j;
            }
        }

        array[posicaoJogadorMenorponto] = array[i];
        array[i] = jogadorMenorPonto;
    }
}

function definePosicaoRanking() {
    for (let i = 0; i < jogadores.length; i++) {
        if (jogadorAtual.name === jogadores[i].name && jogadorAtual.score === jogadores[i].score) {
            const posicaoRanking = i + 1;
            for (let j = 0; j < playerRanking.length; j++) {
                playerRanking[j].textContent = `${posicaoRanking}º`
            }
            break;
        }
    }
}

function voltaMenu() {
    jogoComecou = false;
    jogoRodando = false;
    jogoAcabou = false;
    voltouProMenu = true;

    e_backgroundLoseGame.style.display = "none";
    e_backgroundWinGame.style.display = "none";
    e_initialGameScreen.style.display = "block";
}

intervaloSomAlienSeMexendo = setInterval(somAlienMexendo, INTERVALO_SOM_ALIEN_MEXENDO);