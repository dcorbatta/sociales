// Game State Management
let gameState = {
    currentScreen: 'welcome',
    currentGame: null,
    currentQuestion: 0,
    score: 0,
    level: 1,
    timer: 30,
    timerInterval: null,
    questions: [],
    correctAnswers: 0
};

// Game Data - Educational Content for 10-year-olds
const gameData = {
    population: {
        name: "Detective de Población",
        icon: "👥",
        questions: [
            {
                question: "¿Qué es un censo?",
                visual: "📊",
                answers: ["Contar a todas las personas de un país", "Contar solo a los niños", "Contar las casas", "Contar los autos"],
                correct: 0,
                explanation: "¡Correcto! Un censo es cuando contamos a TODAS las personas que viven en un país para saber cuántos somos."
            },
            {
                question: "¿Cada cuántos años se hace el censo en Argentina?",
                visual: "📅",
                answers: ["Cada 5 años", "Cada 10 años", "Cada año", "Cada 20 años"],
                correct: 1,
                explanation: "¡Muy bien! El censo se hace cada 10 años. ¡Es como una gran fiesta de contar personas!"
            },
            {
                question: "¿Qué significa 'crecimiento vegetativo'?",
                visual: "👶",
                answers: ["Cuántas plantas crecen", "Bebés que nacen menos personas que mueren", "Solo los bebés", "Cuánta comida hay"],
                correct: 1,
                explanation: "¡Excelente! Es cuando comparamos cuántos bebés nacen con cuántas personas mueren en un lugar."
            },
            {
                question: "¿Quiénes son los 'censistas'?",
                visual: "🚪",
                answers: ["Personas que venden casas", "Personas que cuentan habitantes casa por casa", "Doctores", "Maestros"],
                correct: 1,
                explanation: "¡Perfecto! Los censistas van de casa en casa preguntando cuántas personas viven ahí. ¡Son como detectives de números!"
            },
            {
                question: "¿Qué pasa cuando hay 'migración'?",
                visual: "✈️",
                answers: ["Las personas se mudan de un lugar a otro", "Solo vuelan aviones", "Cambian las estaciones", "Solo se mueven los animales"],
                correct: 0,
                explanation: "¡Genial! Migración es cuando las personas se mudan de un país o ciudad a otro. ¡Como una gran mudanza!"
            }
        ]
    }
};

// Motivational messages for ADHD children
const motivationalMessages = [
    "¡Eres increíble! Sigue así 🌟",
    "¡Tu cerebro es súper inteligente! 🧠⚡",
    "¡Cada respuesta te hace más sabio! 📚✨",
    "¡Eres un explorador genial! 🗺️🔍",
    "¡Tu curiosidad es tu superpoder! 🦸‍♂️",
    "¡Sigue preguntándote cosas! 🤔💡",
    "¡Estás aprendiendo como un campeón! 🏆",
    "¡Tu atención está mejorando! 👁️‍🗨️"
];

const encouragementTexts = [
    "¡Eres un verdadero explorador del conocimiento!",
    "¡Tu curiosidad te llevará muy lejos!",
    "¡Cada pregunta te hace más inteligente!",
    "¡Sigue así, campeón del aprendizaje!",
    "¡Tu atención y dedicación son admirables!",
    "¡Eres increíble descubriendo el mundo!"
];

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    updateMotivationalMessage();
    setInterval(updateMotivationalMessage, 5000); // Change message every 5 seconds
});

// Start the adventure
function startAdventure() {
    gameState.currentScreen = 'gameSelection';
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('gameSelection').style.display = 'block';
    addFloatingReward('🚀', Math.random() * window.innerWidth, Math.random() * 200 + 100);
}

// Start a specific game
function startGame(gameType) {
    gameState.currentGame = gameType;
    gameState.currentScreen = 'gameArea';
    gameState.currentQuestion = 0;
    gameState.correctAnswers = 0;
    gameState.questions = shuffleArray([...gameData[gameType].questions]);
    
    document.getElementById('gameSelection').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
    
    startTimer();
    displayQuestion();
    updateProgress();
    
    addFloatingReward('🎮', Math.random() * window.innerWidth, Math.random() * 200 + 100);
}

// Display current question
function displayQuestion() {
    const question = gameState.questions[gameState.currentQuestion];
    
    document.getElementById('questionNumber').textContent = gameState.currentQuestion + 1;
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('visualHint').textContent = question.visual;
    
    const answersArea = document.getElementById('answersArea');
    answersArea.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => selectAnswer(index);
        answersArea.appendChild(button);
    });
}

