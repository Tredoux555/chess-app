# ⚡ Quick Deploy Guide

## 🚂 Railway (Fastest - 5 minutes)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Ready to deploy"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy on Railway:**
   - Go to https://railway.app
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repo

3. **Add Environment Variables:**
   - Click "Variables" tab
   - Add these (replace with your values):
     ```
     MONGODB_URI=mongodb+srv://admin:Angel12345@cluster0.klgvkxy.mongodb.net/chess-app?appName=Cluster0
     NEXTAUTH_SECRET=generate-random-secret-here
     NEXTAUTH_URL=https://YOUR-APP.railway.app
     NEXT_PUBLIC_SOCKET_URL=https://YOUR-APP.railway.app
     NODE_ENV=production
     ```

4. **Generate NEXTAUTH_SECRET:**
   - Windows PowerShell: `[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))`
   - Mac/Linux: `openssl rand -base64 32`

5. **Done!** Your app will be live in ~2 minutes.

---

## 🎨 Render (Alternative)

1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repo
5. Settings:
   - Build: `npm install && npm run build`
   - Start: `node server.js`
6. Add environment variables (same as Railway)
7. Deploy!

---

## ✅ After Deployment

1. Update MongoDB Atlas Network Access to allow `0.0.0.0/0` (or your platform's IPs)
2. Test your website URL
3. Share with friends! 🎉

See `DEPLOYMENT.md` for detailed instructions.

