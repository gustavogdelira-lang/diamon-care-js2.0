/* ==========================================================================
   SCRIPT.JS — Funcionalidades do site institucional da massagista
   Código em JavaScript puro (sem frameworks). Organizado por funcionalidade.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------------
     CONFIGURAÇÕES GERAIS — edite apenas esta seção para trocar o WhatsApp
     ------------------------------------------------------------------------ */

  // Número do WhatsApp no formato internacional, apenas números (com DDI 55 e DDD).
  // Exemplo: 55 11 91234-5678 deve ser digitado como "5511912345678"
  const NUMERO_WHATSAPP = '5511961699135';

  // Mensagem padrão usada no botão flutuante do WhatsApp
  const MENSAGEM_PADRAO_WHATSAPP = 'Olá! Encontrei o site e gostaria de saber mais sobre os atendimentos.';


  /* ------------------------------------------------------------------------
     1. MONTAGEM DOS LINKS DE WHATSAPP
     Evita expor um número fictício direto no HTML e centraliza a lógica.
     ------------------------------------------------------------------------ */
  function montarLinkWhatsapp(mensagem) {
    const numeroValido = /^\d{10,15}$/.test(NUMERO_WHATSAPP);
    if (!numeroValido) {
      // Número ainda não configurado — o link abre o WhatsApp Web sem destino fixo.
      console.warn('Atenção: configure o NÚMERO_WHATSAPP em script.js antes de publicar o site.');
      return 'https://wa.me/?text=' + encodeURIComponent(mensagem);
    }
    return 'https://wa.me/' + NUMERO_WHATSAPP + '?text=' + encodeURIComponent(mensagem);
  }

  // Botão flutuante
  const botaoWhatsappFlutuante = document.getElementById('whatsapp-flutuante');
  if (botaoWhatsappFlutuante) {
    botaoWhatsappFlutuante.href = montarLinkWhatsapp(MENSAGEM_PADRAO_WHATSAPP);
  }

  // Link de contato na seção de localização
  const linkWhatsappContato = document.getElementById('link-whatsapp-contato');
  if (linkWhatsappContato) {
    linkWhatsappContato.href = montarLinkWhatsapp(MENSAGEM_PADRAO_WHATSAPP);
  }

  // Link de contato no rodapé
  const linkWhatsappRodape = document.getElementById('link-whatsapp-rodape');
  if (linkWhatsappRodape) {
    linkWhatsappRodape.href = montarLinkWhatsapp(MENSAGEM_PADRAO_WHATSAPP);
  }


  /* ------------------------------------------------------------------------
     2. CABEÇALHO FIXO COM MUDANÇA AO ROLAR A PÁGINA
     ------------------------------------------------------------------------ */
  const cabecalho = document.getElementById('cabecalho');

  function atualizarCabecalho() {
    if (window.scrollY > 24) {
      cabecalho.classList.add('rolado');
    } else {
      cabecalho.classList.remove('rolado');
    }
  }

  window.addEventListener('scroll', atualizarCabecalho);
  atualizarCabecalho();


  /* ------------------------------------------------------------------------
     3. MENU MOBILE (ABRIR / FECHAR)
     ------------------------------------------------------------------------ */
  const botaoMenuMobile = document.getElementById('botao-menu-mobile');
  const navPrincipal = document.getElementById('nav-principal');

  function alternarMenuMobile() {
    const menuAberto = navPrincipal.classList.toggle('aberto');
    botaoMenuMobile.setAttribute('aria-expanded', menuAberto ? 'true' : 'false');
    botaoMenuMobile.setAttribute('aria-label', menuAberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    document.body.style.overflow = menuAberto ? 'hidden' : '';
  }

  if (botaoMenuMobile) {
    botaoMenuMobile.addEventListener('click', alternarMenuMobile);
  }

  // Fecha o menu mobile automaticamente ao clicar em qualquer link do menu
  document.querySelectorAll('.link-menu').forEach(function (link) {
    link.addEventListener('click', function () {
      if (navPrincipal.classList.contains('aberto')) {
        alternarMenuMobile();
      }
    });
  });

  // Fecha o menu mobile ao pressionar ESC
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && navPrincipal.classList.contains('aberto')) {
      alternarMenuMobile();
    }
  });


  /* ------------------------------------------------------------------------
     4. ROLAGEM SUAVE PARA OS LINKS INTERNOS
     (a propriedade CSS "scroll-behavior: smooth" já cobre a maioria dos casos;
     este trecho garante compatibilidade e ajusta o foco por acessibilidade)
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (evento) {
      const destinoId = this.getAttribute('href');
      if (destinoId.length > 1) {
        const destino = document.querySelector(destinoId);
        if (destino) {
          evento.preventDefault();
          destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
          destino.setAttribute('tabindex', '-1');
          destino.focus({ preventScroll: true });
        }
      }
    });
  });


  /* ------------------------------------------------------------------------
     5. ANIMAÇÃO DE ENTRADA DAS SEÇÕES (IntersectionObserver)
     ------------------------------------------------------------------------ */
  const secoesParaRevelar = document.querySelectorAll('.revelar');

  if ('IntersectionObserver' in window && secoesParaRevelar.length > 0) {
    const observadorRevelacao = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observadorRevelacao.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.15 });

    secoesParaRevelar.forEach(function (secao) {
      observadorRevelacao.observe(secao);
    });
  } else {
    // Navegadores sem suporte: exibe as seções diretamente
    secoesParaRevelar.forEach(function (secao) {
      secao.classList.add('visivel');
    });
  }


  /* ------------------------------------------------------------------------
     6. GALERIA COM MODAL
     ------------------------------------------------------------------------ */
  const itensGaleria = document.querySelectorAll('.item-galeria');
  const modalGaleria = document.getElementById('modal-galeria');
  const modalImagem = document.getElementById('modal-imagem');
  const modalLegenda = document.getElementById('modal-legenda');
  const botaoFecharModal = document.getElementById('modal-fechar');
  let elementoComFocoAntesDoModal = null;

  function abrirModal(imagemSrc, imagemAlt, legenda) {
    elementoComFocoAntesDoModal = document.activeElement;
    modalImagem.src = imagemSrc;
    modalImagem.alt = imagemAlt;
    modalLegenda.textContent = legenda || '';
    modalGaleria.hidden = false;
    // Pequeno atraso para permitir a transição de opacidade via CSS
    requestAnimationFrame(function () {
      modalGaleria.classList.add('ativo');
    });
    botaoFecharModal.focus();
    document.body.style.overflow = 'hidden';
  }

  function fecharModal() {
    modalGaleria.classList.remove('ativo');
    document.body.style.overflow = '';
    setTimeout(function () {
      modalGaleria.hidden = true;
      modalImagem.src = '';
    }, 350);
    if (elementoComFocoAntesDoModal) {
      elementoComFocoAntesDoModal.focus();
    }
  }

  itensGaleria.forEach(function (item) {
    item.addEventListener('click', function () {
      const imagem = item.querySelector('img');
      abrirModal(imagem.src, imagem.alt, item.getAttribute('data-legenda'));
    });
  });

  if (botaoFecharModal) {
    botaoFecharModal.addEventListener('click', fecharModal);
  }

  // Fecha o modal ao clicar fora da imagem
  if (modalGaleria) {
    modalGaleria.addEventListener('click', function (evento) {
      if (evento.target === modalGaleria) {
        fecharModal();
      }
    });
  }

  // Fecha o modal ao pressionar ESC
  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && modalGaleria && !modalGaleria.hidden) {
      fecharModal();
    }
  });


  /* ------------------------------------------------------------------------
     7. FAQ EXPANSÍVEL (ACORDEÃO)
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.pergunta-faq').forEach(function (botaoPergunta) {
    botaoPergunta.addEventListener('click', function () {
      const respostaId = botaoPergunta.nextElementSibling;
      const estaAberta = botaoPergunta.getAttribute('aria-expanded') === 'true';

      // Fecha as demais perguntas abertas (comportamento de acordeão)
      document.querySelectorAll('.pergunta-faq').forEach(function (outraPergunta) {
        outraPergunta.setAttribute('aria-expanded', 'false');
        outraPergunta.nextElementSibling.style.maxHeight = null;
      });

      if (!estaAberta) {
        botaoPergunta.setAttribute('aria-expanded', 'true');
        respostaId.style.maxHeight = respostaId.scrollHeight + 'px';
      }
    });
  });


  /* ------------------------------------------------------------------------
     8. VALIDAÇÃO DO FORMULÁRIO E ENVIO PARA O WHATSAPP
     ------------------------------------------------------------------------ */
  const formularioAgendamento = document.getElementById('formulario-agendamento');
  const mensagemStatusFormulario = document.getElementById('mensagem-status-formulario');

  function exibirErroCampo(idErro, mensagem) {
    const elementoErro = document.getElementById(idErro);
    if (elementoErro) {
      elementoErro.textContent = mensagem;
    }
  }

  function limparErrosFormulario() {
    document.querySelectorAll('.mensagem-erro-campo').forEach(function (elemento) {
      elemento.textContent = '';
    });
  }

  function exibirStatusFormulario(tipo, mensagem) {
    mensagemStatusFormulario.textContent = mensagem;
    mensagemStatusFormulario.className = 'mensagem-status-formulario mostrar ' + tipo;
  }

  function formatarDataBrasileira(valorData) {
    if (!valorData) return '';
    const partes = valorData.split('-');
    if (partes.length !== 3) return valorData;
    return partes[2] + '/' + partes[1] + '/' + partes[0];
  }

  if (formularioAgendamento) {
    formularioAgendamento.addEventListener('submit', function (evento) {
      evento.preventDefault();
      limparErrosFormulario();
      mensagemStatusFormulario.className = 'mensagem-status-formulario';

      const nome = document.getElementById('campo-nome').value.trim();
      const telefone = document.getElementById('campo-telefone').value.trim();
      const massagem = document.getElementById('campo-massagem').value;
      const data = document.getElementById('campo-data').value;
      const horario = document.getElementById('campo-horario').value;
      const mensagem = document.getElementById('campo-mensagem').value.trim();
      const consentimento = document.getElementById('campo-consentimento').checked;

      let formularioValido = true;

      if (nome.length < 3) {
        exibirErroCampo('erro-nome', 'Informe seu nome completo.');
        formularioValido = false;
      }

      // Validação simples de telefone: aceita números, espaços, parênteses e traço, com 10 a 15 dígitos
      const telefoneApenasNumeros = telefone.replace(/\D/g, '');
      if (telefoneApenasNumeros.length < 10 || telefoneApenasNumeros.length > 15) {
        exibirErroCampo('erro-telefone', 'Informe um telefone válido com DDD.');
        formularioValido = false;
      }

      if (!massagem) {
        exibirErroCampo('erro-massagem', 'Selecione o tipo de massagem.');
        formularioValido = false;
      }

      if (!data) {
        exibirErroCampo('erro-data', 'Selecione a data desejada.');
        formularioValido = false;
      } else {
        const dataSelecionada = new Date(data + 'T00:00:00');
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        if (dataSelecionada < hoje) {
          exibirErroCampo('erro-data', 'Escolha uma data igual ou posterior a hoje.');
          formularioValido = false;
        }
      }

      if (!horario) {
        exibirErroCampo('erro-horario', 'Selecione o horário desejado.');
        formularioValido = false;
      }

      if (!consentimento) {
        exibirErroCampo('erro-consentimento', 'É necessário autorizar o contato para enviar o formulário.');
        formularioValido = false;
      }

      if (!formularioValido) {
        exibirStatusFormulario('erro', 'Por favor, corrija os campos destacados antes de continuar.');
        return;
      }

      // Monta a mensagem no modelo solicitado
      const observacao = mensagem || 'nenhuma';
      const textoMensagem =
        'Olá! Meu nome é ' + nome + '. ' +
        'Gostaria de agendar uma sessão de ' + massagem + ' para o dia ' + formatarDataBrasileira(data) +
        ', no horário aproximado de ' + horario + '. ' +
        'Observação: ' + observacao + '.';

      const linkFinal = montarLinkWhatsapp(textoMensagem);

      exibirStatusFormulario('sucesso', 'Tudo certo! Você será redirecionada ao WhatsApp para concluir a solicitação. O agendamento só é confirmado após a resposta da profissional.');

      // Abre o WhatsApp em nova aba
      window.open(linkFinal, '_blank', 'noopener');

      formularioAgendamento.reset();
    });
  }


  /* ------------------------------------------------------------------------
     9. SEÇÕES RECOLHÍVEIS (ocultar/mostrar blocos como "Sobre mim",
     "Massagens", "Meu trabalho", "Depoimentos" e "Como funciona")
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.botao-recolher').forEach(function (botao) {
    botao.addEventListener('click', function () {
      const alvo = document.getElementById(botao.getAttribute('data-alvo'));
      if (!alvo) return;

      const conteudoInterno = alvo.querySelector('.secao-recolhivel-interno');
      const estaExpandida = botao.getAttribute('aria-expanded') === 'true';
      const textoBotao = botao.querySelector('.texto-botao-recolher');

      if (estaExpandida) {
        // Recolhe a seção
        alvo.classList.add('recolhida');
        botao.setAttribute('aria-expanded', 'false');
        if (textoBotao) {
          textoBotao.textContent = textoBotao.textContent.replace('Ocultar', 'Mostrar');
        }
        // Impede que elementos escondidos continuem acessíveis via teclado/leitor de tela
        if (conteudoInterno && 'inert' in conteudoInterno) {
          conteudoInterno.inert = true;
        }
      } else {
        // Expande a seção novamente
        alvo.classList.remove('recolhida');
        botao.setAttribute('aria-expanded', 'true');
        if (textoBotao) {
          textoBotao.textContent = textoBotao.textContent.replace('Mostrar', 'Ocultar');
        }
        if (conteudoInterno && 'inert' in conteudoInterno) {
          conteudoInterno.inert = false;
        }
      }
    });
  });


  /* ------------------------------------------------------------------------
     10. BOTÃO "VOLTAR AO TOPO"
     ------------------------------------------------------------------------ */
  const botaoVoltarTopo = document.getElementById('voltar-topo');

  function atualizarBotaoVoltarTopo() {
    if (window.scrollY > 480) {
      botaoVoltarTopo.classList.add('visivel');
    } else {
      botaoVoltarTopo.classList.remove('visivel');
    }
  }

  window.addEventListener('scroll', atualizarBotaoVoltarTopo);
  atualizarBotaoVoltarTopo();

  if (botaoVoltarTopo) {
    botaoVoltarTopo.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  /* ------------------------------------------------------------------------
     11. ATUALIZAÇÃO AUTOMÁTICA DO ANO NO RODAPÉ
     ------------------------------------------------------------------------ */
  const spanAnoAtual = document.getElementById('ano-atual');
  if (spanAnoAtual) {
    spanAnoAtual.textContent = new Date().getFullYear();
  }

});