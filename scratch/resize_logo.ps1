Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("c:\Users\MS\Desktop\travelmorocco\public\logo_opt.png")
$bmp = New-Object System.Drawing.Bitmap(320, [int]($img.Height * (320 / $img.Width)))
$graph = [System.Drawing.Graphics]::FromImage($bmp)
$graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graph.DrawImage($img, 0, 0, $bmp.Width, $bmp.Height)
$bmp.Save("c:\Users\MS\Desktop\travelmorocco\public\logo_tiny.png", [System.Drawing.Imaging.ImageFormat]::Png)
$graph.Dispose()
$bmp.Dispose()
$img.Dispose()
