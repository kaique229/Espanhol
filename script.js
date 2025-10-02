const questions = [
    {
        question: "¿En qué país se encuentra Machu Picchu?",
        answers: ["Perú", "México", "Brasil", "Chile"],
        correct: 0
    },
    {
        question: "¿Qué civilización construyó Machu Picchu?",
        answers: ["Inca", "Maya", "Azteca", "Olmeca"],
        correct: 0
    },
    {
        question: "¿En qué siglo fue construida Machu Picchu?",
        answers: ["Siglo XV", "Siglo XVIII", "Siglo XII", "Siglo XX"],
        correct: 0
    },
    {
        question: "¿Qué río pasa cerca de Machu Picchu?",
        answers: ["Urubamba", "Amazonas", "Nilo", "Danubio"],
        correct: 0
    },
    {
        question: "¿Machu Picchu es considerada una de las:",
        answers: ["Siete maravillas del mundo moderno", "Siete maravillas del mundo antiguo", "Siete colinas de Roma", "Siete mares"],
        correct: 0
    },
    
    {
        question: "¿Cuál es la capital de Perú?",
        answers: ["Cuzco", "Arequipa", "Lima", "Iquitos"],
        correct: 2
    },
    {
        question: "¿Quién fue el último Inca?",
        answers: ["Manco Cápac", "Pachacútec", "Atahualpa", "Túpac Amaru I"],
        correct: 2
    },
    {
        question: "¿En qué océano está la costa peruana?",
        answers: ["Atlántico", "Índico", "Pacífico", "Ártico"],
        correct: 2
    },
    {
        question: "¿Qué famoso lago se comparte entre Perú y Bolivia?",
        answers: ["Lago Poopó", "Lago Titicaca", "Lago Junín", "Lago Huacachina"],
        correct: 1
    },
    {
        question: "¿Cuál es el animal nacional de Perú?",
        answers: ["Llama", "Vicuña", "Cóndor Andino", "Oso de Anteojos"],
        correct: 1
    },
    {
        question: "¿Qué culturas pre-incas são famosas por las misteriosas líneas en el desierto?",
        answers: ["Mochica", "Wari", "Chavín", "Nazca"],
        correct: 3
    },
    {
        question: "¿Cuál es el plato bandera de la gastronomía peruana?",
        answers: ["Lomo Saltado", "Ají de Gallina", "Ceviche", "Pollo a la Brasa"],
        correct: 2
    },
    {
        question: "¿Qué ciudad inca es conocida como 'el ombligo del mundo'?",
        answers: ["Ollantaytambo", "Choquequirao", "Cuzco", "Pisac"],
        correct: 2
    },
    {
        question: "¿Qué explorador 'redescubrió' Machu Picchu en 1911?",
        answers: ["Francisco Pizarro", "Alexander von Humboldt", "Hiram Bingham", "Hernán Cortés"],
        correct: 2
    },
    {
        question: "¿En qué región natural se encuentra la mayor parte de la selva peruana?",
        answers: ["Costa", "Sierra", "Selva", "Andes"],
        correct: 2
    },
    {
        question: "¿Cuál es la bebida nacional de Perú a base de uva?",
        answers: ["Chicha Morada", "Inca Kola", "Pisco Sour", "Emoliente"],
        correct: 2
    },
    {
        question: "¿Qué significa 'Quechua'?",
        answers: ["Templo del Sol", "Ciudad Antigua", "Idioma de los Incas", "Montaña Sagrada"],
        correct: 2
    },
    {
        question: "¿Cuál es el mineral más importante exportado por Perú?",
        answers: ["Plata", "Oro", "Cobre", "Zinc"],
        correct: 2
    },
    {
        question: "¿Quién declaró la independencia de Perú en 1821?",
        answers: ["Simón Bolívar", "José de San Martín", "Túpac Amaru II", "Ramón Castilla"],
        correct: 1
    },
    {
        question: "¿Cuántas variedades de papa se estima que tiene Perú?",
        answers: ["Menos de 100", "Alrededor de 500", "Más de 3,000", "Aproximadamente 1,000"],
        correct: 2
    }
];
let currentQuestion = 0;
let score = 0;
const MAX_LIVES = 10; // Corações máximos
let lives = MAX_LIVES; // Corações atuais
let timer; // Variável para o setInterval
// MUDANÇA AQUI: NOVO LIMITE DE TEMPO DE 50 SEGUNDOS
const TIME_LIMIT = 50; // Limite de tempo em segundos 
let timerEl; // Container da barra de tempo
let timerBarFill; // A barra interna que diminui

