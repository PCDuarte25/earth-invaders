let intervaloAlienAtingido = 0;
let intervaloMoverAliens = 0;

function preIniciar() {
    tela = document.getElementById("tela");
    background = document.getElementById("background");
    bc = background.getContext("2d");
    c = tela.getContext("2d");

    e_playAgainLose.addEventListener('click', jogarDeNovo);
    e_playAgainWin.addEventListener('click', jogarDeNovo);
    

    // debugger na tela
    tela.addEventListener('mousemove', (e) => {
        t_mouseX.textContent = `mouseX = ${e.offsetX}`;
        t_mouseY.textContent = `mouseY = ${e.offsetY}`;
    });

    iniciar();
}

function iniciar() {
    posicionarAlien();

    carregarImagens();

    intervaloMoverAliens = setInterval("moverAliens()", INTERVALO_MOVER_ALIENS);
    intervaloAlienAtingido = setInterval("alienAtingido()", INTERVALO_ALIEN_ATINGIDO);
    
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

function checaSeJogadorGanhou() {
    for (let i = 0; i < aliensRestantes.length; i++) {
        if (!aliensRestantes[i].foiAtingido) {
            return false;
        }
    }
    fimDeJogoVitoria();
}

function fimDeJogoVitoria() {
    jogoAcabou = true;
    aliensRestantes = [];
    map = {};
    e_backgroundWinGame.style.display = "block";
    e_finalScoreWin.textContent = `${(pontuacao * vidas).toString().padStart(5, '0')}`;
    e_bonus.textContent = `${vidas}X`;

    clearInterval(intervaloAlienAtingido);
    clearInterval(intervaloMoverAliens);
    clearInterval(intervaloAparecerNave);
    clearInterval(intervaloMoverNave);
    clearInterval(laserMovendo);
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
    jogoAcabou = true;
    aliensRestantes = [];
    map = {};
    e_backgroundLoseGame.style.display = "block";
    e_finalScoreLose.textContent = `${pontuacao.toString().padStart(5, '0')}`;

    clearInterval(intervaloAlienAtingido);
    clearInterval(intervaloMoverAliens);
    clearInterval(intervaloAparecerNave);
    clearInterval(intervaloMoverNave);
    clearInterval(laserMovendo);
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
    jogoAcabou = false;
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

    vidas = VIDAS_INICIAL;
    e_vidas.style.display = 'block';
    vidaUm.classList.remove("perder-vida", "sumir");
    vidaDois.classList.remove("perder-vida", "sumir");
    vidaTres.classList.remove("sumir");
}