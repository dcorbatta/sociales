// Aventuras de PDL - Lógica de juegos visuales y autocorregibles

let juegoActual = 0;
const totalJuegos = 9;
const secciones = [
  'juego-sustantivos',
  'juego-clasificacion-sustantivos',
  'juego-colectivos',
  'juego-adjetivos',
  'juego-pronombres',
  'juego-sinonimos',
  'juego-nominal',
  'juego-genero-numero',
  'juego-comprension',
  'pantalla-final'
];

function mostrarJuego(idx) {
  secciones.forEach((id, i) => {
    const sec = document.getElementById(id);
    if (sec) sec.classList.toggle('active', i === idx);
  });
  actualizarProgreso(idx);
  renderNavEjercicios();
}

function actualizarProgreso(idx) {
  const fill = document.getElementById('progressFill');
  if (fill) fill.style.width = Math.min((idx / (totalJuegos)) * 100, 100) + '%';
}

function motivar(idx) {
  const frases = [
    '¡Vamos Gio! Cada juego te acerca a ser un experto en el lenguaje.',
    '¡Sigue así! Estás aprendiendo mucho.',
    '¡Genial! Ya casi terminas este desafío.',
    '¡Eres un campeón del lenguaje!',
    '¡Súper! Sigue practicando y verás lo fácil que es.',
    '¡Excelente! Cada vez lo haces mejor.',
    '¡Muy bien! Ya falta poco.',
    '¡Último esfuerzo, Gio!',
    '¡Lo lograste!'
  ];
  const motivacion = document.getElementById('motivacion');
  if (motivacion) motivacion.textContent = frases[Math.min(idx, frases.length-1)];
}

function siguienteJuego() {
  if (juegoActual < totalJuegos-1) {
    juegoActual++;
    mostrarJuego(juegoActual);
    motivar(juegoActual);
  } else {
    juegoActual = totalJuegos-1;
    mostrarJuego(juegoActual);
    motivar(juegoActual);
  }
}

