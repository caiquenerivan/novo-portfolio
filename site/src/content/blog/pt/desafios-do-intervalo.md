---
title: "O que deu trabalho no Intervalo: áudio no navegador, sem backend"
description: "Um afinador que errava a oitava, uma cifra que seguia a melodia e um modelo que travava a aba por 11 segundos. Os problemas que apareceram ao fazer um app de música que roda inteiro no navegador."
date: 2026-11-16
tags: [web audio, react, typescript, dsp]
draft: false
---

O [Intervalo](https://caiquenerivan.github.io/intervalo/) é um app de teoria musical e treino de ouvido para violão e piano. Ele tem um explorador de acordes e escalas, lições, um afinador pelo microfone e uma página que recebe um MP3 e devolve a cifra e as notas da música.

Desde o começo havia uma regra: nada de backend. Sem conta, sem servidor, tudo roda no aparelho de quem usa, inclusive a análise de áudio. Isso deixa o app de graça para hospedar e impossível de cair, mas também significa que todo problema de áudio precisa ser resolvido em JavaScript, dentro de uma aba.

As telas de teoria e as lições saíram sem surpresa. O trabalho de verdade ficou em três lugares, e conto os três aqui. O código está [no GitHub](https://github.com/caiquenerivan/intervalo).

## O afinador: a FFT não serve

O jeito óbvio de descobrir uma nota é calcular uma FFT e pegar a frequência mais forte. Para afinar violão isso falha por dois motivos.

O primeiro é a resolução. Com uma janela de 4096 amostras a 48 kHz, cada faixa da FFT tem cerca de 11,7 Hz de largura. A corda Mi grave vibra a 82,4 Hz e o semitom seguinte fica em 87,3 Hz, a menos de meia faixa de distância. Um afinador precisa enxergar centésimos de semitom.

O segundo é que a fundamental muitas vezes não é a parte mais forte do som. Nas cordas graves, o segundo harmônico costuma ser mais alto que ela, e o afinador mostra a nota uma oitava acima.

A saída foi o algoritmo YIN, que trabalha no tempo em vez da frequência. Um som periódico é igual a si mesmo quando deslocado em um período, então o algoritmo procura esse deslocamento. O detalhe que evita o erro de oitava é escolher o primeiro vale abaixo de um limite, e não o vale mais fundo, porque os múltiplos do período verdadeiro descem tanto quanto ele.

![Afinador do Intervalo mostrando a nota detectada pelo microfone](/blog/intervalo/tuner.jpg)

Com o algoritmo certo, o ponteiro ainda morria no meio da nota. O culpado era o próprio navegador: a supressão de ruído do microfone trata uma corda sustentada como ruído de fundo e vai abaixando o volume dela. Foi preciso desligar o cancelamento de eco, a supressão de ruído e o ganho automático ao abrir o microfone.

## A cifra: a primeira versão seguia a melodia

Achar uma nota e achar um acorde no meio de uma gravação são problemas diferentes. O YIN supõe uma única fonte sonora, e uma música tem várias ao mesmo tempo. Para os acordes usei o caminho clássico: somar a energia do espectro nas 12 notas, ignorando a oitava, e comparar o resultado com o molde de cada um dos 24 acordes maiores e menores.

A primeira versão funcionava nos testes e errava numa música de verdade. Ela acompanhava a voz: cada nota cantada mais forte virava um acorde novo.

O conserto veio de uma observação simples. Uma nota do acorde soa durante o acorde inteiro, e uma nota da melodia dura uma fração de segundo. Trocar o valor de cada nota pela mediana de cerca de um segundo para cada lado faz a melodia sumir, porque a mediana nunca chega a vê-la. Junto com isso, dei mais peso à região grave e passei a contar um voto do baixo para a tônica, já que o baixo quase sempre toca a nota que dá nome ao acorde.

Ainda sobrava um problema. Escolher o melhor acorde a cada instante faz a cifra piscar a cada nota de passagem. O algoritmo de Viterbi resolve isso: ele procura a sequência com a melhor pontuação total cobrando um custo fixo por troca de acorde. É esse custo que faz o resultado parecer uma cifra escrita por alguém.

![Página Músicas do Intervalo com a cifra organizada em linhas](/blog/intervalo/songs.jpg)

O último ajuste veio de ouvir uma gravação real. A cifra mostrava E, C♯m, E em trechos onde ninguém trocava de acorde. Era o violão descendo uma frase no baixo por cima do Mi sustentado. No modo Simples, um acorde curto espremido entre dois trechos do mesmo acorde só fica na cifra se as três notas dele estiverem lá.

## As notas: onde o código escrito à mão acabou

Depois dos acordes, quis mostrar as notas da música. Escrevi um rastreador de melodia, que passou em todos os testes com áudio sintético e falhou na primeira música real.

O motivo não tinha conserto por parâmetro: ele devolve uma nota por instante. Com voz sobre violão dedilhado, ficava pulando entre os dois, e nunca conseguiria acompanhar o dedilhado, em que várias cordas soam juntas. Apaguei esse código.

O que a tarefa pede é transcrição polifônica, e hoje isso se faz com modelo treinado. Usei o [Basic Pitch](https://github.com/spotify/basic-pitch-ts), um modelo aberto do Spotify com menos de 1 MB que roda no navegador com TensorFlow.js. Colocar o modelo para funcionar trouxe outra lista de problemas:

- **A aba travava.** Na thread principal, um trecho de 16 segundos congelava a página por 11 segundos. A análise foi para um Web Worker, onde o modelo usa a GPU por um `OffscreenCanvas`. A biblioteca lê `window` em um ponto, então o worker precisa apontar `window` para `self`.
- **O pós-processamento era mais lento que o modelo.** Transformar a saída em notas levava 40 segundos numa música inteira, porque o custo cresce mais rápido que o tamanho da entrada. Processar em trechos de 20 segundos baixou para 5.
- **Notas fantasmas.** O modelo às vezes lê os harmônicos de uma nota como notas extras. Um filtro descarta a nota mais fraca que começa junto com outra uma oitava, uma oitava e uma quinta ou duas oitavas abaixo.
- **O peso do download.** O TensorFlow.js só é baixado quando alguém analisa uma música. Se ele falhar, a cifra aparece do mesmo jeito.

![Painel de notas do Intervalo, com um piano deitado e o nome de cada nota](/blog/intervalo/notes.jpg)

Faltava tornar o resultado legível. Um piano roll comum supõe que a pessoa sabe ler altura pela posição, e quem está começando não sabe. O painel mostra dez segundos por vez, com o nome da tecla em cada linha e o nome da nota em cada bloco, e escreve sustenidos e bemóis conforme o tom da música.

## O que ficou de fora

O app só reconhece acordes maiores e menores, então um G7 aparece como G. Ele não detecta compasso nem batida e não separa a voz do violão, porque isso exige modelos grandes demais para um site estático.

A parte que mais me incomoda é a validação. Os testes automáticos usam progressões sintetizadas, e fora deles a cifra foi conferida de ouvido em uma única gravação real. Por isso existe o botão que toca as notas detectadas por cima da música: quem usa pode julgar o resultado sozinho.

Se eu resumisse o projeto em uma lição, seria esta: áudio sintético mente. As duas vezes em que precisei refazer algo, os testes estavam verdes e bastou uma música de verdade para mostrar o erro.

Dá para [testar o Intervalo aqui](https://caiquenerivan.github.io/intervalo/).
