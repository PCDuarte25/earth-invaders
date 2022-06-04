function posicionarMatriz() {
    for (let i = 0; i < MATRIZ_LINHAS.length; i++) {
        for (let j = 0; j < MATRIZ_COLUNAS.length; j++) {
            let novoQuadradoMatriz = {
                posX: MATRIZ_LINHAS[i],
                posY: MATRIZ_COLUNAS[j],
                quadradoFoiAtingido: false
            };

            quadradosRestantes.push(novoQuadradoMatriz);
        }
    }

    for (let i = 0; i < MATRIZ_LINHAS2.length; i++) {
        for (let j = 0; j < MATRIZ_COLUNAS.length; j++) {
            let novoQuadradoMatriz2 = {
                posX: MATRIZ_LINHAS2[i],
                posY: MATRIZ_COLUNAS[j],
                quadradoFoiAtingido: false
            };

            quadradosRestantes2.push(novoQuadradoMatriz2);
        }
    }
    defineQuadradosComoTrue(0, 7);
    defineQuadradosComoTrue(1, 5);
    defineQuadradosComoTrue(2, 3);
    defineQuadradosComoTrue(3, 3);
    defineQuadradosComoTrue(4, 2);
    defineQuadradosComoTrue(5, 1);
    defineQuadradosComoTrue(6, 1);
    defineQuadradosComoTrue(7, 1);
    defineQuadradosComoTrue(8, 1);
    defineQuadradosComoTrue(17, 1);
    defineQuadradosComoTrue(18, 1);
    defineQuadradosComoTrue(19, 1);
    defineQuadradosComoTrue(20, 1);
    defineQuadradosComoTrue(21, 2);
    defineQuadradosComoTrue(22, 3);
    defineQuadradosComoTrue(23, 3);
    defineQuadradosComoTrue(24, 5);
    defineQuadradosComoTrue(25, 7);
}

function desenhaBarreira() {
    c.drawImage(barreira, 45, 400);
    for (let i = 0; i < quadradosRestantes.length; i++) {
        let quadrado = quadradosRestantes[i];
        if (quadrado.quadradoFoiAtingido) {
            c.clearRect(quadrado.posX, quadrado.posY, 5, 5);
        } 
    }

    c.drawImage(barreira, 225, 400);
    for (let i = 0; i < quadradosRestantes2.length; i++) {
        let quadrado = quadradosRestantes2[i];
        if (quadrado.quadradoFoiAtingido) {
            c.clearRect(quadrado.posX, quadrado.posY, 5, 5);
        } 
    }
}

function indiceAtravesDeLinhaEColuna(linha, coluna) {
    // A quantidade de linhas = matrizColunas.length
    return MATRIZ_COLUNAS.length * coluna + linha;
}

function linhaAtravesDeIndice(indice) {
    return indice % MATRIZ_COLUNAS.length;
}

function colunaAtravesDeIndice(indice) {
    return Math.trunc(indice / MATRIZ_COLUNAS.length);
}

function defineQuadradosComoTrue(coluna, quadrados) {
    for (let i = 0; i < quadrados; i++) {
        quadradosRestantes[indiceAtravesDeLinhaEColuna(i, coluna)].quadradoFoiAtingido = true;
    }
    for (let i = 0; i < quadrados; i++) {
        quadradosRestantes2[indiceAtravesDeLinhaEColuna(i, coluna)].quadradoFoiAtingido = true;
    }
}

function marcaQuadradoComoAtingido(linha, coluna) {
    if  (linha >= 0 && linha <= 9 && coluna >= 0 && coluna <= 25) {
        quadradosRestantes[indiceAtravesDeLinhaEColuna(linha, coluna)].quadradoFoiAtingido = true;
    }
}

function marcaQuadradoComoAtingido2(linha, coluna) {
    if  (linha >= 0 && linha <= 9 && coluna >= 0 && coluna <= 25) {
        quadradosRestantes2[indiceAtravesDeLinhaEColuna(linha, coluna)].quadradoFoiAtingido = true;
    }
}

