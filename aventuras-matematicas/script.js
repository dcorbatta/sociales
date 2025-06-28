// Aventuras Matemáticas - JavaScript Principal
// Adaptado para niños de 10 años con TDAH

// Variables globales
let totalPoints = 0;
let currentLevel = 1;
let streak = 0;
let currentQuestion = 0;
let gameQuestions = [];
let timer = 30;
let timerInterval;

// Elementos del DOM
const totalPointsElement = document.getElementById('totalPoints');
const currentLevelElement = document.getElementById('currentLevel');
const streakElement = document.getElementById('streak');
const motivationMessageElement = document.getElementById('motivationMessage');

// Mensajes motivacionales específicos para matemáticas
const motivationalMessages = [
    "¡Las matemáticas son divertidas! Sigue practicando fracciones 🧮✨",
    "¡Cada fracción que aprendes te hace más inteligente! 🍕💫",
    "¡Eres increíble resolviendo problemas matemáticos! 📊🌟",
    "¡Las fracciones son como piezas de un rompecabezas! 🧩❤️",
    "¡Sigue sumando conocimientos, eres genial! ➕🌈",
    "¡Tu mente matemática es súper poderosa! 🧠⚡",
    "¡Cada ejercicio te acerca más a ser un experto! 🎯✨"
];

// Sonidos y efectos (simulados con console.log)
const sounds = {
    correct: () => console.log('🎵 Sonido de respuesta correcta'),
    incorrect: () => console.log('🎵 Sonido de respuesta incorrecta'),
    levelUp: () => console.log('🎵 Sonido de subida de nivel'),
    celebration: () => console.log('🎵 Sonido de celebración')
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    updateMotivationalMessage();
    setInterval(updateMotivationalMessage, 8000);
});

function initializeGame() {
    // Cargar datos guardados
    const savedData = localStorage.getItem('aventurasMatematicas_progress');
    if (savedData) {
        const data = JSON.parse(savedData);
        totalPoints = data.totalPoints || 0;
        currentLevel = data.currentLevel || 1;
        streak = data.streak || 0;
    }
    
    updateDisplay();
    addSparkleEffects();
}

function updateDisplay() {
    if (totalPointsElement) totalPointsElement.textContent = totalPoints;
    if (currentLevelElement) currentLevelElement.textContent = currentLevel;
    if (streakElement) streakElement.textContent = streak;
}

function updateMotivationalMessage() {
    if (motivationMessageElement) {
        const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
        motivationMessageElement.textContent = randomMessage;
    }
}

function addPoints(points) {
    totalPoints += points;
    streak++;
    
    // Verificar subida de nivel
    if (totalPoints >= currentLevel * 100) {
        levelUp();
    }
    
    updateDisplay();
    saveProgress();
    showFloatingReward(points);
}

function levelUp() {
    currentLevel++;
    sounds.levelUp();
    showFloatingReward('¡NIVEL ' + currentLevel + '!');
    
    // Mensaje especial de nivel
    setTimeout(() => {
        alert(`🎉 ¡Felicitaciones! Has alcanzado el nivel ${currentLevel}! 🎉\n\n¡Sigues mejorando en matemáticas!`);
    }, 500);
}

function saveProgress() {
    const progressData = {
        totalPoints: totalPoints,
        currentLevel: currentLevel,
        streak: streak,
        lastPlayed: new Date().toISOString()
    };
    localStorage.setItem('aventurasMatematicas_progress', JSON.stringify(progressData));
}

function showFloatingReward(text) {
    const reward = document.createElement('div');
    reward.className = 'floating-reward';
    reward.textContent = text;
    
    // Posición aleatoria
    reward.style.left = Math.random() * 80 + 10 + '%';
    reward.style.top = Math.random() * 20 + 40 + '%';
    
    document.getElementById('floatingRewards').appendChild(reward);
    
    // Remover después de la animación
    setTimeout(() => {
        reward.remove();
    }, 3000);
}

function addSparkleEffects() {
    // Agregar efectos de brillo a elementos especiales
    const specialCards = document.querySelectorAll('[style*="animation: glow"]');
    specialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            showFloatingReward('✨');
        });
    });
}

// Funciones para el área de juego
function startGame(gameType) {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('gameSelection').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    
    // Configurar juego según el tipo
    setupGame(gameType);
}

