export const SAMPLE_DIAGRAM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" style="background-color:white;">
  <rect width="600" height="400" fill="white"/>
  <text x="300" y="40" font-family="sans-serif" font-size="24" text-anchor="middle" font-weight="bold">Motor Control Schematic</text>
  
  <!-- Power Lines -->
  <line x1="100" y1="100" x2="500" y2="100" stroke="black" stroke-width="3"/>
  <text x="80" y="105" font-family="sans-serif" font-size="14">L1</text>
  <line x1="100" y1="300" x2="500" y2="300" stroke="black" stroke-width="3"/>
  <text x="80" y="305" font-family="sans-serif" font-size="14">N</text>

  <!-- Circuit Branch -->
  <line x1="200" y1="100" x2="200" y2="150" stroke="black" stroke-width="2"/>
  
  <!-- Switch / Contactor -->
  <circle cx="200" cy="150" r="4" fill="black"/>
  <line x1="200" y1="150" x2="230" y2="180" stroke="black" stroke-width="2"/>
  <circle cx="200" cy="190" r="4" fill="black"/>
  <text x="240" y="170" font-family="sans-serif" font-size="14">K1 (NO)</text>
  
  <line x1="200" y1="190" x2="200" y2="230" stroke="black" stroke-width="2"/>
  
  <!-- Motor Load -->
  <circle cx="200" cy="250" r="20" fill="white" stroke="black" stroke-width="2"/>
  <text x="200" y="255" font-family="sans-serif" font-size="16" text-anchor="middle">M</text>
  
  <line x1="200" y1="270" x2="200" y2="300" stroke="black" stroke-width="2"/>
  
  <!-- Control Coil -->
  <line x1="400" y1="100" x2="400" y2="150" stroke="black" stroke-width="2"/>
  <rect x="380" y="150" width="40" height="40" fill="white" stroke="black" stroke-width="2"/>
  <text x="400" y="175" font-family="sans-serif" font-size="14" text-anchor="middle">K1</text>
  <line x1="400" y1="190" x2="400" y2="300" stroke="black" stroke-width="2"/>

  <text x="300" y="380" font-family="sans-serif" font-size="12" text-anchor="middle" fill="gray">Schneider Electric Reference Design - Altivar Integration</text>
</svg>`;

export const SAMPLE_DOCUMENT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" style="background-color:white;">
  <rect width="600" height="800" fill="white"/>
  <rect x="40" y="40" width="520" height="720" fill="none" stroke="#e2e8f0" stroke-width="2"/>
  
  <text x="80" y="100" font-family="sans-serif" font-size="28" font-weight="bold" fill="#000000">Product Specification</text>
  <text x="80" y="140" font-family="sans-serif" font-size="18" font-weight="bold" fill="#3DCD58">Model: Altivar Machine ATV320</text>
  
  <text x="80" y="190" font-family="sans-serif" font-size="14" fill="#333">The Altivar Machine ATV320 is a variable speed drive for</text>
  <text x="80" y="215" font-family="sans-serif" font-size="14" fill="#333">three-phase asynchronous and synchronous motors. It is</text>
  <text x="80" y="240" font-family="sans-serif" font-size="14" fill="#333">designed to improve machine performance and connectivity.</text>
  
  <!-- Table -->
  <rect x="80" y="280" width="440" height="160" fill="none" stroke="black" stroke-width="1"/>
  <line x1="80" y1="320" x2="520" y2="320" stroke="black" stroke-width="1"/>
  <line x1="80" y1="360" x2="520" y2="360" stroke="black" stroke-width="1"/>
  <line x1="80" y1="400" x2="520" y2="400" stroke="black" stroke-width="1"/>
  <line x1="260" y1="280" x2="260" y2="440" stroke="black" stroke-width="1"/>
  
  <text x="90" y="305" font-family="sans-serif" font-size="14" font-weight="bold">Technical Characteristic</text>
  <text x="270" y="305" font-family="sans-serif" font-size="14" font-weight="bold">Specification</text>
  
  <text x="90" y="345" font-family="sans-serif" font-size="14">Power Rating</text>
  <text x="270" y="345" font-family="sans-serif" font-size="14">0.18 to 15 kW (0.25 to 20 hp)</text>
  
  <text x="90" y="385" font-family="sans-serif" font-size="14">Voltage Range</text>
  <text x="270" y="385" font-family="sans-serif" font-size="14">200...600 V</text>
  
  <text x="90" y="425" font-family="sans-serif" font-size="14">Communication Protocols</text>
  <text x="270" y="425" font-family="sans-serif" font-size="14">Modbus serial, CANopen</text>

  <text x="80" y="500" font-family="sans-serif" font-size="16" font-weight="bold" fill="#000000">Safety Functions</text>
  <circle cx="90" cy="530" r="4" fill="#3DCD58"/>
  <text x="110" y="535" font-family="sans-serif" font-size="14" fill="#333">Safe Torque Off (STO)</text>
  <circle cx="90" cy="560" r="4" fill="#3DCD58"/>
  <text x="110" y="565" font-family="sans-serif" font-size="14" fill="#333">Safe Limited Speed (SLS)</text>
  <circle cx="90" cy="590" r="4" fill="#3DCD58"/>
  <text x="110" y="595" font-family="sans-serif" font-size="14" fill="#333">Safe Maximum Speed (SMS)</text>
</svg>`;

