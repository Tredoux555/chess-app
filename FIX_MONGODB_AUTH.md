# Quick Fix: MongoDB Authentication Error

## The Problem
Your MongoDB username/password is incorrect.

## Quick Solution

### Option 1: Create New Database User (Easiest)

1. Go to MongoDB Atlas → **Database Access**
2. Click **"Add New Database User"**
3. Username: `admin` (or any simple name)
4. Password: Click **"Autogenerate Secure Password"** and **COPY IT**
5. Privileges: **"Atlas admin"**
6. Click **"Add User"**

7. Get your connection string:
   - Go to **Database** → **Connect** → **"Connect your application"**
   - Copy the connection string

8. Update your app:
   ```bash
   node update-mongodb.js "your-new-connection-string-here"
   ```
   (Replace `<password>` with the password you copied)

9. Restart server: `node server.js`

### Option 2: Reset Current User Password

1. Go to MongoDB Atlas → **Database Access**
2. Find your user (`chessuser`)
3. Click the **pencil icon** (edit)
4. Click **"Edit Password"**
5. Generate new password and **COPY IT**
6. Save

7. Update connection string with new password:
   ```bash
   node update-mongodb.js "mongodb+srv://chessuser:NEW_PASSWORD@cluster0.klgvkxy.mongodb.net/chess-app?retryWrites=true&w=majority"
   ```

8. Restart server

---

## After Fixing

Try registering again at: http://localhost:3000/register