function setupGame(gameType) {
    currentQuestion = 0;
    timer = 30;
    
    // Generar preguntas según el tipo de juego
    switch(gameType) {
        case 'fractions':
            gameQuestions = generateFractionQuestions();
            break;
        case 'equivalents':
            gameQuestions = generateEquivalentQuestions();
            break;
        case 'mixed':
            gameQuestions = generateMixedNumberQuestions();
            break;
        default:
            gameQuestions = generateBasicQuestions();
    }
    
    showQuestion();
    startTimer();
}

function generateFractionQuestions() {
    const questions = [
        {
            question: "¿Qué fracción representa 3 partes de 4 partes iguales?",
            visual: "🍕🍕🍕⬜",
            answers: ["3/4", "4/3", "3/3", "1/4"],
            correct: 0,
            explanation: "3 partes sombreadas de 4 partes totales = 3/4"
        },
        {
            question: "¿Cuál fracción es equivalente a 1/2?",
            visual: "🍰🍰",
            answers: ["2/4", "1/3", "3/4", "1/4"],
            correct: 0,
            explanation: "1/2 = 2/4 porque ambas representan la mitad"
        },
        {
            question: "¿Qué fracción representa la parte sombreada?",
            visual: "🟦🟦🟦⬜⬜",
            answers: ["3/5", "2/5", "3/2", "5/3"],
            correct: 0,
            explanation: "3 partes sombreadas de 5 partes totales = 3/5"
        }
    ];
    
    return shuffleArray(questions);
}

function generateEquivalentQuestions() {
    const questions = [
        {
            question: "¿Cuál fracción es equivalente a 2/6?",
            visual: "⚪⚪⚫⚫⚫⚫",
            answers: ["1/3", "2/3", "6/2", "3/6"],
            correct: 0,
            explanation: "2/6 = 1/3 porque 2÷2 = 1 y 6÷2 = 3"
        },
        {
            question: "Simplifica la fracción 4/8",
            visual: "🔴🔴🔴🔴⚪⚪⚪⚪",
            answers: ["1/2", "2/4", "8/4", "4/2"],
            correct: 0,
            explanation: "4/8 = 1/2 porque 4÷4 = 1 y 8÷4 = 2"
        }
    ];
    
    return shuffleArray(questions);
}

function generateMixedNumberQuestions() {
    const questions = [
        {
            question: "¿Cómo se escribe 7/3 como número mixto?",
            visual: "🍕🍕🍕🍕🍕🍕🍕",
            answers: ["2 1/3", "1 4/3", "3 1/7", "7 1/3"],
            correct: 0,
            explanation: "7÷3 = 2 con resto 1, entonces 7/3 = 2 1/3"
        }
    ];
    
    return shuffleArray(questions);
}

function generateBasicQuestions() {
    return [
        {
            question: "¿Qué fracción representa la mitad?",
            visual: "🍰🍰",
            answers: ["1/2", "2/1", "1/1", "2/2"],
            correct: 0,
            explanation: "La mitad se representa como 1/2"
        }
    ];
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function showQuestion() {
    if (currentQuestion >= gameQuestions.length) {
        endGame();
        return;
    }
    
    const question = gameQuestions[currentQuestion];
    
    document.getElementById('questionNumber').textContent = currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('visualHint').textContent = question.visual;
    
    // Crear botones de respuesta
    const answersArea = document.getElementById('answersArea');
    answersArea.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => selectAnswer(index);
        answersArea.appendChild(button);
    });
    
    // Actualizar barra de progreso
    const progress = ((currentQuestion + 1) / gameQuestions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function selectAnswer(selectedIndex) {
    const question = gameQuestions[currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');
    
    // Deshabilitar todos los botones
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === question.correct) {
        // Respuesta correcta
        buttons[selectedIndex].classList.add('correct');
        sounds.correct();
        addPoints(10 + Math.floor(timer / 3)); // Más puntos por rapidez
        showFeedback(true, question.explanation);
    } else {
        // Respuesta incorrecta
        buttons[selectedIndex].classList.add('incorrect');
        buttons[question.correct].classList.add('correct');
        sounds.incorrect();
        streak = 0; // Reiniciar racha
        showFeedback(false, question.explanation);
    }
    
    clearInterval(timerInterval);
}

function showFeedback(isCorrect, explanation) {
    const feedback = document.getElementById('feedback');
    const icon = document.getElementById('feedbackIcon');
    const text = document.getElementById('feedbackText');
    
    if (isCorrect) {
        icon.textContent = '🎉';
        text.innerHTML = `<strong>¡Correcto!</strong><br>${explanation}`;
    } else {
        icon.textContent = '💪';
        text.innerHTML = `<strong>¡Sigue intentando!</strong><br>${explanation}`;
    }
    
    feedback.style.display = 'flex';
}

function nextQuestion() {
    document.getElementById('feedback').style.display = 'none';
    currentQuestion++;
    timer = 30;
    showQuestion();
    startTimer();
}

function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        
        if (timer <= 0) {
            clearInterval(timerInterval);
            selectAnswer(-1); // Tiempo agotado
        }
        
        // Cambiar color cuando queda poco tiempo
        if (timer <= 10) {
            timerElement.style.background = 'linear-gradient(45deg, #e74c3c, #c0392b)';
        } else {
            timerElement.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
        }
    }, 1000);
}

