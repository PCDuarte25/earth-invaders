gameStart = new Audio("sounds/game-start.wav");
gameStart.volume = 0.5;

username.addEventListener('keypress', (e) => {
    const charCode = e.charCode;
    const aTxt = 'ÀÁÂÃÄàáâãä';
    const eTxt = 'ÈÉÊËèéêë';
    const iTxt = 'ÌÍÎÏìíîï';
    const oTxt = 'ÒÓÔÕÖòóôõö';
    const uTxt = 'ÙÚÛÜùúûü';
    const cedilha = 'Çç';
    const nTxt = 'Ññ';
    const yTxt = 'Ýý';
    
    if (validateCharacters(charCode)) {
        if (eTxt.includes(e.key)) {
            e.preventDefault();
            username.value += 'e';
        } else if (aTxt.includes(e.key)) {
            e.preventDefault();
            username.value += 'a';
        } else if (iTxt.includes(e.key)) {
            e.preventDefault();
            username.value += 'i';
        } else if (oTxt.includes(e.key)) {
            e.preventDefault();
            username.value += 'o';
        } else if (uTxt.includes(e.key)) {
            e.preventDefault();
            username.value += 'u';
        } else if (cedilha.includes(e.key)) {
            e.preventDefault();
            username.value += 'c';
        } else if (nTxt.includes(e.key)) {
            e.preventDefault();
            username.value += 'n';
        } else if (yTxt.includes(e.key)) {
            e.preventDefault();
            username.value += 'y';
        }
    } else {
        e.preventDefault();
    }
});

btnSubmit.addEventListener('click', registerPerson);

username.addEventListener('keypress', (e) => {
    if(e.keyCode === 13) {
        registerPerson();
        gameStart.play();
    }
});

backBtn.addEventListener('click', returnToMenu);
backBtn.addEventListener('mouseover', function(){
})

function returnToMenu() {
    e_initialGameScreen.style.display = 'block';
    registro.style.display = 'none';
}

function validateCharacters(c) {
    if (
        (c >= 32 && c <= 43) ||
        (c >= 45 && c <= 93) ||
        (c === 95) ||
        (c >= 97 && c <= 122) ||
        (c >= 192 && c <= 196) ||
        (c >= 199 && c <= 207) ||
        (c >= 209 && c <= 214) ||
        (c >= 217 && c <= 221) ||
        (c >= 224 && c <= 228) ||
        (c >= 231 && c <= 239) ||
        (c >= 241 && c <= 246) ||
        (c >= 249 && c <= 253)
    ){
        return true;
    } else {
        return false;
    }
}

function createPerson(name, score) {
    return {
        name: name,
        score: score
    }
}

function registerPerson() {
    if (!username.checkValidity()) return;
    gameStart.play();
    
    jogadorAtual =  createPerson(username.value.toUpperCase(), 0);
    username.value = '';
    e_hudUsername.textContent = jogadorAtual.name;

    jogadores.push(jogadorAtual);
    registro.style.display = 'none';
    jogoComecou = true;
    if (voltouProMenu) {
        jogarDeNovo();
    } else {
        preIniciar();
    }
}