// --- SELETORES DE ELEMENTOS ---
const jugarBtn = document.getElementById('jogar');
const quizDiv = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answersDiv = document.getElementById('answers');
const nextBtn = document.getElementById('next');
const scoreEl = document.getElementById('score');

// 🎧 LÓGICA DE ÁUDIO 🎧
// Som de aviso de tempo baixo (1 segundo)
const lowTimeSound = new Audio('creper.mpeg'); 
let isSoundPlayed = false; // Flag para garantir que o som toque apenas uma vez

// NOVOS SONS:
const correctSound = new Audio('questao correta.mpeg');
const incorrectSound = new Audio('questao errada.mpeg');

// Som de clique nos botões
const somDoClique = new Audio('clic.mpeg'); 
// FIM DA LÓGICA DE ÁUDIO


// --- FUNÇÃO ATUALIZAR CORAÇÕES (VIDAS) ---
function updateLivesDisplay() {
    let livesContainer = document.getElementById('lives-container');
    
    // Cria o container de corações se ele não existir
    if (!livesContainer) {
        livesContainer = document.createElement('div');
        livesContainer.id = 'lives-container';
        // Estilos para o canto superior esquerdo
        livesContainer.style.position = 'fixed';
        livesContainer.style.top = '10px';
        livesContainer.style.left = '20px';
        livesContainer.style.zIndex = '1000';
        livesContainer.style.display = 'flex';
        livesContainer.style.gap = '5px';
        livesContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        livesContainer.style.padding = '5px 10px';
        livesContainer.style.borderRadius = '10px';
        document.body.appendChild(livesContainer);
    }
    
    // Atualiza a exibição
    livesContainer.innerHTML = ''; // Limpa os corações anteriores
    for (let i = 0; i < MAX_LIVES; i++) {
        const heartImg = document.createElement('img');
        heartImg.src = 'coracao.png'; // ⚠️ Imagem do coração (Ajuste o caminho se necessário)
        heartImg.alt = 'Coração';
        heartImg.style.width = '30px'; 
        heartImg.style.height = '30px';
        
        // Aplica opacidade se for um coração perdido
        if (i >= lives) {
            heartImg.style.opacity = '0.3';
            heartImg.style.filter = 'grayscale(100%)';
        } else {
            heartImg.style.opacity = '1.0';
            heartImg.style.filter = 'none';
        }
        
        livesContainer.appendChild(heartImg);
    }
    
    // Se não estiver no quiz, esconde o container (chamado em resetQuiz)
    if (quizDiv.style.display === 'none') {
        livesContainer.style.display = 'none';
    } else {
        livesContainer.style.display = 'flex';
    }
}


