# How to Find the Correct Connection String

## The Problem

You found a SQL connection string, but we need the **application connection string**. They look different!

## How to Get the Right One

### Step 1: Go to Database
1. Click **"Database"** in the left sidebar
2. You should see your cluster

### Step 2: Click "Connect"
- Click the **"Connect"** button next to your cluster

### Step 3: Choose the RIGHT Option
You'll see several tabs or options. Look for:

**✅ CORRECT:** "Connect your application" or "Drivers" tab
- This gives you: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/...`

**❌ WRONG:** "Connect using MongoDB SQL" or "SQL" tab
- This gives you: `mongodb://atlas-sql-...` (what you found)

### Step 4: What You Should See
When you click "Connect your application", you'll see:
- A dropdown for "Driver" (choose "Node.js")
- A dropdown for "Version" (choose latest)
- A connection string that starts with `mongodb+srv://`
- It will have `<password>` in it that you need to replace

### Step 5: Copy the Correct String
The correct connection string will look like:
```
mongodb+srv://chessuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

Notice:
- Starts with `mongodb+srv://` (not `mongodb://atlas-sql`)
- Has your username and `<password>` in it
- Has `cluster0.xxxxx.mongodb.net` (not `atlas-sql-...`)

---

## Quick Fix

1. Go back to your cluster
2. Click "Connect" again
3. Make sure you're on the **"Connect your application"** tab (not SQL)
4. Copy that connection string instead

---

## Still Can't Find It?

If you see different options, look for:
- "Connect your application"
- "Drivers"
- "Node.js"
- "Application connection"

Avoid:
- "SQL"
- "MongoDB SQL"
- "Query"

Let me know what options you see and I'll help you pick the right one!


