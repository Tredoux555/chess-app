# 🚀 Deploy Your Chess App to the Web

This guide will help you deploy your chess app to a hosting service so it's accessible from anywhere on the internet.

## 🎯 Recommended Platforms

Since your app uses **Socket.IO** for real-time gameplay, you need a platform that supports **WebSockets**. Here are the best options:

### Option 1: Railway (Recommended - Easiest) ⭐
- ✅ Free tier available
- ✅ Supports WebSockets
- ✅ Easy deployment from GitHub
- ✅ Automatic HTTPS
- ✅ Environment variables management

### Option 2: Render
- ✅ Free tier available
- ✅ Supports WebSockets
- ✅ Easy setup
- ✅ Automatic HTTPS

### Option 3: DigitalOcean App Platform
- ✅ Good performance
- ✅ Supports WebSockets
- 💰 Paid (starts at $5/month)

---

## 📦 Deployment Steps

### Step 1: Prepare Your Code

1. **Make sure your code is in a Git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub:**
   - Create a new repository on GitHub
   - Push your code:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
     git push -u origin main
     ```

### Step 2: Update Environment Variables

Before deploying, make sure you have these environment variables ready:

- `MONGODB_URI` - Your MongoDB Atlas connection string
- `NEXTAUTH_SECRET` - A random secret (generate one: `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Your website URL (e.g., `https://your-app.railway.app`)
- `NEXT_PUBLIC_SOCKET_URL` - Same as NEXTAUTH_URL

---

## 🚂 Railway Deployment (Recommended)

### Step 1: Sign Up
1. Go to https://railway.app
2. Sign up with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

### Step 3: Configure Environment Variables
1. Go to your project → "Variables"
2. Add these variables:
   ```
   MONGODB_URI=mongodb+srv://admin:Angel12345@cluster0.klgvkxy.mongodb.net/chess-app?appName=Cluster0
   NEXTAUTH_SECRET=your-secret-here
   NEXTAUTH_URL=https://your-app.railway.app
   NEXT_PUBLIC_SOCKET_URL=https://your-app.railway.app
   NODE_ENV=production
   PORT=3000
   ```

### Step 4: Deploy
1. Railway will automatically detect your project
2. It will build and deploy automatically
3. Wait for deployment to complete
4. Your app will be live at `https://your-app.railway.app`

### Step 5: Update MongoDB Atlas Network Access
1. Go to MongoDB Atlas → Network Access
2. Add `0.0.0.0/0` (allow from anywhere) OR add Railway's IP addresses

---

## 🎨 Render Deployment

### Step 1: Sign Up
1. Go to https://render.com
2. Sign up with GitHub

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your repository

### Step 3: Configure Settings
- **Name**: chess-app
- **Environment**: Node
- **Build Command**: `npm install && npm run build`
- **Start Command**: `node server.js`
- **Plan**: Free

### Step 4: Add Environment Variables
Click "Environment" and add:
```
MONGODB_URI=mongodb+srv://admin:Angel12345@cluster0.klgvkxy.mongodb.net/chess-app?appName=Cluster0
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=https://your-app.onrender.com
NEXT_PUBLIC_SOCKET_URL=https://your-app.onrender.com
NODE_ENV=production
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Your app will be live!

---

## 🔧 Post-Deployment Checklist

1. ✅ **Test your website URL** - Make sure it loads
2. ✅ **Test registration** - Create a new account
3. ✅ **Test game creation** - Start a new game
4. ✅ **Test real-time gameplay** - Open in two browsers and play
5. ✅ **Update MongoDB Atlas** - Make sure your IP is whitelisted (or use 0.0.0.0/0)

---

## 🌐 Custom Domain (Optional)

### Railway:
1. Go to your project → Settings → Domains
2. Add your custom domain
3. Follow the DNS instructions

### Render:
1. Go to your service → Settings → Custom Domains
2. Add your domain
3. Update DNS records as instructed

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- Check your `MONGODB_URI` is correct
- Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### "WebSocket connection failed"
- Make sure your platform supports WebSockets (Railway and Render do)
- Check that `NEXT_PUBLIC_SOCKET_URL` matches your deployed URL

### "Build failed"
- Make sure all dependencies are in `package.json`
- Check the build logs for specific errors

### "App won't start"
- Check that `PORT` environment variable is set
- Make sure `NEXTAUTH_URL` matches your actual URL

---

## 📝 Quick Deploy Commands

### Generate NEXTAUTH_SECRET:
```bash
# Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Mac/Linux:
openssl rand -base64 32
```

---

## 🎉 You're Done!

Once deployed, share your website URL with friends and start playing chess online!

Need help? Check the platform's documentation or ask for assistance!