export const SAMPLE_CIRCUIT_BOARD_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" style="background-color:#0a3a1a;">
  <rect width="600" height="400" fill="#0a3a1a"/>
  
  <!-- Traces -->
  <path d="M 50 50 L 150 50 L 200 100 L 300 100 M 50 70 L 130 70 L 180 120 L 300 120 M 400 100 L 500 200 L 550 200 M 400 120 L 480 200 L 480 250" stroke="#145c2d" stroke-width="4" fill="none"/>
  <path d="M 100 350 L 200 350 L 250 300 L 300 300 M 350 300 L 450 300 L 500 350 L 550 350" stroke="#145c2d" stroke-width="4" fill="none"/>
  <path d="M 300 150 L 300 250 M 320 150 L 320 250 M 340 150 L 340 250 M 360 150 L 360 250 M 380 150 L 380 250" stroke="#145c2d" stroke-width="2" fill="none"/>

  <!-- Vias/Pads -->
  <circle cx="50" cy="50" r="6" fill="#d4af37"/>
  <circle cx="50" cy="70" r="6" fill="#d4af37"/>
  <circle cx="300" cy="100" r="6" fill="#d4af37"/>
  <circle cx="300" cy="120" r="6" fill="#d4af37"/>
  <circle cx="400" cy="100" r="6" fill="#d4af37"/>
  <circle cx="400" cy="120" r="6" fill="#d4af37"/>
  <circle cx="550" cy="200" r="6" fill="#d4af37"/>
  <circle cx="480" cy="250" r="6" fill="#d4af37"/>
  <circle cx="100" cy="350" r="6" fill="#d4af37"/>
  <circle cx="550" cy="350" r="6" fill="#d4af37"/>

  <!-- Main Microcontroller -->
  <rect x="250" y="150" width="100" height="100" fill="#1a1a1a" rx="4"/>
  <text x="300" y="195" font-family="monospace" font-size="12" fill="#aaaaaa" text-anchor="middle">STM32F4</text>
  <text x="300" y="215" font-family="monospace" font-size="10" fill="#666666" text-anchor="middle">ARM Cortex-M4</text>
  <circle cx="265" cy="165" r="3" fill="#333333"/>
  
  <!-- MCU Pins -->
  <g fill="#cccccc">
    <!-- Top -->
    <rect x="260" y="140" width="4" height="10"/>
    <rect x="270" y="140" width="4" height="10"/>
    <rect x="280" y="140" width="4" height="10"/>
    <rect x="290" y="140" width="4" height="10"/>
    <rect x="300" y="140" width="4" height="10"/>
    <rect x="310" y="140" width="4" height="10"/>
    <rect x="320" y="140" width="4" height="10"/>
    <rect x="330" y="140" width="4" height="10"/>
    <!-- Bottom -->
    <rect x="260" y="250" width="4" height="10"/>
    <rect x="270" y="250" width="4" height="10"/>
    <rect x="280" y="250" width="4" height="10"/>
    <rect x="290" y="250" width="4" height="10"/>
    <rect x="300" y="250" width="4" height="10"/>
    <rect x="310" y="250" width="4" height="10"/>
    <rect x="320" y="250" width="4" height="10"/>
    <rect x="330" y="250" width="4" height="10"/>
    <!-- Left -->
    <rect x="240" y="160" width="10" height="4"/>
    <rect x="240" y="170" width="10" height="4"/>
    <rect x="240" y="180" width="10" height="4"/>
    <rect x="240" y="190" width="10" height="4"/>
    <rect x="240" y="200" width="10" height="4"/>
    <rect x="240" y="210" width="10" height="4"/>
    <rect x="240" y="220" width="10" height="4"/>
    <rect x="240" y="230" width="10" height="4"/>
    <!-- Right -->
    <rect x="350" y="160" width="10" height="4"/>
    <rect x="350" y="170" width="10" height="4"/>
    <rect x="350" y="180" width="10" height="4"/>
    <rect x="350" y="190" width="10" height="4"/>
    <rect x="350" y="200" width="10" height="4"/>
    <rect x="350" y="210" width="10" height="4"/>
    <rect x="350" y="220" width="10" height="4"/>
    <rect x="350" y="230" width="10" height="4"/>
  </g>

  <!-- Other ICs -->
  <rect x="100" y="200" width="40" height="60" fill="#1a1a1a" rx="2"/>
  <text x="120" y="235" font-family="monospace" font-size="10" fill="#888888" text-anchor="middle" transform="rotate(-90 120 235)">FLASH</text>
  
  <rect x="450" y="80" width="60" height="40" fill="#1a1a1a" rx="2"/>
  <text x="480" y="105" font-family="monospace" font-size="10" fill="#888888" text-anchor="middle">LDO 3.3V</text>

  <!-- Connectors -->
  <rect x="20" y="150" width="20" height="100" fill="#333333"/>
  <rect x="25" y="160" width="10" height="80" fill="#111111"/>
  <circle cx="30" cy="170" r="2" fill="#cccccc"/>
  <circle cx="30" cy="190" r="2" fill="#cccccc"/>
  <circle cx="30" cy="210" r="2" fill="#cccccc"/>
  <circle cx="30" cy="230" r="2" fill="#cccccc"/>

  <!-- Capacitors / Resistors (SMD) -->
  <rect x="200" y="120" width="12" height="6" fill="#8b5a2b"/>
  <rect x="200" y="135" width="12" height="6" fill="#8b5a2b"/>
  <rect x="380" y="120" width="12" height="6" fill="#8b5a2b"/>
  <rect x="220" y="270" width="6" height="12" fill="#222222"/>
  <rect x="235" y="270" width="6" height="12" fill="#222222"/>

  <!-- Electrolytic Capacitors -->
  <circle cx="450" cy="300" r="15" fill="#111111" stroke="#cccccc" stroke-width="2"/>
  <path d="M 440 300 L 460 300" stroke="#ffffff" stroke-width="2"/>
  <circle cx="500" cy="300" r="15" fill="#111111" stroke="#cccccc" stroke-width="2"/>
  <path d="M 490 300 L 510 300" stroke="#ffffff" stroke-width="2"/>

  <!-- Inductor -->
  <rect x="440" y="150" width="30" height="30" fill="#444444" rx="4"/>
  <circle cx="455" cy="165" r="10" fill="#333333"/>

  <!-- Silkscreen Text -->
  <text x="50" y="380" font-family="sans-serif" font-size="14" fill="#ffffff" font-weight="bold">SCHNEIDER ELECTRIC</text>
  <text x="50" y="395" font-family="sans-serif" font-size="10" fill="#ffffff">REV 2.1 - 2026</text>
