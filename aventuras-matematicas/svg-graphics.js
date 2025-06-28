// SVG Graphics Library for Mathematical Visualizations
// Provides precise visual representations with clear divisions

/**
 * Creates SVG circle with precise divisions
 * @param {number} numerator - Parts filled
 * @param {number} denominator - Total parts
 * @param {object} options - Configuration options
 * @returns {HTMLElement} SVG container element
 */
function createSVGCircle(numerator, denominator, options = {}) {
    const {
        size = 80,
        strokeWidth = 2,
        strokeColor = '#2c3e50',
        filledColor = '#4facfe',
        emptyColor = '#f8f9fa',
        showLabel = true,
        labelColor = '#2c3e50',
        showDivisions = true
    } = options;

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.gap = '8px';

    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", size);
    svg.setAttribute("height", size);
    svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
    svg.style.filter = 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))';

    const center = size / 2;
    const radius = (size - strokeWidth * 2) / 2;

    // Create gradients
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    
    const filledGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    filledGradient.setAttribute("id", `filled-gradient-${Date.now()}-${Math.random()}`);
    filledGradient.innerHTML = `
        <stop offset="0%" style="stop-color:${filledColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${adjustBrightness(filledColor, -20)};stop-opacity:1" />
    `;
    
    const emptyGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    emptyGradient.setAttribute("id", `empty-gradient-${Date.now()}-${Math.random()}`);
    emptyGradient.innerHTML = `
        <stop offset="0%" style="stop-color:${emptyColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${adjustBrightness(emptyColor, -10)};stop-opacity:1" />
    `;

    defs.appendChild(filledGradient);
    defs.appendChild(emptyGradient);
    svg.appendChild(defs);

    // Create circle segments
    const anglePerSegment = (2 * Math.PI) / denominator;
    
    for (let i = 0; i < denominator; i++) {
        const startAngle = i * anglePerSegment - Math.PI / 2;
        const endAngle = (i + 1) * anglePerSegment - Math.PI / 2;
        
        const x1 = center + radius * Math.cos(startAngle);
        const y1 = center + radius * Math.sin(startAngle);
        const x2 = center + radius * Math.cos(endAngle);
        const y2 = center + radius * Math.sin(endAngle);
        
        const largeArcFlag = anglePerSegment > Math.PI ? 1 : 0;
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
        path.setAttribute("d", pathData);
        
        if (i < numerator) {
            path.setAttribute("fill", `url(#${filledGradient.id})`);
        } else {
            path.setAttribute("fill", `url(#${emptyGradient.id})`);
        }
        
        path.setAttribute("stroke", strokeColor);
        path.setAttribute("stroke-width", strokeWidth);
        svg.appendChild(path);
    }

    // Add division lines if requested
    if (showDivisions) {
        for (let i = 0; i < denominator; i++) {
            const angle = i * anglePerSegment - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", center);
            line.setAttribute("y1", center);
            line.setAttribute("x2", x);
            line.setAttribute("y2", y);
            line.setAttribute("stroke", strokeColor);
            line.setAttribute("stroke-width", strokeWidth);
            svg.appendChild(line);
        }
    }

    container.appendChild(svg);

    // Add label if requested
    if (showLabel) {
        const label = document.createElement('div');
        label.style.fontSize = '14px';
        label.style.fontWeight = 'bold';
        label.style.color = labelColor;
        label.style.textAlign = 'center';
        label.style.fontFamily = 'Comic Neue, cursive';
        label.textContent = `${numerator}/${denominator}`;
        container.appendChild(label);
    }

    return container;
}

/**
 * Creates SVG rectangle/bar with precise divisions
 * @param {number} numerator - Parts filled
 * @param {number} denominator - Total parts
 * @param {object} options - Configuration options
 * @returns {HTMLElement} SVG container element
 */
