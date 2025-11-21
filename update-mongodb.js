const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 MongoDB Connection String Updater\n');

const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  process.exit(1);
}

function updateMongoURI(connectionString) {
  // Validate connection string format
  if (!connectionString.includes('mongodb')) {
    console.log('❌ Invalid connection string. Must start with mongodb:// or mongodb+srv://');
    return false;
  }

  // Ensure database name is included
  let updatedURI = connectionString.trim();
  
  // If it's an Atlas connection string and doesn't have database name
  if (updatedURI.includes('mongodb+srv://') && !updatedURI.includes('/chess-app')) {
    // Add database name before query parameters
    if (updatedURI.includes('?')) {
      updatedURI = updatedURI.replace('?', '/chess-app?');
    } else {
      updatedURI = updatedURI.replace(/\/$/, '') + '/chess-app';
    }
  } else if (updatedURI.includes('mongodb://') && !updatedURI.includes('/chess-app')) {
    // For local MongoDB
    if (updatedURI.endsWith('/')) {
      updatedURI = updatedURI + 'chess-app';
    } else if (!updatedURI.match(/\/[^?]+(\?|$)/)) {
      updatedURI = updatedURI.replace(/\/?(\?|$)/, '/chess-app$1');
    }
  }

  // Read current .env.local
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Update MONGODB_URI
  const updatedContent = envContent.replace(
    /MONGODB_URI=.*/,
    `MONGODB_URI=${updatedURI}`
  );
  
  // Write back
  fs.writeFileSync(envPath, updatedContent, 'utf8');
  
  console.log('✅ Successfully updated .env.local!');
  console.log(`📝 New MongoDB URI: ${updatedURI}\n`);
  console.log('🔄 Please restart your server for changes to take effect.');
  console.log('   Run: node server.js\n');
  
  return true;
}

// Check if connection string provided as argument
const args = process.argv.slice(2);
if (args.length > 0) {
  const connectionString = args.join(' ');
  if (updateMongoURI(connectionString)) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

// Interactive mode
console.log('📋 Please provide your MongoDB connection string.');
console.log('   Example: mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority\n');
console.log('💡 You can also run: node update-mongodb.js "your-connection-string"\n');

rl.question('Enter connection string: ', (answer) => {
  if (answer.trim()) {
    if (updateMongoURI(answer)) {
      console.log('\n✨ Setup complete! Your app is ready to use.');
    }
  } else {
    console.log('\n❌ No connection string provided.');
  }
  rl.close();
});


