# OSH Global Systems · Web optimizada

Esta revisión mantiene la identidad, información, límites de interpretación, evidencia y archivos originales de la página.

## Qué mejora

- HTML principal: de 17.249.847 a 156.440 bytes (99,1 % menos). Esta cifra compara el HTML, no es una medición de velocidad ni del peso total del sitio.
- PDFs e imágenes separados del HTML y reutilizables por la caché. Los bytes originales están preservados, sin recomprimir las evidencias.
- Los 12 informes tienen enlaces nativos de descarga y apertura; ya no requieren JavaScript ni decodificación de PDFs al cargar.
- Biblioteca con búsqueda, categorías, contador, estado vacío y restablecimiento.
- Menú móvil con cierre mediante Escape, navegación con foco correcto, pestañas accesibles, tablas desplazables por teclado y acceso al inicio.
- robots.txt permite rastreo y apunta al sitemap de la portada pública, sin fechas inventadas ni documentos privados.
- Metadatos para buscadores y enlaces compartidos; imágenes con dimensiones declaradas y carga diferida.
- El formulario continúa preparando un borrador en la aplicación de correo. No envía mensajes ni añade un servicio de captura de datos.

## Contenido conservado

La revisión parte del commit `5c18a2d53578348c82e71464b70900b12b0721a0` del repositorio `vallejosjose964-dot/oshsystems-web`.

Se mantienen los 18 archivos originales adicionales a index.html, todo el texto original y los cinco conjuntos de datos interactivos. Se extrajeron 30 recursos binarios únicos del HTML, con sus hashes registrados en preservation-manifest.json. Algunos archivos embebidos no coincidían con su homónimo en la raíz; esas versiones se conservan separadamente en assets, sin sobrescribir ninguna.

## Validación

Ejecutar desde esta carpeta:

    python3 tests/verify_site.py
    node --check assets/site.js
    node --check assets/enhancements.js

No hay dependencias de compilación ni instalación obligatoria. Para previsualizar en una computadora local puede servirse la carpeta con cualquier servidor estático, por ejemplo `python3 -m http.server 8000`, y abrir `http://localhost:8000`.

Consulte VERIFICACION.md para los resultados y límites de las pruebas.

## Mantenimiento seguro

Para futuras revisiones, trabajar en una rama y ejecutar las comprobaciones antes de publicar. Conservar todos los PDFs, imágenes, CNAME y demo.mp4 originales. El manifiesto permite detectar cambios accidentales en las evidencias.

No se añadió código privado de FARO, dependencias externas, analítica, cookies ni nuevos servicios de terceros. El video conserva su enlace alternativo público preexistente en GitHub.