// --- FUNÇÃO DE INÍCIO DO CRONÔMETRO (BARRA) ---
function startTimer() {
    clearInterval(timer);
    let timeLeft = TIME_LIMIT;
    isSoundPlayed = false; // Resetar a flag ao iniciar o cronômetro
    
    updateLivesDisplay(); // 🔄 NOVO: Garante que os corações estejam visíveis e corretos
    
    // Reset da barra para 100% de largura (reinício instantâneo)
    timerBarFill.style.transition = 'none';
    timerBarFill.style.width = '100%';
    timerBarFill.classList.remove('time-up', 'time-low');
    
    // Força o reflow para aplicar o 'none' antes de reativar a transição
    void timerBarFill.offsetWidth; 
    
    // Habilita a transição para a diminuição suave
    timerBarFill.style.transition = 'width 1s linear, background-color 0.5s ease'; 

    timer = setInterval(() => {
        timeLeft--;
        
        const newWidth = (timeLeft / TIME_LIMIT) * 100;
        timerBarFill.style.width = `${newWidth}%`;

        // O som de tempo baixo toca quando faltar 3 segundos
        // E o estilo 'time-low' é adicionado/removido
        if (timeLeft <= 3 && timeLeft > 0) { // Mantido 3 segundos para aviso
            timerBarFill.classList.add('time-low');
            
            // 🔊 Lógica para tocar o som de tempo baixo
            if (!isSoundPlayed) {
                lowTimeSound.currentTime = 0; // Reinicia o som
                lowTimeSound.play()
                    .catch(e => console.warn("Erro ao tocar som de tempo baixo:", e)); 
                isSoundPlayed = true; // Define a flag para não tocar novamente
            }

        } else if (timeLeft > 3) { // Retorna ao normal se o tempo for maior que 3 segundos
            timerBarFill.classList.remove('time-low');
            isSoundPlayed = false; 
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

// --- FUNÇÃO TEMPO ESGOTADO ---
function timeUp() {
    // Se o usuário já selecionou uma resposta antes de dar o tempo, não faz nada
    if (answersDiv.querySelector('.selected')) {
        return; 
    }
    
    // 💔 Perde um coração por esgotar o tempo
    lives--; 
    updateLivesDisplay(); // Atualiza visualmente
    
    timerBarFill.classList.add('time-up');
    
    questionEl.textContent = `Tiempo agotado! (-1 Corazón)`;
    
    // Desabilita todos os botões de resposta
    Array.from(answersDiv.children).forEach(btn => {
        btn.onclick = null;
        btn.disabled = true;
    });

    // 💥 NOVO: Checa se acabou o jogo
    if (lives <= 0) {
        // Encerra imediatamente se as vidas acabaram
        setTimeout(() => {
            showScore(true); // 'true' indica que o jogo terminou por Game Over
        }, 1500);
        return; 
    }

    // Avança para a próxima pergunta após 1.5s (se ainda houver perguntas)
    setTimeout(() => {
        // Se ainda houver perguntas E o botão next não estiver visível (ou seja, não foi clicado)
        if (currentQuestion < questions.length && nextBtn.style.display === 'none') {
            currentQuestion++; // Avança a pergunta manualmente
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                 showScore(false); // Fim normal do quiz se a última pergunta estourou o tempo
            }
        }
    }, 1500); 
}

// --- FUNÇÃO EXIBIR PERGUNTA ---
function showQuestion() {
    nextBtn.style.display = 'none';
    scoreEl.style.display = 'none';

    // Cria a barra de tempo se ela ainda não existir no DOM
    if (!timerEl) {
        timerEl = document.createElement('div');
        timerEl.id = 'timer-bar-container';
        
        timerBarFill = document.createElement('div'); 
        timerBarFill.id = 'timer-bar-fill';
        
        timerEl.appendChild(timerBarFill);
        // Insere a barra de tempo logo após o elemento da pergunta
        questionEl.parentNode.insertBefore(timerEl, questionEl.nextSibling); 
    }
    
    timerEl.style.display = 'block'; 

    const q = questions[currentQuestion];
    questionEl.textContent = `${currentQuestion + 1}/${questions.length}: ${q.question}`; // Adiciona o contador de perguntas
    answersDiv.innerHTML = '';
    
    // Cria os botões de resposta
    q.answers.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-mine answer-btn'; // Adiciona 'answer-btn' para estilo e lógica de som
        btn.textContent = ans;
        // Adiciona a função para selecionar a resposta
        btn.onclick = () => selectAnswer(idx); 
        answersDiv.appendChild(btn);
    });
    
    // Garante que o som de clique seja adicionado aos novos botões criados
    addClickSoundToButtons();

    startTimer();
} 

// --- FUNÇÃO SELECIONAR RESPOSTA (AGORA COM SONS DE ACERTO/ERRO E CORAÇÕES) ---
function selectAnswer(idx) {
    clearInterval(timer);
    
    timerBarFill.classList.remove('time-low'); 
    
    nextBtn.style.display = 'inline-block';

    const q = questions[currentQuestion];
    if (answersDiv.querySelector('.selected')) return;

    // Marca o botão selecionado
    answersDiv.children[idx].classList.add('selected');
    
    // Desativa cliques futuros nos botões de resposta
    Array.from(answersDiv.children).forEach(btn => {
        btn.onclick = null;
    });

    // Lógica de pontuação, som e corações
    if (idx === q.correct) {
        score += 1000;
        
        // 🔊 Som de acerto
        correctSound.currentTime = 0;
        correctSound.play().catch(e => console.warn("Erro ao tocar som de acerto:", e));

        // Feedback visual
        answersDiv.children[idx].classList.add('correct');

    } else {
        // 💔 Perde um coração por erro
        lives--;
        
        // 🔊 Som de erro
        incorrectSound.currentTime = 0;
        incorrectSound.play().catch(e => console.warn("Erro ao tocar som de erro:", e));

        // Feedback visual: marca a errada e a correta
        answersDiv.children[idx].classList.add('wrong');
        answersDiv.children[q.correct].classList.add('correct');
    }
    
    // 💥 Atualiza a exibição de vidas
    updateLivesDisplay(); 
    
    // 💥 Checa se o jogo terminou por Game Over
    if (lives <= 0) {
        // Se as vidas acabaram, o botão 'Próximo' é escondido e showScore é chamado
        nextBtn.style.display = 'none';
        setTimeout(() => {
            showScore(true); // 'true' indica que o jogo terminou por Game Over
        }, 1500);
        return; 
    }

    updateScoreDisplay();
}

// --- FUNÇÃO ATUALIZAR PLACAR (CANTO DA TELA) ---
function updateScoreDisplay() {
    let scoreCorner = document.getElementById('score-corner');
    if (!scoreCorner) {
        scoreCorner = document.createElement('div');
        scoreCorner.id = 'score-corner';
        scoreCorner.style.position = 'fixed';
        scoreCorner.style.top = '10px';
        scoreCorner.style.right = '20px';
        scoreCorner.style.background = 'rgba(255, 255, 255, 0.9)';
        scoreCorner.style.padding = '8px 16px';
        scoreCorner.style.borderRadius = '8px';
        scoreCorner.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        scoreCorner.style.fontWeight = 'bold';
        scoreCorner.style.zIndex = '1000';
        document.body.appendChild(scoreCorner);
    }
    scoreCorner.textContent = `Puntaje: ${score}`;
    scoreCorner.style.display = 'block';
}

// --- FUNÇÃO MOSTRAR PLACAR FINAL E GUARDAR HISTÓRICO ---
function showScore(isGameOver = false) {
    clearInterval(timer); 

    const maxScore = questions.length * 1000; // 20 perguntas * 1000 = 20000

    if (isGameOver) {
        questionEl.textContent = '¡GAME OVER! Perdiste todos tus corazones.';
    } else {
        questionEl.textContent = '¡Quiz terminado! 🥳';
    }
    
    answersDiv.innerHTML = ''; 
    nextBtn.style.display = 'none';

    if (timerEl) timerEl.style.display = 'none';
    
    scoreEl.textContent = `Puntaje Final: ${score} de ${maxScore}`;
    scoreEl.style.display = 'block';

    // Esconde o placar do canto e os corações
    const scoreCorner = document.getElementById('score-corner');
    if (scoreCorner) scoreCorner.style.display = 'none';
    const livesContainer = document.getElementById('lives-container');
    if (livesContainer) livesContainer.style.display = 'none';
    
    saveScoreToHistory(score);

    const backBtn = document.createElement('button');
    backBtn.className = 'btn-mine answer-btn'; 
    backBtn.textContent = 'Voltar ao Menu'; 
    backBtn.onclick = resetQuiz; 
    answersDiv.appendChild(backBtn); 
    
    // Garante que o botão final também tenha o som de clique
    addClickSoundToButtons(); 
}

// --- FUNÇÃO RESETAR QUIZ ---
function resetQuiz() {
    clearInterval(timer); 

    document.querySelector('.menu').style.display = 'flex'; 
    document.querySelector('.menu-options').style.display = 'flex';
    quizDiv.style.display = 'none';
    
    questionEl.textContent = '';
    answersDiv.innerHTML = '';
    scoreEl.style.display = 'none';

    const scoreCorner = document.getElementById('score-corner');
    if (scoreCorner) {
        scoreCorner.style.display = 'none';
    }
    
    const livesContainer = document.getElementById('lives-container');
    if (livesContainer) {
        livesContainer.style.display = 'none';
    }
    
    if (timerEl) {
        timerEl.style.display = 'none';
    }

    document.body.classList.remove('quiz-active'); 
    document.body.style.backgroundImage = `url('fundo.jpg')`; // (Ajuste o caminho se necessário)
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.filter = 'none'; 
    document.body.style.backgroundColor = 'initial'; 
    
    quizDiv.style.backgroundColor = 'transparent';
    quizDiv.style.backdropFilter = 'none';
    quizDiv.style.filter = 'none';
    
    currentQuestion = 0;
    score = 0;
    lives = MAX_LIVES; // 🔄 Reinicia os corações
}

// --- FUNÇÕES DE HISTÓRICO E MODAL ---

function saveScoreToHistory(finalScore) {
    let history = JSON.parse(localStorage.getItem('quizScores')) || [];
    
    const newEntry = {
        score: finalScore,
        date: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })
    };
    history.push(newEntry);
    
    if (history.length > 10) {
        history = history.slice(history.length - 10);
    }
    
    localStorage.setItem('quizScores', JSON.stringify(history));
}

