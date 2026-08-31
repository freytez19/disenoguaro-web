# Genera una cotizacion en PDF a partir de un JSON de datos.
#   powershell -File tools\cotizaciones\generar.ps1 -Json tools\cotizaciones\0321.json
# El JSON es el objeto "draft" del cotizador:
#   { "no":321, "fecha":"2026-09-01", "cliente":"...", "rnc":"...", "tel":"...", "dir":"...",
#     "items":[ {"codigo":"","desc":"linea1\nlinea2","cant":10,"precio":1650,"calc":""} ],
#     "obs":"", "tc":"<dejar el texto estandar>" }
param([Parameter(Mandatory=$true)][string]$Json)
$ErrorActionPreference = 'Stop'
$utf8 = New-Object System.Text.UTF8Encoding($false)

$here    = Split-Path -Parent $MyInvocation.MyCommand.Path      # tools\cotizaciones
$tools   = Split-Path -Parent $here                              # tools
$root    = Split-Path -Parent $tools                             # repo
$baseHtml = Join-Path $tools 'cotizador.html'
$logoPng  = Join-Path $root  'site\assets\img\logo-disenoguaro.png'

$html = [System.IO.File]::ReadAllText($baseHtml, $utf8)
$logoUri = 'data:image/png;base64,' + [Convert]::ToBase64String([System.IO.File]::ReadAllBytes($logoPng))
$html = $html.Replace('__LOGO__', $logoUri)

$data = [System.IO.File]::ReadAllText((Resolve-Path $Json), $utf8).Trim()
$obj  = $data | ConvertFrom-Json
$no   = '{0:0000}' -f [int]$obj.no
$cli  = ($obj.cliente -replace '[\\/:*?"<>|]', ' ').Trim()
$cli  = ($cli -replace '(?i)[\s,]+(S\.?R\.?L\.?|S\.?A\.?S\.?|S\.?A\.?|E\.?I\.?R\.?L\.?)\.?\s*$','').Trim()
$name = "Cotizacion $([int]$obj.no) $cli"

$needle = '  var draft = LS.get("dg_cot_draft", null);'
if (-not $html.Contains($needle)) { throw "no se encontro el marcador draft en cotizador.html" }
$html = $html.Replace($needle, "  var draft = $data;")

$work = Join-Path $env:TEMP 'dg_cot'
New-Item -ItemType Directory -Force -Path $work | Out-Null
$tmpHtml = Join-Path $work "$name.html"
[System.IO.File]::WriteAllText($tmpHtml, $html, $utf8)

$desktop = [Environment]::GetFolderPath('Desktop')
$pdfDesk = Join-Path $desktop "$name.pdf"
$htmlDesk = Join-Path $desktop "$name (editable).html"
$pdfRepo = Join-Path $here "$no.pdf"

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" }
$uri = ([Uri]$tmpHtml).AbsoluteUri
& $chrome --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$pdfDesk" $uri *> $null
Start-Sleep -Seconds 2
if (-not (Test-Path $pdfDesk)) { throw "no se genero el PDF" }
Copy-Item $pdfDesk $pdfRepo -Force
Copy-Item $tmpHtml $htmlDesk -Force

"OK  ->  $pdfDesk"
"     ->  $pdfRepo  (copia para el registro)"
"     ->  $htmlDesk  (editable)"
