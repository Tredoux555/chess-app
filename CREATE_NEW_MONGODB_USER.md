# Create New MongoDB User - Step by Step

## Quick Steps:

1. **Go to MongoDB Atlas** → https://cloud.mongodb.com
2. **Click "Database Access"** (left sidebar)
3. **Click "Add New Database User"**
4. **Fill in:**
   - Authentication: **Password**
   - Username: `admin` (or any simple name)
   - Password: Click **"Autogenerate Secure Password"** → **COPY IT**
   - Database User Privileges: **"Atlas admin"**
5. **Click "Add User"**
6. **Copy the password** (you'll need it!)

## Then:

1. **Go to Database** → **Connect** → **"Connect your application"**
2. **Copy the connection string**
3. **Tell me:**
   - The username you created
   - The password (the one you copied)
   - The connection string

And I'll update it for you!

---

## Or Reset Current User:

1. **Database Access** → Find `chessuser`
2. **Click the pencil icon** (edit)
3. **Click "Edit Password"**
4. **Generate new password** → **COPY IT**
5. **Save**
6. **Tell me the new password** and I'll update it!


