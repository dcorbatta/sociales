// Script to update all pages with proper fraction display
// This script will be run in the browser console to update existing pages

// List of pages to update
const pagesToUpdate = [
    'representacion-grafica.html',
    'simplificar-fracciones.html',
    'fraccion-irreductible.html',
    'recta-numerica.html',
    'pizzeria-fracciones.html'
];

// Function to update a single page
function updatePageFractions(pageName) {
    console.log(`Updating ${pageName}...`);
    
    // Add CSS link if not present
    if (!document.querySelector('link[href="fraction-styles.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'fraction-styles.css';
        document.head.appendChild(cssLink);
    }
    
    // Add JS script if not present
    if (!document.querySelector('script[src="fraction-utils.js"]')) {
        const jsScript = document.createElement('script');
        jsScript.src = 'fraction-utils.js';
        document.body.appendChild(jsScript);
    }
    
    // Update all elements with class 'fraction-text'
    setTimeout(() => {
        updateAllFractionText();
    }, 100);
}

// Instructions for manual updates
console.log(`
INSTRUCCIONES PARA ACTUALIZAR FRACCIONES:

1. Para cada página HTML, agregar en el <head>:
   <link rel="stylesheet" href="fraction-styles.css">

2. Antes del cierre de </body>, agregar:
   <script src="fraction-utils.js"></script>

3. Para convertir fracciones automáticamente, cambiar elementos como:
   <div>3/4</div>
   por:
   <div class="fraction-text">3/4</div>

4. Para fracciones específicas, usar directamente:
   createFractionHTML(3, 4, 'fraction-proper')

5. Para operaciones matemáticas:
   createFractionOperationHTML(1, 2, '+', 1, 4, 3, 4)

PÁGINAS PENDIENTES DE ACTUALIZAR:
${pagesToUpdate.join('\n')}
`);

// Auto-update function for current page
function updateCurrentPage() {
    console.log('Actualizando página actual...');
    
    // Find all text that contains fractions and wrap in fraction-text class
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.textContent.match(/\d+\/\d+/)) {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        const parent = textNode.parentNode;
        if (parent && !parent.classList.contains('fraction-text')) {
            parent.classList.add('fraction-text');
        }
    });
    
    // Update all fraction text
    updateAllFractionText();
    
    console.log('✅ Página actualizada');
}

// Export functions for manual use
window.updateCurrentPage = updateCurrentPage;
window.updatePageFractions = updatePageFractions; 