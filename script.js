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
    }
];

let currentQuestion = 0;
let score = 0;
let timer; // Variável para o setInterval
const TIME_LIMIT = 10; // Limite de tempo em segundos
let timerEl; // Container da barra de tempo
let timerBarFill; // A barra interna que diminui

const jugarBtn = document.getElementById('jogar');
const quizDiv = document.getElementById('quiz');
const questionEl = document.getElementById('question');
const answersDiv = document.getElementById('answers');
const nextBtn = document.getElementById('next');
const scoreEl = document.getElementById('score');

// --- FUNÇÃO DE INÍCIO DO CRONÔMETRO (BARRA) ---
function startTimer() {
    clearInterval(timer);
    let timeLeft = TIME_LIMIT;
    
    // Reset da barra para 100% de largura (reinício instantâneo)
    timerBarFill.style.transition = 'none';
    timerBarFill.style.width = '100%';
    timerBarFill.classList.remove('time-up', 'time-low');
    
    void timerBarFill.offsetWidth; 
    
    // Habilita a transição para a diminuição suave
    timerBarFill.style.transition = 'width 1s linear, background-color 0.5s ease'; 

    timer = setInterval(() => {
        timeLeft--;
        
        const newWidth = (timeLeft / TIME_LIMIT) * 100;
        timerBarFill.style.width = `${newWidth}%`;

        if (timeLeft <= 3 && timeLeft > 0) {
             timerBarFill.classList.add('time-low');
        } else if (timeLeft > 3) {
             timerBarFill.classList.remove('time-low');
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            timeUp();
        }
    }, 1000);
}

// --- FUNÇÃO TEMPO ESGOTADO ---
function timeUp() {
    if (answersDiv.querySelector('.selected')) {
         return; 
    }
    
    timerBarFill.classList.add('time-up');
    
    questionEl.textContent = "Tempo esgotado! (0 pontos)";
    
    Array.from(answersDiv.children).forEach(btn => {
        btn.onclick = null;
        btn.disabled = true;
    });

    setTimeout(() => {
        if (currentQuestion < questions.length && nextBtn.style.display === 'none') {
             nextBtn.click(); 
        }
    }, 1500); 
}

// --- FUNÇÃO EXIBIR PERGUNTA ---
function showQuestion() {
    nextBtn.style.display = 'none';
    scoreEl.style.display = 'none';

    if (!timerEl) {
        timerEl = document.createElement('div');
        timerEl.id = 'timer-bar-container';
        
        timerBarFill = document.createElement('div'); 
        timerBarFill.id = 'timer-bar-fill';
        
        timerEl.appendChild(timerBarFill);
        questionEl.parentNode.insertBefore(timerEl, questionEl.nextSibling); 
    }
    
    timerEl.style.display = 'block'; 

    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersDiv.innerHTML = '';
    
    q.answers.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-mine';
        btn.textContent = ans;
        btn.onclick = () => selectAnswer(idx);
        answersDiv.appendChild(btn);
    });
    
    startTimer();
}

// --- FUNÇÃO SELECIONAR RESPOSTA ---
function selectAnswer(idx) {
    clearInterval(timer);
    
    timerBarFill.classList.remove('time-low'); 
    
    nextBtn.style.display = 'inline-block';

    const q = questions[currentQuestion];
    if (answersDiv.querySelector('.selected')) return;

    answersDiv.children[idx].classList.add('selected');
    Array.from(answersDiv.children).forEach(btn => {
        btn.onclick = null;
    });

    if (idx === q.correct) {
        score += 1000;
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
        scoreCorner.style.background = '#fff';
        scoreCorner.style.padding = '8px 16px';
        scoreCorner.style.borderRadius = '8px';
        scoreCorner.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        scoreCorner.style.fontWeight = 'bold';
        scoreCorner.style.zIndex = '1000';
        document.body.appendChild(scoreCorner);
    }
    scoreCorner.textContent = `Puntaje: ${score}`;
}

// --- FUNÇÃO MOSTRAR PLACAR FINAL E GUARDAR HISTÓRICO ---
function showScore() {
    clearInterval(timer); 

    questionEl.textContent = '¡Quiz terminado!';
    answersDiv.innerHTML = ''; 
    nextBtn.style.display = 'none';

    if (timerEl) timerEl.style.display = 'none';
    
    scoreEl.textContent = `Puntaje: ${score} de 5000`;
    scoreEl.style.display = 'block';

    saveScoreToHistory(score);

    const backBtn = document.createElement('button');
    backBtn.className = 'btn-mine answer-btn'; 
    backBtn.textContent = 'Voltar ao Menu'; 
    backBtn.onclick = resetQuiz; 
    answersDiv.appendChild(backBtn); 
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
    
    if (timerEl) {
        timerEl.style.display = 'none';
    }

    document.body.classList.remove('quiz-active'); 
    document.body.style.backgroundImage = `url('fundo.jpg')`; 
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
    
    // Usa 'flex' para exibir o modal
    modal.style.display = 'flex';
}

