# Analítica opcional de visitas

Esta revisión configura GA4 para el flujo público `G-9TLWQDVEFQ`, solo cuando el visitante acepta. Ese identificador no es una contraseña ni concede acceso a los informes. El panel de Analytics no se incorpora a la web pública.

## Datos y consentimiento

- Sin carga de Google, `dataLayer` ni pings de analítica antes de aceptar.
- El código propio programa únicamente `page_view` con URL `https://oshsystems.com/`, título fijo y referente vacío. No añade seguimiento de descargas, clics, búsquedas o formularios.
- La librería de GA4 puede generar datos automáticos de primera visita, sesión o participación. Su comportamiento de red real todavía requiere comprobación; no se promete un conteo exacto ni identificación de personas.
- Google Signals, personalización publicitaria y consentimientos publicitarios deshabilitados en el tag. La medición mejorada del flujo debe permanecer desactivada.
- La preferencia se conserva en `osh_analytics_consent_v1` durante 180 días. Las cookies GA se configuran por 180 días sin renovación automática. La retención del servidor es independiente y no se cambia mediante este código.
- Rechazar funciona igual que aceptar para acceder al contenido. Retirar el permiso activa el bloqueo de GA, elimina sus cookies accesibles y recarga para retirar el tag ejecutado. No borra retroactivamente información ya enviada.
- Almacenamiento no disponible o inválido nunca concede consentimiento. Una aceptación explícita sin almacenamiento vale para la página actual.
- Se contemplan cambios entre pestañas y regreso desde BFCache. Solo se activa en `oshsystems.com` y `www.oshsystems.com`, no en previews.
- La política para visitantes está en `privacy.html`, que no ejecuta scripts ni analítica. La elección no modifica los informes, evidencias, archivos o formulario de contacto.

## CSP

Solo la portada añade estas excepciones a la política previa:

- `script-src 'self' https://www.googletagmanager.com/gtag/js`
- `connect-src https://www.google-analytics.com/g/collect https://region1.google-analytics.com/g/collect`

Las demás directivas y `no-referrer` permanecen. Sin comodines, scripts inline, eval, imágenes externas, marcos u objetos. La página de privacidad mantiene la política estricta original. Si el proveedor cambia sus recursos o un navegador requiere otro transporte, se bloquea antes que ampliar la política automáticamente. Cualquier ampliación necesita revisión y autorización específicas.

## Verificación y límites

Pruebas offline aprobadas: integridad SHA-256 de los 18 originales y 30 recursos extraídos, 13 descargas nativas, referencias HTML/ARIA, sintaxis JS, controles estáticos y modelo unitario de consentimiento/rechazo/retiro, persistencia, expiración, almacenamiento bloqueado y cambios entre pestañas.

Ejecutar:

    python3 tests/verify_site.py
    python3 tests/verify_security.py
    node --check assets/analytics.js
    node tests/verify_analytics.cjs

Estas comprobaciones no sustituyen un navegador real. Quedan pendientes comprobación visual de la nueva interfaz, registro completo de solicitudes con la librería real, eventos automáticos, CSP en navegadores concretos y recepción en la propiedad GA. No se afirma que esas etapas hayan pasado. Las cifras excluyen visitantes que no consienten o bloquean analítica y comienzan cuando la integración está activa, sin reconstruir visitas anteriores.
