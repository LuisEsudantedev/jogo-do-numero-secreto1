// Exibe um alerta para indicar que a versão do jogo está sendo atualizada
alert('essa versão está está sendo atualizado.');
console.log('Versao em atualização.');

// Cria variáveis utilizadas no jogo.
let listaDeNumerosSorteados = []; // Lista para armazenar números já sorteados
let numeroLimite = 10; // Limite máximo do número secreto
let numeroSecreto = gerarNumeroAleatorio(); // Número secreto gerado aleatoriamente
let tentativas = 1; // Contador de tentativas do jogador
let pontuacao = 0; // Variável para armazenar a pontuação do jogador

// Função que exibe texto na tela e utiliza áudio em português brasileiro com a biblioteca responsiveVoice
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); // Seleciona o elemento HTML onde o texto será exibido
    campo.innerHTML = texto; // Insere o texto no elemento HTML
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2}); // Reproduz o texto com áudio
}

// Função para exibir a mensagem inicial do jogo, incluindo a pontuação
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // Título do jogo
    exibirTextoNaTela('p', `Escolha um número entre 1 e 10. Sua pontuação: ${pontuacao}`); // Instruções e pontuação
}

// Exibe a mensagem inicial na tela ao carregar o jogo
exibirMensagemInicial();

// Função para verificar o chute do jogador
function verificarChute() {
    let chute = document.querySelector('input').value; // Obtém o valor digitado pelo jogador

    // Verifica se o chute está correto
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!'); // Mensagem de acerto
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Ajusta o plural
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        let pontosGanhos = 10 - tentativas; // Calcula os pontos ganhos nesta rodada
        pontuacao += pontosGanhos; // Atualiza a pontuação
        exibirTextoNaTela('p', `${mensagemTentativas} Sua pontuação atual: ${pontuacao}`);
        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão de reiniciar
    } else {
        // Dá uma dica ao jogador sobre o número secreto
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++; // Incrementa o contador de tentativas
        limparCampo(); // Limpa o campo de entrada do jogador
    }
}

// Função para gerar um número aleatório único
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; // Verifica a quantidade de números já sorteados

    // Reinicia a lista de números sorteados se todos já foram usados
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    // Garante que o número gerado seja único
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Tenta novamente se o número já foi sorteado
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número na lista
        console.log(listaDeNumerosSorteados); // Exibe a lista no console para debug
        return numeroEscolhido;
    }
}

// Função para limpar o campo de entrada do jogador
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = ''; // Limpa o valor digitado
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto
    limparCampo(); // Limpa o campo de entrada
    tentativas = 1; // Reinicia o contador de tentativas
    exibirMensagemInicial(); // Exibe a mensagem inicial novamente, incluindo a pontuação atual
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar
}
