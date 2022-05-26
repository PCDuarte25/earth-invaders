function iniciar() {
    tela = document.getElementById("tela");
    background = document.getElementById("background");
    bc = background.getContext("2d");

    c = tela.getContext("2d");
    
    posicionarAlien();
    carregarImagens();
    
	setInterval("moverAliens()", INTERVALO_MOVER_ALIENS);
    setInterval("alienAtingido()", INTERVALO_ALIEN_ATINGIDO);
    
    intervaloAparecerNave = setInterval(defineChanceAparecerNave, INTERVALO_CHANCE_APARECER_NAVE);
    intervaloMoverNave = setInterval(moverNave, INTERVALO_MOVER_NAVE);

    // debugger na tela
    tela.addEventListener('mousemove', (e) => {
        t_mouseX.textContent = `mouseX = ${e.offsetX}`;
        t_mouseY.textContent = `mouseY = ${e.offsetY}`;
    });
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