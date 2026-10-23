const fs = require('fs');

const txt = fs.readFileSync('C:/Users/Ramyi/Desktop/ramya/avantra/pdf_stream.txt', 'utf8');
const blocks = txt.split(/\nq\n/);

function commandsToSvgPath(cmds, mat, globalMat, offsetX = 0, offsetY = 0) {
  let path = '';
  let curX = 0, curY = 0;
  
  function tr(x, y) {
    const x1 = mat[0] * x + mat[2] * y + mat[4];
    const y1 = mat[1] * x + mat[3] * y + mat[5];
    const x2 = globalMat[0] * x1 + globalMat[2] * y1 + globalMat[4] - offsetX;
    const y2 = globalMat[1] * x1 + globalMat[3] * y1 + globalMat[5] - offsetY;
    return [Math.round(x2 * 100) / 100, Math.round(y2 * 100) / 100];
  }

  const allPoints = [];

  for (let cmd of cmds) {
    const parts = cmd.trim().split(/\s+/);
    const op = parts[parts.length - 1];
    const args = parts.slice(0, -1).map(Number);
    
    if (op === 'm') {
      const [x, y] = tr(args[0], args[1]);
      curX = args[0];
      curY = args[1];
      path += `M ${x} ${y} `;
      allPoints.push([x, y]);
    } else if (op === 'l') {
      const [x, y] = tr(args[0], args[1]);
      curX = args[0];
      curY = args[1];
      path += `L ${x} ${y} `;
      allPoints.push([x, y]);
    } else if (op === 'c') {
      const [cp1x, cp1y] = tr(args[0], args[1]);
      const [cp2x, cp2y] = tr(args[2], args[3]);
      const [endX, endY] = tr(args[4], args[5]);
      path += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY} `;
      curX = args[4];
      curY = args[5];
      allPoints.push([endX, endY]);
    } else if (op === 'v') {
      const [cp1x, cp1y] = tr(curX, curY);
      const [cp2x, cp2y] = tr(args[0], args[1]);
      const [endX, endY] = tr(args[2], args[3]);
      path += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY} `;
      curX = args[2];
      curY = args[3];
      allPoints.push([endX, endY]);
    } else if (op === 'y') {
      const [cp1x, cp1y] = tr(args[0], args[1]);
      const [cp2x, cp2y] = tr(args[2], args[3]);
      const [endX, endY] = tr(args[2], args[3]);
      path += `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY} `;
      curX = args[2];
      curY = args[3];
      allPoints.push([endX, endY]);
    } else if (op === 'h') {
      path += 'Z ';
    }
  }
  return { path: path.trim(), allPoints };
}

function extractBlock(blockStr) {
  const lines = blockStr.trim().split('\n');
  let matrix = [1, 0, 0, 1, 0, 0];
  const commands = [];
  
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    if (line.endsWith('cm')) {
      const parts = line.split(/\s+/).slice(0, -1).map(Number);
      if (parts.length === 6) matrix = parts;
    } else if (line.endsWith('m') || line.endsWith('l') || line.endsWith('c') || line.endsWith('v') || line.endsWith('y') || line.endsWith('h') || line.endsWith('re')) {
      commands.push(line);
    }
  }
  return { matrix, commands };
}

const globalMat = [0.24, 0, 0, 0.24, 0, 0];

const eb3 = extractBlock(blocks[3]);
const eb4 = extractBlock(blocks[4]);
const eb5 = extractBlock(blocks[5]);

// First compute unshifted points to find minX and minY
const rawP3 = commandsToSvgPath(eb3.commands, eb3.matrix, globalMat, 0, 0);
const rawP4 = commandsToSvgPath(eb4.commands, eb4.matrix, globalMat, 0, 0);
const rawP5 = commandsToSvgPath(eb5.commands, eb5.matrix, globalMat, 0, 0);

const allPts = [...rawP3.allPoints, ...rawP4.allPoints, ...rawP5.allPoints];
const minX = Math.min(...allPts.map(p => p[0]));
const minY = Math.min(...allPts.map(p => p[1]));
const maxX = Math.max(...allPts.map(p => p[0]));
const maxY = Math.max(...allPts.map(p => p[1]));

const width = Math.round((maxX - minX) * 100) / 100;
const height = Math.round((maxY - minY) * 100) / 100;

console.log(`Bounds: minX=${minX}, minY=${minY}, maxX=${maxX}, maxY=${maxY}, w=${width}, h=${height}`);

// Now generate shifted paths
const iconPath = commandsToSvgPath(eb3.commands, eb3.matrix, globalMat, minX, minY).path;
const wordmarkPath = commandsToSvgPath(eb4.commands, eb4.matrix, globalMat, minX, minY).path;
const taglinePath = commandsToSvgPath(eb5.commands, eb5.matrix, globalMat, minX, minY).path;

// Icon alone bounds
const iconPts = commandsToSvgPath(eb3.commands, eb3.matrix, globalMat, minX, minY).allPoints;
const iconW = Math.max(...iconPts.map(p => p[0]));
const iconH = Math.max(...iconPts.map(p => p[1]));

