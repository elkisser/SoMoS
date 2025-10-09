// Utilidad para aplicar zoom automático en resoluciones pequeñas
export function initAutoZoom() {
  function applyAutoZoom() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Si la resolución es igual o menor a 1368x768, aplicar zoom del 80%
    if (width <= 1368 && height <= 768) {
      document.body.style.zoom = '0.8';
      console.log('Zoom automático aplicado: 80% para resolución', width + 'x' + height);
    } else {
      document.body.style.zoom = '1';
      console.log('Zoom normal: 100% para resolución', width + 'x' + height);
    }
  }

  // Aplicar zoom al cargar la página
  document.addEventListener('DOMContentLoaded', applyAutoZoom);
  
  // Aplicar zoom al redimensionar la ventana
  window.addEventListener('resize', applyAutoZoom);
  
  // Aplicar zoom inmediatamente (por si el DOM ya está cargado)
  applyAutoZoom();
}

// Auto-inicializar si se importa como script
if (typeof window !== 'undefined') {
  initAutoZoom();
}