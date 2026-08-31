---
name: cotizacion
description: Genera una cotización formal de Diseño Guaro en PDF (con marca, ITBIS 18%, cuenta de pago) a partir de un RNC y los datos del trabajo que da Manuel. Úsala cuando Manuel pida "haz una cotización", dé un RNC + descripción de un trabajo, o pida modificar una cotización reciente.
---

# Cotización Diseño Guaro

Manuel da un **RNC** + **qué es el trabajo, cantidades y precio**. Tú devuelves la cotización en **PDF** (y un `.html` editable).

## Secuencia

### 1. Número
Consecutivo. El siguiente = 1 + el mayor entre:
- los `NNNN.json` en `tools/cotizaciones/`
- los `Cotizacion NNN *.pdf` en `C:\Users\HP\Desktop\CLIENTES\Yosmanuel\Cotizaciones Formales\`

(La 320 = SOLVEX, ya hecha. La próxima nueva es la **321**.)

### 2. Fecha
La fecha de **hoy** (formato `YYYY-MM-DD` en el JSON; el documento la muestra `DD / MM / YYYY`).

### 3. Investigar el RNC
Consulta: `https://api-dgii.dominicantechnology.com/api/v1/rnc/<rnc-sin-guiones>` (navegador in-app o WebFetch).
- **Existe** → `cliente` = `data.razon_social` tal cual. Si es persona física, usa solo el nombre.
  Busca teléfono/dirección en cotizaciones previas del cliente en `Cotizaciones Formales\` (grep por el nombre); si no hay, deja `tel`/`dir` en `""`.
- **No existe / no encontrado** → dilo a Manuel y pídele el nombre del cliente.
- La web oficial de la DGII NO carga en el navegador in-app: no la intentes, usa la API.

### 4. Renglones
Por cada línea: `codigo` (si Manuel lo da o si aparece en cotización previa del mismo producto; si no, `""`), `desc` (usa `\n` para la 2ª línea), `cant`, `precio` **sin ITBIS**.
El sistema calcula solo: Itbis unitario = precio×0.18, Subtotal = cant×precio, y los totales (SUB-TOTAL, ITBIS 18%, TOTAL).
Si Manuel da medida de material en pulgadas: precio/pie² = banner 70, vinil 70, sticker troquelado 90 (mínimo RD$500), one vision 130. pie² = ancho×alto/144.

### 5. Términos y condiciones — NO CAMBIAR
`tc` siempre exactamente:
```
Para proceder con el trabajo deben abonar el 60% de su totalidad. Cotización válida por 10 días.
Pago: Banco Santa Cruz · Cuenta de Ahorro No. 11312010036226 · DISEÑO GUARO SRL · RNC 132988108
```
(en el JSON van las dos líneas unidas con `\n`). El título del documento ("DISEÑO GUARO SRL" + "RNC 132 988 108") ya está fijo en la plantilla.

### 6. Generar
1. Escribe `tools/cotizaciones/NNNN.json` (con la tool Write, UTF-8) con el objeto:
   ```json
   {"no":321,"fecha":"YYYY-MM-DD","cliente":"...","rnc":"131-XXXXX-X","tel":"","dir":"",
    "items":[{"codigo":"","desc":"...","cant":1,"precio":0,"calc":""}],
    "obs":"",
    "tc":"Para proceder con el trabajo deben abonar el 60% de su totalidad. Cotización válida por 10 días.\nPago: Banco Santa Cruz · Cuenta de Ahorro No. 11312010036226 · DISEÑO GUARO SRL · RNC 132988108"}
   ```
   Nunca pongas acentos literales dentro de un `.ps1`; en `.json` sí (Write escribe UTF-8).
2. Corre:
   ```
   powershell -ExecutionPolicy Bypass -File "tools\cotizaciones\generar.ps1" -Json "tools\cotizaciones\NNNN.json"
   ```
   Chrome escribe a stderr → PowerShell marca `NativeCommandError` aunque el PDF SÍ se crea. Verifica leyendo el PDF resultante.
3. Sale: `Cotizacion NNN CLIENTE.pdf` + `... (editable).html` en el Escritorio, y `tools/cotizaciones/NNNN.pdf` de copia.
4. Añade una línea a `tools/cotizaciones/registro.md`.
5. `git add -A && git commit && git push` (guarda el JSON + la copia PDF + el registro).

### 7. Entregar
`SendUserFile` con el PDF + el `.html` editable. Resume: No., cliente (y si el RNC existía o no), renglones y **TOTAL**. Señala cualquier dato que hayas asumido (código/descripción reusados de una cotización previa, teléfono/dirección, etc.).

## Notas
- La herramienta base es `tools/cotizador.html` (placeholder `__LOGO__`; `generar.ps1` le incrusta el logo de `site/assets/img/logo-disenoguaro.png`). No se despliega con el sitio.
- Formato/plantilla y detalles largos: ver la nota de memoria `project-web-disenoguaro`.
