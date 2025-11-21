const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🔧 MongoDB Setup Helper\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found. Please run the setup first.');
  process.exit(1);
}

// Read current .env.local
let envContent = fs.readFileSync(envPath, 'utf8');

console.log('📋 Current MongoDB Configuration:');
const mongoMatch = envContent.match(/MONGODB_URI=(.+)/);
if (mongoMatch) {
  console.log(`   ${mongoMatch[1]}\n`);
}

console.log('🌐 Setting up MongoDB Atlas (Cloud - Recommended)...\n');
console.log('Please follow these steps:');
console.log('1. Open: https://www.mongodb.com/cloud/atlas/register');
console.log('2. Sign up for a free account');
console.log('3. Create a free cluster (M0)');
console.log('4. Create a database user (Database Access)');
console.log('5. Whitelist your IP (Network Access - Allow from anywhere for dev)');
console.log('6. Get your connection string (Database > Connect > Connect your application)');
console.log('\n💡 Quick Setup Guide:');
console.log('   - Cluster: Choose FREE tier, any region');
console.log('   - Database User: Username/password (save these!)');
console.log('   - Network: Click "Allow Access from Anywhere"');
console.log('   - Connection: Copy the connection string');
console.log('\n📝 Your connection string should look like:');
console.log('   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/chess-app?retryWrites=true&w=majority');
console.log('\n⏳ Once you have your connection string, I can help you update .env.local');
console.log('\n💻 Alternative: Use local MongoDB');
console.log('   If you prefer local MongoDB, make sure it\'s installed and running.');
console.log('   Then update MONGODB_URI in .env.local to: mongodb://localhost:27017/chess-app\n');

// Function to update .env.local with new MongoDB URI
function updateMongoURI(newURI) {
  const updatedContent = envContent.replace(
    /MONGODB_URI=.*/,
    `MONGODB_URI=${newURI}`
  );
  fs.writeFileSync(envPath, updatedContent, 'utf8');
  console.log('✅ Updated .env.local with new MongoDB URI!');
  console.log('🔄 Please restart your server for changes to take effect.\n');
}

// Check command line arguments
const args = process.argv.slice(2);
if (args[0] === 'update' && args[1]) {
  updateMongoURI(args[1]);
  process.exit(0);
}

console.log('💡 To update your MongoDB URI, run:');
console.log('   node setup-mongodb.js update "your-connection-string-here"\n');


