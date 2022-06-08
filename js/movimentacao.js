var map = {};
onkeydown = onkeyup = function(e){
    if (jogoAcabou) return;

    map[e.keyCode] = e.type == 'keydown';
    if (map[TECLA_ESQUERDA]) {
        if (canhaoX >= 9){
            c.clearRect(canhaoX, 537, 31, 19);
            canhaoX -= VELOCIDADE_CANHAO;
            laserX -= VELOCIDADE_CANHAO;
            c.drawImage(canhao, canhaoX, canhaoY);
        }
    }

    if (map[TECLA_DIREITA]) {
        if (canhaoX <= 360) {
            c.clearRect(canhaoX, 537, 31, 19);
            canhaoX += VELOCIDADE_CANHAO;
            laserX += VELOCIDADE_CANHAO;
            c.drawImage(canhao, canhaoX, canhaoY);
        }
    }
    
    if(Date.now() > INTERVALO_ENTRE_DISPAROS_LASER + ultimoDateDoDisparoLaser) {
        if (map[TECLA_ACIMA]) {
            if (!inicioLaser) {
                laserShoot.play();
                inicioLaser = true;
                c.drawImage(laser, laserX, laserY);
                impactoLaserX = laserX;
                ultimoDateDoDisparoLaser = Date.now();
            }   
        }
    }
}

function dispararLaser(){
    if (inicioLaser && (laserY >= 0)){
        quadradoAtingidoPorLaser();
        laserY -= VELOCIDADE_LASER;
        c.clearRect(impactoLaserX, (laserY + VELOCIDADE_LASER), 6, 19);
		
        if (laserY >= 0){
            c.drawImage(laser, impactoLaserX, laserY);
        }
    }
	
    if (laserY < 0){
        inicioLaser = false;
        laserY = LASER_Y_ORIGINAL;
    }
}