# Sitio web — Diseño Guaro

Sitio estático (HTML + CSS + JS, sin dependencias) para **disenoguaro.com**.

## Estructura

```
site/
  index.html
  assets/
    css/style.css
    js/main.js
    img/            → logos y favicon
    portfolio/      → imágenes de la galería "Fotos"
```

## Publicar en cPanel (BanaHosting)

1. Entra a **cPanel → Administrador de archivos**.
2. Abre la carpeta **`public_html`**.
3. Sube el archivo **`disenoguaro-web.zip`** (botón *Cargar*).
4. Selecciónalo → clic derecho → **Extraer**.
5. Mueve el **contenido de la carpeta `site/`** (no la carpeta, sino lo que está adentro:
   `index.html` y `assets/`) directamente dentro de `public_html`.
6. Borra el zip y la carpeta `site` vacía.
7. Abre `https://disenoguaro.com` — listo.

> Si `public_html` ya tiene un `index.html` de prueba, bórralo antes.

## Editar contenido

- **Servicios / textos:** en `site/index.html`.
- **Productos:** lista `PRODUCTS` en `site/assets/js/main.js`.
- **Galería de fotos:** lista `GALLERY` en `site/assets/js/main.js` + archivos en `site/assets/portfolio/`.
- **WhatsApp / correo:** buscar `18293768157` y `info@disenoguaro.com` en `index.html` y `main.js`.

## Datos del sitio

- WhatsApp: +1 829 376 8157
- Correo: info@disenoguaro.com
- Marca: Diseño Guaro SRL — Santo Domingo, RD
