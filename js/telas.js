let intervaloAlienAtingido = 0;
let intervaloMoverAliens = 0;

function preIniciar() {
    tela = document.getElementById("tela");
    background = document.getElementById("background");
    bc = background.getContext("2d");
    c = tela.getContext("2d");

    e_initialGameScreen.style.display = "none";

    e_playAgainLose.addEventListener('click', jogarDeNovo);
    e_playAgainLose.addEventListener('mouseover', function(){
        menuNavigate.play();
    })
    e_rankingLose.addEventListener('mouseover', function(){
        menuNavigate.play();
    })

    e_playAgainWin.addEventListener('click', jogarDeNovo);
    e_playAgainWin.addEventListener('mouseover', function(){
        menuNavigate.play();
    })
    e_rankingWin.addEventListener('mouseover', function(){
        menuNavigate.play();
    })
    

    // debugger na tela
    tela.addEventListener('mousemove', (e) => {
        t_mouseX.textContent = `mouseX = ${e.offsetX}`;
        t_mouseY.textContent = `mouseY = ${e.offsetY}`;
    });

    iniciar();
}

function iniciar() {
    jogoRodando = true;
    posicionarAlien();

    carregarImagens();
    carregarSons();
    backgroundMusic.play();
    
    INTERVALO_MOVER_ALIENS = 40;
    aliensAbatido = 0;
    intervaloMoverAliens = setInterval("moverAliens()", INTERVALO_MOVER_ALIENS);
    intervaloAlienAtingido = setInterval("alienAtingido()", INTERVALO_ALIEN_ATINGIDO);
    intervaloSomAlienSeMexendo = setInterval(somAlienMexendo, (INTERVALO_MOVER_ALIENS * 8))
    
    intervaloAparecerNave = setInterval(defineChanceAparecerNave, INTERVALO_CHANCE_APARECER_NAVE);
    intervaloMoverNave = setInterval(moverNave, INTERVALO_MOVER_NAVE);

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
}

function carregarSons() {
    laserShoot = new Audio("sounds/laser-shoot.wav");
    laserShoot.volume = 0.07; // default 0.1

    alienHit = new Audio("sounds/alien-hit.wav");
    alienHit.volume = 0.07; // default 0.1

    backgroundMusic = new Audio("sounds/background-music.mp3");
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.04; // default 0.07

    spaceShipMoving = new Audio('sounds/space-ship-moving.wav');
    spaceShipMoving.loop = true;
    spaceShipMoving.volume = 0.2; // default 0.3

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
    alienMove.volume = 0.1; // default 0.05
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
    backgroundMusic.loop = false;
    backgroundMusic.pause();
    spaceShipMoving.loop = false;
    spaceShipMoving.pause()
    gameWin.play();
    scoreCounter.play();
    aliensRestantes = [];
    map = {};
    e_backgroundWinGame.style.display = "block";
    e_bonus.textContent = `${vidas}X`;
    
    intervaloContadorDePontos = setInterval(contadorDePontos, 10);

    clearInterval(intervaloAlienAtingido);
    clearInterval(intervaloMoverAliens);
    clearInterval(intervaloAparecerNave);
    clearInterval(intervaloMoverNave);
    clearInterval(laserMovendo);
    clearInterval(intervaloSomAlienSeMexendo);

    c.clearRect(canhaoX, canhaoY, 35, 35);
    c.clearRect(naveX, naveY, 50, 37);
    c.clearRect(alienX, alienY, 400, 200);
    c.clearRect(laserX, laserY, 6, 19);

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
    backgroundMusic.loop = false;
    backgroundMusic.pause();
    spaceShipMoving.loop = false;
    spaceShipMoving.pause()
    gameOver.play();
    aliensRestantes = [];
    map = {};
    e_backgroundLoseGame.style.display = "block";
    e_finalScoreLose.textContent = `${pontuacao.toString().padStart(5, '0')}`;

    clearInterval(intervaloAlienAtingido);
    clearInterval(intervaloMoverAliens);
    clearInterval(intervaloAparecerNave);
    clearInterval(intervaloMoverNave);
    clearInterval(laserMovendo);
    clearInterval(intervaloSomAlienSeMexendo);

    c.clearRect(canhaoX, canhaoY, 35, 35);
    c.clearRect(naveX, naveY, 50, 37);
    c.clearRect(alienX, alienY, 400, 200);
    c.clearRect(laserX, laserY, 6, 19);

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
    scoreCounter.pause();
    gameWin.pause();
    gameOver.pause();
    pontuacao = 0;
    iniciar()
    e_backgroundLoseGame.style.display = "none";
    e_backgroundWinGame.style.display = "none";

    laserX = CANHAO_X_ORIGINAL + 13;

    alienX = 0;
    alienY = 0;
    posicao = 0;

    c.drawImage(canhao, canhaoX, canhaoY);

    e_pontuacao.textContent = `SCORE: ${pontuacao.toString().padStart(5, '0')}`;
    e_finalScoreWin.textContent = `SCORE: ${pontuacao.toString().padStart(5, '0')}`;
    somador = 0;

    vidas = VIDAS_INICIAL;
    e_vidas.style.display = 'block';
    vidaUm.classList.remove("perder-vida", "sumir");
    vidaDois.classList.remove("perder-vida", "sumir");
    vidaTres.classList.remove("sumir");
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
    alienMove.play();
}

