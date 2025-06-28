// Common JavaScript utilities for fraction display

/**
 * Creates HTML for proper fraction display
 * @param {number} numerator - The numerator of the fraction
 * @param {number} denominator - The denominator of the fraction
 * @param {string} cssClass - CSS class to apply ('fraction-proper', 'fraction-large', 'fraction-small')
 * @param {string} colorClass - Optional color class ('fraction-red', 'fraction-blue', etc.)
 * @returns {string} HTML string for the fraction
 */
function createFractionHTML(numerator, denominator, cssClass = 'fraction-proper', colorClass = '') {
    // Handle whole numbers
    if (denominator === 1) {
        const fontSize = cssClass.includes('large') ? '2.5rem' : 
                        cssClass.includes('small') ? '1rem' : '1.5rem';
        const color = colorClass.includes('red') ? '#e74c3c' :
                     colorClass.includes('blue') ? '#4facfe' :
                     colorClass.includes('green') ? '#27ae60' :
                     colorClass.includes('orange') ? '#f39c12' : '#2c3e50';
        
        return `<span style="font-size: ${fontSize}; font-weight: bold; color: ${color}; font-family: 'Courier New', monospace;">${numerator}</span>`;
    }
    
    // Handle zero
    if (numerator === 0) {
        const fontSize = cssClass.includes('large') ? '2.5rem' : 
                        cssClass.includes('small') ? '1rem' : '1.5rem';
        return `<span style="font-size: ${fontSize}; font-weight: bold; color: #666; font-family: 'Courier New', monospace;">0</span>`;
    }
    
    const classes = `${cssClass} ${colorClass}`.trim();
    
    return `
        <div class="${classes}">
            <div class="numerator">${numerator}</div>
            <div class="fraction-line"></div>
            <div class="denominator">${denominator}</div>
        </div>
    `;
}

/**
 * Creates HTML for mixed number display
 * @param {number} whole - The whole number part
 * @param {number} numerator - The numerator of the fraction part
 * @param {number} denominator - The denominator of the fraction part
 * @param {string} cssClass - CSS class to apply
 * @param {string} colorClass - Optional color class
 * @returns {string} HTML string for the mixed number
 */
function createMixedNumberHTML(whole, numerator, denominator, cssClass = 'fraction-proper', colorClass = '') {
    if (numerator === 0) {
        return createFractionHTML(whole, 1, cssClass, colorClass);
    }
    
    const wholeHTML = createFractionHTML(whole, 1, cssClass, colorClass);
    const fractionHTML = createFractionHTML(numerator, denominator, cssClass, colorClass);
    
    return `
        <div style="display: inline-flex; align-items: center; gap: 8px;">
            ${wholeHTML}
            ${fractionHTML}
        </div>
    `;
}

/**
 * Creates HTML for fraction operation display (a/b + c/d = ?)
 * @param {number} num1 - First numerator
 * @param {number} den1 - First denominator
 * @param {string} operation - Operation symbol ('+', '-', '×', '÷')
 * @param {number} num2 - Second numerator
 * @param {number} den2 - Second denominator
 * @param {number|null} resultNum - Result numerator (null for question mark)
 * @param {number|null} resultDen - Result denominator (null for question mark)
 * @param {string} cssClass - CSS class to apply
 * @returns {string} HTML string for the operation
 */
function createFractionOperationHTML(num1, den1, operation, num2, den2, resultNum = null, resultDen = null, cssClass = 'fraction-proper') {
    const operationColor = operation === '+' ? '#27ae60' : 
                          operation === '-' || operation === '−' ? '#e74c3c' :
                          operation === '×' ? '#9b59b6' :
                          operation === '÷' ? '#f39c12' : '#666';
    
    const fontSize = cssClass.includes('large') ? '2.5rem' : 
                    cssClass.includes('small') ? '1.2rem' : '2rem';
    
    let resultHTML;
    if (resultNum === null || resultDen === null) {
        resultHTML = `<span style="font-size: ${fontSize}; color: #666; font-weight: bold;">?</span>`;
    } else {
        resultHTML = createFractionHTML(resultNum, resultDen, cssClass, 'fraction-green');
    }
    
    return `
        <div style="display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap;">
            ${createFractionHTML(num1, den1, cssClass)}
            <span style="font-size: ${fontSize}; color: ${operationColor}; font-weight: bold;">${operation}</span>
            ${createFractionHTML(num2, den2, cssClass)}
            <span style="font-size: ${fontSize}; color: #27ae60; font-weight: bold;">=</span>
            ${resultHTML}
        </div>
    `;
}

/**
 * Converts inline fraction text (like "3/4") to proper fraction HTML
 * @param {string} text - Text containing fractions in format "3/4"
 * @param {string} cssClass - CSS class to apply to fractions
 * @returns {string} HTML string with proper fractions
 */
function convertInlineFractionsToHTML(text, cssClass = 'fraction-small') {
    // Regular expression to match fractions like "3/4", "12/5", etc.
    const fractionRegex = /(\d+)\/(\d+)/g;
    
    return text.replace(fractionRegex, (match, numerator, denominator) => {
        return createFractionHTML(parseInt(numerator), parseInt(denominator), cssClass);
    });
}

/**
 * Updates all elements with class 'fraction-text' to display proper fractions
 * Call this function after page load to convert all fraction text automatically
 */
function updateAllFractionText() {
    const elements = document.querySelectorAll('.fraction-text');
    elements.forEach(element => {
        const originalText = element.textContent || element.innerText;
        const updatedHTML = convertInlineFractionsToHTML(originalText);
        if (updatedHTML !== originalText) {
            element.innerHTML = updatedHTML;
        }
    });
}

/**
 * Simplifies a fraction to its lowest terms
 * @param {number} numerator 
 * @param {number} denominator 
 * @returns {object} Object with simplified num and den properties
 */
function simplifyFraction(numerator, denominator) {
    function gcd(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return {
        num: numerator / divisor,
        den: denominator / divisor
    };
}

// Auto-update fraction text when DOM is loaded
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        updateAllFractionText();
    });
} 