function createSVGBar(numerator, denominator, options = {}) {
    const {
        width = 240,
        height = 50,
        strokeWidth = 2,
        strokeColor = '#2c3e50',
        filledColor = '#4facfe',
        emptyColor = '#f8f9fa',
        showLabel = true,
        labelColor = '#2c3e50',
        showDivisions = true,
        showUnitLine = false
    } = options;

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.gap = '8px';

    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", width + strokeWidth * 2);
    svg.setAttribute("height", height + strokeWidth * 2);
    svg.setAttribute("viewBox", `0 0 ${width + strokeWidth * 2} ${height + strokeWidth * 2}`);
    svg.style.filter = 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))';

    // Create gradients
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    
    const filledGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    filledGradient.setAttribute("id", `bar-filled-${Date.now()}-${Math.random()}`);
    filledGradient.innerHTML = `
        <stop offset="0%" style="stop-color:${filledColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${adjustBrightness(filledColor, -20)};stop-opacity:1" />
    `;
    
    const emptyGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
    emptyGradient.setAttribute("id", `bar-empty-${Date.now()}-${Math.random()}`);
    emptyGradient.innerHTML = `
        <stop offset="0%" style="stop-color:${emptyColor};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${adjustBrightness(emptyColor, -10)};stop-opacity:1" />
    `;

    defs.appendChild(filledGradient);
    defs.appendChild(emptyGradient);
    svg.appendChild(defs);

    // Create bar segments
    const segmentWidth = width / denominator;
    
    for (let i = 0; i < denominator; i++) {
        const x = strokeWidth + i * segmentWidth;
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", x);
        rect.setAttribute("y", strokeWidth);
        rect.setAttribute("width", segmentWidth);
        rect.setAttribute("height", height);
        
        if (i < numerator) {
            rect.setAttribute("fill", `url(#${filledGradient.id})`);
        } else {
            rect.setAttribute("fill", `url(#${emptyGradient.id})`);
        }
        
        rect.setAttribute("stroke", strokeColor);
        rect.setAttribute("stroke-width", strokeWidth);
        svg.appendChild(rect);
    }

    // Add division lines if requested
    if (showDivisions) {
        for (let i = 1; i < denominator; i++) {
            const x = strokeWidth + i * segmentWidth;
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x);
            line.setAttribute("y1", strokeWidth);
            line.setAttribute("x2", x);
            line.setAttribute("y2", strokeWidth + height);
            line.setAttribute("stroke", strokeColor);
            line.setAttribute("stroke-width", strokeWidth);
            svg.appendChild(line);
        }
    }

    // Add unit line if requested (marks where 1 whole unit is)
    if (showUnitLine && numerator > denominator) {
        const unitX = strokeWidth + width;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", unitX);
        line.setAttribute("y1", strokeWidth - 10);
        line.setAttribute("x2", unitX);
        line.setAttribute("y2", strokeWidth + height + 10);
        line.setAttribute("stroke", '#e74c3c');
        line.setAttribute("stroke-width", 3);
        svg.appendChild(line);

        // Add "1" label
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", unitX + 5);
        text.setAttribute("y", strokeWidth + height / 2);
        text.setAttribute("fill", '#e74c3c');
        text.setAttribute("font-family", 'Comic Neue, cursive');
        text.setAttribute("font-weight", 'bold');
        text.setAttribute("font-size", '16');
        text.textContent = '1';
        svg.appendChild(text);
    }

    container.appendChild(svg);

    // Add label if requested
    if (showLabel) {
        const label = document.createElement('div');
        label.style.fontSize = '14px';
        label.style.fontWeight = 'bold';
        label.style.color = labelColor;
        label.style.textAlign = 'center';
        label.style.fontFamily = 'Comic Neue, cursive';
        label.textContent = `${numerator}/${denominator}`;
        container.appendChild(label);
    }

    return container;
}

/**
 * Creates multiple bars for fractions greater than 1
 * @param {number} numerator - Parts filled
 * @param {number} denominator - Total parts
 * @param {object} options - Configuration options
 * @returns {HTMLElement} Container with multiple bars
 */
function createSVGMultipleBars(numerator, denominator, options = {}) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';
    container.style.gap = '10px';

    const wholeBars = Math.floor(numerator / denominator);
    const remainder = numerator % denominator;

    // Create whole bars
    for (let i = 0; i < wholeBars; i++) {
        const bar = createSVGBar(denominator, denominator, {
            ...options,
            filledColor: '#27ae60',
            showLabel: false
        });
        
        // Add label to indicate this is a whole unit
        const label = document.createElement('div');
        label.style.fontSize = '12px';
        label.style.fontWeight = 'bold';
        label.style.color = '#27ae60';
        label.style.textAlign = 'center';
        label.style.fontFamily = 'Comic Neue, cursive';
        label.textContent = `${denominator}/${denominator} = 1`;
        bar.appendChild(label);
        
        container.appendChild(bar);
    }

    // Create remainder bar if needed
    if (remainder > 0) {
        const remainderBar = createSVGBar(remainder, denominator, {
            ...options,
            showLabel: false
        });
        
        const label = document.createElement('div');
        label.style.fontSize = '12px';
        label.style.fontWeight = 'bold';
        label.style.color = options.filledColor || '#4facfe';
        label.style.textAlign = 'center';
        label.style.fontFamily = 'Comic Neue, cursive';
        label.textContent = `${remainder}/${denominator}`;
        remainderBar.appendChild(label);
        
        container.appendChild(remainderBar);
    }

    // Add total label
    const totalLabel = document.createElement('div');
    totalLabel.style.fontSize = '16px';
    totalLabel.style.fontWeight = 'bold';
    totalLabel.style.color = '#2c3e50';
    totalLabel.style.textAlign = 'center';
    totalLabel.style.fontFamily = 'Comic Neue, cursive';
    totalLabel.style.marginTop = '10px';
    totalLabel.style.padding = '8px 16px';
    totalLabel.style.background = 'rgba(255,255,255,0.9)';
    totalLabel.style.borderRadius = '15px';
    totalLabel.style.border = '2px solid #4facfe';
    totalLabel.textContent = `Total: ${numerator}/${denominator}`;
    container.appendChild(totalLabel);

    return container;
}