</svg>`;

export const SAMPLE_PANEL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800" style="background-color:#f0f0f0;">
  <rect width="600" height="800" fill="#f0f0f0"/>
  
  <!-- Enclosure -->
  <rect x="50" y="50" width="500" height="700" fill="#e0e0e0" stroke="#cccccc" stroke-width="4" rx="8"/>
  
  <!-- DIN Rails -->
  <rect x="80" y="150" width="440" height="20" fill="#d0d0d0" stroke="#999999" stroke-width="2"/>
  <rect x="80" y="300" width="440" height="20" fill="#d0d0d0" stroke="#999999" stroke-width="2"/>
  <rect x="80" y="450" width="440" height="20" fill="#d0d0d0" stroke="#999999" stroke-width="2"/>
  <rect x="80" y="600" width="440" height="20" fill="#d0d0d0" stroke="#999999" stroke-width="2"/>

  <!-- Row 1: Main Breaker & RCCB -->
  <!-- Main Breaker (4 Pole) -->
  <rect x="100" y="110" width="80" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="2" rx="4"/>
  <rect x="100" y="140" width="80" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
  <rect x="110" y="150" width="10" height="20" fill="#ff4444" rx="2"/>
  <text x="140" y="130" font-family="sans-serif" font-size="10" fill="#333">Schneider</text>
  
  <!-- RCCB (4 Pole) -->
  <rect x="200" y="110" width="80" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="2" rx="4"/>
  <rect x="200" y="140" width="80" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
  <rect x="210" y="150" width="10" height="20" fill="#3DCD58" rx="2"/>
  <circle cx="260" cy="185" r="4" fill="#ffff00"/>
  <text x="240" y="130" font-family="sans-serif" font-size="10" fill="#333">Schneider</text>

  <!-- Row 2: MCBs (1 Pole) -->
  <g transform="translate(100, 260)">
    <rect x="0" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="0" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="5" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="0" y="10" width="20" height="5" fill="#3DCD58"/>
    
    <rect x="20" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="20" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="25" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="20" y="10" width="20" height="5" fill="#3DCD58"/>

    <rect x="40" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="40" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="45" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="40" y="10" width="20" height="5" fill="#3DCD58"/>

    <rect x="60" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="60" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="65" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="60" y="10" width="20" height="5" fill="#3DCD58"/>

    <rect x="80" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="80" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="85" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="80" y="10" width="20" height="5" fill="#3DCD58"/>

    <rect x="100" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="100" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="105" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="100" y="10" width="20" height="5" fill="#3DCD58"/>

    <rect x="120" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="120" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="125" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="120" y="10" width="20" height="5" fill="#3DCD58"/>

    <rect x="140" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="140" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="145" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="140" y="10" width="20" height="5" fill="#3DCD58"/>
    
    <rect x="160" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="160" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="165" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="160" y="10" width="20" height="5" fill="#3DCD58"/>

    <rect x="180" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="180" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="185" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="180" y="10" width="20" height="5" fill="#3DCD58"/>

    <rect x="200" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="200" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="205" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="200" y="10" width="20" height="5" fill="#3DCD58"/>

    <rect x="220" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="220" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="225" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="220" y="10" width="20" height="5" fill="#3DCD58"/>
  </g>

  <!-- Row 3: More MCBs -->
  <g transform="translate(100, 410)">
    <rect x="0" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="0" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="5" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="0" y="10" width="20" height="5" fill="#3DCD58"/>
    
    <rect x="20" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="20" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="25" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="20" y="10" width="20" height="5" fill="#3DCD58"/>

    <rect x="40" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="40" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="45" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="40" y="10" width="20" height="5" fill="#3DCD58"/>

    <rect x="60" y="0" width="20" height="100" fill="#ffffff" stroke="#cccccc" stroke-width="1" rx="2"/>
    <rect x="60" y="30" width="20" height="40" fill="#f8f8f8" stroke="#dddddd" stroke-width="1"/>
    <rect x="65" y="40" width="10" height="20" fill="#3DCD58" rx="2"/>
    <rect x="60" y="10" width="20" height="5" fill="#3DCD58"/>
  </g>

  <!-- Row 4: Terminal Blocks & Sockets -->
  <g transform="translate(100, 560)">
    <!-- Terminal Block -->
    <rect x="0" y="0" width="150" height="80" fill="#008000" stroke="#005500" stroke-width="2" rx="4"/>
    <rect x="10" y="10" width="130" height="60" fill="#006600"/>
    <circle cx="20" cy="20" r="3" fill="#ffffff"/>
    <circle cx="40" cy="20" r="3" fill="#ffffff"/>
    <circle cx="60" cy="20" r="3" fill="#ffffff"/>
    <circle cx="80" cy="20" r="3" fill="#ffffff"/>
    <circle cx="100" cy="20" r="3" fill="#ffffff"/>
    <circle cx="120" cy="20" r="3" fill="#ffffff"/>
    <circle cx="20" cy="60" r="3" fill="#ffffff"/>
    <circle cx="40" cy="60" r="3" fill="#ffffff"/>
    <circle cx="60" cy="60" r="3" fill="#ffffff"/>
    <circle cx="80" cy="60" r="3" fill="#ffffff"/>
    <circle cx="100" cy="60" r="3" fill="#ffffff"/>
    <circle cx="120" cy="60" r="3" fill="#ffffff"/>

    <!-- Schuko Sockets -->
    <rect x="180" y="0" width="50" height="80" fill="#ffffff" stroke="#cccccc" stroke-width="2" rx="4"/>
    <circle cx="205" cy="40" r="18" fill="#eeeeee" stroke="#dddddd" stroke-width="2"/>
    <circle cx="195" cy="40" r="3" fill="#333333"/>
    <circle cx="215" cy="40" r="3" fill="#333333"/>
    <rect x="203" y="22" width="4" height="6" fill="#aaaaaa"/>
    <rect x="203" y="52" width="4" height="6" fill="#aaaaaa"/>

    <rect x="240" y="0" width="50" height="80" fill="#ffffff" stroke="#cccccc" stroke-width="2" rx="4"/>
    <circle cx="265" cy="40" r="18" fill="#eeeeee" stroke="#dddddd" stroke-width="2"/>
    <circle cx="255" cy="40" r="3" fill="#333333"/>
    <circle cx="275" cy="40" r="3" fill="#333333"/>
    <rect x="263" y="22" width="4" height="6" fill="#aaaaaa"/>
    <rect x="263" y="52" width="4" height="6" fill="#aaaaaa"/>
  </g>

  <!-- Wiring (Abstract) -->
  <path d="M 140 210 L 140 240 C 140 250, 110 250, 110 260" stroke="#ff0000" stroke-width="3" fill="none"/>
  <path d="M 160 210 L 160 240 C 160 250, 130 250, 130 260" stroke="#0000ff" stroke-width="3" fill="none"/>
  <path d="M 180 210 L 180 240 C 180 250, 150 250, 150 260" stroke="#000000" stroke-width="3" fill="none"/>
  
  <path d="M 240 210 L 240 240 C 240 250, 170 250, 170 260" stroke="#ff0000" stroke-width="3" fill="none"/>
  <path d="M 260 210 L 260 240 C 260 250, 190 250, 190 260" stroke="#0000ff" stroke-width="3" fill="none"/>
  
  <path d="M 110 360 L 110 390 C 110 400, 110 400, 110 410" stroke="#ff0000" stroke-width="3" fill="none"/>
  <path d="M 130 360 L 130 390 C 130 400, 130 400, 130 410" stroke="#0000ff" stroke-width="3" fill="none"/>
  
</svg>`;
