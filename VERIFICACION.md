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

## Revisión adicional de seguridad del navegador

8 de noviembre de 2026. Las siguientes comprobaciones corresponden a la copia de seguridad preparada, no certifican su publicación ni cambios de configuración del alojamiento.

- CSP en HTML antes de los recursos y política `no-referrer`; cero atributos de eventos inline y cero estilos inline. Sin `unsafe-inline`, `unsafe-eval` ni interpretación de HTML en los datos del recorrido.
- `tests/verify_site.py`, `tests/verify_security.py`, sintaxis de ambos JS y `git diff --check`: aprobados.
- Todos los nodos de texto HTML y los cinco conjuntos de datos interactivos permanecen idénticos. Los 18 archivos originales y 30 recursos extraídos conservan sus SHA-256. HTML: 156.649 bytes.
- Chrome, en preview interno: cinco conjuntos de pestañas, búsqueda, filtros, estado vacío, restablecimiento repetido, fotos y menú móvil funcionaron sin violaciones CSP. Marcos de 1440, 390 y 320 píxeles sin desbordamiento horizontal en las pruebas.
- Pruebas negativas en un fixture separado de QA: el navegador bloqueó scripts inline y de otro origen, eventos inline, imagen externa, `fetch`, cambio de URL base y envío HTML de un formulario. Las violaciones de consola de estas pruebas fueron deliberadas; el fixture no forma parte de la web publicada.
- Descarga real desde Chrome de los doce PDFs de la biblioteca: todos coinciden con los SHA-256 conservados. El BMP mantiene ruta y hash; no se repitió su descarga en navegador. El video local inició reproducción, con datos disponibles y sin error de medios; no se revisó su reproducción completa ni se forzó la alternativa externa.
- El formulario conserva su handler `mailto` y habilita el botón tras registrarlo. No se enviaron correos ni se volvió a preparar un borrador con datos personales.

La revisión no valida Safari, Firefox, la configuración de HTTPS obligatorio, cabeceras del servidor, seguridad de la cuenta de GitHub, permisos de colaboradores ni protección de ramas. Consulte SECURITY.md para esos límites.

## Integración de analítica consentida

8 de noviembre de 2026. Esta revisión configura GA4, preferencias y política de privacidad. Se amplía exclusivamente `script-src` para el tag de Google y `connect-src` para los dos endpoints documentados en `ANALYTICS.md`. Se aprobaron integridad, rutas/ARIA, análisis estático, sintaxis y pruebas unitarias de consentimiento. No se completaron las pruebas visuales ni de red de esta nueva interfaz. Los resultados de navegador anteriores de este documento no validan la nueva integración. La recepción de datos por la propiedad real permanece pendiente de comprobación.