function endGame() {
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('celebration').style.display = 'flex';
    
    const earnedPoints = totalPoints;
    document.getElementById('earnedPoints').textContent = earnedPoints;
    
    // Mostrar estrellas según el rendimiento
    const stars = Math.min(5, Math.floor(earnedPoints / 20));
    document.getElementById('starsEarned').textContent = '⭐'.repeat(stars);
    
    // Mensaje de aliento
    const encouragements = [
        "¡Excelente trabajo con las fracciones!",
        "¡Cada día mejoras más en matemáticas!",
        "¡Eres increíble resolviendo problemas!",
        "¡Sigue practicando, vas muy bien!"
    ];
    
    document.getElementById('encouragementText').textContent = 
        encouragements[Math.floor(Math.random() * encouragements.length)];
    
    sounds.celebration();
}

function goBack() {
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('gameSelection').style.display = 'block';
    clearInterval(timerInterval);
}

function playAgain() {
    document.getElementById('celebration').style.display = 'none';
    document.getElementById('gameSelection').style.display = 'block';
}

function chooseNewGame() {
    document.getElementById('celebration').style.display = 'none';
    document.getElementById('gameSelection').style.display = 'block';
}

// Funciones para crear elementos visuales de fracciones
function createFractionVisual(numerator, denominator, container) {
    const fractionDiv = document.createElement('div');
    fractionDiv.className = 'fraction-visual';
    
    const numDiv = document.createElement('div');
    numDiv.className = 'fraction-numerator';
    numDiv.textContent = numerator;
    
    const denDiv = document.createElement('div');
    denDiv.className = 'fraction-denominator';
    denDiv.textContent = denominator;
    
    fractionDiv.appendChild(numDiv);
    fractionDiv.appendChild(denDiv);
    
    if (container) {
        container.appendChild(fractionDiv);
    }
    
    return fractionDiv;
}

function createPizzaSlices(total, filled) {
    let visual = '';
    for (let i = 0; i < total; i++) {
        visual += i < filled ? '🍕' : '⬜';
    }
    return visual;
}

function createCircleParts(total, filled) {
    let visual = '';
    for (let i = 0; i < total; i++) {
        visual += i < filled ? '🔵' : '⚪';
    }
    return visual;
}

// Efectos especiales para mantener la atención
function addSpecialEffects() {
    // Efecto de partículas cuando se responde correctamente
    function createParticles(x, y) {
        const particles = ['✨', '⭐', '🌟', '💫'];
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.textContent = particles[Math.floor(Math.random() * particles.length)];
                particle.style.position = 'fixed';
                particle.style.left = x + (Math.random() - 0.5) * 100 + 'px';
                particle.style.top = y + (Math.random() - 0.5) * 100 + 'px';
                particle.style.fontSize = '2rem';
                particle.style.pointerEvents = 'none';
                particle.style.zIndex = '9999';
                particle.style.animation = 'floatUp 2s ease-out forwards';
                
                document.body.appendChild(particle);
                
                setTimeout(() => particle.remove(), 2000);
            }, i * 100);
        }
    }
    
    // Agregar efectos a los botones de respuesta
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('answer-btn')) {
            createParticles(e.clientX, e.clientY);
        }
    });
}

// Inicializar efectos especiales
document.addEventListener('DOMContentLoaded', addSpecialEffects); 