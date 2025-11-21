# Fix: Blank Screen Error

## The Problem
You're seeing a build error: `Cannot find module 'autoprefixer'`

## The Solution

### Step 1: Install Missing Package

Open your terminal (in your project folder) and run:

```bash
npm install autoprefixer
```

**OR if that doesn't work, try:**

```bash
npm install
```

This will install all missing dependencies.

### Step 2: Restart the Server

After installing, restart your server:

1. Stop the current server (press `Ctrl+C` in the terminal where it's running)
2. Start it again:
   ```bash
   node server.js
   ```

### Step 3: Try Again

1. Open your browser
2. Go to: `http://localhost:3000`
3. It should work now!

---

## If You Still See Errors

### Option 1: Delete node_modules and Reinstall

```bash
# Delete the node_modules folder
rmdir /s node_modules

# Reinstall everything
npm install
```

### Option 2: Clear Next.js Cache

```bash
# Delete .next folder
rmdir /s .next

# Restart server
node server.js
```

---

## Quick Fix Command

Run this in your terminal:

```bash
npm install autoprefixer && node server.js
```

This installs autoprefixer and starts the server.

---

## Still Having Issues?

Tell me:
1. What error message you see
2. What happens when you run `npm install autoprefixer`

And I'll help you fix it!


