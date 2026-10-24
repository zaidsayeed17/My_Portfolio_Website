/**
 * generate-og-image.js
 * Generates:
 * - public/og-image.svg (1200x630)
 * - public/og-image.png (1200x630)
 * - public/favicon.svg
 * - public/apple-touch-icon.png (180x180)
 * Colors: Espresso (#2B1D17), Cream (#F7F0E6), Sand (#EFE3D3), Terracotta (#C65D2E)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Create clean OG SVG version
const svgContent = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="1200" height="630" fill="#2B1D17"/>
  
  <!-- Subtle warm glow in corner -->
  <circle cx="1050" cy="150" r="300" fill="#C65D2E" opacity="0.08"/>
  <circle cx="150" cy="500" r="250" fill="#C65D2E" opacity="0.05"/>

  <!-- Inset Border -->
  <rect x="40" y="40" width="1120" height="550" rx="20" fill="none" stroke="#3E2A20" stroke-width="2"/>
  
  <!-- Monogram Box -->
  <rect x="100" y="100" width="70" height="70" rx="14" fill="#35241C" stroke="#C65D2E" stroke-width="2"/>
  <text x="135" y="145" font-family="Georgia, serif" font-size="24" font-weight="bold" fill="#C65D2E" text-anchor="middle" dominant-baseline="middle">MZS</text>
  
  <!-- Badge Category -->
  <text x="190" y="140" font-family="Arial, sans-serif" font-size="14" font-weight="600" letter-spacing="3" fill="#EFE3D3">PORTFOLIO · AI &amp; DATA SCIENCE</text>
  
  <!-- Author Name (Serif) -->
  <text x="100" y="270" font-family="'Playfair Display', Georgia, serif" font-size="68" font-weight="bold" fill="#F7F0E6">Mohammad Zaid Sayeed</text>
  
  <!-- Terracotta Headline -->
  <text x="100" y="345" font-family="'Playfair Display', Georgia, serif" font-size="36" font-style="italic" fill="#C65D2E">Building Intelligent Applications with AI</text>
  
  <!-- Description / Subline -->
  <text x="100" y="420" font-family="Arial, sans-serif" font-size="22" fill="#EFE3D3" opacity="0.85">AI &amp; Data Science Student · AI-Assisted Developer</text>
  
  <!-- Domain Tags -->
  <g transform="translate(100, 485)">
    <rect x="0" y="0" width="160" height="38" rx="19" fill="#35241C" stroke="#C65D2E" stroke-opacity="0.3"/>
    <text x="80" y="24" font-family="Arial, sans-serif" font-size="14" font-weight="500" fill="#EFE3D3" text-anchor="middle">AI Applications</text>

    <rect x="175" y="0" width="175" height="38" rx="19" fill="#35241C" stroke="#C65D2E" stroke-opacity="0.3"/>
    <text x="262" y="24" font-family="Arial, sans-serif" font-size="14" font-weight="500" fill="#EFE3D3" text-anchor="middle">Machine Learning</text>

    <rect x="365" y="0" width="155" height="38" rx="19" fill="#35241C" stroke="#C65D2E" stroke-opacity="0.3"/>
    <text x="442" y="24" font-family="Arial, sans-serif" font-size="14" font-weight="500" fill="#EFE3D3" text-anchor="middle">Data Analytics</text>
    
    <rect x="535" y="0" width="175" height="38" rx="19" fill="#35241C" stroke="#C65D2E" stroke-opacity="0.3"/>
    <text x="622" y="24" font-family="Arial, sans-serif" font-size="14" font-weight="500" fill="#EFE3D3" text-anchor="middle">Business Software</text>
  </g>
</svg>`;

const svgPath = path.join(publicDir, 'og-image.svg');
fs.writeFileSync(svgPath, svgContent, 'utf-8');
console.log('Created:', svgPath);

// 2. Create favicon.svg
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#2B1D17"/>
  <rect x="2" y="2" width="60" height="60" rx="12" fill="none" stroke="#C65D2E" stroke-width="1.5" stroke-opacity="0.4"/>
  <text x="32" y="40" font-family="Georgia, serif" font-size="22" font-weight="bold" fill="#C65D2E" text-anchor="middle">MZS</text>
</svg>`;
const faviconPath = path.join(publicDir, 'favicon.svg');
fs.writeFileSync(faviconPath, faviconSvg, 'utf-8');
console.log('Created:', faviconPath);

// 3. Generate PNGs using PowerShell System.Drawing with explicit type casting
const pngPath = path.resolve(publicDir, 'og-image.png').replace(/\\/g, '\\\\');
const touchIconPath = path.resolve(publicDir, 'apple-touch-icon.png').replace(/\\/g, '\\\\');

const psScript = `
Add-Type -AssemblyName System.Drawing

# --- Generate OG Image (1200x630) ---
$bmp = New-Object System.Drawing.Bitmap 1200, 630
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Background
$bgBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#2B1D17'))
$g.FillRectangle($bgBrush, 0, 0, 1200, 630)

# Border
$borderPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml('#3E2A20'), [single]2)
$g.DrawRectangle($borderPen, 40, 40, 1120, 550)

# Monogram Box
$boxBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#35241C'))
$boxPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml('#C65D2E'), [single]2)
$g.FillRectangle($boxBrush, 100, 100, 70, 70)
$g.DrawRectangle($boxPen, 100, 100, 70, 70)

# Monogram Text
$monoFont = [System.Drawing.Font]::new('Georgia', [single]20, [System.Drawing.FontStyle]::Bold)
$tcBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#C65D2E'))
$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center
$g.DrawString('MZS', $monoFont, $tcBrush, [System.Drawing.RectangleF]::new(100, 100, 70, 70), $sf)

# Tagline
$tagFont = [System.Drawing.Font]::new('Arial', [single]11, [System.Drawing.FontStyle]::Bold)
$sandBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#EFE3D3'))
$g.DrawString('PORTFOLIO  ·  AI & DATA SCIENCE', $tagFont, $sandBrush, [single]195, [single]126)

# Name
$nameFont = [System.Drawing.Font]::new('Georgia', [single]48, [System.Drawing.FontStyle]::Bold)
$creamBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#F7F0E6'))
$g.DrawString('Mohammad Zaid Sayeed', $nameFont, $creamBrush, [single]100, [single]215)

# Headline
$headFont = [System.Drawing.Font]::new('Georgia', [single]26, [System.Drawing.FontStyle]::Italic)
$g.DrawString('Building Intelligent Applications with AI', $headFont, $tcBrush, [single]100, [single]315)

# Subline
$subFont = [System.Drawing.Font]::new('Arial', [single]16, [System.Drawing.FontStyle]::Regular)
$g.DrawString('AI & Data Science Student  ·  AI-Assisted Developer', $subFont, $sandBrush, [single]100, [single]385)

# Pills
$tagPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml('#C65D2E'), [single]1)
$pills = @('AI Applications', 'Machine Learning', 'Data Analytics', 'Business Software')
$x = 100.0
$pillFont = [System.Drawing.Font]::new('Arial', [single]11, [System.Drawing.FontStyle]::Regular)
foreach ($pill in $pills) {
  $size = $g.MeasureString($pill, $pillFont)
  $w = $size.Width + 30
  $g.FillRectangle($boxBrush, [single]$x, [single]465, [single]$w, [single]36)
  $g.DrawRectangle($tagPen, [single]$x, [single]465, [single]$w, [single]36)
  $g.DrawString($pill, $pillFont, $sandBrush, [single]($x + 15), [single]473)
  $x += ($w + 18)
}

$bmp.Save('${pngPath}', [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
Write-Output "Generated OG Image: ${pngPath}"

# --- Generate Apple Touch Icon (180x180) ---
$iconBmp = New-Object System.Drawing.Bitmap 180, 180
$gi = [System.Drawing.Graphics]::FromImage($iconBmp)
$gi.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$gi.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

$gi.FillRectangle($bgBrush, 0, 0, 180, 180)
$gi.DrawRectangle($boxPen, 8, 8, 164, 164)

$iconFont = [System.Drawing.Font]::new('Georgia', [single]52, [System.Drawing.FontStyle]::Bold)
$iconSf = New-Object System.Drawing.StringFormat
$iconSf.Alignment = [System.Drawing.StringAlignment]::Center
$iconSf.LineAlignment = [System.Drawing.StringAlignment]::Center
$gi.DrawString('MZS', $iconFont, $tcBrush, [System.Drawing.RectangleF]::new(0, 0, 180, 180), $iconSf)

$iconBmp.Save('${touchIconPath}', [System.Drawing.Imaging.ImageFormat]::Png)
$gi.Dispose()
$iconBmp.Dispose()
Write-Output "Generated Apple Touch Icon: ${touchIconPath}"
`;

const psPath = path.join(__dirname, 'render-og.ps1');
fs.writeFileSync(psPath, psScript, 'utf-8');

try {
  execSync(`powershell -ExecutionPolicy Bypass -File "${psPath}"`, { stdio: 'inherit' });
  console.log('Successfully generated public/og-image.png and public/apple-touch-icon.png');
} catch (err) {
  console.error('Error rendering PNG with PowerShell:', err);
}
