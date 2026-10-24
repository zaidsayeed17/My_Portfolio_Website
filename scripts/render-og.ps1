
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

$bmp.Save('C:\\PORTFOLIO\\public\\og-image.png', [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
Write-Output "Generated OG Image: C:\\PORTFOLIO\\public\\og-image.png"

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

$iconBmp.Save('C:\\PORTFOLIO\\public\\apple-touch-icon.png', [System.Drawing.Imaging.ImageFormat]::Png)
$gi.Dispose()
$iconBmp.Dispose()
Write-Output "Generated Apple Touch Icon: C:\\PORTFOLIO\\public\\apple-touch-icon.png"