function showHistoryModal() {
    const modal = document.getElementById('history-modal');
    const historyList = document.getElementById('history-list');
    
    const history = JSON.parse(localStorage.getItem('quizScores')) || [];
    
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<li>Nenhuma pontuação registrada ainda.</li>';
    } else {
        history.slice().reverse().forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `Pontos: ${entry.score} (Data: ${entry.date})`;
            historyList.appendChild(li);
        });
    }
    
    modal.style.display = 'flex';
}

function hideHistoryModal() {
    document.getElementById('history-modal').style.display = 'none';
}

function showPopupModal() {
    const popupModal = document.getElementById('poupup-modal');
    if (popupModal) {
        popupModal.style.display = 'flex';
    } else {
        console.error("Erro: Modal '#poupup-modal' não encontrado.");
    }
}

function hidePopupModal() {
    const popupModal = document.getElementById('poupup-modal');
    if (popupModal) {
        popupModal.style.display = 'none';
    }
}

// --- FUNÇÃO PARA ADICIONAR SOM DE CLIQUE EM TODOS OS BOTÕES .btn-mine ---
function addClickSoundToButtons() {
    // 1. Selecionar TODOS os botões com a classe '.btn-mine'
    const meusBotoes = document.querySelectorAll('.btn-mine'); 

    // 2. Percorrer a lista de botões e adicionar o 'listener' a CADA UM
    meusBotoes.forEach(botao => {
        // Remove listeners antigos para evitar que o som toque múltiplas vezes
        botao.removeEventListener('click', playClickSound); 
        
        // Adiciona o novo listener
        botao.addEventListener('click', playClickSound);
    });
}

