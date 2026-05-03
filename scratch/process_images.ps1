Add-Type -AssemblyName System.Drawing

$sourceDir = "c:\Users\MS\Desktop\travelmorocco\Selection"
$destDir = "c:\Users\MS\Desktop\travelmorocco\public\images\tours"
$targetWidth = 1200
$targetHeight = 800

if (-not (Test-Path $destDir)) {
    New-Item -ItemType Directory -Path $destDir | Out-Null
}

$files = Get-ChildItem -Path $sourceDir -Filter "*.jpg"

foreach ($file in $files) {
    # 1. Generate Clean Name
    $newName = $file.BaseName
    $newName = $newName -replace '^\d+-', '' # Remove leading numbers
    $newName = $newName -replace '\s*stock photo\s*$', '' # Remove trailing stock photo text
    $newName = $newName -replace '[^\w\s-]', '' # Remove special chars
    $newName = $newName.Trim().ToLower() -replace '\s+', '-' # Lowercase and kebab-case
    $newFilePath = Join-Path $destDir "$newName.jpg"

    Write-Host "Processing: $($file.Name) -> $newName.jpg"

    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        
        # Calculate aspect ratio cropping
        $srcWidth = $img.Width
        $srcHeight = $img.Height
        $srcRatio = $srcWidth / $srcHeight
        $targetRatio = $targetWidth / $targetHeight

        $cropWidth = $srcWidth
        $cropHeight = $srcHeight
        $cropX = 0
        $cropY = 0

        if ($srcRatio -gt $targetRatio) {
            # Source is wider than target
            $cropWidth = [int]($srcHeight * $targetRatio)
            $cropX = [int](($srcWidth - $cropWidth) / 2)
        } else {
            # Source is taller than target
            $cropHeight = [int]($srcWidth / $targetRatio)
            $cropY = [int](($srcHeight - $cropHeight) / 2)
        }

        # Create new bitmap for resized/cropped image
        $bmp = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
        $graph = [System.Drawing.Graphics]::FromImage($bmp)
        
        $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graph.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graph.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graph.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

        $destRect = New-Object System.Drawing.Rectangle(0, 0, $targetWidth, $targetHeight)
        $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropWidth, $cropHeight)

        $graph.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

        # Save with high quality
        $bmp.Save($newFilePath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

        $graph.Dispose()
        $bmp.Dispose()
        $img.Dispose()
    } catch {
        Write-Error "Failed to process $($file.Name): $_"
    }
}

Write-Host "Processing complete. Deleting original folder..."
# Remove-Item -Path $sourceDir -Recurse -Force # Uncommenting this will delete the folder
