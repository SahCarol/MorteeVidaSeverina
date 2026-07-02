(function() {
  // ========== MENU ==========
  var botoesMenu = document.querySelectorAll('.menu-btn');
  var paginas = {
    jogo: document.getElementById('pagina-jogo'),
    creditos: document.getElementById('pagina-creditos'),
    tutorial: document.getElementById('pagina-tutorial'),
    obra: document.getElementById('pagina-obra'),
    autor: document.getElementById('pagina-autor')
  };

  botoesMenu.forEach(function(botao) {
    botao.addEventListener('click', function() {
      botoesMenu.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');

      for (var key in paginas) {
        paginas[key].classList.add('hidden');
      }

      var pagina = this.getAttribute('data-pagina');
      if (paginas[pagina]) {
        paginas[pagina].classList.remove('hidden');
      }
    });
  });

  // ========== JOGO ==========
  var estado = {
    vida: 5,
    etapa: 0,
    mensagemAtual: '',
    historico: ['🌱 começo'],
    jogoAtivo: true,
    acaoRealizada: false
  };

  var vidaSpan = document.getElementById('vidaDisplay');
  var iconeLocal = document.getElementById('iconeLocal');
  var nomeLocal = document.getElementById('nomeLocal');
  var destaqueLocal = document.getElementById('destaqueLocal');
  var mensagemDiv = document.getElementById('mensagemPoema');
  var historicoDiv = document.getElementById('historicoBox');

  var btnSeguir = document.getElementById('btnSeguir');
  var btnDescansar = document.getElementById('btnDescansar');
  var btnConversar = document.getElementById('btnConversar');
  var btnReiniciar = document.getElementById('btnReiniciar');

  // ========== ETAPAS COM ÍNDICES CORRESPONDENTES ==========
  var etapas = [
    { id: 0, nome: 'Sertão', icone: '🌾' },
    { id: 1, nome: 'Canavial', icone: '🌿' },
    { id: 2, nome: 'Engenho', icone: '⚙️' },
    { id: 3, nome: 'Feira', icone: '🍊' },
    { id: 4, nome: 'Igreja', icone: '⛪' },
    { id: 5, nome: 'Cemitério', icone: '🪦' },
    { id: 6, nome: 'Rio', icone: '🌊' },
    { id: 7, nome: 'Recife', icone: '🏙️' }
  ];

  // TABELA DE EFEITOS POR ETAPA (índice 0-7)
  var efeitos = [
    { seguir: 0, descansar: 0, conversar: 0 },     // 0: Sertão
    { seguir: -1, descansar: -1, conversar: -1 }, // 1: Canavial
    { seguir: 0, descansar: 1, conversar: 1 },    // 2: Engenho
    { seguir: -1, descansar: -1, conversar: 0 },  // 3: Feira
    { seguir: 1, descansar: 1, conversar: 1 },    // 4: Igreja
    { seguir: 0, descansar: -1, conversar: -1 },  // 5: Cemitério
    { seguir: -1, descansar: 1, conversar: 1 },   // 6: Rio
    { seguir: 0, descansar: 0, conversar: 0 }     // 7: Recife
  ];

  // ========== MENSAGENS POR ETAPA (índice 0-7) ==========
  var mensagens = [
    // ETAPA 0: SERTÃO
    {
      seguir: {
        citacao: '"— O meu nome é Severino,<br>como não tenho outro de pia.<br>Porque muito não se nomeia<br>por onde a vida se fia.<br>Não sei se a vida é pouco,<br>ou se é muito a morte, Severino,<br>mas sei que a vida é uma estrada<br>que se anda sem saber onde."',
        descricao: 'Severino inicia sua caminhada pelo sertão. O sol escaldante castiga sua pele, mas a esperança o move.',
        sentimento: '😔 Severino sente o peso da partida, mas a fé no amanhã o sustenta.'
      },
      descansar: {
        citacao: '"— O sol é grande, e a sombra é pouca.<br>Mas a sombra que há, Severino,<br>é a sombra de um juazeiro,<br>que é uma árvore que não dá flor.<br>É uma árvore que não dá fruto,<br>mas dá sombra para o viajante,<br>e a sombra é o que a vida dá<br>a quem não tem mais nada."',
        descricao: 'Severino senta à sombra de um juazeiro. O cansaço aperta, mas a alma descansa um instante.',
        sentimento: '😌 Um breve alívio, mas a saudade já começa a doer no peito.'
      },
      conversar: {
        citacao: '"— Sabe onde fica o Recife?<br>— Fica lá, Severino,<br>onde a vida é mais severina,<br>onde a morte é mais certa.<br>Lá onde o sal come a pele,<br>e o vento come a alma,<br>e a esperança é uma moeda<br>que não se troca por pão."',
        descricao: 'O homem aponta o horizonte. A incerteza do caminho o acompanha, mas ele agradece e segue.',
        sentimento: '🤔 Severino sente uma mistura de esperança e apreensão.'
      }
    },
    // ETAPA 1: CANAVIAL
    {
      seguir: {
        citacao: '"— O canavial é um mar de folhas verdes,<br>onde a vida se corta e se esquece.<br>E a morte, Severino,<br>é a faca que corta o canavial.<br>Corta-se a cana, corta-se a vida,<br>e o melaço que escorre<br>é o suor dos que morreram<br>sem saber que estavam vivos."',
        descricao: 'Severino atravessa o canavial. O vento traz o cheiro de melaço e o som das folhas cortadas.',
        sentimento: '😓 Cansado, mas determinado, Severino segue em frente.'
      },
      descansar: {
        citacao: '"— A terra é dura, Severino,<br>e o cansaço é maior que a terra.<br>Não há descanso no canavial,<br>só o sono que não vem.<br>O sono é um rio que não corre,<br>é uma água que não molha,<br>é uma sombra que não cobre,<br>é uma morte que não chega."',
        descricao: 'Deita-se entre os canaviais. O chão é áspero, o sono não vem fácil.',
        sentimento: '😩 O descanso não trouxe alívio, apenas mais consciência da dureza da jornada.'
      },
      conversar: {
        citacao: '"— A vida aqui é dura, Severino.<br>Corta-se cana, corta-se a vida,<br>e a morte é o melaço que escorre<br>das moendas do engenho.<br>Não há nome para quem corta,<br>não há nome para quem morre,<br>só o nome de Severino,<br>que é o nome de todos."',
        descricao: 'O cortador de cana fala com sabedoria. Severino escuta e reflete sobre a própria existência.',
        sentimento: '🧐 Severino reflete sobre a dureza do trabalho e da existência.'
      }
    },
    // ETAPA 2: ENGENHO
    {
      seguir: {
        citacao: '"— As moendas rangem, Severino,<br>o caldo escorre das bagaceiras.<br>A vida é um engenho que mói,<br>e a morte é o bagaço que sobra.<br>Mói-se o homem como a cana,<br>e o açúcar que sobra é a esperança<br>que não adoça a boca de ninguém,<br>mas que mantém a vida em pé."',
        descricao: 'Severino chega ao engenho. A máquina mastiga a cana sem descanso, a vida e a morte se misturam na bagaceira.',
        sentimento: '😯 Severino sente o peso da indústria e da exploração humana.'
      },
      descansar: {
        citacao: '"— O sono é um rio que corre,<br>Severino, e as máquinas são o barulho<br>que não deixa o rio chegar ao mar.<br>Mas o descanso é a água que acalma,<br>é a sombra que refresca,<br>é a noite que esquece o dia,<br>é a vida que se esquece da morte,<br>mesmo que por um instante."',
        descricao: 'Dorme perto do engenho. O barulho das máquinas invade os sonhos, mas ele encontra um sono reparador.',
        sentimento: '😴 Severino acorda renovado, apesar do barulho constante.'
      },
      conversar: {
        citacao: '"— O Recife é terra de sal e de espinho,<br>Severino. Mas a vida é um engenho<br>que mói os homens como mói a cana,<br>e o açúcar é a esperança que sobra.<br>O açúcar não é doce, Severino,<br>é amargo como a vida,<br>mas é o que resta depois da moenda,<br>é o que sobra depois da morte."',
        descricao: 'O velho contador de causos lhe oferece sabedoria. Severino escuta atentamente.',
        sentimento: '💪 As palavras do velho lhe dão coragem para continuar.'
      }
    },
    // ETAPA 3: FEIRA
    {
      seguir: {
        citacao: '"— A feira é a cara da vida, Severino.<br>Frutas, peixes, gritos, cores.<br>A miséria e a fartura lado a lado,<br>como a morte e a vida no mesmo chão.<br>Tudo se vende, tudo se compra,<br>até a alma se troca por um prato,<br>e a esperança é a moeda mais rara,<br>que não se encontra em nenhuma barraca."',
        descricao: 'Na feira, Severino vê a vida pulsar: frutas, peixes, gritos. A miséria e a fartura lado a lado.',
        sentimento: '😵 Severino sente-se sobrecarregado, mas também vivo.'
      },
      descansar: {
        citacao: '"— O descanso é um alívio que pesa,<br>Severino. A feira não dá trégua,<br>o cheiro de peixe e suor é a vida<br>que não deixa o cansaço dormir.<br>O descanso na feira é um luxo,<br>é uma mentira, é um sonho,<br>é a morte que se disfarça de vida,<br>é a vida que se disfarça de morte."',
        descricao: 'Senta num banco de praça. O cheiro de peixe e suor o envolve. A agitação da feira não lhe dá trégua.',
        sentimento: '😔 Severino percebe que até o descanso pode ser desgastante.'
      },
      conversar: {
        citacao: '"— Severino, a vida é como a feira:<br>tudo se vende, tudo se compra.<br>Até a alma se troca por um prato de comida,<br>e a esperança é a moeda mais rara.<br>A esperança, Severino,<br>é o que não se vende na feira,<br>é o que não se compra com dinheiro,<br>é o que se carrega dentro do peito."',
        descricao: 'A baiana fala com sabedoria. Severino reflete sobre a troca constante da vida.',
        sentimento: '🤔 Severino pensa sobre o valor das coisas e da própria existência.'
      }
    },
    // ETAPA 4: IGREJA
    {
      seguir: {
        citacao: '"— A igreja é a casa da esperança,<br>Severino. O silêncio é a prece,<br>a luz das velas é a fé,<br>e o santo é a mão que estende.<br>Na igreja, a morte é menos certa,<br>e a vida é mais possível,<br>porque a esperança, Severino,<br>é o que nos faz continuar."',
        descricao: 'Severino entra na igreja. O silêncio ecoa, a luz das velas ilumina o altar. Ele olha para o santo e pede forças.',
        sentimento: '🙏 Severino sente-se protegido e fortalecido pela oração.'
      },
      descansar: {
        citacao: '"— O descanso é uma oração, Severino.<br>Dormir nos bancos da igreja<br>é como sonhar com o céu,<br>e acordar é renascer.<br>O sono na igreja é sagrado,<br>é a morte que se adia,<br>é a vida que se prolonga,<br>é a esperança que se renova."',
        descricao: 'Deita nos bancos da igreja. O sono vem leve, como uma bênção divina.',
        sentimento: '😌 Severino sente paz pela primeira vez em toda a jornada.'
      },
      conversar: {
        citacao: '"— A morte é certa, Severino,<br>mas a vida é uma dádiva.<br>E a fé, Severino, é a ponte<br>que liga a vida à vida.<br>A fé é o que nos faz ver<br>que a morte não é o fim,<br>que a vida continua,<br>mesmo depois do último suspiro."',
        descricao: 'O padre lhe oferece consolo e orientação. Severino ouve atentamente.',
        sentimento: '🕊️ As palavras do padre lhe dão esperança e força.'
      }
    },
    // ETAPA 5: CEMITÉRIO
    {
      seguir: {
        citacao: '"— O cemitério é a cidade dos que partiram,<br>Severino. Cruzes tortas, nomes apagados.<br>A morte Severina é a moradora<br>que não pede licença para entrar.<br>Ela entra sem bater, sem avisar,<br>e leva os nomes, leva as vidas,<br>deixa apenas as cruzes tortas<br>e as lembranças que o vento leva."',
        descricao: 'Severino passa pelo cemitério. Cruzes tortas, nomes apagados pelo tempo. A morte Severina o observa de cada lápide.',
        sentimento: '😶 Severino reflete sobre a finitude, mas não se abala.'
      },
      descansar: {
        citacao: '"— O descanso eterno é um sonho sem fim,<br>Severino. Mas deitar no cemitério<br>é ouvir a voz dos mortos,<br>que falam da vida que passou.<br>Os mortos não descansam, Severino,<br>eles falam, eles lembram,<br>eles são a memória que fica,<br>são o eco da vida que foi."',
        descricao: 'Deita sobre a grama do cemitério. Sonha com os mortos, com a vida que passou.',
        sentimento: '😰 Severino sente o peso da morte, mas também a beleza da vida.'
      },
      conversar: {
        citacao: '"— Todos vêm parar aqui, Severino.<br>Mas você ainda tem chão, tem estrada.<br>A vida é uma cova que se cava<br>a cada dia, a cada passo.<br>E a morte, Severino, é a pá<br>que cava a cova de todos,<br>mas enquanto a pá não chega,<br>a vida é o que se tem."',
        descricao: 'O coveiro murmura palavras sombrias. Severino escuta, compreendendo que a vida é uma cova que se cava todos os dias.',
        sentimento: '😔 Severino sente a urgência de viver plenamente cada instante.'
      }
    },
    // ETAPA 6: RIO
    {
      seguir: {
        citacao: '"— O rio é a estrada líquida, Severino.<br>As águas barrentas refletem o céu,<br>e a travessia é a vida que passa,<br>levando e trazendo os que ousam.<br>O rio não pergunta quem é,<br>não pede nome, não pede nada,<br>apenas leva, apenas traz,<br>como a vida leva e traz a morte."',
        descricao: 'Severino chega ao rio Capibaribe. As águas barrentas refletem o céu nublado. A travessia é perigosa, mas ele não hesita.',
        sentimento: '😅 Severino sente o alívio de ter atravessado, mas o cansaço é grande.'
      },
      descansar: {
        citacao: '"— O rio é um espelho que passa,<br>Severino. As águas contam histórias,<br>de outros viajantes, de outras vidas,<br>que se foram e nunca voltaram.<br>O rio é a memória que corre,<br>é a vida que não para,<br>é a morte que se esquiva,<br>é a esperança que flui."',
        descricao: 'Descansa à beira do rio. O vai-e-vem das águas acalma sua alma.',
        sentimento: '🌊 Severino sente a fluidez da vida e se aquieta.'
      },
      conversar: {
        citacao: '"— O rio leva a vida, Severino,<br>mas também traz o sustento.<br>A vida é uma rede que se lança,<br>e a correnteza é a fé que se tem.<br>O pescador não pergunta ao rio<br>se ele vai trazer o peixe,<br>ele apenas lança a rede,<br>como a vida lança a esperança."',
        descricao: 'O pescador compartilha sua sabedoria. Severino ouve atentamente.',
        sentimento: '🎣 Severino sente-se parte do ciclo da vida.'
      }
    },
    // ETAPA 7: RECIFE
    {
      seguir: {
        citacao: '"— Eis que chego ao Recife.<br>A cidade de pedra e sal, Severino.<br>A vida Severina venceu a morte,<br>e a esperança é o porto de chegada.<br>O Recife é o fim da estrada,<br>mas é também o começo de tudo,<br>porque a vida, Severino,<br>é uma estrada que nunca termina."',
        descricao: 'Severino finalmente chega ao Recife. A cidade de pedra e sal se abre diante de seus olhos. A vida Severina venceu a morte!',
        sentimento: '🎉 Severino celebra a chegada e a esperança renovada!'
      },
      descansar: {
        citacao: '"— O descanso é a chegada, Severino.<br>O cais é o fim da estrada,<br>e o mar é o começo de tudo,<br>onde a vida recomeça no horizonte.<br>Descansar no Recife é poder sonhar,<br>é poder olhar para o mar<br>e ver que a vida continua,<br>mesmo depois de toda a travessia."',
        descricao: 'Severino se senta num cais. Observa os navios, a vida que chega e parte.',
        sentimento: '😌 Severino sente a paz de ter completado sua travessia.'
      },
      conversar: {
        citacao: '"— Bem-vindo, Severino. A vida continua.<br>O pão é a partilha, a palavra é a ponte.<br>E o Recife é o começo de tudo,<br>onde a vida Severina se renova.<br>Aqui, Severino, a morte não é o fim,<br>é apenas uma curva na estrada,<br>é um desvio no caminho,<br>é a vida que se reinventa."',
        descricao: 'Uma mulher lhe oferece pão. Severino sorri, sentindo-se acolhido.',
        sentimento: '🤝 Severino sente-se acolhido e pronto para recomeçar.'
      }
    }
  ];

  // ========== FUNÇÃO PRINCIPAL DE ATUALIZAÇÃO ==========
  function atualizarUI() {
    // Atualiza vida
    vidaSpan.textContent = estado.vida;
    
    // ========== ATUALIZA LOCALIZAÇÃO ==========
    var etapaAtual = etapas[estado.etapa];
    if (etapaAtual) {
      iconeLocal.textContent = etapaAtual.icone;
      nomeLocal.textContent = etapaAtual.nome.toUpperCase();
      destaqueLocal.textContent = (estado.etapa + 1) + '/8';
    }

    // Atualiza histórico
    var ultimos = estado.historico.slice(-6);
    historicoDiv.innerHTML = ultimos.map(function(t) {
      return '<span>' + t + '</span>';
    }).join('');

    // Caso 1: Jogo acabou (morte)
    if (!estado.jogoAtivo) {
      if (estado.vida <= 0) {
        mensagemDiv.innerHTML = 
          '<div class="citacao">"A morte Severina chegou primeiro."</div>' +
          '<div class="descricao">Severino tombou na estrada. A vida é uma estrada que se anda, mas ele não chegou ao fim.</div>' +
          '<div class="sentimento">💀 Severino encontrou a morte Severina.</div>';
      } else {
        mensagemDiv.innerHTML = 
          '<div class="citacao">"A vida Severina venceu."</div>' +
          '<div class="descricao">Severino chega ao Recife. A vida é uma chegada, e ele finalmente encontrou seu destino.</div>' +
          '<div class="sentimento">🎉 A jornada foi longa, mas a vitória é doce.</div>';
      }
      btnSeguir.disabled = true;
      btnDescansar.disabled = true;
      btnConversar.disabled = true;
      return;
    }

    // Caso 2: Chegou ao Recife (etapa 7)
    if (estado.etapa === 7) {
      mensagemDiv.innerHTML = 
        '<div class="citacao">"A vida Severina venceu."</div>' +
        '<div class="descricao">Severino chega ao Recife. FIM DA JORNADA!</div>' +
        '<div class="sentimento">🎉 A travessia chegou ao fim com vitória!</div>';
      btnSeguir.disabled = true;
      btnDescansar.disabled = true;
      btnConversar.disabled = true;
      estado.jogoAtivo = false;
      return;
    }

    // Caso 3: Jogo ativo - gerencia os botões
    btnSeguir.disabled = false;
    
    if (estado.acaoRealizada) {
      btnDescansar.disabled = true;
      btnConversar.disabled = true;
      btnDescansar.classList.add('btn-realizado');
      btnConversar.classList.add('btn-realizado');
    } else {
      btnDescansar.disabled = false;
      btnConversar.disabled = false;
      btnDescansar.classList.remove('btn-realizado');
      btnConversar.classList.remove('btn-realizado');
    }

    // Mensagem
    if (estado.mensagemAtual) {
      mensagemDiv.innerHTML = estado.mensagemAtual;
    } else {
      mensagemDiv.innerHTML = 
        '<div class="citacao">Severino segue sua caminhada...</div>' +
        '<div class="descricao">A jornada continua, cada passo é uma descoberta.</div>';
    }
  }

  function addHistorico(texto) {
    var icone = etapas[estado.etapa]?.icone || '📍';
    estado.historico.push(icone + ' ' + texto.substring(0, 30) + '...');
    if (estado.historico.length > 12) estado.historico.shift();
  }

  function montarMensagem(dados, efeito, acaoNome) {
    var html = '<div class="citacao">' + dados.citacao + '</div>';
    html += '<div class="descricao">' + dados.descricao + '</div>';
    
    if (efeito < 0) {
      html += '<div class="efeito-vida perdeu">❌ Perdeu ' + Math.abs(efeito) + ' vida</div>';
    } else if (efeito > 0) {
      html += '<div class="efeito-vida ganhou">✅ Recuperou ' + efeito + ' vida</div>';
    }
    
    html += '<div class="sentimento">' + dados.sentimento + '</div>';
    
    if (acaoNome !== 'seguir') {
      html += '<div class="acao-realizada">✅ Ação realizada! Clique em SEGUIR para avançar.</div>';
    }
    
    return html;
  }

  // ========== EXECUTAR AÇÃO ==========
  function executarAcao(tipo) {
    // Verifica se o jogo está ativo
    if (!estado.jogoAtivo || estado.vida <= 0) {
      if (estado.vida <= 0) estado.jogoAtivo = false;
      atualizarUI();
      return;
    }

    var etapaAtual = estado.etapa;
    
    // Se já está no Recife, não faz nada
    if (etapaAtual === 7) {
      return;
    }

    // BLOQUEIA: Se não for SEGUIR e já tiver feito uma ação
    if (tipo !== 'seguir' && estado.acaoRealizada) {
      return;
    }

    // Pega os dados da mensagem da etapa atual
    var dados = mensagens[etapaAtual]?.[tipo];
    if (!dados) {
      dados = {
        citacao: 'Severino segue em frente.',
        descricao: 'A jornada continua, cada passo é uma descoberta.',
        sentimento: '😅 Severino segue confiante.'
      };
    }

    // Pega o efeito da etapa atual
    var efeito = efeitos[etapaAtual]?.[tipo] || 0;
    var novaEtapa = etapaAtual;

    // ========== LÓGICA PRINCIPAL ==========
    if (tipo === 'seguir') {
      // SEGUIR: avança para a próxima etapa
      if (etapaAtual < 7) {
        novaEtapa = etapaAtual + 1;
      }
      addHistorico('Seguir: ' + (etapas[novaEtapa]?.nome || 'próxima etapa'));
      
      // RESETA o flag de ação realizada AO AVANÇAR
      estado.acaoRealizada = false;
      
    } else {
      // DESCANSAR ou CONVERSAR: marca que a ação foi realizada
      estado.acaoRealizada = true;
      addHistorico(tipo.charAt(0).toUpperCase() + tipo.slice(1) + ' em ' + (etapas[etapaAtual]?.nome || ''));
    }

    // Aplica o efeito na vida
    estado.vida = Math.min(10, Math.max(0, estado.vida + efeito));

    // Verifica se morreu
    if (estado.vida <= 0) {
      estado.jogoAtivo = false;
      estado.mensagemAtual = 
        '<div class="citacao">"A morte Severina chegou primeiro."</div>' +
        '<div class="descricao">Severino tombou na estrada. A vida é uma estrada que se anda, mas ele não chegou ao fim.</div>' +
        '<div class="sentimento">💀 Severino encontrou a morte Severina.</div>';
      atualizarUI();
      return;
    }

    // Se for SEGUIR, atualiza a etapa
    if (tipo === 'seguir') {
      estado.etapa = Math.min(7, novaEtapa);
      
      // Se chegou ao Recife (etapa 7), finaliza com vitória
      if (estado.etapa === 7) {
        estado.jogoAtivo = false;
        var dadosVitoria = mensagens[7].seguir;
        estado.mensagemAtual = montarMensagem(dadosVitoria, 0, 'seguir');
        atualizarUI();
        return;
      }
    }

    // Monta a mensagem final
    estado.mensagemAtual = montarMensagem(dados, efeito, tipo);
    atualizarUI();
  }

  function reiniciarJogo() {
    estado.vida = 5;
    estado.etapa = 0;
    estado.jogoAtivo = true;
    estado.acaoRealizada = false;
    estado.historico = ['🌱 recomeço'];
    estado.mensagemAtual = 
      '<div class="citacao">"— O meu nome é Severino,<br>como não tenho outro de pia.<br>Porque muito não se nomeia<br>por onde a vida se fia.<br>Não sei se a vida é pouco,<br>ou se é muito a morte, Severino,<br>mas sei que a vida é uma estrada<br>que se anda sem saber onde."</div>' +
      '<div class="descricao">E começa a caminhada pelo sertão. O sol é grande, a esperança é maior. Severino parte em busca de uma vida melhor.</div>' +
      '<div class="sentimento">🌅 Severino sente a aventura começar.</div>';
    
    btnSeguir.disabled = false;
    btnDescansar.disabled = false;
    btnConversar.disabled = false;
    btnDescansar.classList.remove('btn-realizado');
    btnConversar.classList.remove('btn-realizado');
    
    atualizarUI();
  }

  // ========== EVENTOS ==========
  btnSeguir.addEventListener('click', function() { 
    executarAcao('seguir'); 
  });
  
  btnDescansar.addEventListener('click', function() { 
    executarAcao('descansar'); 
  });
  
  btnConversar.addEventListener('click', function() { 
    executarAcao('conversar'); 
  });
  
  btnReiniciar.addEventListener('click', reiniciarJogo);

  // Inicia o jogo
  reiniciarJogo();
})();
