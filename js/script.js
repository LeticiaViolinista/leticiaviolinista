```
javascript
/* ============================================================
   LETÍCIA VIOLINISTA & CANTORA
   JAVASCRIPT PRINCIPAL
   VERSÃO CORRIGIDA
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Site Letícia Violinista iniciado");


    /* ============================================================
       ELEMENTOS PRINCIPAIS
    ============================================================ */

    const body = document.body;

    const preloader = document.getElementById("preloader");

    const header = document.querySelector(".site-header");

    const menuToggle = document.getElementById("menuToggle");

    const navigation = document.querySelector(".main-navigation");


    /* ============================================================
       PRELOADER
    ============================================================ */

    function hidePreloader() {

        setTimeout(function () {

            body.classList.add("loaded");

        }, 700);

    }


    /*
       Aguarda todas as imagens e recursos da página
       antes de retirar o carregamento.
    */

    if (document.readyState === "complete") {

        hidePreloader();

    } else {

        window.addEventListener(
            "load",
            hidePreloader
        );

    }


    /* ============================================================
       MENU MOBILE
    ============================================================ */

    if (menuToggle && navigation) {

        menuToggle.addEventListener(
            "click",
            function () {

                navigation.classList.toggle("active");

                menuToggle.classList.toggle("active");

                const menuAberto =
                    navigation.classList.contains("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    menuAberto ? "true" : "false"
                );

            }
        );

    }


    /* ============================================================
       LINKS DO MENU
    ============================================================ */

    const navigationLinks =
        document.querySelectorAll(
            ".main-navigation a"
        );


    navigationLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (navigation) {

                    navigation.classList.remove("active");

                }

                if (menuToggle) {

                    menuToggle.classList.remove("active");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    });


    /* ============================================================
       FECHAR MENU CLICANDO FORA
    ============================================================ */

    document.addEventListener(
        "click",
        function (event) {

            if (!navigation || !menuToggle) {
                return;
            }


            const clicouNoMenu =
                navigation.contains(event.target);


            const clicouNoBotao =
                menuToggle.contains(event.target);


            if (
                !clicouNoMenu &&
                !clicouNoBotao
            ) {

                navigation.classList.remove("active");

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* ============================================================
       HEADER AO ROLAR
    ============================================================ */

    function atualizarHeader() {

        if (!header) {
            return;
        }


        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        atualizarHeader,
        { passive: true }
    );


    atualizarHeader();


    /* ============================================================
       ROLAGEM SUAVE
    ============================================================ */

    const linksInternos =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    linksInternos.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const destino =
                    link.getAttribute("href");


                if (
                    !destino ||
                    destino === "#"
                ) {

                    return;

                }


                const elemento =
                    document.querySelector(destino);


                if (!elemento) {

                    return;

                }


                event.preventDefault();


                const alturaHeader =
                    header
                        ? header.offsetHeight
                        : 0;


                const posicao =
                    elemento.getBoundingClientRect().top
                    +
                    window.scrollY
                    -
                    alturaHeader;


                window.scrollTo({

                    top: posicao,

                    behavior: "smooth"

                });

            }
        );

    });


    /* ============================================================
       ANIMAÇÃO DE ENTRADA
    ============================================================ */

    const elementosAnimados =
        document.querySelectorAll(
            ".about-image-wrapper, " +
            ".about-content, " +
            ".hero-content"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const observador =
            new IntersectionObserver(
                function (entradas, observer) {

                    entradas.forEach(
                        function (entrada) {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entrada.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        elementosAnimados.forEach(
            function (elemento) {

                observador.observe(elemento);

            }
        );


    } else {

        elementosAnimados.forEach(
            function (elemento) {

                elemento.classList.add("visible");

            }
        );

    }


    /* ============================================================
       PARALLAX DO HERO
    ============================================================ */

    const hero =
        document.querySelector(".hero");


    const heroBackground =
        document.querySelector(".hero-background");


    if (
        hero &&
        heroBackground
    ) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.innerWidth < 768) {

                    return;

                }


                const scroll =
                    window.scrollY;


                if (
                    scroll <= window.innerHeight
                ) {

                    const movimento =
                        scroll * 0.08;


                    heroBackground.style.transform =
                        "scale(1.03) translateY(" +
                        movimento +
                        "px)";

                }

            },
            { passive: true }
        );

    }


    /* ============================================================
       LUZ DO HERO SEGUINDO O MOUSE
    ============================================================ */

    const heroGlow =
        document.querySelector(".hero-glow");


    if (
        hero &&
        heroGlow
    ) {

        hero.addEventListener(
            "mousemove",
            function (event) {

                if (window.innerWidth < 992) {

                    return;

                }


                const rect =
                    hero.getBoundingClientRect();


                const mouseX =
                    event.clientX - rect.left;


                const mouseY =
                    event.clientY - rect.top;


                const centroX =
                    rect.width / 2;


                const centroY =
                    rect.height / 2;


                const movimentoX =
                    (mouseX - centroX) * 0.02;


                const movimentoY =
                    (mouseY - centroY) * 0.02;


                heroGlow.style.transform =
                    "translate(" +
                    movimentoX +
                    "px, " +
                    "calc(-50% + " +
                    movimentoY +
                    "px))";

            }
        );


        hero.addEventListener(
            "mouseleave",
            function () {

                heroGlow.style.transform =
                    "translateY(-50%)";

            }
        );

    }


    /* ============================================================
       EFEITO DOS BOTÕES
    ============================================================ */

    const botoes =
        document.querySelectorAll(
            ".btn-gold, " +
            ".btn-outline, " +
            ".header-button"
        );


    botoes.forEach(function (botao) {

        botao.addEventListener(
            "mousemove",
            function (event) {

                if (window.innerWidth < 992) {

                    return;

                }


                const rect =
                    botao.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;


                const y =
                    event.clientY - rect.top;


                const rotacaoX =
                    ((y / rect.height) - 0.5) * -3;


                const rotacaoY =
                    ((x / rect.width) - 0.5) * 3;


                botao.style.transform =
                    "translateY(-2px) " +
                    "perspective(500px) " +
                    "rotateX(" +
                    rotacaoX +
                    "deg) " +
                    "rotateY(" +
                    rotacaoY +
                    "deg)";

            }
        );


        botao.addEventListener(
            "mouseleave",
            function () {

                botao.style.transform = "";

            }
        );

    });


    /* ============================================================
       EFEITO DE LUZ NAS IMAGENS
    ============================================================ */

    const imagensInterativas =
        document.querySelectorAll(
            ".about-image-frame, .artist-photo"
        );


    imagensInterativas.forEach(
        function (imagem) {

            imagem.addEventListener(
                "mousemove",
                function (event) {

                    if (window.innerWidth < 992) {

                        return;

                    }


                    const rect =
                        imagem.getBoundingClientRect();


                    const x =
                        event.clientX - rect.left;


                    const y =
                        event.clientY - rect.top;


                    imagem.style.setProperty(
                        "--mouse-x",
                        x + "px"
                    );


                    imagem.style.setProperty(
                        "--mouse-y",
                        y + "px"
                    );

                }
            );

        }
    );


    /* ============================================================
       MENU ATIVO
    ============================================================ */

    const secoes =
        document.querySelectorAll(
            "main section[id]"
        );


    function atualizarMenuAtivo() {

        const posicaoAtual =
            window.scrollY + 180;


        secoes.forEach(
            function (secao) {

                const inicio =
                    secao.offsetTop;


                const altura =
                    secao.offsetHeight;


                const id =
                    secao.getAttribute("id");


                if (
                    posicaoAtual >= inicio &&
                    posicaoAtual <
                    inicio + altura
                ) {

                    navigationLinks.forEach(
                        function (link) {

                            link.classList.remove(
                                "active"
                            );

                        }
                    );


                    const linkAtivo =
                        document.querySelector(
                            '.main-navigation a[href="#' +
                            id +
                            '"]'
                        );


                    if (linkAtivo) {

                        linkAtivo.classList.add(
                            "active"
                        );

                    }

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        atualizarMenuAtivo,
        { passive: true }
    );


    atualizarMenuAtivo();


    /* ============================================================
       IMAGENS COM ERRO
    ============================================================ */

    const todasImagens =
        document.querySelectorAll("img");


    todasImagens.forEach(
        function (imagem) {

            imagem.addEventListener(
                "error",
                function () {

                    console.warn(
                        "Imagem não encontrada:",
                        imagem.getAttribute("src")
                    );

                    imagem.classList.add(
                        "image-error"
                    );

                }
            );

        }
    );


    /* ============================================================
       WHATSAPP DO EMPRESÁRIO
    ============================================================ */

    const whatsappEmpresario =
        "5511993357285";


    /* ============================================================
       WHATSAPP DA LETÍCIA
    ============================================================ */

    const whatsappLeticia =
        "5521974648230";


    /* ============================================================
       CRIAR LINK DO WHATSAPP
    ============================================================ */

    function criarLinkWhatsApp(
        numero,
        mensagem
    ) {

        return (
            "https://wa.me/" +
            numero +
            "?text=" +
            encodeURIComponent(mensagem)
        );

    }


    /* ============================================================
       BOTÕES COM DATA-WHATSAPP
    ============================================================ */

    const botoesWhatsApp =
        document.querySelectorAll(
            "[data-whatsapp]"
        );


    botoesWhatsApp.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const mensagem =
                        botao.getAttribute(
                            "data-whatsapp"
                        );


                    const link =
                        criarLinkWhatsApp(
                            whatsappEmpresario,
                            mensagem ||
                            "Olá! Gostaria de informações sobre a contratação da Letícia Violinista."
                        );


                    window.open(
                        link,
                        "_blank"
                    );

                }
            );

        }
    );


    /* ============================================================
       BOTÕES PARA WHATSAPP DA ARTISTA
       ============================================================ */

    const botoesWhatsAppLeticia =
        document.querySelectorAll(
            "[data-whatsapp-leticia]"
        );


    botoesWhatsAppLeticia.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const mensagem =
                        botao.getAttribute(
                            "data-whatsapp-leticia"
                        );


                    const link =
                        criarLinkWhatsApp(
                            whatsappLeticia,
                            mensagem ||
                            "Olá Letícia! Gostaria de informações sobre seu trabalho."
                        );


                    window.open(
                        link,
                        "_blank"
                    );

                }
            );

        }
    );


    /* ============================================================
       E-MAIL
       ============================================================ */

    const email =
        "contato.leticiasoaresv@gmail.com";


    const botoesEmail =
        document.querySelectorAll(
            "[data-email]"
        );


    botoesEmail.forEach(
        function (botao) {

            botao.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    window.location.href =
                        "mailto:" + email;

                }
            );

        }
    );


    /* ============================================================
       TECLA ESC
    ============================================================ */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                if (navigation) {

                    navigation.classList.remove(
                        "active"
                    );

                }


                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                }

            }

        }
    );


    /* ============================================================
       DETECTAR TOUCH
    ============================================================ */

    const dispositivoTouch =
        (
            "ontouchstart" in window
        ) ||
        (
            navigator.maxTouchPoints > 0
        );


    if (dispositivoTouch) {

        body.classList.add(
            "touch-device"
        );

    }


    /* ============================================================
       ANO AUTOMÁTICO
    ============================================================ */

    const anos =
        document.querySelectorAll(
            "[data-current-year]"
        );


    anos.forEach(
        function (elemento) {

            elemento.textContent =
                new Date().getFullYear();

        }
    );

    ```
    javascript
    /* ============================================================
       FORMULÁRIO DE ORÇAMENTO — PARTE 08
       ============================================================ */

    const formularioOrcamento =
        document.getElementById("eventQuoteForm");


    if (formularioOrcamento) {

        formularioOrcamento.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* ==================================================
                   CAPTURAR CAMPOS
                ================================================== */

                const nome =
                    document
                        .getElementById("quoteName")
                        .value
                        .trim();


                const telefone =
                    document
                        .getElementById("quotePhone")
                        .value
                        .trim();


                const tipoEvento =
                    document
                        .getElementById("quoteEvent")
                        .value
                        .trim();


                const dataEvento =
                    document
                        .getElementById("quoteDate")
                        .value
                        .trim();


                const convidados =
                    document
                        .getElementById("quoteGuests")
                        .value
                        .trim();


                const localEvento =
                    document
                        .getElementById("quoteLocation")
                        .value
                        .trim();


                const detalhes =
                    document
                        .getElementById("quoteMessage")
                        .value
                        .trim();


                /* ==================================================
                   VALIDAÇÃO
                ================================================== */

                if (
                    !nome ||
                    !telefone ||
                    !tipoEvento
                ) {

                    alert(
                        "Por favor, preencha seu nome, WhatsApp e tipo de evento."
                    );

                    return;

                }


                /* ==================================================
                   FORMATAR DATA
                ================================================== */

                let dataFormatada =
                    "Não informada";


                if (dataEvento) {

                    const partesData =
                        dataEvento.split("-");


                    if (
                        partesData.length === 3
                    ) {

                        dataFormatada =
                            partesData[2] +
                            "/" +
                            partesData[1] +
                            "/" +
                            partesData[0];

                    }

                }


                /* ==================================================
                   VALORES PADRÃO
                ================================================== */

                const convidadosTexto =
                    convidados ||
                    "Não informado";


                const localTexto =
                    localEvento ||
                    "Não informado";


                const detalhesTexto =
                    detalhes ||
                    "Nenhum detalhe adicional informado.";


                /* ==================================================
                   MENSAGEM DO WHATSAPP
                ================================================== */

                const mensagemWhatsApp =
`Olá! Gostaria de solicitar um orçamento para a Letícia Violinista.

━━━━━━━━━━━━━━━━━━━━

*DADOS DO CLIENTE*

Nome: ${nome}
WhatsApp: ${telefone}

━━━━━━━━━━━━━━━━━━━━

*DADOS DO EVENTO*

Tipo de evento: ${tipoEvento}
Data: ${dataFormatada}
Número de convidados: ${convidadosTexto}
Local/Cidade: ${localTexto}

━━━━━━━━━━━━━━━━━━━━

*DETALHES*

${detalhesTexto}

━━━━━━━━━━━━━━━━━━━━

Gostaria de saber sobre disponibilidade, formato da apresentação, repertório e valores.

Aguardo o retorno. Obrigado(a)!`;


                /* ==================================================
                   CRIAR LINK
                ================================================== */

                const linkWhatsApp =
                    criarLinkWhatsApp(
                        whatsappEmpresario,
                        mensagemWhatsApp
                    );


                /* ==================================================
                   ABRIR WHATSAPP
                ================================================== */

                window.open(
                    linkWhatsApp,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    /* ============================================================
       MÁSCARA DE WHATSAPP
       ============================================================ */

    const campoTelefone =
        document.getElementById("quotePhone");


    if (campoTelefone) {

        campoTelefone.addEventListener(
            "input",
            function () {

                let valor =
                    campoTelefone.value
                        .replace(/\D/g, "")
                        .substring(0, 11);


                if (valor.length <= 10) {

                    valor =
                        valor.replace(
                            /^(\d{2})(\d)/,
                            "($1) $2"
                        );

                    valor =
                        valor.replace(
                            /(\d{4})(\d)/,
                            "$1-$2"
                        );

                } else {

                    valor =
                        valor.replace(
                            /^(\d{2})(\d)/,
                            "($1) $2"
                        );

                    valor =
                        valor.replace(
                            /(\d{5})(\d)/,
                            "$1-$2"
                        );

                }


                campoTelefone.value =
                    valor;

            }
        );

    }


    /* ============================================================
       DATA MÍNIMA DO EVENTO
       ============================================================ */

    const campoData =
        document.getElementById("quoteDate");


    if (campoData) {

        const hoje =
            new Date();


        const ano =
            hoje.getFullYear();


        const mes =
            String(
                hoje.getMonth() + 1
            ).padStart(2, "0");


        const dia =
            String(
                hoje.getDate()
            ).padStart(2, "0");


        campoData.min =
            ano +
            "-" +
            mes +
            "-" +
            dia;

    }


    /* ============================================================
       FEEDBACK VISUAL AO ENVIAR
       ============================================================ */

    if (formularioOrcamento) {

        formularioOrcamento.addEventListener(
            "submit",
            function () {

                const botao =
                    formularioOrcamento.querySelector(
                        ".form-submit"
                    );


                if (!botao) {
                    return;
                }


                const textoOriginal =
                    botao.innerHTML;


                botao.innerHTML =
                    '<i class="fa-brands fa-whatsapp"></i> Abrindo WhatsApp...';


                setTimeout(
                    function () {

                        botao.innerHTML =
                            textoOriginal;

                    },
                    2500
                );

            }
        );

    }

```javascript
/* =========================================================
   PARTE 11 — MODAL DE VÍDEOS
========================================================= */

const videoModal = document.getElementById("videoModal");
const videoModalClose = document.getElementById("videoModalClose");
const videoModalTitle = document.getElementById("videoModalTitle");
const videoModalCategory = document.getElementById("videoModalCategory");
const videoModalYoutube = document.getElementById("videoModalYoutube");
const videoModalOpen = document.getElementById("videoModalOpen");
const videoIframe = document.getElementById("videoIframe");

const videoCards = document.querySelectorAll(".video-card");

function abrirVideoModal(card) {

    if (!videoModal || !card) {
        return;
    }

    const videoUrl =
        card.getAttribute("data-video-url") ||
        "https://www.youtube.com/@leticiaaviolinista";

    const videoTitle =
        card.getAttribute("data-video-title") ||
        "Letícia Violinista";

    const videoCategory =
        card.getAttribute("data-video-category") ||
        "Apresentação";

    if (videoModalTitle) {
        videoModalTitle.textContent = videoTitle;
    }

    if (videoModalCategory) {
        videoModalCategory.textContent = videoCategory;
    }

    if (videoModalYoutube) {
        videoModalYoutube.href = videoUrl;
    }

    if (videoModalOpen) {
        videoModalOpen.href = videoUrl;
    }

    /*
        Como os links atualmente apontam para o canal,
        o modal apresenta o botão para abrir o conteúdo
        diretamente no YouTube.

        Quando tivermos os IDs dos vídeos específicos,
        poderemos transformar automaticamente o modal
        em player incorporado.
    */

    if (videoIframe) {
        videoIframe.src = "";
        videoIframe.style.display = "none";
    }

    const placeholder =
        document.querySelector(".video-modal-placeholder");

    if (placeholder) {
        placeholder.style.display = "flex";
    }

    videoModal.classList.add("active");

    videoModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("video-modal-open");

    if (videoModalClose) {
        setTimeout(function () {
            videoModalClose.focus();
        }, 100);
    }
}


function fecharVideoModal() {

    if (!videoModal) {
        return;
    }

    videoModal.classList.remove("active");

    videoModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("video-modal-open");

    if (videoIframe) {
        videoIframe.src = "";
        videoIframe.style.display = "none";
    }

    const placeholder =
        document.querySelector(".video-modal-placeholder");

    if (placeholder) {
        placeholder.style.display = "flex";
    }
}


/*
    Clique no botão PLAY
*/

document.querySelectorAll(".video-play-button").forEach(function (botao) {

    botao.addEventListener("click", function (evento) {

        evento.stopPropagation();

        const card = botao.closest(".video-card");

        abrirVideoModal(card);

    });

});


/*
    Clique no link "Assistir apresentação"
*/

document.querySelectorAll(".video-card-link").forEach(function (botao) {

    botao.addEventListener("click", function () {

        const card = botao.closest(".video-card");

        abrirVideoModal(card);

    });

});


/*
    Fechar pelo X
*/

if (videoModalClose) {

    videoModalClose.addEventListener("click", function () {

        fecharVideoModal();

    });

}


/*
    Fechar clicando no fundo escuro
*/

if (videoModal) {

    videoModal.addEventListener("click", function (evento) {

        if (
            evento.target.classList.contains(
                "video-modal"
            ) ||
            evento.target.classList.contains(
                "video-modal-backdrop"
            )
        ) {

            fecharVideoModal();

        }

    });

}


/*
    Fechar com ESC
*/

document.addEventListener("keydown", function (evento) {

    if (
        evento.key === "Escape" &&
        videoModal &&
        videoModal.classList.contains("active")
    ) {

        fecharVideoModal();

    }

});


/*
    Evita que a página fique rolando
    enquanto o modal estiver aberto.
*/

const videoModalStyle = document.createElement("style");

```
js
const videoModalStyle = document.createElement("style");

videoModalStyle.textContent =
    "body.video-modal-open {" +
        "overflow: hidden;" +
    "}" +
    ".video-modal {" +
        "display: none;" +
        "position: fixed;" +
        "inset: 0;" +
        "z-index: 9999;" +
    "}" +
    ".video-modal.active {" +
        "display: flex;" +
    "}";
    
document.head.appendChild(videoModalStyle);
```


document.head.appendChild(videoModalStyle);
```
```js
/* =========================================================
   PARTE 14 — FUNCIONAMENTO DO FAQ
   ========================================================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");

    if (!question) {
        return;
    }

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");


        /* Fecha todos os outros */

        faqItems.forEach((otherItem) => {

            otherItem.classList.remove("active");

            const otherQuestion =
                otherItem.querySelector(".faq-question");

            if (otherQuestion) {
                otherQuestion.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });


        /* Abre o selecionado */

        if (!isActive) {

            item.classList.add("active");

            question.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    });

});
```

```js
/* =========================================================
   PARTE 15 — WHATSAPP INTELIGENTE
   ========================================================= */

const contratacaoButtons =
    document.querySelectorAll(".contratacao-btn");


contratacaoButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const evento =
            button.getAttribute("data-evento");


        if (!evento) {
            return;
        }


        const mensagem =
            "Olá! Gostaria de solicitar informações sobre a " +
            "Letícia Violinista para um evento.\n\n" +

            "Tipo de evento: " +
            evento +
            "\n\n" +

            "Gostaria de consultar a disponibilidade, " +
            "condições e orçamento para a apresentação.";


        const linkWhatsApp =
            criarLinkWhatsApp(
                whatsappEmpresario,
                mensagem
            );


        window.open(
            linkWhatsApp,
            "_blank",
            "noopener,noreferrer"
        );

    });

});
```
```javascript
/* =========================================================
   PARTE 20 — BOTÕES DOS FORMATOS
   ========================================================= */

const formatoButtons = document.querySelectorAll(".formato-btn");

formatoButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const formato = button.getAttribute("data-formato");

        if (!formato) return;

        const mensagem =
            "Olá! Gostaria de solicitar informações sobre a " +
            "Letícia Violinista para meu evento.\n\n" +
            "Tenho interesse no seguinte formato: " +
            formato +
            ".\n\n" +
            "Gostaria de consultar disponibilidade, " +
            "condições e uma proposta personalizada.";

        const linkWhatsApp =
            criarLinkWhatsApp(
                whatsappEmpresario,
                mensagem
            );

        window.open(
            linkWhatsApp,
            "_blank",
            "noopener,noreferrer"
        );

    });

});
```
```javascript
/* ==========================================
   PARTE 28 — WHATSAPP DOS FORMATOS
   ========================================== */

const experienciaEscolhaButtons =
    document.querySelectorAll(".experiencia-plano-btn");

experienciaEscolhaButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const formato =
            button.getAttribute("data-formato-escolha");

        if (!formato) return;

        const mensagem =
            "Olá! Gostaria de solicitar informações sobre a " +
            "Letícia Violinista para meu evento.\n\n" +
            "Tenho interesse na " +
            formato +
            ".\n\n" +
            "Gostaria de consultar disponibilidade, " +
            "condições e uma proposta personalizada.";

        const linkWhatsApp =
            criarLinkWhatsApp(
                whatsappEmpresario,
                mensagem
            );

        window.open(
            linkWhatsApp,
            "_blank",
            "noopener,noreferrer"
        );

    });

});
```

```javascript
/* =========================================================
   PARTE 34 — ATMOSFERAS MUSICAIS
   ========================================================= */

const atmosferaButtons =
    document.querySelectorAll(".atmosfera-btn");

atmosferaButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const atmosfera =
            button.getAttribute("data-atmosfera");

        if (!atmosfera) return;

        const mensagem =
            "Olá! Gostaria de solicitar informações sobre a " +
            "Letícia Violinista para meu evento.\n\n" +
            "A atmosfera musical que mais combina com o que " +
            "imagino é: " +
            atmosfera +
            ".\n\n" +
            "Gostaria de conversar sobre disponibilidade, " +
            "formatos e uma proposta personalizada.";

        const linkWhatsApp =
            criarLinkWhatsApp(
                whatsappEmpresario,
                mensagem
            );

        window.open(
            linkWhatsApp,
            "_blank",
            "noopener,noreferrer"
        );

    });

});
```

```javascript
/* =========================================================
   PARTE 35 — REPERTÓRIO COMO EXPERIÊNCIA
   ========================================================= */

const repertorioButtons =
    document.querySelectorAll(".repertorio-escolha-btn");

const repertorioPersonalizadoButton =
    document.querySelector(
        ".btn-repertorio-personalizado"
    );


repertorioButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const repertorio =
            button.getAttribute("data-repertorio");

        if (!repertorio) return;

        const mensagem =
            "Olá! Gostaria de solicitar informações sobre a " +
            "Letícia Violinista para meu evento.\n\n" +
            "Tenho interesse no seguinte estilo de repertório: " +
            repertorio +
            ".\n\n" +
            "Gostaria de conhecer as possibilidades, " +
            "disponibilidade e condições para a apresentação.";

        const linkWhatsApp =
            criarLinkWhatsApp(
                whatsappEmpresario,
                mensagem
            );

        window.open(
            linkWhatsApp,
            "_blank",
            "noopener,noreferrer"
        );

    });

});


if (repertorioPersonalizadoButton) {

    repertorioPersonalizadoButton.addEventListener(
        "click",
        () => {

            const mensagem =
                "Olá! Gostaria de conversar sobre um " +
                "repertório personalizado para a apresentação " +
                "da Letícia Violinista.\n\n" +
                "Gostaria de explicar como imagino o meu evento " +
                "e receber orientação sobre as possibilidades.";

            const linkWhatsApp =
                criarLinkWhatsApp(
                    whatsappEmpresario,
                    mensagem
                );

            window.open(
                linkWhatsApp,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );

}
```

```javascript
/* =========================================================
   PARTE 36 — SOLICITAÇÃO DE DISPONIBILIDADE
   ========================================================= */

const availabilityForm =
    document.querySelector("#availabilityForm");

const availabilityDate =
    document.querySelector("#availabilityDate");


/* DATA MÍNIMA */

if (availabilityDate) {

    const hoje = new Date();

    const ano = hoje.getFullYear();

    const mes =
        String(hoje.getMonth() + 1).padStart(2, "0");

    const dia =
        String(hoje.getDate()).padStart(2, "0");

    availabilityDate.min =
        ano + "-" + mes + "-" + dia;
}


/* ENVIO */

if (availabilityForm) {

    availabilityForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const nome =
                document.querySelector(
                    "#availabilityName"
                ).value.trim();

            const data =
                document.querySelector(
                    "#availabilityDate"
                ).value;

            const evento =
                document.querySelector(
                    "#availabilityEvent"
                ).value;

            const cidade =
                document.querySelector(
                    "#availabilityCity"
                ).value.trim();

            const detalhes =
                document.querySelector(
                    "#availabilityDetails"
                ).value.trim();


            if (!nome || !data || !evento || !cidade) {

                alert(
                    "Por favor, preencha os campos obrigatórios."
                );

                return;
            }


            const partesData =
                data.split("-");

            let dataFormatada = data;

            if (partesData.length === 3) {

                dataFormatada =
                    partesData[2] +
                    "/" +
                    partesData[1] +
                    "/" +
                    partesData[0];

            }


            const detalhesFinais =
                detalhes ||
                "Ainda não informado.";


            const mensagem =
                "Olá! Gostaria de consultar a disponibilidade " +
                "da Letícia Violinista para o meu evento.\n\n" +

                "Nome: " +
                nome +
                "\n\n" +

                "Data do evento: " +
                dataFormatada +
                "\n\n" +

                "Tipo de evento: " +
                evento +
                "\n\n" +

                "Cidade / região: " +
                cidade +
                "\n\n" +

                "Detalhes: " +
                detalhesFinais +
                "\n\n" +

                "Gostaria de receber informações sobre " +
                "disponibilidade, formatos e orçamento.";


            const linkWhatsApp =
                criarLinkWhatsApp(
                    whatsappEmpresario,
                    mensagem
                );


            const submitButton =
                availabilityForm.querySelector(
                    ".disponibilidade-submit"
                );


            if (submitButton) {

                const textoOriginal =
                    submitButton.innerHTML;

                submitButton.innerHTML =
                    "<span>Abrindo WhatsApp...</span>" +
                    "<i class=\"fa-brands fa-whatsapp\"></i>";

                submitButton.disabled = true;

                setTimeout(() => {

                    window.open(
                        linkWhatsApp,
                        "_blank",
                        "noopener,noreferrer"
                    );

                    submitButton.innerHTML =
                        textoOriginal;

                    submitButton.disabled = false;

                }, 250);

            } else {

                window.open(
                    linkWhatsApp,
                    "_blank",
                    "noopener,noreferrer"
                );

            }

        }
    );

}
```

```javascript
/* =========================================================
   PARTE 44 — CENTRAL DE SOLICITAÇÃO DE PROPOSTA
========================================================= */

const propostaOpcoes =
    document.querySelectorAll(".proposta-opcao");

const btnEnviarProposta =
    document.getElementById("btnEnviarProposta");

let propostaEvento = "";
let propostaFormato = "";
let propostaAtmosfera = "";


/* SELEÇÃO DAS OPÇÕES */

propostaOpcoes.forEach((opcao) => {

    opcao.addEventListener("click", () => {

        const evento =
            opcao.getAttribute("data-proposta-evento");

        const formato =
            opcao.getAttribute("data-proposta-formato");

        const atmosfera =
            opcao.getAttribute("data-proposta-atmosfera");


        if (evento) {

            propostaEvento = evento;

            document
                .querySelectorAll(
                    "[data-proposta-evento]"
                )
                .forEach((item) => {

                    item.classList.remove("selected");

                });

            opcao.classList.add("selected");
        }


        if (formato) {

            propostaFormato = formato;

            document
                .querySelectorAll(
                    "[data-proposta-formato]"
                )
                .forEach((item) => {

                    item.classList.remove("selected");

                });

            opcao.classList.add("selected");
        }


        if (atmosfera) {

            propostaAtmosfera = atmosfera;

            document
                .querySelectorAll(
                    "[data-proposta-atmosfera]"
                )
                .forEach((item) => {

                    item.classList.remove("selected");

                });

            opcao.classList.add("selected");
        }

    });

});


/* ENVIO PARA WHATSAPP */

if (btnEnviarProposta) {

    btnEnviarProposta.addEventListener("click", () => {

        const evento =
            propostaEvento || "Ainda não definido";

        const formato =
            propostaFormato || "Ainda não definido";

        const atmosfera =
            propostaAtmosfera || "Ainda não definida";


        const mensagem =
            "Olá! Gostaria de solicitar uma proposta " +
            "personalizada para a Letícia Violinista.\n\n" +

            "Tipo de evento: " +
            evento +
            "\n\n" +

            "Formato desejado: " +
            formato +
            "\n\n" +

            "Atmosfera desejada: " +
            atmosfera +
            "\n\n" +

            "Gostaria de conversar com a equipe sobre " +
            "disponibilidade, possibilidades e condições " +
            "para a apresentação.";


        const linkWhatsApp =
            criarLinkWhatsApp(
                whatsappEmpresario,
                mensagem
            );


        btnEnviarProposta.classList.add(
            "enviando"
        );

        const textoOriginal =
            btnEnviarProposta.innerHTML;

        btnEnviarProposta.innerHTML =
            "<span>" +
            "<i class='fa-brands fa-whatsapp'></i>" +
            " Abrindo WhatsApp..." +
            "</span>" +
            "<i class='fa-solid fa-spinner fa-spin'></i>";


        window.open(
            linkWhatsApp,
            "_blank",
            "noopener,noreferrer"
        );


        setTimeout(() => {

            btnEnviarProposta.classList.remove(
                "enviando"
            );

            btnEnviarProposta.innerHTML =
                textoOriginal;

        }, 1800);

    });

}
```


```


    /* ============================================================
       FINAL
    ============================================================ */

    console.log(
        "Todos os recursos JavaScript foram carregados."
    );



});
```