function playClickSound() {
    somDoClique.currentTime = 0; 
    somDoClique.play()
        .catch(error => {
            console.warn("Não foi possível tocar o som de clique:", error);
        });
}


// --- INICIALIZAÇÃO E LISTENERS DE EVENTOS ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicia o som de clique nos botões estáticos (menu)
    addClickSoundToButtons();
    
    // Inicia o quiz ao clicar em Jogar
    jugarBtn.addEventListener('click', () => {
        document.querySelector('.menu').style.display = 'none';
        document.querySelector('.menu-options').style.display = 'none';
        quizDiv.style.display = 'block';
        currentQuestion = 0;
        score = 0;
        lives = MAX_LIVES; // 🔄 Reinicia as vidas ao iniciar
        
        document.body.style.animation = 'none';
        document.body.classList.add('quiz-active'); 
        document.body.style.backgroundImage = `url('image.png')`;
        // ... (Estilos de fundo omitidos para brevidade) ...

        // Garante que a barra de tempo seja criada antes da primeira pergunta
        showQuestion(); // showQuestion já chama startTimer
    });

    // Avança para a próxima pergunta
    nextBtn.addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showScore(false); // Fim normal do quiz
        }
    });

    // Listener para o botão de Histórico (Puntuación)
    const historicoBtn = document.getElementById('historico-btn');
    if (historicoBtn) {
        historicoBtn.addEventListener('click', showHistoryModal);
    }
    
    // Listener para o botão Sair
    const exitBtn = document.getElementById('sair-btn'); 
    if (exitBtn) {
        exitBtn.addEventListener('click', () => {
            window.close();
            alert("O navegador impediu o fechamento automático. Feche a aba manualmente, por favor.");
        });
    }

    // Listener para o botão de Instruções/Info
    const infoBtn = document.getElementById('info-btn');
    if (infoBtn) {
        infoBtn.addEventListener('click', showPopupModal);
    } 
    
    // Listeners para fechar modais ao clicar no X
    // Note: No HTML atual, os botões fechar são chamados por 'onclick'. Não é estritamente necessário, mas mantendo para consistência.
    const historyCloseBtn = document.querySelector('#history-modal .close-button');
    if (historyCloseBtn) historyCloseBtn.onclick = hideHistoryModal;
    
    const popupCloseBtn = document.querySelector('#poupup-modal .close-button');
    if (popupCloseBtn) popupCloseBtn.onclick = hidePopupModal;
});




