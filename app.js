

// Exibe uma mensagem de alerta para o usuário
alert('essa versão está está sendo atualizado.');

// Registra uma mensagem no console do navegador
console.log('Versao em atualização.');

// Cria variáveis utilizadas no jogo
let listaDeNumerosSorteados = []; // Lista de números sorteados
let numeroLimite = 10; // Limite máximo de números que podem ser sorteados
let numeroSecreto = gerarNumeroAleatorio(); // Número secreto que o jogador precisa adivinhar
let tentativas = 1; // Número de tentativas que o jogador tem

// Cria função que exibe texto na tela e seta comando/configura para português responsiveVoice
function exibirTextoNaTela(tag, texto) {
  // Seleciona o elemento HTML com a tag especificada
  let campo = document.querySelector(tag);
  // Atualiza o texto do elemento
  campo.innerHTML = texto;
  // Faz com que a voz sintética leia o texto em português
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Cria função para exibir mensagem inicial do jogo
function exibirMensagemInicial() {
  // Exibe o título do jogo
  exibirTextoNaTela('h1', 'Jogo do número secreto');
  // Exibe a instrução para o jogador
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

// Exibe mensagem inicial na tela
exibirMensagemInicial();

// Cria função para verificar o chute do jogador
function verificarChute() {
  // Seleciona o valor do input do jogador
  let chute = document.querySelector('input').value;
  // Verifica se o chute é igual ao número secreto
  if (chute == numeroSecreto) {
    // Exibe mensagem de vitória
    exibirTextoNaTela('h1', 'Acertou!');
    // Exibe mensagem com o número de tentativas
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagemTentativas);
    // Habilita o botão de reiniciar
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    // Verifica se o chute é maior ou menor que o número secreto
    if (chute > numeroSecreto) {
      // Exibe mensagem de que o número secreto é menor
      exibirTextoNaTela('p', 'O número secreto é menor');
    } else {
      // Exibe mensagem de que o número secreto é maior
      exibirTextoNaTela('p', 'O número secreto é maior');
    }
    // Incrementa o número de tentativas
    tentativas++;
    // Limpa o campo de input
    limparCampo();
  }
}

// Cria função para gerar um número aleatório
function gerarNumeroAleatorio() {
  // Gera um número aleatório entre 1 e o limite máximo
  let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  // Verifica se o número gerado já foi sorteado anteriormente
  let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
  if (quantidadeDeElementosNaLista == numeroLimite) {
    // Se a lista de números sorteados estiver cheia, reinicia a lista
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    // Se o número gerado já foi sorteado, gera um novo número
    return gerarNumeroAleatorio();
  } else {
    // Se o número gerado não foi sorteado, adiciona à lista e retorna o número
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados)
    return numeroEscolhido;
  }
}

// Cria função para limpar o campo de input
function limparCampo() {
  // Seleciona o campo de input
  chute = document.querySelector('input');
  // Limpa o valor do campo de input
  chute.value = '';
}

// Cria função para reiniciar o jogo
function reiniciarJogo() {
  // Gera um novo número secreto
  numeroSecreto = gerarNumeroAleatorio();
Aqui está o restante do código com comentários:

// Cria função para reiniciar o jogo
function reiniciarJogo() {
  // Gera um novo número secreto
  numeroSecreto = gerarNumeroAleatorio();
  // Limpa o campo de input
  limparCampo();
  // Reinicia o número de tentativas
  tentativas = 1;
  // Exibe a mensagem inicial do jogo
  exibirMensagemInicial();
  // Desabilita o botão de reiniciar
  document.getElementById('reiniciar').setAttribute('disabled', true)
}
 