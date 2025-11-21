# 🎮 Chess App - Start Here!

## ✅ What's Already Done

- ✅ All dependencies installed
- ✅ Server running on http://localhost:3000
- ✅ Environment variables configured
- ✅ All code ready to go

## 🚀 Final Step: Connect MongoDB (3 minutes)

You need a MongoDB database. Here's the **fastest way**:

### Quick Setup (Choose One):

#### Option 1: MongoDB Atlas (Cloud - Recommended) ⭐
**Best for**: Playing with friends overseas (works from anywhere)

1. **Open**: https://www.mongodb.com/cloud/atlas/register
2. **Sign up** (free account)
3. **Click "Build a Database"** → Choose **FREE** → **Create**
4. **Click "Database Access"** → **Add New User**:
   - Username: `chessuser`
   - Password: Generate and **COPY IT**
   - Click **"Add User"**
5. **Click "Network Access"** → **"Allow Access from Anywhere"** → **Confirm**
6. **Go to "Database"** → **"Connect"** → **"Connect your application"**
7. **Copy the connection string**

8. **Update your app** (run this command with YOUR connection string):
   ```bash
   node update-mongodb.js "mongodb+srv://chessuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority"
   ```
   (Replace `YOUR_PASSWORD` and `cluster0.xxxxx.mongodb.net` with your actual values)

9. **Restart server**: Stop (Ctrl+C) and run `node server.js` again

#### Option 2: Use Setup Script
```bash
node setup-mongodb.js
```
Then follow the instructions.

#### Option 3: Manual Update
Edit `.env.local` and update `MONGODB_URI` with your connection string.

---

## 🎯 After MongoDB is Connected

1. **Open**: http://localhost:3000
2. **Register** your account
3. **Make yourself admin** (see below)
4. **Invite friends** to register
5. **Start playing chess!**

### Making Yourself Admin

After registering, update your user in MongoDB:

**Using MongoDB Atlas:**
1. Go to Atlas dashboard → "Browse Collections"
2. Find `users` collection
3. Find your user (by email)
4. Edit → Change `role: "user"` to `role: "admin"`
5. Update

**Or use this command** (if you have MongoDB CLI):
```bash
mongosh "your-connection-string" --eval 'db.users.updateOne({email:"your-email@example.com"}, {$set:{role:"admin"}})'
```

---

## 📚 Need More Help?

- **Quick Start**: See `QUICK_START.md`
- **Detailed Setup**: See `AUTOMATED_SETUP.md`
- **MongoDB Help**: See `MONGODB_SETUP.md`
- **Full Docs**: See `README.md`

---

## 🎉 You're Almost There!

Just connect MongoDB and you're ready to play! The hardest part (coding) is done. 🚀