let mapSlideIndex = 0; // Começa na primeira imagem (índice 0)

const mapModal = document.getElementById("map-gallery-modal");
const mapSlides = document.getElementsByClassName("map-slide"); // Seleciona todas as imagens

// Função para abrir o modal da galeria
function openMapModal(startIndex = 1) {
    // Garante que o índice inicial está dentro dos limites
    mapSlideIndex = Math.max(0, Math.min(startIndex - 1, mapSlides.length - 1));
    showMapSlide(mapSlideIndex);
    mapModal.style.display = "block";
}

// Função para fechar o modal da galeria
function closeMapModal() {
    mapModal.style.display = "none";
}

// Função para avançar ou retroceder no carrossel
function changeMapSlide(n) {
    showMapSlide(mapSlideIndex + n);
}

// Função para mostrar a imagem atual e esconder as outras
function showMapSlide(n) {
    // Calcula o novo índice e garante o loop (carrossel infinito)
    if (n >= mapSlides.length) {
        mapSlideIndex = 0;
    } else if (n < 0) {
        mapSlideIndex = mapSlides.length - 1;
    } else {
        mapSlideIndex = n;
    }
    
    // Esconde todas as imagens
    for (let i = 0; i < mapSlides.length; i++) {
        mapSlides[i].style.display = "none";
    }
    
    // Mostra a imagem atual
    mapSlides[mapSlideIndex].style.display = "block";
}

// Inicializa a galeria ao carregar a página (opcional, se quiser uma imagem visível fora do modal)
// showMapSlide(mapSlideIndex);

// Fechar o modal da galeria ao clicar fora dele
window.onclick = function(event) {
    // Verifica se o clique foi na área escura do modal da galeria
    if (event.target == mapModal) {
        closeMapModal();
    }
}