# PowerShell deployment script to avoid ENAMETOOLONG error
# This script copies the dist folder to a shorter path and deploys from there

Write-Host "Building project..." -ForegroundColor Green
bun run build

Write-Host "Copying index.html to 404.html..." -ForegroundColor Green
Copy-Item "dist/index.html" "dist/404.html"

# Create a temporary directory with a shorter path
$tempDir = "C:\temp\pokepedia-deploy"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir -Force

Write-Host "Copying dist folder to temporary location..." -ForegroundColor Green
Copy-Item "dist\*" $tempDir -Recurse -Force

# Change to the temporary directory
Set-Location $tempDir

Write-Host "Deploying from temporary location..." -ForegroundColor Green
try {
    # Initialize git if not already done
    if (-not (Test-Path ".git")) {
        git init
        git remote add origin "https://github.com/yourusername/pokepedia-pages.git"
    }
    
    # Add all files
    git add .
    git commit -m "deploy"
    
    # Push to gh-pages branch
    git push origin HEAD:gh-pages --force
    
    Write-Host "Deployment successful!" -ForegroundColor Green
} catch {
    Write-Host "Deployment failed: $($_.Exception.Message)" -ForegroundColor Red
} finally {
    # Clean up
    Set-Location "C:\Users\kyuuk\pokepedia-pages\pokepedia-pages"
    if (Test-Path $tempDir) {
        Remove-Item $tempDir -Recurse -Force
    }
} 