# Generate NEXTAUTH_SECRET for deployment
Write-Host "Generating NEXTAUTH_SECRET..." -ForegroundColor Green
$secret = [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
Write-Host ""
Write-Host "Your NEXTAUTH_SECRET:" -ForegroundColor Yellow
Write-Host $secret -ForegroundColor Cyan
Write-Host ""
Write-Host "Copy this and use it in Railway environment variables!" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to exit"

