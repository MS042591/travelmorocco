Add-Type -AssemblyName System.Drawing
$imagesToCrunch = @(
    @{ Path = "public\logo_tiny.png"; Width = 180; Quality = 60 },
    @{ Path = "public\images\hero-sahara-opt.png"; Width = 1000; Quality = 60 }
)

$tourImages = Get-ChildItem "public\images\tours\*.webp"

function Resize-Image {
    param($path, $width, $quality)
    $destPath = $path -replace '\.png$', '.jpg' -replace '\.webp$', '_small.webp'
    
    try {
        $img = [System.Drawing.Image]::FromFile((Join-Path (Get-Location) $path))
        $ratio = $width / $img.Width
        $height = [int]($img.Height * $ratio)
        
        $bmp = New-Object System.Drawing.Bitmap($width, $height)
        $graph = [System.Drawing.Graphics]::FromImage($bmp)
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.DrawImage($img, 0, 0, $width, $height)
        
        # Save as JPEG with specific quality since we can't easily do WebP via GDI+
        $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.FormatDescription -eq "JPEG" }
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, $quality)
        
        $finalPath = $path -replace '\.(png|webp)$', '.jpg'
        $bmp.Save((Join-Path (Get-Location) $finalPath), $encoder, $encoderParams)
        
        $graph.Dispose()
        $bmp.Dispose()
        $img.Dispose()
        return $finalPath
    } catch {
        Write-Host "Failed: $path"
    }
}

foreach ($item in $imagesToCrunch) {
    Write-Host "Crunching $($item.Path)..."
    Resize-Image -path $item.Path -width $item.Width -quality $item.Quality
}

# Also crunch the main tour images that were flagged
$flaggedTours = @(
    "the-royal-palace-golden-doors-fez-morocco.webp",
    "marrakech-djemaa-el-fna-square.webp",
    "blue-stairway-with-colourful-flowerpots.webp",
    "morocco-rif-area-chefchaouen-chaouen-town-the-blue-city.webp"
)

foreach ($name in $flaggedTours) {
    $path = "public\images\tours\$name"
    if (Test-Path $path) {
        Write-Host "Crunching Tour: $name..."
        Resize-Image -path $path -width 600 -quality 50
    }
}