// Exact gradient endpoint transforms matching the original PDF Shading
function trWordmark(x, y) {
  const X_svg = (x * 23.272184 + 7148.356) * 0.24 - minX;
  const Y_svg = (y * 23.272184 + 1597.17322) * 0.24 - minY;
  return [Math.round(X_svg * 100) / 100, Math.round(Y_svg * 100) / 100];
}
function trTagline(x, y) {
  const X_svg = (x * 23.272184 + 3635.7483) * 0.24 - minX;
  const Y_svg = (y * 23.272184 + 1939.0094) * 0.24 - minY;
  return [Math.round(X_svg * 100) / 100, Math.round(Y_svg * 100) / 100];
}

const [wmX1, wmY1] = trWordmark(-105.150002, 0); // Horizontal gradient projection
const [wmX2, wmY2] = trWordmark(104.209999, 0);
const [tgX1, tgY1] = trTagline(-27.275, 0);
const [tgX2, tgY2] = trTagline(27.635, 0);

// 1. Standard Logo for Light Backgrounds
const standardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Math.ceil(width)} ${Math.ceil(height)}" fill="none">
  <defs>
    <!-- Icon gradient: bottom-left deep navy to top-right vivid royal blue -->
    <linearGradient id="avantraIconGrad" x1="0" y1="${iconH}" x2="${iconW}" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#02060c" />
      <stop offset="100%" stop-color="#198afa" />
    </linearGradient>
    
    <!-- Wordmark gradient: left dark navy to right vibrant royal blue -->
    <linearGradient id="avantraWordmarkGrad" x1="${wmX1}" y1="84" x2="${wmX2}" y2="84" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#02060c" />
      <stop offset="100%" stop-color="#198afa" />
    </linearGradient>
    
    <!-- Tagline gradient: left deep blue to right sky blue -->
    <linearGradient id="avantraTaglineGrad" x1="${tgX1}" y1="204" x2="${tgX2}" y2="204" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#02060c" />
      <stop offset="100%" stop-color="#69a2f6" />
    </linearGradient>
  </defs>
  
  <!-- Icon -->
  <path d="${iconPath}" fill="url(#avantraIconGrad)" />
  
  <!-- Wordmark: AVANTRA CONSULTING LLP -->
  <path d="${wordmarkPath}" fill="url(#avantraWordmarkGrad)" />
  
  <!-- Tagline: solutioning together -->
  <path d="${taglinePath}" fill="url(#avantraTaglineGrad)" />
</svg>`;

// 2. Light / White Logo for Dark Backgrounds (Navbar scrolled / Footer dark navy)
const darkBackgroundSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Math.ceil(width)} ${Math.ceil(height)}" fill="none">
  <defs>
    <!-- Icon gradient: deep royal to bright cyan/blue -->
    <linearGradient id="avantraIconGradDark" x1="0" y1="${iconH}" x2="${iconW}" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#198afa" />
      <stop offset="100%" stop-color="#60a5fa" />
    </linearGradient>
    
    <!-- Wordmark gradient: crisp pure white to vibrant sky-blue/cyan for dark navy backgrounds -->
    <linearGradient id="avantraWordmarkGradDark" x1="${wmX1}" y1="84" x2="${wmX2}" y2="84" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#60a5fa" />
    </linearGradient>
    
    <!-- Tagline: soft ice blue -->
    <linearGradient id="avantraTaglineGradDark" x1="${tgX1}" y1="204" x2="${tgX2}" y2="204" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#93c5fd" />
      <stop offset="100%" stop-color="#bae6fd" />
    </linearGradient>
  </defs>
  
  <!-- Icon -->
  <path d="${iconPath}" fill="url(#avantraIconGradDark)" />
  
  <!-- Wordmark: AVANTRA CONSULTING LLP -->
  <path d="${wordmarkPath}" fill="url(#avantraWordmarkGradDark)" />
  
  <!-- Tagline: solutioning together -->
  <path d="${taglinePath}" fill="url(#avantraTaglineGradDark)" />
</svg>`;

// 3. Standalone Icon (Square for Favicon or App Icon)
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${Math.ceil(iconW)} ${Math.ceil(iconH)}" fill="none">
  <defs>
    <linearGradient id="avantraFaviconGrad" x1="0" y1="${iconH}" x2="${iconW}" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#02060c" />
      <stop offset="100%" stop-color="#198afa" />
    </linearGradient>
  </defs>
  <path d="${iconPath}" fill="url(#avantraFaviconGrad)" />
</svg>`;

// Save to frontend/public
fs.writeFileSync('C:/Users/Ramyi/Desktop/ramya/avantra/frontend/public/avantra-logo.svg', standardSvg);
fs.writeFileSync('C:/Users/Ramyi/Desktop/ramya/avantra/frontend/public/avantra-logo-white.svg', darkBackgroundSvg);
fs.writeFileSync('C:/Users/Ramyi/Desktop/ramya/avantra/frontend/public/avantra-icon.svg', iconSvg);
fs.writeFileSync('C:/Users/Ramyi/Desktop/ramya/avantra/frontend/public/favicon.svg', iconSvg);

// Save to root public
fs.writeFileSync('C:/Users/Ramyi/Desktop/ramya/avantra/public/avantra-logo.svg', standardSvg);
fs.writeFileSync('C:/Users/Ramyi/Desktop/ramya/avantra/public/avantra-logo-white.svg', darkBackgroundSvg);
fs.writeFileSync('C:/Users/Ramyi/Desktop/ramya/avantra/public/avantra-icon.svg', iconSvg);
fs.writeFileSync('C:/Users/Ramyi/Desktop/ramya/avantra/public/favicon.svg', iconSvg);

console.log('SVGs generated and synchronized successfully!');
