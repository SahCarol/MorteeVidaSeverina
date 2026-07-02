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

  var etapas = [
    { nome: 'Sertão', icone: '🌾' },
    { nome: 'Canavial', icone: '🌿' },
    { nome: 'Engenho', icone: '⚙' },
    { nome: 'Feira', icone: '🍊' },
    { nome: 'Igreja', icone: '⛪' },
    { nome: 'Cemitério', icone: '🪦' },
    { nome: 'Rio', icone: '🌊' },
    { nome: 'Recife', icone: '🏙' }
  ];

  var efeitos = {
    0: { seguir: 0, descansar: 0, conversar: 0 },
    1: { seguir: -1, descansar: -1, conversar: -1 },
    2: { seguir: 0, descansar: 1, conversar: 1 },
    3: { seguir: -1, descansar: -1, conversar: 0 },
    4: { seguir: 1, descansar: 1, conversar: 1 },
    5: { seguir: 0, descansar: -1, conversar: -1 },
    6: { seguir: -1, descansar: 1, conversar: 1 },
    7: { seguir: 0, descansar: 0, conversar: 0 }
  };

  var mensagens = {
    0: {
      seguir: {
        citacao: '"O meu nome é Severino, como não tenho outro de pia."',
        descricao: 'Severino inicia sua caminhada pelo sertão. O sol escaldante castiga sua pele, mas a esperança o move. Ele sente a dureza da terra seca sob seus pés.',
        sentimento: '😔 Severino sente o peso da partida, mas a fé no amanhã o sustenta.'
      },
      descansar: {
        citacao: '"O sol é grande, e a sombra é pouca."',
        descricao: 'Severino senta à sombra de um juazeiro. O cansaço aperta, mas a alma descansa um instante. Ele observa o horizonte e pensa no que deixou para trás.',
        sentimento: '😌 Um breve alívio, mas a saudade já começa a doer no peito.'
      },
      conversar: {
        citacao: '"Sabe onde fica o Recife?" pergunta a um passante.',
        descricao: 'O homem aponta o horizonte e diz: "Lá, Severino, onde a vida é mais severina." As palavras ecoam em sua mente enquanto ele agradece e segue.',
        sentimento: '🤔 Severino sente uma mistura de esperança e apreensão.'
      }
    },
    1: {
      seguir: {
        citacao: '"O canavial é um mar de folhas verdes."',
        descricao: 'Severino atravessa o canavial. O vento traz o cheiro de melaço e o som das folhas cortadas. A vida é um canavial que se corta — e ele sente cada passo como uma luta contra o cansaço.',
        sentimento: '😓 Cansado, mas determinado, Severino segue em frente.'
      },
      descansar: {
        citacao: '"A terra é dura, e o cansaço é maior."',
        descricao: 'Deita-se entre os canaviais. O chão é áspero, o sono não vem fácil. Severino tenta descansar, mas os pensamentos o perseguem.',
        sentimento: '😩 O descanso não trouxe alívio, apenas mais consciência da dureza da jornada.'
      },
      conversar: {
        citacao: '"A vida aqui é dura, Severino. Corta-se cana, corta-se a vida."',
        descricao: 'O cortador de cana fala com sabedoria. Severino escuta, sente o peso das palavras e reflete sobre a própria existência.',
        sentimento: '🧐 Severino reflete sobre a dureza do trabalho e da existência.'
      }
    },
    2: {
      seguir: {
        citacao: '"As moendas rangem, o caldo escorre."',
        descricao: 'Severino chega ao engenho. A máquina mastiga a cana sem descanso, a vida e a morte se misturam na bagaceira. Ele observa, fascinado e apreensivo.',
        sentimento: '😯 Severino sente o peso da indústria e da exploração humana.'
      },
      descansar: {
        citacao: '"O sono é um rio que corre."',
        descricao: 'Dorme perto do engenho. O barulho das máquinas invade os sonhos, mas ele encontra um sono reparador. O descanso lhe devolve forças.',
        sentimento: '😴 Severino acorda renovado, apesar do barulho constante.'
      },
      conversar: {
        citacao: '"O Recife é terra de sal e de espinho. Mas Severino, a vida é um engenho que moe."',
        descricao: 'O velho contador de causos lhe oferece sabedoria. Severino escuta atentamente, absorvendo cada palavra como um aprendiz.',
        sentimento: '💪 As palavras do velho lhe dão coragem para continuar.'
      }
    },
    3: {
      seguir: {
        citacao: '"A feira é a cara da vida."',
        descricao: 'Na feira, Severino vê a vida pulsar: frutas, peixes, gritos. A miséria e a fartura lado a lado. O excesso de estímulos o cansa profundamente.',
        sentimento: '😵 Severino sente-se sobrecarregado, mas também vivo.'
      },
      descansar: {
        citacao: '"O descanso é um alívio que pesa."',
        descricao: 'Senta num banco de praça. O cheiro de peixe e suor o envolve. Severino tenta descansar, mas a agitação da feira não lhe dá trégua.',
        sentimento: '😔 Severino percebe que até o descanso pode ser desgastante.'
      },
      conversar: {
        citacao: '"Severino, a vida é como a feira: tudo se vende, tudo se compra."',
        descricao: 'A baiana fala com sabedoria. Severino reflete sobre a troca constante da vida, sobre o valor das coisas e das pessoas.',
        sentimento: '🤔 Severino pensa sobre o valor das coisas e da própria existência.'
      }
    },
    4: {
      seguir: {
        citacao: '"A igreja é a casa da esperança."',
        descricao: 'Severino entra na igreja. O silêncio ecoa, a luz das velas ilumina o altar. Ele olha para o santo e pede forças. Uma paz inexplicável invade seu coração.',
        sentimento: '🙏 Severino sente-se protegido e fortalecido pela oração.'
      },
      descansar: {
        citacao: '"O descanso é uma oração."',
        descricao: 'Deita nos bancos da igreja. O sono vem leve, como uma bênção divina. Severino dorme profundamente, acordando com a alma lavada.',
        sentimento: '😌 Severino sente paz pela primeira vez em toda a jornada.'
      },
      conversar: {
        citacao: '"A morte é certa, Severino, mas a vida é uma dádiva."',
        descricao: 'O padre lhe oferece consolo e orientação. Severino ouve atentamente, encontrando nas palavras do religioso um conforto que há muito não sentia.',
        sentimento: '🕊️ As palavras do padre lhe dão esperança e força.'
      }
    },
    5: {
      seguir: {
        citacao: '"O cemitério é a cidade dos que partiram."',
        descricao: 'Severino passa pelo cemitério. Cruzes tortas, nomes apagados pelo tempo. A morte Severina o observa de cada lápide, mas ele segue firme.',
        sentimento: '😶 Severino reflete sobre a finitude, mas não se abala.'
      },
      descansar: {
        citacao: '"O descanso eterno é um sonho sem fim."',
        descricao: 'Deita sobre a grama do cemitério. Sonha com os mortos, com a vida que passou. O contato com a morte lhe traz uma nova perspectiva.',
        sentimento: '😰 Severino sente o peso da morte, mas também a beleza da vida.'
      },
      conversar: {
        citacao: '"Todos vêm parar aqui, Severino. Mas você ainda tem chão."',
        descricao: 'O coveiro murmura palavras sombrias. Severino escuta, compreendendo que a vida é uma cova que se cava todos os dias.',
        sentimento: '😔 Severino sente a urgência de viver plenamente cada instante.'
      }
    },
    6: {
      seguir: {
        citacao: '"O rio é a estrada líquida."',
        descricao: 'Severino chega ao rio Capibaribe. As águas barrentas refletem o céu nublado. A travessia é perigosa, a correnteza forte, mas ele não hesita.',
        sentimento: '😅 Severino sente o alívio de ter atravessado, mas o cansaço é grande.'
      },
      descansar: {
        citacao: '"O rio é um espelho que passa."',
        descricao: 'Descansa à beira do rio. O vai-e-vem das águas acalma sua alma, como se o próprio rio lhe contasse histórias de outros viajantes.',
        sentimento: '🌊 Severino sente a fluidez da vida e se aquieta.'
      },
      conversar: {
        citacao: '"O rio leva a vida, Severino, mas também traz o sustento."',
        descricao: 'O pescador compartilha sua sabedoria. Severino ouve atentamente, entendendo que a vida é uma rede que se lança ao desconhecido.',
        sentimento: '🎣 Severino sente-se parte do ciclo da vida.'
      }
    },
    7: {
      seguir: {
        citacao: '"Eis que chego ao Recife. A cidade de pedra e sal."',
        descricao: 'Severino finalmente chega ao Recife. A cidade de pedra e sal se abre diante de seus olhos. Ele olha para o mar e sente que toda a caminhada valeu a pena. A vida Severina venceu!',
        sentimento: '🎉 Severino celebra a chegada e a esperança renovada!'
      },
      descansar: {
        citacao: '"O descanso é a chegada."',
        descricao: 'Severino se senta num cais. Observa os navios, a vida que chega e parte. A jornada chegou ao fim, e ele finalmente pode descansar com a consciência tranquila.',
        sentimento: '😌 Severino sente a paz de ter completado sua travessia.'
      },
      conversar: {
        citacao: '"Bem-vindo, Severino. A vida continua."',
        descricao: 'Uma mulher lhe oferece pão. Severino sorri, sentindo-se acolhido. A conversa é a ponte para o novo começo, e ele sabe que a vida continua além do horizonte.',
        sentimento: '🤝 Severino sente-se acolhido e pronto para recomeçar.'
      }
    }
  };

  function atualizarUI() {
    vidaSpan.textContent = estado.vida;
    
    var etapaAtual = etapas[estado.etapa];
    if (etapaAtual) {
      iconeLocal.textContent = etapaAtual.icone;
      nomeLocal.textContent = etapaAtual.nome.toUpperCase();
      destaqueLocal.textContent = (estado.etapa + 1) + '/8';
    }

    var ultimos = estado.historico.slice(-6);
    historicoDiv.innerHTML = ultimos.map(function(t) {
      return '<span>' + t + '</span>';
    }).join('');

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

    if (estado.acaoRealizada) {
      btnDescansar.disabled = true;
      btnConversar.disabled = true;
      btnSeguir.disabled = false;
      btnDescansar.classList.add('btn-realizado');
      btnConversar.classList.add('btn-realizado');
    } else {
      btnSeguir.disabled = false;
      btnDescansar.disabled = false;
      btnConversar.disabled = false;
      btnDescansar.classList.remove('btn-realizado');
      btnConversar.classList.remove('btn-realizado');
    }

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

  function executarAcao(tipo) {
    if (!estado.jogoAtivo || estado.vida <= 0) {
      if (estado.vida <= 0) estado.jogoAtivo = false;
      atualizarUI();
      return;
    }

    var etapaAtual = estado.etapa;
    
    if (etapaAtual === 7) {
      return;
    }

    if (tipo !== 'seguir' && estado.acaoRealizada) {
      return;
    }

    var dados = mensagens[etapaAtual]?.[tipo];
    if (!dados) {
      dados = {
        citacao: 'Severino segue em frente.',
        descricao: 'A jornada continua, cada passo é uma descoberta.',
        sentimento: '😅 Severino segue confiante.'
      };
    }

    var efeito = efeitos[etapaAtual]?.[tipo] || 0;
    var novaEtapa = etapaAtual;

    if (tipo === 'seguir') {
      if (etapaAtual < 7) {
        novaEtapa = etapaAtual + 1;
      }
      addHistorico('Seguir: ' + (etapas[novaEtapa]?.nome || 'próxima etapa'));
      estado.acaoRealizada = false;
    } else {
      estado.acaoRealizada = true;
      addHistorico(tipo.charAt(0).toUpperCase() + tipo.slice(1) + ' em ' + (etapas[etapaAtual]?.nome || ''));
    }

    estado.vida = Math.min(10, Math.max(0, estado.vida + efeito));

    if (estado.vida <= 0) {
      estado.jogoAtivo = false;
      estado.mensagemAtual = 
        '<div class="citacao">"A morte Severina chegou primeiro."</div>' +
        '<div class="descricao">Severino tombou na estrada. A vida é uma estrada que se anda, mas ele não chegou ao fim.</div>' +
        '<div class="sentimento">💀 Severino encontrou a morte Severina.</div>';
      atualizarUI();
      return;
    }

    if (tipo === 'seguir') {
      estado.etapa = Math.min(7, novaEtapa);
      
      if (estado.etapa === 7) {
        estado.jogoAtivo = false;
        var dadosVitoria = mensagens[7].seguir;
        estado.mensagemAtual = montarMensagem(dadosVitoria, 0, 'seguir');
        atualizarUI();
        return;
      }
    }

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
      '<div class="citacao">"O meu nome é Severino, como não tenho outro de pia."</div>' +
      '<div class="descricao">E começa a caminhada pelo sertão. O sol é grande, a esperança é maior. Severino parte em busca de uma vida melhor.</div>' +
      '<div class="sentimento">🌅 Severino sente a aventura começar.</div>';
    atualizarUI();
    btnSeguir.disabled = false;
    btnDescansar.disabled = false;
    btnConversar.disabled = false;
    btnDescansar.classList.remove('btn-realizado');
    btnConversar.classList.remove('btn-realizado');
  }

  btnSeguir.addEventListener('click', function() { executarAcao('seguir'); });
  btnDescansar.addEventListener('click', function() { executarAcao('descansar'); });
  btnConversar.addEventListener('click', function() { executarAcao('conversar'); });
  btnReiniciar.addEventListener('click', reiniciarJogo);

  reiniciarJogo();
})();
