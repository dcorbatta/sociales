// Módulo de Quiz reutilizable para Aventuras Sociales
// Uso: incluir este archivo y llamar a initQuiz(quizData, options)

function initQuiz(quizData, options = {}) {
  const container = document.getElementById(options.containerId || 'quiz-container');
  if (!container) return;
  let current = 0;
  let score = 0;
  let attempts = 0;
  let maxAttempts = options.maxAttempts || 2;
  let finished = false;
  const aciertoSound = new Audio(options.sonidoAcierto || 'imagenes-naturales/sonido-acierto.mp3');
  const errorSound = new Audio(options.sonidoError || 'imagenes-naturales/sonido-error.mp3');

  function renderQuestion() {
    if (current >= quizData.length) {
      renderEnd();
      return;
    }
    const q = quizData[current];
    container.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-pregunta">${q.pregunta}</div>
        ${q.tip ? `<div class="quiz-tip">💡 Tip: ${q.tip}</div>` : ''}
        <div class="quiz-opciones">
          ${q.opciones.map((op, i) => `<button class="quiz-opcion" data-idx="${i}">${op}</button>`).join('')}
        </div>
        <div class="quiz-feedback" id="quiz-feedback"></div>
        <div class="quiz-puntaje">Puntaje: <span id="quiz-score">${score}</span> | Pregunta ${current+1} de ${quizData.length}</div>
      </div>
    `;
    document.querySelectorAll('.quiz-opcion').forEach(btn => {
      btn.onclick = () => handleAnswer(parseInt(btn.dataset.idx));
    });
  }

  function handleAnswer(idx) {
    if (finished) return;
    const q = quizData[current];
    const feedback = document.getElementById('quiz-feedback');
    if (idx === q.correcta) {
      aciertoSound.currentTime = 0; aciertoSound.play();
      score++;
      feedback.innerHTML = `<div class="quiz-correcto">✅ ${q.explicacion}</div>`;
      finished = true;
      setTimeout(() => {
        current++;
        attempts = 0;
        finished = false;
        renderQuestion();
      }, 1800);
    } else {
      errorSound.currentTime = 0; errorSound.play();
      attempts++;
      if (attempts < maxAttempts) {
        feedback.innerHTML = `<div class="quiz-incorrecto">❌ ${q.insight}<br><span style='color:#888;'>Te quedan ${maxAttempts-attempts} intento(s).</span></div>`;
      } else {
        feedback.innerHTML = `<div class="quiz-incorrecto">❌ ${q.insight}<br><b>La respuesta correcta era: ${q.opciones[q.correcta]}</b><br>${q.explicacion}</div>`;
        finished = true;
        setTimeout(() => {
          current++;
          attempts = 0;
          finished = false;
          renderQuestion();
        }, 2500);
      }
    }
    document.getElementById('quiz-score').textContent = score;
  }

  function renderEnd() {
    container.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-final">🎉 ¡Quiz terminado!<br>Puntaje final: <b>${score} / ${quizData.length}</b></div>
        <button class="quiz-reiniciar">Reintentar</button>
      </div>
    `;
    document.querySelector('.quiz-reiniciar').onclick = () => {
      current = 0; score = 0; attempts = 0; finished = false; renderQuestion();
    };
  }

  // Estilos básicos (puedes mover a CSS global)
  if (!document.getElementById('quiz-module-styles')) {
    const style = document.createElement('style');
    style.id = 'quiz-module-styles';
    style.textContent = `
      .quiz-card { background: #fff; border-radius: 14px; box-shadow: 0 2px 8px #b2dfdb; max-width: 420px; margin: 2em auto; padding: 2em 1.5em; text-align: center; }
      .quiz-pregunta { font-size: 1.2em; font-weight: bold; margin-bottom: 1em; color: #1976d2; }
      .quiz-opciones { display: flex; flex-direction: column; gap: 1em; margin: 1em 0; }
      .quiz-opcion { font-size: 1.1em; padding: 0.7em 1em; border-radius: 10px; border: 2px solid #90caf9; background: #e3f2fd; color: #222; cursor: pointer; transition: background 0.2s, border 0.2s; }
      .quiz-opcion:hover { background: #bbdefb; border-color: #1976d2; }
      .quiz-tip { background: #fffde7; color: #ff9800; border-radius: 8px; padding: 0.5em 1em; margin-bottom: 1em; font-size: 1em; }
      .quiz-feedback { min-height: 2.5em; margin: 1em 0 0.5em 0; font-size: 1.05em; }
      .quiz-correcto { color: #388e3c; font-weight: bold; }
      .quiz-incorrecto { color: #d32f2f; font-weight: bold; }
      .quiz-puntaje { color: #1976d2; font-size: 1em; margin-top: 1em; }
      .quiz-final { font-size: 1.2em; color: #ff9800; margin-bottom: 1.5em; }
      .quiz-reiniciar { font-size: 1.1em; padding: 0.7em 2em; border-radius: 10px; background: #43a047; color: #fff; border: none; cursor: pointer; margin-top: 1em; }
      .quiz-reiniciar:hover { background: #388e3c; }
    `;
    document.head.appendChild(style);
  }

  renderQuestion();
}
// Para usar: initQuiz(quizData, {containerId: 'quiz-container', maxAttempts: 2, sonidoAcierto: '...', sonidoError: '...'}); 