// Handle answer selection
function selectAnswer(selectedIndex) {
    clearInterval(gameState.timerInterval);
    const question = gameState.questions[gameState.currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');
    
    buttons.forEach((button, index) => {
        button.onclick = null; // Disable further clicks
        if (index === question.correct) {
            button.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correct) {
            button.classList.add('incorrect');
        }
    });
    
    const isCorrect = selectedIndex === question.correct;
    
    if (isCorrect) {
        gameState.correctAnswers++;
        const points = Math.max(10, gameState.timer * 2); // More points for faster answers
        gameState.score += points;
        updateScore();
        addFloatingReward('⭐', Math.random() * window.innerWidth, Math.random() * 200 + 100);
        addFloatingReward(`+${points}`, Math.random() * window.innerWidth, Math.random() * 200 + 150);
    }
    
    setTimeout(() => {
        showFeedback(isCorrect, question.explanation);
    }, 1000);
}

// Show feedback modal
function showFeedback(isCorrect, explanation) {
    const feedback = document.getElementById('feedback');
    const feedbackIcon = document.getElementById('feedbackIcon');
    const feedbackText = document.getElementById('feedbackText');
    
    if (isCorrect) {
        feedbackIcon.textContent = '🎉';
        feedbackText.innerHTML = `<strong>¡Correcto!</strong><br>${explanation}`;
    } else {
        feedbackIcon.textContent = '🤗';
        feedbackText.innerHTML = `<strong>¡Sigue intentando!</strong><br>${explanation}`;
    }
    
    feedback.style.display = 'flex';
}

// Go to next question
function nextQuestion() {
    document.getElementById('feedback').style.display = 'none';
    
    gameState.currentQuestion++;
    
    if (gameState.currentQuestion >= gameState.questions.length) {
        endGame();
    } else {
        gameState.timer = 30;
        startTimer();
        displayQuestion();
        updateProgress();
    }
}

// End current game
function endGame() {
    gameState.currentScreen = 'celebration';
    document.getElementById('gameArea').style.display = 'none';
    
    const earnedPoints = gameState.correctAnswers * 50;
    gameState.score += earnedPoints;
    updateScore();
    updateLevel();
    
    document.getElementById('earnedPoints').textContent = earnedPoints;
    document.getElementById('encouragementText').textContent = 
        encouragementTexts[Math.floor(Math.random() * encouragementTexts.length)];
    
    // Show stars based on performance
    const starsContainer = document.getElementById('starsEarned');
    const starCount = Math.min(3, Math.max(1, gameState.correctAnswers));
    starsContainer.innerHTML = '⭐'.repeat(starCount);
    
    document.getElementById('celebration').style.display = 'flex';
    
    // Add celebration effects
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            addFloatingReward('🎉', Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }, i * 200);
    }
}

// Timer management
function startTimer() {
    gameState.timer = 30;
    updateTimerDisplay();
    
    gameState.timerInterval = setInterval(() => {
        gameState.timer--;
        updateTimerDisplay();
        
        if (gameState.timer <= 0) {
            clearInterval(gameState.timerInterval);
            // Auto-select wrong answer when time runs out
            selectAnswer(-1);
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = gameState.timer;
    
    // Change color based on remaining time
    if (gameState.timer <= 10) {
        timerElement.style.color = '#f44336';
        timerElement.style.animation = 'pulse 1s ease-in-out infinite';
    } else {
        timerElement.style.color = '#ff6b6b';
        timerElement.style.animation = 'none';
    }
}

// Update progress bar
function updateProgress() {
    const progress = ((gameState.currentQuestion) / gameState.questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = gameState.score;
}

// Update level
function updateLevel() {
    const newLevel = Math.floor(gameState.score / 500) + 1;
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        document.getElementById('level').textContent = gameState.level;
        addFloatingReward('🏆', Math.random() * window.innerWidth, Math.random() * 200 + 100);
        addFloatingReward('Level Up!', Math.random() * window.innerWidth, Math.random() * 200 + 150);
    }
}

// Navigation functions
function goBack() {
    clearInterval(gameState.timerInterval);
    gameState.currentScreen = 'gameSelection';
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('gameSelection').style.display = 'block';
}

function playAgain() {
    document.getElementById('celebration').style.display = 'none';
    startGame(gameState.currentGame);
}

function chooseNewGame() {
    document.getElementById('celebration').style.display = 'none';
    gameState.currentScreen = 'gameSelection';
    document.getElementById('gameSelection').style.display = 'block';
}

// Utility functions
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function updateMotivationalMessage() {
    const messageElement = document.getElementById('motivationMessage');
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    messageElement.textContent = randomMessage;
    messageElement.style.animation = 'none';
    setTimeout(() => {
        messageElement.style.animation = 'pulse 1s ease-in-out';
    }, 10);
}

function addFloatingReward(content, x, y) {
    const rewardElement = document.createElement('div');
    rewardElement.className = 'floating-reward';
    rewardElement.textContent = content;
    rewardElement.style.left = `${x}px`;
    rewardElement.style.top = `${y}px`;
    
    document.getElementById('floatingRewards').appendChild(rewardElement);
    
    setTimeout(() => {
        rewardElement.remove();
    }, 3000);
}

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(event) {
    if (gameState.currentScreen === 'gameArea') {
        const answers = document.querySelectorAll('.answer-btn');
        if (event.key >= '1' && event.key <= '4') {
            const index = parseInt(event.key) - 1;
            if (answers[index]) {
                answers[index].click();
            }
        }
    }
});

// Add sound effects (using Web Audio API for simple beeps)
function playSound(frequency, duration) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        // Fallback: silent operation if audio context is not supported
        console.log('Audio not supported');
    }
}

// Add sound effects to interactions
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('answer-btn')) {
        playSound(500, 0.2);
    } else if (event.target.classList.contains('btn-primary')) {
        playSound(800, 0.3);
    }
});

// Auto-save progress to localStorage
function saveProgress() {
    localStorage.setItem('aventuras-sociales-progress', JSON.stringify({
        score: gameState.score,
        level: gameState.level
    }));
}

function loadProgress() {
    const saved = localStorage.getItem('aventuras-sociales-progress');
    if (saved) {
        const progress = JSON.parse(saved);
        gameState.score = progress.score || 0;
        gameState.level = progress.level || 1;
        updateScore();
        document.getElementById('level').textContent = gameState.level;
    }
}

// Load progress on page load
document.addEventListener('DOMContentLoaded', loadProgress);

// Save progress whenever score changes
const originalUpdateScore = updateScore;
updateScore = function() {
    originalUpdateScore();
    saveProgress();
};