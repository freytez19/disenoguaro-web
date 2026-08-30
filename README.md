# Sitio web — Diseño Guaro

Sitio estático (HTML + CSS + JS, sin dependencias) para **disenoguaro.com**.

## Estructura

```
site/
  index.html         → portada (con calculadora de precios flotante)
  trabajos.html      → segunda página: videos de trabajos
  assets/
    css/style.css
    js/main.js
    img/             → logos y favicon
    video/           → 10 videos .mp4 + su poster .jpg
```

## Publicar en cPanel (BanaHosting) — en 2 partes

El sitio pesa ~43 MB por los videos, así que se sube en dos zips.

### Parte 1 — el sitio (0.6 MB)
1. cPanel → **Administrador de archivos** → carpeta **`public_html`**.
2. Si hay un `index.html` de prueba de BanaHosting, bórralo.
3. Botón **Cargar** → sube **`disenoguaro-sitio.zip`**.
4. En `public_html`, clic derecho en el zip → **Extraer**. Borra el zip.
   Ya quedan `index.html`, `trabajos.html` y la carpeta `assets/`.

### Parte 2 — los videos (~43 MB)
1. En el Administrador de archivos, entra a **`public_html/assets/video`**
   (ya existe, con los `.jpg`).
2. Botón **Cargar** → sube **`disenoguaro-videos.zip`**.
3. Clic derecho → **Extraer**. Borra el zip.
   Deben quedar los 10 `.mp4` junto a los `.jpg`.

> Si el zip de 43 MB no sube (límite del servidor), sube los 10 `.mp4`
> directamente (uno por uno o en tandas) a esa misma carpeta.

### Listo
Abre `https://disenoguaro.com` y `https://disenoguaro.com/trabajos.html`.

## Editar contenido

- **Textos de la portada / servicios:** `site/index.html`.
- **Productos:** lista `PRODUCTS` en `site/assets/js/main.js`.
- **Tarifas de la calculadora:** objeto `RATES` en `site/assets/js/main.js`.
- **Videos de trabajos:** `site/trabajos.html` (títulos y orden) + archivos en
  `site/assets/video/` (cada video necesita `nombre.mp4` y su `nombre.jpg`).
- **WhatsApp / correo:** buscar `18293768157` y `info@disenoguaro.com`.

## Datos del sitio

- WhatsApp: +1 829 376 8157
- Correo: info@disenoguaro.com
- Instagram: @disenoguaro
- Marca: Diseño Guaro SRL — Santo Domingo, RD
