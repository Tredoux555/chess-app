# 🚀 Deploy Your Chess App - Step by Step

I'll guide you through deploying your app. Follow these steps:

## Step 1: Install Git (if not installed)

1. Download Git: https://git-scm.com/download/win
2. Install it (use default settings)
3. Restart your terminal/PowerShell

## Step 2: Create GitHub Account & Repository

1. Go to https://github.com and sign up (or log in)
2. Click the "+" icon → "New repository"
3. Name it: `chess-app` (or any name)
4. Make it **Public** (free hosting requires public repos)
5. **DON'T** check "Initialize with README"
6. Click "Create repository"

## Step 3: Push Your Code to GitHub

After installing Git, open PowerShell in your project folder and run:

```powershell
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Chess app ready to deploy"

# Connect to GitHub (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/chess-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** GitHub will ask for your username and password. Use a **Personal Access Token** as password (see below).

### Create GitHub Personal Access Token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token"
3. Name it: "Deploy Token"
4. Check "repo" permission
5. Click "Generate"
6. **COPY THE TOKEN** (you'll need it when pushing)

## Step 4: Deploy on Railway (Easiest)

1. Go to https://railway.app
2. Click "Login" → Sign up with **GitHub**
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `chess-app` repository
6. Railway will start deploying automatically

## Step 5: Add Environment Variables

Once Railway starts deploying:

1. Click on your project
2. Click "Variables" tab
3. Click "New Variable" and add these one by one:

   **Variable 1:**
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://admin:Angel12345@cluster0.klgvkxy.mongodb.net/chess-app?appName=Cluster0`

   **Variable 2:**
   - Name: `NODE_ENV`
   - Value: `production`

   **Variable 3:**
   - Name: `NEXTAUTH_SECRET`
   - Value: (generate one - see below)

   **Variable 4:**
   - Name: `NEXTAUTH_URL`
   - Value: (wait for Railway to give you a URL, then use it)

   **Variable 5:**
   - Name: `NEXT_PUBLIC_SOCKET_URL`
   - Value: (same as NEXTAUTH_URL)

### Generate NEXTAUTH_SECRET:

In PowerShell, run:
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Copy the output and use it as `NEXTAUTH_SECRET`.

### Get Your Railway URL:

1. After Railway deploys, click "Settings"
2. Find "Domains" section
3. Your URL will be something like: `chess-app-production.up.railway.app`
4. Use this for `NEXTAUTH_URL` and `NEXT_PUBLIC_SOCKET_URL`

## Step 6: Update MongoDB Atlas

1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 7: Wait for Deployment

Railway will automatically:
- Install dependencies
- Build your app
- Deploy it

Wait 2-5 minutes, then visit your Railway URL!

## ✅ Done!

Your chess app is now live on the internet! Share the URL with friends.

---

## 🆘 Need Help?

If you get stuck:
1. Check Railway logs (click "View Logs" in Railway)
2. Make sure all environment variables are set
3. Verify MongoDB Atlas allows connections from anywhere

---

## Alternative: Use GitHub Desktop (Easier than Command Line)

If you prefer a visual tool:

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in with GitHub
3. File → Add Local Repository → Select your project folder
4. Click "Publish repository" button
5. Then continue with Railway deployment (Step 4 above)