// Placeholders para inicializar cada mini-juego (luego se completan con lógica visual y autocorregible)
function inicializarJuegos() {
  // 1. ¿Qué es un sustantivo?
  const sustantivos = [
    { palabra: 'perro', es: true },
    { palabra: 'correr', es: false },
    { palabra: 'mesa', es: true },
    { palabra: 'azul', es: false },
    { palabra: 'niña', es: true },
    { palabra: 'feliz', es: false }
  ];
  const cont = document.getElementById('sustantivos-opciones');
  if (cont) {
    cont.innerHTML = '';
    sustantivos.forEach((op, i) => {
      const btn = document.createElement('div');
      btn.className = 'visual-option';
      btn.textContent = op.palabra;
      btn.onclick = () => {
        btn.classList.toggle('selected');
        chequearSustantivos();
      };
      cont.appendChild(btn);
    });
  }
  function chequearSustantivos() {
    const opciones = cont.querySelectorAll('.visual-option');
    let correcto = true;
    opciones.forEach((el, i) => {
      if (el.classList.contains('selected') !== sustantivos[i].es) correcto = false;
    });
    document.getElementById('btn-siguiente-1').disabled = !correcto;
    document.getElementById('feedback-1').textContent = correcto ? '¡Muy bien! Esos son los sustantivos.' : '';
  }
  document.getElementById('btn-siguiente-1').onclick = siguienteJuego;

  // 2. Clasificación de sustantivos (matriz de doble entrada + ayuda)
  const clasifCont = document.getElementById('clasificacion-sustantivos-juego');
  if (clasifCont) {
    clasifCont.innerHTML = '';
    // Mensaje inicial motivador
    const mensajeMatriz = document.createElement('div');
    mensajeMatriz.className = 'game-instructions';
    mensajeMatriz.innerHTML = 'Marca todas las categorías que correspondan para cada palabra. ¡Algunas palabras pueden tener más de una categoría!';
    clasifCont.appendChild(mensajeMatriz);
    // Botón de ayuda
    const ayudaBtnMatriz = document.createElement('button');
    ayudaBtnMatriz.className = 'game-btn';
    ayudaBtnMatriz.style.background = '#1976d2';
    ayudaBtnMatriz.style.marginBottom = '12px';
    ayudaBtnMatriz.textContent = '¿Necesitas ayuda?';
    ayudaBtnMatriz.onclick = mostrarAyudaSustantivos;
    clasifCont.appendChild(ayudaBtnMatriz);
    // Palabras y categorías
    const palabrasMatriz = [
      { palabra: 'perro', categorias: ['común', 'concreto', 'individual'] },
      { palabra: 'Juan', categorias: ['propio', 'individual', 'concreto'] },
      { palabra: 'amor', categorias: ['común', 'abstracto', 'individual'] },
      { palabra: 'bosque', categorias: ['común', 'concreto', 'colectivo'] },
      { palabra: 'mesa', categorias: ['común', 'concreto', 'individual'] },
      { palabra: 'abeja', categorias: ['común', 'concreto', 'individual'] }
    ];
    const categoriasMatriz = ['común', 'propio', 'concreto', 'abstracto', 'individual', 'colectivo'];
    // Crear tabla
    const tabla = document.createElement('table');
    tabla.style.margin = '16px auto';
    tabla.style.borderCollapse = 'collapse';
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    trHead.appendChild(document.createElement('th'));
    categoriasMatriz.forEach(cat => {
      const th = document.createElement('th');
      th.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      th.style.padding = '4px 8px';
      th.style.border = '1px solid #bbb';
      trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    tabla.appendChild(thead);
    const tbody = document.createElement('tbody');
    palabrasMatriz.forEach((item, i) => {
      const tr = document.createElement('tr');
      const tdPal = document.createElement('td');
      tdPal.textContent = item.palabra;
      tdPal.style.padding = '4px 8px';
      tdPal.style.border = '1px solid #bbb';
      tr.appendChild(tdPal);
      categoriasMatriz.forEach((cat, j) => {
        const td = document.createElement('td');
        td.style.textAlign = 'center';
        td.style.border = '1px solid #bbb';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.dataset.i = i;
        cb.dataset.cat = cat;
        cb.onchange = chequearMatriz;
        td.appendChild(cb);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    tabla.appendChild(tbody);
    clasifCont.appendChild(tabla);
    function chequearMatriz() {
      let correcto = true;
      palabrasMatriz.forEach((item, i) => {
        categoriasMatriz.forEach(cat => {
          const cb = clasifCont.querySelector(`input[type='checkbox'][data-i='${i}'][data-cat='${cat}']`);
          const debe = item.categorias.includes(cat);
          if (cb.checked !== debe) correcto = false;
        });
      });
      document.getElementById('btn-siguiente-2').disabled = !correcto;
      document.getElementById('feedback-2').textContent = correcto ? '¡Excelente! Clasificaste todos los sustantivos correctamente.' : '';
    }
  }
  document.getElementById('btn-siguiente-2').onclick = siguienteJuego;

  // 3. Colectivos (emparejar individual-colectivo)
  const colectivosCont = document.getElementById('colectivos-juego');
  if (colectivosCont) {
    colectivosCont.innerHTML = '';
    const individuales = [
      { palabra: 'abeja', colectivo: 'enjambre' },
      { palabra: 'pez', colectivo: 'cardumen' },
      { palabra: 'árbol', colectivo: 'arboleda' },
      { palabra: 'soldado', colectivo: 'ejército' }
    ];
    const colectivos = ['enjambre', 'cardumen', 'arboleda', 'ejército'];
    // Mezclar el orden de los colectivos
    const colectivosMezclados = colectivos.slice().sort(() => Math.random() - 0.5);
    // Render individuales
    const indDiv = document.createElement('div');
    indDiv.style.marginBottom = '12px';
    individuales.forEach((item, idx) => {
      const btn = document.createElement('div');
      btn.className = 'visual-option';
      btn.textContent = item.palabra;
      btn.dataset.idx = idx;
      btn.onclick = () => seleccionarIndividual(idx, btn);
      indDiv.appendChild(btn);
    });
    colectivosCont.appendChild(indDiv);
    // Render colectivos
    const colDiv = document.createElement('div');
    colectivosMezclados.forEach((col, idx) => {
      const btn = document.createElement('div');
      btn.className = 'visual-option';
      btn.textContent = col;
      btn.dataset.col = col;
      btn.onclick = () => seleccionarColectivo(col, btn);
      colDiv.appendChild(btn);
    });
    colectivosCont.appendChild(colDiv);
    // Lógica de emparejamiento
    let seleccionadoInd = null;
    let seleccionadoBtnInd = null;
    let emparejados = [];
    function seleccionarIndividual(idx, btn) {
      if (emparejados.find(pair => pair.ind === idx)) return;
      if (seleccionadoBtnInd) seleccionadoBtnInd.classList.remove('selected');
      seleccionadoInd = idx;
      seleccionadoBtnInd = btn;
      btn.classList.add('selected');
    }
    function seleccionarColectivo(col, btn) {
      if (seleccionadoInd === null) return;
      const indPalabra = individuales[seleccionadoInd];
      if (indPalabra.colectivo === col) {
        // Correcto
        btn.classList.add('selected');
        seleccionadoBtnInd.classList.add('selected');
        emparejados.push({ ind: seleccionadoInd, col });
        seleccionadoInd = null;
        seleccionadoBtnInd = null;
        document.getElementById('feedback-3').textContent = '¡Bien! Emparejaste correctamente.';
      } else {
        document.getElementById('feedback-3').textContent = 'Intenta de nuevo. Ese no es el colectivo correcto.';
        if (seleccionadoBtnInd) seleccionadoBtnInd.classList.remove('selected');
        seleccionadoInd = null;
        seleccionadoBtnInd = null;
      }
      chequearColectivos();
    }
    function chequearColectivos() {
      // Permitir deshacer emparejamientos
      if (emparejados.length === individuales.length) {
        document.getElementById('btn-siguiente-3').disabled = false;
        document.getElementById('feedback-3').textContent = '¡Excelente! Emparejaste todos los colectivos.';
      } else {
        document.getElementById('btn-siguiente-3').disabled = true;
      }
    }
  }
  // 4. Adjetivos (selección visual + ayuda)
  const adjetivosCont = document.getElementById('adjetivos-opciones');
  if (adjetivosCont) {
    adjetivosCont.innerHTML = '';
    // Mensaje inicial motivador
    const mensajeAdj = document.createElement('div');
    mensajeAdj.className = 'game-instructions';
    mensajeAdj.innerHTML = 'Haz clic en todas las palabras que sean adjetivos. ¡Puedes probar y cambiar tu selección!';
    adjetivosCont.appendChild(mensajeAdj);
    // Botón de ayuda
    const ayudaBtnAdj = document.createElement('button');
    ayudaBtnAdj.className = 'game-btn';
    ayudaBtnAdj.style.background = '#1976d2';
    ayudaBtnAdj.style.marginBottom = '12px';
    ayudaBtnAdj.textContent = '¿Necesitas ayuda?';
    ayudaBtnAdj.onclick = mostrarAyudaAdjetivos;
    adjetivosCont.appendChild(ayudaBtnAdj);
    // Palabras para seleccionar
    const palabrasAdj = [
      { palabra: 'grande', es: true },
      { palabra: 'correr', es: false },
      { palabra: 'azul', es: true },
      { palabra: 'niña', es: false },
      { palabra: 'feliz', es: true },
      { palabra: 'perro', es: false }
    ];
    palabrasAdj.forEach((op, i) => {
      const btn = document.createElement('div');
      btn.className = 'visual-option';
      btn.textContent = op.palabra;
      btn.onclick = () => {
        btn.classList.toggle('selected');
        chequearAdjetivos();
      };
      adjetivosCont.appendChild(btn);
    });
    function chequearAdjetivos() {
      const opciones = adjetivosCont.querySelectorAll('.visual-option');
      let correcto = true;
      palabrasAdj.forEach((op, i) => {
        if ((opciones[i].classList.contains('selected')) !== op.es) correcto = false;
      });
      document.getElementById('btn-siguiente-4').disabled = !correcto;
      document.getElementById('feedback-4').textContent = correcto ? '¡Muy bien! Esos son los adjetivos.' : '';
    }
    // Ayuda visual (imágenes reales)
    function mostrarAyudaAdjetivos() {
      if (document.getElementById('ayuda-adjetivos-popup')) return;
      const popup = document.createElement('div');
      popup.id = 'ayuda-adjetivos-popup';
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.background = '#fff';
      popup.style.border = '2px solid #1976d2';
      popup.style.borderRadius = '12px';
      popup.style.boxShadow = '0 4px 16px #0003';
      popup.style.padding = '24px';
      popup.style.zIndex = '1000';
      popup.innerHTML = `
        <h3>¿Qué es un adjetivo?</h3>
        <p>Un adjetivo es una palabra que describe cómo es un sustantivo. Ejemplos:</p>
        <ul style="text-align:left;">
          <li><b>Grande</b> <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> (Ej: un perro grande)</li>
          <li><b>Azul</b> <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> (Ej: una pelota azul)</li>
          <li><b>Feliz</b> <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> (Ej: una niña feliz)</li>
        </ul>
        <button class="game-btn" style="background:#1976d2;" onclick="document.body.removeChild(document.getElementById('ayuda-adjetivos-popup'))">Cerrar ayuda</button>
      `;
      document.body.appendChild(popup);
    }
  }
  // 5. Pronombres personales (selección visual + ayuda)
  const pronombresCont = document.getElementById('pronombres-opciones');
  if (pronombresCont) {
    pronombresCont.innerHTML = '';
    // Mensaje inicial motivador
    const mensajePron = document.createElement('div');
    mensajePron.className = 'game-instructions';
    mensajePron.innerHTML = 'Haz clic en todas las palabras que sean pronombres personales. ¡Puedes probar y cambiar tu selección!';
    pronombresCont.appendChild(mensajePron);
    // Botón de ayuda
    const ayudaBtnPron = document.createElement('button');
    ayudaBtnPron.className = 'game-btn';
    ayudaBtnPron.style.background = '#1976d2';
    ayudaBtnPron.style.marginBottom = '12px';
    ayudaBtnPron.textContent = '¿Necesitas ayuda?';
    ayudaBtnPron.onclick = mostrarAyudaPronombres;
    pronombresCont.appendChild(ayudaBtnPron);
    // Palabras para seleccionar
    const palabrasPron = [
      { palabra: 'yo', es: true },
      { palabra: 'ella', es: true },
      { palabra: 'árbol', es: false },
      { palabra: 'nosotros', es: true },
      { palabra: 'feliz', es: false },
      { palabra: 'tú', es: true },
      { palabra: 'perro', es: false }
    ];
    palabrasPron.forEach((op, i) => {
      const btn = document.createElement('div');
      btn.className = 'visual-option';
      btn.textContent = op.palabra;
      btn.onclick = () => {
        btn.classList.toggle('selected');
        chequearPronombres();
      };
      pronombresCont.appendChild(btn);
    });
    function chequearPronombres() {
      const opciones = pronombresCont.querySelectorAll('.visual-option');
      let correcto = true;
      palabrasPron.forEach((op, i) => {
        if ((opciones[i].classList.contains('selected')) !== op.es) correcto = false;
      });
      document.getElementById('btn-siguiente-5').disabled = !correcto;
      document.getElementById('feedback-5').textContent = correcto ? '¡Muy bien! Esos son los pronombres personales.' : '';
    }
    // Ayuda visual (imágenes reales)
    function mostrarAyudaPronombres() {
      if (document.getElementById('ayuda-pronombres-popup')) return;
      const popup = document.createElement('div');
      popup.id = 'ayuda-pronombres-popup';
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.background = '#fff';
      popup.style.border = '2px solid #1976d2';
      popup.style.borderRadius = '12px';
      popup.style.boxShadow = '0 4px 16px #0003';
      popup.style.padding = '24px';
      popup.style.zIndex = '1000';
      popup.innerHTML = `
        <h3>¿Qué es un pronombre personal?</h3>
        <p>Un pronombre personal es una palabra que usamos para referirnos a las personas sin decir su nombre. Ejemplos:</p>
        <ul style="text-align:left;">
          <li><b>Yo</b> <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> (Ej: Yo juego)</li>
          <li><b>Tú</b> <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> (Ej: Tú cantas)</li>
          <li><b>Ella</b> <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> (Ej: Ella corre)</li>
          <li><b>Nosotros</b> <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> (Ej: Nosotros leemos)</li>
        </ul>
        <button class="game-btn" style="background:#1976d2;" onclick="document.body.removeChild(document.getElementById('ayuda-pronombres-popup'))">Cerrar ayuda</button>
      `;
      document.body.appendChild(popup);
    }
  }
  // 6. Sinónimos y antónimos (emparejar visual con columnas + ayuda)
  const sinonimosCont = document.getElementById('sinonimos-juego');
  if (sinonimosCont) {
    sinonimosCont.innerHTML = '';
    // Mensaje inicial motivador
    const mensajeEmp = document.createElement('div');
    mensajeEmp.className = 'game-instructions';
    mensajeEmp.innerHTML = 'Para cada palabra base, selecciona su sinónimo y su antónimo en las columnas de la derecha.';
    sinonimosCont.appendChild(mensajeEmp);
    // Botón de ayuda
    const ayudaBtnEmp = document.createElement('button');
    ayudaBtnEmp.className = 'game-btn';
    ayudaBtnEmp.style.background = '#1976d2';
    ayudaBtnEmp.style.marginBottom = '12px';
    ayudaBtnEmp.textContent = '¿Necesitas ayuda?';
    ayudaBtnEmp.onclick = mostrarAyudaSinonimos;
    sinonimosCont.appendChild(ayudaBtnEmp);
    // Palabras base, sinónimos y antónimos
    const paresEmp = [
      { base: 'grande', sinonimo: 'enorme', antonimo: 'pequeño' },
      { base: 'feliz', sinonimo: 'contento', antonimo: 'triste' },
      { base: 'rápido', sinonimo: 'veloz', antonimo: 'lento' }
    ];
    // Mezclar sinónimos y antónimos
    const sinonimos = paresEmp.map(p => p.sinonimo).sort(() => Math.random() - 0.5);
    const antonimos = paresEmp.map(p => p.antonimo).sort(() => Math.random() - 0.5);
    // Render columnas
    const tablaEmp = document.createElement('table');
    tablaEmp.style.margin = '16px auto';
    tablaEmp.style.borderCollapse = 'collapse';
    const theadEmp = document.createElement('thead');
    const trHeadEmp = document.createElement('tr');
    ['Palabra base', 'Sinónimo', 'Antónimo'].forEach(t => {
      const th = document.createElement('th');
      th.textContent = t;
      th.style.padding = '4px 8px';
      th.style.border = '1px solid #bbb';
      trHeadEmp.appendChild(th);
    });
    theadEmp.appendChild(trHeadEmp);
    tablaEmp.appendChild(theadEmp);
    const tbodyEmp = document.createElement('tbody');
    paresEmp.forEach((p, i) => {
      const tr = document.createElement('tr');
      // Palabra base
      const tdBase = document.createElement('td');
      tdBase.textContent = p.base;
      tdBase.style.padding = '4px 8px';
      tdBase.style.border = '1px solid #bbb';
      tr.appendChild(tdBase);
      // Sinónimos (select)
      const tdSin = document.createElement('td');
      tdSin.style.textAlign = 'center';
      tdSin.style.border = '1px solid #bbb';
      const selSin = document.createElement('select');
      selSin.dataset.i = i;
      selSin.innerHTML = '<option value="">Selecciona...</option>' + sinonimos.map(s => `<option value="${s}">${s}</option>`).join('');
      selSin.onchange = chequearEmparejar;
      tdSin.appendChild(selSin);
      tr.appendChild(tdSin);
      // Antónimos (select)
      const tdAnt = document.createElement('td');
      tdAnt.style.textAlign = 'center';
      tdAnt.style.border = '1px solid #bbb';
      const selAnt = document.createElement('select');
      selAnt.dataset.i = i;
      selAnt.innerHTML = '<option value="">Selecciona...</option>' + antonimos.map(a => `<option value="${a}">${a}</option>`).join('');
      selAnt.onchange = chequearEmparejar;
      tdAnt.appendChild(selAnt);
      tr.appendChild(tdAnt);
      tbodyEmp.appendChild(tr);
    });
    tablaEmp.appendChild(tbodyEmp);
    sinonimosCont.appendChild(tablaEmp);
    function chequearEmparejar() {
      let correcto = true;
      paresEmp.forEach((p, i) => {
        const selSin = sinonimosCont.querySelector(`select[data-i='${i}']`);
        const selAnt = sinonimosCont.querySelectorAll(`select[data-i='${i}']`)[1];
        if (!selSin || !selAnt) correcto = false;
        if (selSin.value !== p.sinonimo) correcto = false;
        if (selAnt.value !== p.antonimo) correcto = false;
      });
      document.getElementById('btn-siguiente-6').disabled = !correcto;
      document.getElementById('feedback-6').textContent = correcto ? '¡Excelente! Emparejaste todos los sinónimos y antónimos.' : '';
    }
    // Ayuda visual (imágenes reales)
    function mostrarAyudaSinonimos() {
      if (document.getElementById('ayuda-sinonimos-popup')) return;
      const popup = document.createElement('div');
      popup.id = 'ayuda-sinonimos-popup';
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.background = '#fff';
      popup.style.border = '2px solid #1976d2';
      popup.style.borderRadius = '12px';
      popup.style.boxShadow = '0 4px 16px #0003';
      popup.style.padding = '24px';
      popup.style.zIndex = '1000';
      popup.innerHTML = `
        <h3>¿Qué son sinónimos y antónimos?</h3>
        <ul style="text-align:left;">
          <li><b>Sinónimos:</b> Palabras que significan lo mismo. Ej: grande <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> y enorme <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;">.</li>
          <li><b>Antónimos:</b> Palabras que significan lo contrario. Ej: feliz <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> y triste <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;">.</li>
        </ul>
        <button class="game-btn" style="background:#1976d2;" onclick="document.body.removeChild(document.getElementById('ayuda-sinonimos-popup'))">Cerrar ayuda</button>
      `;
      document.body.appendChild(popup);
    }
  }
  // 7. Construcción nominal y modificadores (selección visual + ayuda)
  const nominalCont = document.getElementById('nominal-juego');
  if (nominalCont) {
    nominalCont.innerHTML = '';
    // Mensaje inicial motivador
    const mensajeNom = document.createElement('div');
    mensajeNom.className = 'game-instructions';
    mensajeNom.innerHTML = 'Haz clic en el núcleo (sustantivo principal) y los modificadores (adjetivos, artículos, etc.) de cada grupo nominal.';
    nominalCont.appendChild(mensajeNom);
    // Botón de ayuda
    const ayudaBtnNom = document.createElement('button');
    ayudaBtnNom.className = 'game-btn';
    ayudaBtnNom.style.background = '#1976d2';
    ayudaBtnNom.style.marginBottom = '12px';
    ayudaBtnNom.textContent = '¿Necesitas ayuda?';
    ayudaBtnNom.onclick = mostrarAyudaNominal;
    nominalCont.appendChild(ayudaBtnNom);
    // Frases para analizar
    const frases = [
      {
        texto: ['La', 'niña', 'alegre'],
        tipos: ['mod', 'nucleo', 'mod']
      },
      {
        texto: ['El', 'perro', 'grande'],
        tipos: ['mod', 'nucleo', 'mod']
      },
      {
        texto: ['Unas', 'flores', 'hermosas'],
        tipos: ['mod', 'nucleo', 'mod']
      }
    ];
    // Render frases
    frases.forEach((frase, idx) => {
      const fraseDiv = document.createElement('div');
      fraseDiv.style.margin = '10px 0';
      frase.texto.forEach((pal, i) => {
        const span = document.createElement('span');
        span.textContent = pal;
        span.className = 'visual-option';
        span.style.margin = '0 4px';
        span.dataset.tipo = frase.tipos[i];
        span.dataset.idx = idx + '-' + i;
        span.onclick = () => {
          span.classList.toggle('selected');
          chequearNominal();
        };
        fraseDiv.appendChild(span);
      });
      nominalCont.appendChild(fraseDiv);
    });
    function chequearNominal() {
      let correcto = true;
      frases.forEach((frase, idx) => {
        frase.texto.forEach((pal, i) => {
          const span = nominalCont.querySelector(`[data-idx='${idx}-${i}']`);
          if (frase.tipos[i] === 'nucleo') {
            if (!span.classList.contains('selected')) correcto = false;
          } else {
            if (!span.classList.contains('selected')) correcto = false;
          }
        });
      });
      // Para este juego, se debe seleccionar todos los núcleos y modificadores
      // (en este ejemplo, todos los elementos deben estar seleccionados)
      const total = frases.reduce((acc, f) => acc + f.texto.length, 0);
      const seleccionados = nominalCont.querySelectorAll('.selected').length;
      if (correcto && seleccionados === total) {
        document.getElementById('btn-siguiente-7').disabled = false;
        document.getElementById('feedback-7').textContent = '¡Excelente! Identificaste el núcleo y los modificadores.';
      } else {
        document.getElementById('btn-siguiente-7').disabled = true;
        document.getElementById('feedback-7').textContent = '';
      }
    }
    // Ayuda visual (imágenes reales)
    function mostrarAyudaNominal() {
      if (document.getElementById('ayuda-nominal-popup')) return;
      const popup = document.createElement('div');
      popup.id = 'ayuda-nominal-popup';
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.background = '#fff';
      popup.style.border = '2px solid #1976d2';
      popup.style.borderRadius = '12px';
      popup.style.boxShadow = '0 4px 16px #0003';
      popup.style.padding = '24px';
      popup.style.zIndex = '1000';
      popup.innerHTML = `
        <h3>¿Qué es el núcleo y qué son los modificadores?</h3>
        <ul style="text-align:left;">
          <li><b>Núcleo:</b> El sustantivo principal del grupo nominal. Ej: <b>niña</b> <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> en "La niña alegre".</li>
          <li><b>Modificadores:</b> Palabras que acompañan y describen al núcleo, como artículos y adjetivos. Ej: <b>La</b> y <b>alegre</b> en "La niña alegre".</li>
        </ul>
        <button class="game-btn" style="background:#1976d2;" onclick="document.body.removeChild(document.getElementById('ayuda-nominal-popup'))">Cerrar ayuda</button>
      `;
      document.body.appendChild(popup);
    }
  }
  // 8. Género y número (arrastrar y soltar + ayuda)
  const generoNumeroCont = document.getElementById('genero-numero-juego');
  if (generoNumeroCont) {
    generoNumeroCont.innerHTML = '';
    // Mensaje inicial motivador
    const mensajeGN = document.createElement('div');
    mensajeGN.className = 'game-instructions';
    mensajeGN.innerHTML = 'Arrastra cada palabra a la categoría correcta según su género (masculino/femenino) y número (singular/plural).';
    generoNumeroCont.appendChild(mensajeGN);
    // Botón de ayuda
    const ayudaBtnGN = document.createElement('button');
    ayudaBtnGN.className = 'game-btn';
    ayudaBtnGN.style.background = '#1976d2';
    ayudaBtnGN.style.marginBottom = '12px';
    ayudaBtnGN.textContent = '¿Necesitas ayuda?';
    ayudaBtnGN.onclick = mostrarAyudaGeneroNumero;
    generoNumeroCont.appendChild(ayudaBtnGN);
    // Palabras para clasificar
    const palabrasGN = [
      { palabra: 'niño', genero: 'masculino', numero: 'singular' },
      { palabra: 'niñas', genero: 'femenino', numero: 'plural' },
      { palabra: 'perros', genero: 'masculino', numero: 'plural' },
      { palabra: 'flor', genero: 'femenino', numero: 'singular' },
      { palabra: 'grande', genero: 'masculino', numero: 'singular' },
      { palabra: 'hermosas', genero: 'femenino', numero: 'plural' }
    ];
    // Zona inicial para palabras
    const zonaInicialGN = document.createElement('div');
    zonaInicialGN.id = 'zona-inicial-gn';
    zonaInicialGN.style.minHeight = '50px';
    zonaInicialGN.style.marginBottom = '18px';
    zonaInicialGN.style.background = '#fffde7';
    zonaInicialGN.style.border = '1px dashed #bbb';
    zonaInicialGN.style.padding = '8px';
    zonaInicialGN.textContent = 'Zona inicial';
    generoNumeroCont.appendChild(zonaInicialGN);
    palabrasGN.forEach((item, idx) => {
      const drag = document.createElement('div');
      drag.className = 'visual-option';
      drag.textContent = item.palabra;
      drag.setAttribute('draggable', 'true');
      drag.dataset.idx = idx;
      drag.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', idx);
        setTimeout(() => drag.classList.add('dragging'), 0);
      };
      drag.ondragend = () => drag.classList.remove('dragging');
      zonaInicialGN.appendChild(drag);
    });
    // Categorías para soltar
    const categoriasGN = [
      { label: 'Masculino Singular', genero: 'masculino', numero: 'singular' },
      { label: 'Masculino Plural', genero: 'masculino', numero: 'plural' },
      { label: 'Femenino Singular', genero: 'femenino', numero: 'singular' },
      { label: 'Femenino Plural', genero: 'femenino', numero: 'plural' }
    ];
    const dropZoneGN = document.createElement('div');
    dropZoneGN.style.display = 'flex';
    dropZoneGN.style.flexWrap = 'wrap';
    categoriasGN.forEach(cat => {
      const drop = document.createElement('div');
      drop.className = 'visual-option';
      drop.style.minWidth = '140px';
      drop.style.minHeight = '60px';
      drop.style.margin = '8px';
      drop.style.background = '#f1f8e9';
      drop.textContent = cat.label;
      drop.ondragover = (e) => e.preventDefault();
      drop.ondrop = (e) => {
        e.preventDefault();
        const idx = e.dataTransfer.getData('text/plain');
        if (idx !== undefined) {
          const word = document.querySelector(`[data-idx='${idx}']`);
          if (word) {
            drop.appendChild(word);
            word.style.margin = '4px';
            word.style.display = 'inline-block';
          }
          chequearGeneroNumero();
        }
      };
      // Permitir devolver palabras a la zona inicial
      zonaInicialGN.ondragover = (e) => e.preventDefault();
      zonaInicialGN.ondrop = (e) => {
        e.preventDefault();
        const idx = e.dataTransfer.getData('text/plain');
        if (idx !== undefined) {
          const word = document.querySelector(`[data-idx='${idx}']`);
          if (word) {
            zonaInicialGN.appendChild(word);
            word.style.margin = '4px';
            word.style.display = 'inline-block';
          }
          chequearGeneroNumero();
        }
      };
      generoNumeroCont.appendChild(drop);
    });
    generoNumeroCont.appendChild(dropZoneGN);
    function chequearGeneroNumero() {
      let correcto = true;
      categoriasGN.forEach(cat => {
        const drop = Array.from(generoNumeroCont.children).find(el => el.textContent.startsWith(cat.label));
        if (drop) {
          const words = drop.querySelectorAll('.visual-option');
          words.forEach(word => {
            const idx = word.dataset.idx;
            if (palabrasGN[idx].genero !== cat.genero || palabrasGN[idx].numero !== cat.numero) correcto = false;
          });
          // Debe haber solo las palabras correctas por categoría
          const correctos = palabrasGN.filter(p => p.genero === cat.genero && p.numero === cat.numero).length;
          if (words.length !== correctos) correcto = false;
        } else {
          correcto = false;
        }
      });
      // Todas las palabras deben estar clasificadas
      const total = palabrasGN.length;
      const ubicadas = Array.from(generoNumeroCont.querySelectorAll('.visual-option')).filter(w => !zonaInicialGN.contains(w)).length;
      if (ubicadas !== total) correcto = false;
      document.getElementById('btn-siguiente-8').disabled = !correcto;
      document.getElementById('feedback-8').textContent = correcto ? '¡Excelente! Clasificaste todas las palabras por género y número.' : '';
    }
    // Ayuda visual (imágenes reales)
    function mostrarAyudaGeneroNumero() {
      if (document.getElementById('ayuda-gn-popup')) return;
      const popup = document.createElement('div');
      popup.id = 'ayuda-gn-popup';
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.background = '#fff';
      popup.style.border = '2px solid #1976d2';
      popup.style.borderRadius = '12px';
      popup.style.boxShadow = '0 4px 16px #0003';
      popup.style.padding = '24px';
      popup.style.zIndex = '1000';
      popup.innerHTML = `
        <h3>¿Qué es el género y el número?</h3>
        <ul style="text-align:left;">
          <li><b>Masculino:</b> Ej: <b>niño</b> <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;">, <b>perros</b></li>
          <li><b>Femenino:</b> Ej: <b>niña</b> <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;">, <b>flores</b></li>
          <li><b>Singular:</b> Una sola cosa. Ej: <b>flor</b></li>
          <li><b>Plural:</b> Más de una. Ej: <b>niñas</b>, <b>hermosas</b></li>
        </ul>
        <button class="game-btn" style="background:#1976d2;" onclick="document.body.removeChild(document.getElementById('ayuda-gn-popup'))">Cerrar ayuda</button>
      `;
      document.body.appendChild(popup);
    }
  }
  // 9. Comprensión lectora (texto + opción múltiple + ayuda)
  const comprensionCont = document.getElementById('comprension-lectura');
  if (comprensionCont) {
    comprensionCont.innerHTML = '';
    // Mensaje inicial motivador
    const mensajeCL = document.createElement('div');
    mensajeCL.className = 'game-instructions';
    mensajeCL.innerHTML = 'Lee el texto y responde las preguntas. ¡Piensa bien antes de elegir!';
    comprensionCont.appendChild(mensajeCL);
    // Botón de ayuda
    const ayudaBtnCL = document.createElement('button');
    ayudaBtnCL.className = 'game-btn';
    ayudaBtnCL.style.background = '#1976d2';
    ayudaBtnCL.style.marginBottom = '12px';
    ayudaBtnCL.textContent = '¿Necesitas ayuda?';
    ayudaBtnCL.onclick = mostrarAyudaComprension;
    comprensionCont.appendChild(ayudaBtnCL);
    // Texto breve
    const texto = `Juan y su perro Tomás fueron al parque. Juan llevó una pelota y jugó a lanzarla para que Tomás la buscara. Después, se sentaron bajo un árbol a descansar y comieron galletitas.`;
    const textoDiv = document.createElement('div');
    textoDiv.style.background = '#f1f8e9';
    textoDiv.style.padding = '12px';
    textoDiv.style.margin = '12px 0';
    textoDiv.style.borderRadius = '8px';
    textoDiv.textContent = texto;
    comprensionCont.appendChild(textoDiv);
    // Preguntas de opción múltiple
    const preguntas = [
      {
        pregunta: '¿A dónde fueron Juan y Tomás?',
        opciones: ['A la escuela', 'Al parque', 'A la casa de un amigo'],
        correcta: 1
      },
      {
        pregunta: '¿Qué llevó Juan al parque?',
        opciones: ['Una pelota', 'Un libro', 'Un sombrero'],
        correcta: 0
      },
      {
        pregunta: '¿Qué hicieron después de jugar?',
        opciones: ['Fueron a casa', 'Comieron galletitas bajo un árbol', 'Se bañaron en el lago'],
        correcta: 1
      }
    ];
    let respuestas = Array(preguntas.length).fill(null);
    preguntas.forEach((preg, idx) => {
      const pregDiv = document.createElement('div');
      pregDiv.style.margin = '10px 0';
      const p = document.createElement('div');
      p.textContent = preg.pregunta;
      pregDiv.appendChild(p);
      preg.opciones.forEach((op, i) => {
        const label = document.createElement('label');
        label.style.display = 'block';
        label.style.marginLeft = '16px';
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'pregunta-' + idx;
        radio.value = i;
        radio.onchange = () => {
          respuestas[idx] = parseInt(radio.value);
          chequearComprension();
        };
        label.appendChild(radio);
        label.appendChild(document.createTextNode(' ' + op));
        pregDiv.appendChild(label);
      });
      comprensionCont.appendChild(pregDiv);
    });
    function chequearComprension() {
      let correcto = true;
      preguntas.forEach((preg, idx) => {
        if (respuestas[idx] !== preg.correcta) correcto = false;
      });
      document.getElementById('btn-finalizar').disabled = !correcto;
      document.getElementById('feedback-final').textContent = correcto ? '¡Excelente! Respondiste todas las preguntas correctamente.' : '';
    }
    // Ayuda visual (estrategia de comprensión)
    function mostrarAyudaComprension() {
      if (document.getElementById('ayuda-comprension-popup')) return;
      const popup = document.createElement('div');
      popup.id = 'ayuda-comprension-popup';
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.background = '#fff';
      popup.style.border = '2px solid #1976d2';
      popup.style.borderRadius = '12px';
      popup.style.boxShadow = '0 4px 16px #0003';
      popup.style.padding = '24px';
      popup.style.zIndex = '1000';
      popup.innerHTML = `
        <h3>¿Cómo responder preguntas de comprensión lectora?</h3>
        <ul style="text-align:left;">
          <li>Lee el texto con atención, puedes leerlo más de una vez.</li>
          <li>Busca palabras clave en la pregunta y en el texto.</li>
          <li>Descarta las opciones que no aparecen en el texto.</li>
          <li>¡No te apures! Piensa antes de responder.</li>
        </ul>
        <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=facearea&w=120&h=80" style="display:block;margin:12px auto;">
        <button class="game-btn" style="background:#1976d2;" onclick="document.body.removeChild(document.getElementById('ayuda-comprension-popup'))">Cerrar ayuda</button>
      `;
      document.body.appendChild(popup);
    }
  }
}

function mostrarAyudaSustantivos() {
  if (document.getElementById('ayuda-sustantivos-popup')) return;
  const popup = document.createElement('div');
  popup.id = 'ayuda-sustantivos-popup';
  popup.style.position = 'fixed';
  popup.style.top = '50%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.background = '#fff';
  popup.style.border = '2px solid #1976d2';
  popup.style.borderRadius = '12px';
  popup.style.boxShadow = '0 4px 16px #0003';
  popup.style.padding = '24px';
  popup.style.zIndex = '1000';
  popup.innerHTML = `
    <h3>¿Qué significa cada categoría?</h3>
    <ul style="text-align:left;">
      <li><b>Común:</b> <img src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> Ej: perro, mesa</li>
      <li><b>Propio:</b> <img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> Ej: Juan</li>
      <li><b>Concreto:</b> <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> Ej: mesa</li>
      <li><b>Abstracto:</b> <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> Ej: amor</li>
      <li><b>Individual:</b> <img src="https://images.unsplash.com/photo-1518715308788-3005759c41c8?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> Ej: abeja</li>
      <li><b>Colectivo:</b> <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=48&h=48" style="vertical-align:middle;"> Ej: bosque</li>
    </ul>
    <button class="game-btn" style="background:#1976d2;" onclick="document.body.removeChild(document.getElementById('ayuda-sustantivos-popup'))">Cerrar ayuda</button>
  `;
  document.body.appendChild(popup);
}

// Barra de navegación entre ejercicios
function renderNavEjercicios() {
  const nav = document.getElementById('nav-ejercicios');
  if (!nav) return;
  nav.innerHTML = '';
  for (let i = 0; i < totalJuegos; i++) {
    if (i === totalJuegos - 1) continue; // No mostrar botón para pantalla final
    const btn = document.createElement('button');
    btn.textContent = (i + 1).toString();
    btn.className = 'game-btn';
    btn.style.margin = '0 4px';
    if (i === juegoActual) {
      btn.style.background = '#1976d2';
      btn.style.color = 'white';
      btn.disabled = true;
    }
    btn.onclick = () => {
      juegoActual = i;
      mostrarJuego(juegoActual);
      motivar(juegoActual);
      renderNavEjercicios();
    };
    nav.appendChild(btn);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  mostrarJuego(0);
  motivar(0);
  inicializarJuegos();
  renderNavEjercicios();
}); 