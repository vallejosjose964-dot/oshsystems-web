# Seguridad de la página estática

Esta capa reduce riesgos en el navegador. No convierte el sitio en invulnerable, no protege una cuenta de GitHub comprometida y no hace privados los informes públicos.

## Controles incluidos

- Política CSP al principio de `index.html`, antes de los recursos: scripts, estilos e imágenes del mismo origen; sin JavaScript inline ni `eval`.
- Se bloquean conexiones iniciadas por scripts, formularios HTML, objetos, marcos internos, workers y cambios de la URL base. La página no tiene backend de formularios: el contacto sigue preparando un borrador con `mailto`, para revisión del visitante.
- El video local conserva la única excepción de medios externa ya existente: la ruta exacta de `demo.mp4` en el repositorio público de GitHub.
- `no-referrer` evita enviar la URL de esta página como referencia al navegar o cargar recursos.
- Los enlaces que abren otra pestaña mantienen `noopener noreferrer`.
- Los controladores de errores de imagen se ejecutan desde el archivo JS local, no desde atributos HTML. El fallback solo acepta el mismo origen y no repite la misma URL.
- Las medidas del recorrido se construyen con nodos de texto y un elemento de unidad, sin interpretar cadenas como HTML.

No se añadieron dependencias, analítica, cookies, captura remota de datos ni servicios de terceros. Se mantienen todos los contenidos y archivos originales.

## Comprobación antes de cada publicación

Desde la raíz del repositorio:

    python3 tests/verify_site.py
    python3 tests/verify_security.py
    node --check assets/site.js
    node --check assets/enhancements.js

Servir la carpeta por HTTP local para probarla; no usar `file://` como validación de CSP. Revisar pestañas, menú móvil, búsqueda y filtros, fotos, reproducción del video, enlaces PDF y preparación del correo sin enviarlo. La consola no debe mostrar violaciones CSP durante el uso normal. Repetir estas pruebas al añadir un recurso o cambiar su origen.

## Límites y tareas del alojamiento

- La CSP entregada mediante una etiqueta meta no puede aplicar `frame-ancestors`, `sandbox` ni una política de solo reporte. No se añadió una etiqueta que fingiera protección contra el enmarcado por otros sitios.
- La política de esta página no añade cabeceras a PDFs ni a otros archivos servidos directamente. HSTS, `X-Content-Type-Options`, `Permissions-Policy` y protección completa contra el enmarcado requieren configuración real del alojamiento o de un proxy que pueda emitir esas cabeceras.
- Comprobar que GitHub Pages redirija HTTP a HTTPS y revisar `Settings → Pages → Enforce HTTPS`. El funcionamiento de una URL HTTPS por sí solo no demuestra que HTTP esté deshabilitado.
- Revisar autenticación multifactor de GitHub, colaboradores y protección de la rama de publicación con el propietario. No se cambiaron cuentas, permisos, DNS ni ajustes de seguridad del alojamiento en esta revisión.
- El repositorio y los documentos destinados a descarga son públicos. Nunca añadir secretos ni la implementación privada de FARO. Los hashes de conservación detectan cambios frente al manifiesto, pero no sustituyen la seguridad de la cuenta ni una copia de respaldo independiente.

## Fuentes técnicas

- [CSP y limitaciones de entrega mediante meta](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP).
- [La directiva frame-ancestors no se admite en meta](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors).
- [HTTPS en GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).
