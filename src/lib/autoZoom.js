// Utilidad para aplicar zoom automático en resoluciones pequeñas
export function initAutoZoom() {
  function applyAutoZoom() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Si la resolución es igual o menor a 1368x768, aplicar zoom del 80%
    if (width <= 1368 && height <= 768) {
      // Usar transform scale para mejor compatibilidad cross-browser
      document.body.style.transform = 'scale(0.8)';
      document.body.style.transformOrigin = 'top left';
      document.body.style.width = '125%'; // Compensar el scale
      document.body.style.height = '125%';
      
      // Fallback para navegadores que soportan zoom
      if (document.body.style.zoom !== undefined) {
        document.body.style.zoom = '0.8';
      }
      
      console.log('Zoom automático aplicado: 80% para resolución', width + 'x' + height);
    } else {
      // Resetear estilos
      document.body.style.transform = 'scale(1)';
      document.body.style.transformOrigin = 'top left';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      
      if (document.body.style.zoom !== undefined) {
        document.body.style.zoom = '1';
      }
      
      console.log('Zoom normal: 100% para resolución', width + 'x' + height);
    }
  }

  // Aplicar zoom al cargar la página
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAutoZoom);
  } else {
    applyAutoZoom();
  }
  
  // Aplicar zoom al redimensionar la ventana
  window.addEventListener('resize', applyAutoZoom);
}

// Auto-inicializar si se importa como script
if (typeof window !== 'undefined') {
  initAutoZoom();
}