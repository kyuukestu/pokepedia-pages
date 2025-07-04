const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment...');

try {
  // Build the project
  console.log('📦 Building project...');
  execSync('bun run build', { stdio: 'inherit' });
  
  // Copy index.html to 404.html for SPA routing
  console.log('📄 Copying index.html to 404.html...');
  fs.copyFileSync('dist/index.html', 'dist/404.html');
  
  // Create a temporary directory with a shorter path
  const tempDir = 'C:\\temp\\pokepedia-deploy';
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });
  
  // Copy dist contents to temp directory
  console.log('📋 Copying files to temporary location...');
  execSync(`xcopy "dist\\*" "${tempDir}\\" /E /I /Y`, { stdio: 'inherit' });
  
  // Change to temp directory
  process.chdir(tempDir);
  
  // Initialize git repository
  console.log('🔧 Initializing git repository...');
  execSync('git init', { stdio: 'inherit' });
  execSync('git remote add origin https://github.com/kyuukestu/pokepedia-pages.git', { stdio: 'inherit' });
  
  // Add all files and commit
  console.log('📝 Adding files to git...');
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "deploy"', { stdio: 'inherit' });
  
  // Force push to gh-pages branch
  console.log('🚀 Pushing to gh-pages branch...');
  execSync('git push origin HEAD:gh-pages --force', { stdio: 'inherit' });
  
  console.log('✅ Deployment successful!');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
} finally {
  // Clean up temp directory
  const tempDir = 'C:\\temp\\pokepedia-deploy';
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
} 