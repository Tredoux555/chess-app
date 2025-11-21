const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

console.log('Testing MongoDB connection...');
console.log('Connection string (password hidden):', MONGODB_URI?.replace(/:[^:@]+@/, ':****@'));

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
})
  .then(() => {
    console.log('✅ Successfully connected to MongoDB!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.error('\n💡 This means your username or password is incorrect.');
      console.error('Please check:');
      console.error('1. Go to MongoDB Atlas → Database Access');
      console.error('2. Verify your username and password');
      console.error('3. Make sure the password doesn\'t have special characters that need encoding');
      console.error('4. Try resetting the password in MongoDB Atlas');
    } else if (error.message.includes('IP')) {
      console.error('\n💡 This means your IP is not whitelisted.');
      console.error('Go to MongoDB Atlas → Network Access → Allow Access from Anywhere');
    }
    
    process.exit(1);
  });