function quadradoAtingidoPorLaser() {
    for (let i = 0; i < quadradosRestantes.length; i++) {
        if(
            laserY >= quadradosRestantes[i].posY
            && laserY <= quadradosRestantes[i].posY + 5
            && impactoLaserX >= quadradosRestantes[i].posX - 5 
            && impactoLaserX <= quadradosRestantes[i].posX + 5
        ) { 
            if (!quadradosRestantes[i].quadradoFoiAtingido) {
                // console.log(`coluna: ${colunaAtravesDeIndice(i)} linha: ${linhaAtravesDeIndice(i)} indice: ${i} `);
                c.clearRect(quadradosRestantes[i].posX, quadradosRestantes[i].posY, 5, 5);
                c.clearRect(quadradosRestantes[i].posX, quadradosRestantes[i].posY - 5 ,5, 5);
                c.clearRect(quadradosRestantes[i].posX, quadradosRestantes[i].posY - 10, 5, 5);
                c.clearRect(quadradosRestantes[i].posX - 5, quadradosRestantes[i].posY - 5, 5, 5);
                c.clearRect(quadradosRestantes[i].posX + 5, quadradosRestantes[i].posY - 5, 5, 5);

                const linha = linhaAtravesDeIndice(i);
                const coluna = colunaAtravesDeIndice(i);

                marcaQuadradoComoAtingido(linha, coluna);
                marcaQuadradoComoAtingido(linha - 1, coluna);
                marcaQuadradoComoAtingido(linha - 2, coluna);
                marcaQuadradoComoAtingido(linha - 1, coluna - 1);
                marcaQuadradoComoAtingido(linha - 1, coluna + 1);

                c.clearRect(impactoLaserX, laserY, 5, 19);
                laserY = 0;

                desenhaBarreira();
            }
        } 
    }

    for (let i = 0; i < quadradosRestantes2.length; i++) {
        if(
            laserY >= quadradosRestantes2[i].posY
            && laserY <= quadradosRestantes2[i].posY + 5
            && impactoLaserX >= quadradosRestantes2[i].posX - 5 
            && impactoLaserX <= quadradosRestantes2[i].posX + 5
        ) { 
            if (!quadradosRestantes2[i].quadradoFoiAtingido) {
                // console.log(`coluna: ${colunaAtravesDeIndice(i)} linha: ${linhaAtravesDeIndice(i)} indice: ${i} `);
                c.clearRect(quadradosRestantes2[i].posX, quadradosRestantes2[i].posY, 5, 5);
                c.clearRect(quadradosRestantes2[i].posX, quadradosRestantes2[i].posY - 5 ,5, 5);
                c.clearRect(quadradosRestantes2[i].posX, quadradosRestantes2[i].posY - 10, 5, 5);
                c.clearRect(quadradosRestantes2[i].posX - 5, quadradosRestantes2[i].posY - 5, 5, 5);
                c.clearRect(quadradosRestantes2[i].posX + 5, quadradosRestantes2[i].posY - 5, 5, 5);

                const linha = linhaAtravesDeIndice(i);
                const coluna = colunaAtravesDeIndice(i);

                marcaQuadradoComoAtingido2(linha, coluna);
                marcaQuadradoComoAtingido2(linha - 1, coluna);
                marcaQuadradoComoAtingido2(linha - 2, coluna);
                marcaQuadradoComoAtingido2(linha - 1, coluna - 1);
                marcaQuadradoComoAtingido2(linha - 1, coluna + 1);

                c.clearRect(impactoLaserX, laserY, 5, 19);
                laserY = 0;

                desenhaBarreira();
            }
        } 
    }
}

function quadradoAtingidoPorMissil() {
    for (let i = 0; i < quadradosRestantes.length; i++) {
        if(
            missilY - 10 >= quadradosRestantes[i].posY
            && missilY - 10<= quadradosRestantes[i].posY + 5
            && missilX >= quadradosRestantes[i].posX - 5 
            && missilX <= quadradosRestantes[i].posX + 5
        ) { 
            if (!quadradosRestantes[i].quadradoFoiAtingido) {
                // console.log(`coluna: ${colunaAtravesDeIndice(i)} linha: ${linhaAtravesDeIndice(i)} indice: ${i} `);
                c.clearRect(quadradosRestantes[i].posX, quadradosRestantes[i].posY, 5, 5);
                c.clearRect(quadradosRestantes[i].posX, quadradosRestantes[i].posY - 5 ,5, 5);
                c.clearRect(quadradosRestantes[i].posX, quadradosRestantes[i].posY - 10, 5, 5);
                c.clearRect(quadradosRestantes[i].posX - 5, quadradosRestantes[i].posY - 5, 5, 5);
                c.clearRect(quadradosRestantes[i].posX + 5, quadradosRestantes[i].posY - 5, 5, 5);
                
                const linha = linhaAtravesDeIndice(i);
                const coluna = colunaAtravesDeIndice(i);
                
                marcaQuadradoComoAtingido(linha, coluna);
                marcaQuadradoComoAtingido(linha + 1, coluna);
                marcaQuadradoComoAtingido(linha + 2, coluna);
                marcaQuadradoComoAtingido(linha + 1, coluna + 1);
                marcaQuadradoComoAtingido(linha + 1, coluna - 1);
                return true;
            }
        }
    }
    return false;
}

function quadradoAtingidoPorMissil2() {
    for (let i = 0; i < quadradosRestantes2.length; i++) {
        if(
            missilY - 10 >= quadradosRestantes2[i].posY
            && missilY - 10<= quadradosRestantes2[i].posY + 5
            && missilX >= quadradosRestantes2[i].posX - 5 
            && missilX <= quadradosRestantes2[i].posX + 5
        ) { 
            if (!quadradosRestantes2[i].quadradoFoiAtingido) {
                // console.log(`coluna: ${colunaAtravesDeIndice(i)} linha: ${linhaAtravesDeIndice(i)} indice: ${i} `);
                c.clearRect(quadradosRestantes2[i].posX, quadradosRestantes2[i].posY, 5, 5);
                c.clearRect(quadradosRestantes2[i].posX, quadradosRestantes2[i].posY - 5 ,5, 5);
                c.clearRect(quadradosRestantes2[i].posX, quadradosRestantes2[i].posY - 10, 5, 5);
                c.clearRect(quadradosRestantes2[i].posX - 5, quadradosRestantes2[i].posY - 5, 5, 5);
                c.clearRect(quadradosRestantes2[i].posX + 5, quadradosRestantes2[i].posY - 5, 5, 5);
                
                const linha = linhaAtravesDeIndice(i);
                const coluna = colunaAtravesDeIndice(i);
                
                marcaQuadradoComoAtingido2(linha, coluna);
                marcaQuadradoComoAtingido2(linha + 1, coluna);
                marcaQuadradoComoAtingido2(linha + 2, coluna);
                marcaQuadradoComoAtingido2(linha + 1, coluna + 1);
                marcaQuadradoComoAtingido2(linha + 1, coluna - 1);
                return true;
    
            }
        }
    }

    return false;
}