function hideHistoryModal() {
    document.getElementById('history-modal').style.display = 'none';
}

// ... (Todo o código anterior, incluindo as funções)

// --- INICIALIZAÇÃO E LISTENERS DE EVENTOS ---

// Inicia o quiz ao clicar em Jogar
jugarBtn.addEventListener('click', () => {
    document.querySelector('.menu').style.display = 'none';
    document.querySelector('.menu-options').style.display = 'none';
    quizDiv.style.display = 'block';
    currentQuestion = 0;
    score = 0;
    
    document.body.style.animation = 'none';
    document.body.classList.add('quiz-active'); 
    document.body.style.backgroundColor = 'initial';
    document.body.style.backgroundImage = `url('image.png')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.filter = 'none'; 
    quizDiv.style.backgroundColor = 'transparent';
    quizDiv.style.backdropFilter = 'none'; 
    quizDiv.style.filter = 'none'; 

    showQuestion();
});

// Avança para a próxima pergunta
nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});


// *** CORREÇÃO CHAVE: O botão "Instrucción" é o PRIMEIRO (nth-child(1)) ***
document.addEventListener('DOMContentLoaded', () => {
    // Agora busca o PRIMEIRO botão dentro do container .menu-options
    const instructionsBtn = document.querySelector('.menu-options button:nth-child(1)');
    
    if (instructionsBtn) {
        // Adiciona o listener para abrir o modal
        instructionsBtn.addEventListener('click', showHistoryModal);
    }
});


// --- FUNÇÕES DO NOVO MODAL DE INSTRUÇÕES ---

function showPopupModal() {
    // 1. Encontra o modal de instruções pelo ID
    const popupModal = document.getElementById('poupup-modal');
    
    // 2. Exibe o modal (usando 'flex' para centralizar, conforme seu CSS)
    if (popupModal) {
        popupModal.style.display = 'flex';
    } else {
        console.error("Erro: Modal '#poupup-modal' não encontrado.");
    }
}

function hidePopupModal() {
    // 1. Encontra o modal de instruções pelo ID
    const popupModal = document.getElementById('poupup-modal');
    
    // 2. Oculta o modal
    if (popupModal) {
        popupModal.style.display = 'none';
    }
}

// --- ADICIONANDO O LISTENER DO BOTÃO (EXEMPLO) ---

// Se você tiver um terceiro botão no menu (que era *****) e quer usá-lo:
// Exemplo: O TERCEIRO botão da lista principal (.menu button:nth-child(3))
document.addEventListener('DOMContentLoaded', () => {
    
    // Supondo que você queira usar o botão que está no meio dos três principais
    const instructionsBtnMenu = document.querySelector('.menu button:nth-child(3)');
    
    if (instructionsBtnMenu) {
        // Adiciona a função para mostrar este novo modal
        instructionsBtnMenu.addEventListener('click', showPopupModal);
    } 
    // OBS: O botão de fechar dentro do HTML do modal já chama hidePopupModal()
    // através do atributo onclick.
});



// ... (Seu código JavaScript anterior)

// *** CORREÇÃO CHAVE: Listener do botão 'Instrucción' adicionado com segurança após o carregamento do DOM ***
document.addEventListener('DOMContentLoaded', () => {
    // Busca o botão "Historial de puntuación" (o primeiro no menu-options)
    const instructionsBtn = document.querySelector('.menu-options button:nth-child(1)');
    
    // Busca o botão "Salir" (o segundo no menu-options)
    const exitBtn = document.querySelector('.menu-options button:nth-child(2)'); // Este é o botão "Salir"
    
    if (instructionsBtn) {
        instructionsBtn.addEventListener('click', showHistoryModal);
    }

    // *** NOVA FUNÇÃO PARA O BOTÃO "SALIR" ***
    if (exitBtn) {
        exitBtn.addEventListener('click', () => {
            // Tenta fechar a janela.
            // A maioria dos navegadores só permite se a aba foi aberta via script.
            window.close();

            // Se o navegador bloquear o window.close() (o que é comum):
            // 1. Você pode voltar ao menu principal (se já não estiver lá).
            // 2. Você pode dar uma mensagem simples.
            // Se window.close() falhar, a linha abaixo será executada:
            alert("O navegador impediu o fechamento automático. Feche a aba manualmente, por favor.");
        });
    }
});