/**
 * Creates SVG pizza/pie chart with precise divisions
 * @param {number} numerator - Parts filled
 * @param {number} denominator - Total parts
 * @param {object} options - Configuration options
 * @returns {HTMLElement} SVG container element
 */
function createSVGPizza(numerator, denominator, options = {}) {
    const {
        size = 120,
        strokeWidth = 3,
        strokeColor = '#8B4513',
        filledColor = '#FF6347',
        emptyColor = '#FFD700',
        showLabel = true,
        labelColor = '#2c3e50'
    } = options;

    return createSVGCircle(numerator, denominator, {
        size,
        strokeWidth,
        strokeColor,
        filledColor,
        emptyColor,
        showLabel,
        labelColor
    });
}

/**
 * Utility function to adjust color brightness
 * @param {string} color - Hex color code
 * @param {number} percent - Brightness adjustment percentage
 * @returns {string} Adjusted hex color
 */
function adjustBrightness(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

/**
 * Creates interactive SVG visualization that responds to clicks
 * @param {number} numerator - Parts filled
 * @param {number} denominator - Total parts
 * @param {string} type - Type of visualization ('circle', 'bar', 'pizza')
 * @param {object} options - Configuration options
 * @returns {HTMLElement} Interactive container
 */
function createInteractiveSVG(numerator, denominator, type = 'circle', options = {}) {
    let visualization;
    
    switch (type) {
        case 'bar':
            visualization = createSVGBar(numerator, denominator, options);
            break;
        case 'pizza':
            visualization = createSVGPizza(numerator, denominator, options);
            break;
        case 'multiple-bars':
            visualization = createSVGMultipleBars(numerator, denominator, options);
            break;
        default:
            visualization = createSVGCircle(numerator, denominator, options);
    }
    
    // Add hover effects
    visualization.style.cursor = 'pointer';
    visualization.style.transition = 'transform 0.3s ease';
    
    visualization.addEventListener('mouseenter', () => {
        visualization.style.transform = 'scale(1.05)';
    });
    
    visualization.addEventListener('mouseleave', () => {
        visualization.style.transform = 'scale(1)';
    });
    
    // Add click handler for educational feedback
    visualization.addEventListener('click', () => {
        const value = numerator / denominator;
        let message;
        
        if (value < 1) {
            message = `Esta fracción ${numerator}/${denominator} es menor que 1 (${value.toFixed(3)})`;
        } else if (value === 1) {
            message = `Esta fracción ${numerator}/${denominator} es igual a 1 unidad completa`;
        } else {
            message = `Esta fracción ${numerator}/${denominator} es mayor que 1 (${value.toFixed(3)})`;
        }
        
        // Show temporary tooltip
        showTooltip(visualization, message);
    });
    
    return visualization;
}

/**
 * Shows a temporary tooltip with information
 * @param {HTMLElement} element - Element to show tooltip near
 * @param {string} message - Message to display
 */
function showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.background = 'rgba(0,0,0,0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '8px 12px';
    tooltip.style.borderRadius = '8px';
    tooltip.style.fontSize = '14px';
    tooltip.style.zIndex = '1000';
    tooltip.style.maxWidth = '200px';
    tooltip.style.textAlign = 'center';
    tooltip.textContent = message;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    
    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}

// Export functions for global use
window.createSVGCircle = createSVGCircle;
window.createSVGBar = createSVGBar;
window.createSVGMultipleBars = createSVGMultipleBars;
window.createSVGPizza = createSVGPizza;
window.createInteractiveSVG = createInteractiveSVG;