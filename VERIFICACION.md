# Verificación de la revisión OSH

Fecha de revisión: 8 de noviembre de 2026.

## Comprobaciones aprobadas

- Comparación contra el commit de origen: todos los nodos de texto visibles originales permanecen; los cinco conjuntos de datos interactivos conservan su contenido exacto.
- SHA-256: 18 archivos originales y 30 recursos binarios extraídos coinciden exactamente con sus fuentes.
- HTML: 165 IDs únicos; referencias ARIA válidas; rutas locales presentes; ningún enlace vacío `#`; todas las imágenes tienen texto alternativo.
- Indexación: robots.txt y sitemap.xml válidos, con una única URL pública de portada, concordantes con CNAME y canonical https://oshsystems.com/. Sin fechas lastmod inventadas. No se solicitó indexación a Google desde esta revisión local.
- JavaScript: sintaxis válida de ambos archivos, sin errores de la página en la consola del navegador durante las pruebas.
- Navegador: descarga real de los 12 PDFs de la biblioteca, con SHA-256 idéntico al archivo previsto. El BMP original conserva enlace y bytes y se verificó estáticamente.
- Biblioteca: búsqueda RISC-V, búsqueda sin coincidencias, filtro de control (5 informes), restablecimiento (12 informes), apertura de descarga nativa.
- Diseño: comprobación visual de escritorio y marcos móviles de 390 y 320 píxeles; sin desbordamiento horizontal en las anchuras probadas.
- Interacciones: menú móvil, Escape, cierre tras navegar, foco del salto a contenido, pestañas con flechas, apertura y cierre de fotografías, navegación a secciones plegadas, historial Atrás/Adelante.
- Contacto: se mantiene mailto y el botón solo se habilita después de registrar el controlador que evita un envío HTML predeterminado. No se enviaron correos ni se completaron datos personales durante las pruebas.

## Límites

La reducción del 99,1 % corresponde exclusivamente a los bytes del documento HTML. No se presenta como una puntuación Lighthouse, una mejora medida de tiempo de carga ni una reducción equivalente del sitio completo. No se realizó una auditoría formal WCAG ni pruebas en dispositivos físicos, Safari o Firefox. La reproducción completa del video y las mediciones científicas no se volvieron a validar. Estas comprobaciones describen la revisión previa a publicación. El resultado del despliegue corresponde al historial de GitHub Actions del commit publicado.

La revisión técnica es de la página y de la conservación de sus archivos; no constituye certificación independiente de las afirmaciones científicas de los informes.
