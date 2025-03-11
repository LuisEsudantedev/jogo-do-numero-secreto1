// Exibe um alerta e uma mensagem no console ao iniciar o jogo.
alert('Essa versão está sendo atualizada.');
console.log('Versão em atualização.');

// Cria variáveis utilizadas no jogo.
let listaDeNumerosSorteados = []; // Armazena os números já sorteados para evitar repetições.
let numeroLimite = 10; // Define o limite superior para o número secreto.
let numeroSecreto = gerarNumeroAleatorio(); // Gera o número secreto inicial.
let tentativas = 1; // Contador para as tentativas do jogador.
let pontuacao = 0; // Pontuação inicial é 0.
let vidas = 3; // Define o número inicial de vidas do jogador.

// Função que exibe texto na tela e usa a biblioteca responsiveVoice para leitura em voz alta.
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag); // Localiza o elemento HTML usando a tag fornecida.
    campo.innerHTML = texto; // Define o texto no elemento localizado.
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 }); // Lê o texto em voz alta.
}

// Função que exibe a mensagem inicial do jogo.
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto'); // Exibe o título do jogo.
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}. Você tem ${vidas} vidas.`); // Fornece instruções para o jogador.
}

// Exibe a mensagem inicial quando o jogo inicia.
exibirMensagemInicial();

// Função para verificar se o número chutado pelo jogador está correto.
function verificarChute() {
    let chute = document.querySelector('input').value; // Obtém o valor digitado pelo jogador.

    // Verifica se o chute é igual ao número secreto.
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!'); // Exibe mensagem de acerto.
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa'; // Ajusta plural ou singular.
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; // Mensagem com o número de tentativas.
        exibirTextoNaTela('p', mensagemTentativas); // Exibe a mensagem com o total de tentativas.

        // Calcula pontuação: quanto menos tentativas, mais pontos.
        pontuacao += Math.max(10 - tentativas, 1); // Garante ao menos 1 ponto por vitória.
        exibirTextoNaTela('h3', `Pontuação atual: ${pontuacao}`); // Exibe a pontuação na tela.

        document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão para reiniciar o jogo.
    } else {
        // Dicas para o jogador caso o chute não esteja correto.
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor'); // Dica: número secreto é menor.
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior'); // Dica: número secreto é maior.
        }

        vidas--; // Reduz o número de vidas.
        exibirTextoNaTela('h2', `Vidas restantes: ${vidas}`); // Exibe o número de vidas restantes.

        // Verifica se o jogador ficou sem vidas.
        if (vidas === 0) {
            exibirTextoNaTela('h1', 'Game Over!'); // Mensagem de fim de jogo.
            exibirTextoNaTela('p', `O número secreto era ${numeroSecreto}.`); // Mostra qual era o número secreto.
            document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita o botão para reiniciar o jogo.
        } else {
            tentativas++; // Incrementa o contador de tentativas.
            limparCampo(); // Limpa o campo de entrada.
        }
    }
}

// Função para gerar um número aleatório entre 1 e o limite especificado.
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1); // Gera um número aleatório.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // Reinicia a lista caso todos os números já tenham sido sorteados.
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    // Garante que o número gerado não foi sorteado anteriormente.
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Tenta novamente se o número já foi sorteado.
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // Adiciona o número à lista de sorteados.
        console.log(listaDeNumerosSorteados); // Log para monitoramento.
        return numeroEscolhido; // Retorna o número válido.
    }
}

// Função para limpar o campo de entrada do jogador.
function limparCampo() {
    let chute = document.querySelector('input'); // Localiza o campo de entrada.
    chute.value = ''; // Limpa o valor do campo.
}

// Função para reiniciar o jogo.
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Gera um novo número secreto.
    limparCampo(); // Limpa o campo de entrada.
    tentativas = 1; // Reseta o contador de tentativas.
    vidas = 3; // Reseta o número de vidas.
    exibirMensagemInicial(); // Exibe a mensagem inicial do jogo.
    exibirTextoNaTela('h3', `Pontuação atual: ${pontuacao}`); // Mantém a pontuação visível.
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desabilita o botão de reiniciar.
}