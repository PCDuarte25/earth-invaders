const C_ALTURA = 600; // Default = 600
const C_LARGURA = 400; // Default = 400

const TECLA_ESQUERDA = 37; // Default = 37
const TECLA_DIREITA = 39; // Default = 39
const TECLA_ACIMA = 38; // Default = 38

const INTERVALO_MOVER_ALIENS = 17; // Default = 17
const INTERVALO_ALIEN_ATINGIDO = 6; // Default = 6
const VELOCIDADE_ALIEN = 1; // Default = 1
const ALIEN_COLUNAS = [55, 85, 115, 145, 175]; // Default = [55, 85, 115, 145, 175]
const ALIEN_LINHAS = [10, 38, 66, 94, 122, 150, 178, 206, 234, 262, 290]; // Default = [10, 38, 66, 94, 122, 150, 178, 206, 234, 262, 290]

const INTERVALO_MISSIL = 40; // Default = 40
const VELOCIDADE_MISSIL = 10; // Default = 10

const INTERVALO_CHANCE_APARECER_NAVE = 5000;  // Default = 5000
const INTERVALO_MOVER_NAVE = 18; // Default = 18
const VELOCIDADE_NAVE = 3; // Default = 3
const CHANCE_APARECER_NAVE = 0.2; // Default = 0.2

const CANHAO_Y_ORIGINAL = 529; // Default = 529
const VELOCIDADE_CANHAO = 8; // Default = 8

const LASER_Y_ORIGINAL = 520; // Default = 520
const INTERVALO_LASER_MOVENDO = 10; // Default = 10
const VELOCIDADE_LASER = 20; // Default = 20

const PONTUACAO_ALIEN_3 = 40; // Default = 40
const PONTUACAO_ALIEN_2 = 20; // Default = 20
const PONTUACAO_ALIEN = 10; // Default = 10

// debugger na tela

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
var canhaoY = CANHAO_Y_ORIGINAL;
var laserX = 193;
var laserY = LASER_Y_ORIGINAL
var missilX = 0;
var missilY = 0;
var alienX = 0;
var alienY = 0;
var naveY = 15;
var naveX = 0;
var metadeDoAlienX = 5;

var inicioLaser = false;
var missilFoiDisparado = false;
var naveComecou = false
var naveComecouEsquerda = false;
var naveComecouDireita = false;
var jogoAcabou = false;
var acertouNaveEspecial = false;


var vidas = 3;
var intervaloMoverNave = 0;
var apagaPontoGanhoIdTimeOut = 0;
var posicao = 0;
var pontuacao = 0;
var intervaloAparecerNave;
var laserMovendo;
var missilMovendo;
var impactoLaserX;

var aliensRestantes = [];
iniciar(); 
