# Earth Invaders !

Um projeto para o meu trabalho da mateira de raciocínio lógico, e é sobre uma réplica do space invaders, mas eu decidi fazer "Earth Invaders"

## Sobre
- Space Invaders
- Autor: Ayo Oyewole
- Adaptado por: Gilson Pereira
- Código fonte original: http://www.ayodeji.ca/space-invaders/

## Como o jogo funciona

- canhão que atira laser para destruir inimigos.
- inimigos não podem chegar em uma determinada linha.
- jogador controla canhão
- munição infinita
- depois de x alienigenas mortos a velocidade vai aumentando

## Entregas esperadas

### Visual

- [x] Fundo da tela do jogo modificada (alterar cor ou incluir imagem)
- [x] novo sprite do canhão (usar outra imagem)
- [x] novos sprites dos alienígenas (usar imagens diferentes para cada linha)
- [x] Velocidade inicial dos alienígenas modificada (para menor)
- [x] Texto no final do jogo modificado (alterar mensagem e características da fonte: tipo, tamanho e cor)

### Jogabilidade

- [x] Tiros de laser disparados aleatoriamente pelos alienígenas em direção do canhão
- [x] Naves vermelhas surgem ocasionalmente na parte superior da tela, indo da direita para esquerda ou vice-versa
- [x] O jogador começará o jogo com três vidas. Quando o canhão for atingido por um laser inimigo, o jogador perde uma vida
- [x] Pontuação do jogador. Cada alienígena atingido possui pontos diferentes:
    - Primeira e segunda filas: 10 pontos
    - Terceira e quarta filas: 20 pontos
    - Quinta fila: 40 pontos
    - Naves vermelhas: pontos aleatórios
- [x] O jogo termina quando:
    - Todos os alienígenas forem destruídos (jogador vence o jogo)
    - Acabarem as vidas (jogador perde o jogo)

### Recursos avançados

- [x] Efeitos sonoros para:
    - Movimento dos alienígenas
    - Tiro de laser do canhão
    - Explosão do alienígena ao ser atingido pelo laser do canhão
    - Explosão do canhão ao ser atingido pelo laser do alienígena
    - Nave vermelha passando
- [x] À medida em que os alienígenas são destruídos, os sobreviventes tornam-se mais rápidos, acelerando o efeito sonoro do movimento
- [ ] Barreiras de proteção fixas, acima canhão, conforme a figura acima
- [ ] As barreiras de proteção deverão ser destruídas aos poucos, à medida em que forem atingidas pelos lasers
- [ ] No final do jogo, deverá ser exibido um ranking com o nome e pontuação dos 10 (dez) melhores jogadores, exibidos em ordem decrescente de pontuação
- [ ] O ranking deverá ser implementado por meio de um vetor de registros (objetos) e mantido pela aplicação usando persistência de dados
- [ ] Para classificar o ranking, deverá ser usado obrigatoriamente um dos algoritmos de ordenação vistos em sala de aula
