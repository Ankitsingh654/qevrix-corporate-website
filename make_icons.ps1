Add-Type -AssemblyName System.Drawing

$logoPath = "d:\Qevrix\qevrix_frontend\public\assets\qevrix-logo.png"
$faviconPath = "d:\Qevrix\qevrix_frontend\public\favicon.ico"
$logo192Path = "d:\Qevrix\qevrix_frontend\public\logo192.png"
$logo512Path = "d:\Qevrix\qevrix_frontend\public\logo512.png"

$image = [System.Drawing.Image]::FromFile($logoPath)

function Save-SquareImage {
    param(
        [System.Drawing.Image]$SrcImage,
        [string]$Path,
        [int]$TargetSize
    )
    $bmp = New-Object System.Drawing.Bitmap($TargetSize, $TargetSize)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    
    $ratio = [Math]::Min($TargetSize / $SrcImage.Width, $TargetSize / $SrcImage.Height)
    $newW = [int]($SrcImage.Width * $ratio)
    $newH = [int]($SrcImage.Height * $ratio)
    $posX = [int](($TargetSize - $newW) / 2)
    $posY = [int](($TargetSize - $newH) / 2)
    
    $g.DrawImage($SrcImage, $posX, $posY, $newW, $newH)
    $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

Save-SquareImage -SrcImage $image -Path $logo192Path -TargetSize 192
Save-SquareImage -SrcImage $image -Path $logo512Path -TargetSize 512
Save-SquareImage -SrcImage $image -Path $faviconPath -TargetSize 48

$image.Dispose()
Write-Host "Icons generated successfully."
