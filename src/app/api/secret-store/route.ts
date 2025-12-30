import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'secret-store-users.json');
const ADMIN_PASS = process.env.ADMIN_PASS || 'riddick123';

// Ensure data directory and file exist
function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
  }
}

function loadUsers() {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
}

function saveUsers(data: any) {
  ensureDataFile();
  fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, name, email, reason, pass, id } = body;

  // User requests access
  if (action === 'request-access') {
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
    }
    const data = loadUsers();
    const exists = data.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return NextResponse.json({ error: 'Already requested', status: exists.status }, { status: 400 });
    }
    data.users.push({
      id: Date.now().toString(),
      name,
      email: email.toLowerCase(),
      reason: reason || '',
      status: 'pending',
      requestedAt: new Date().toISOString()
    });
    saveUsers(data);
    return NextResponse.json({ success: true, message: 'Request sent! Wait for approval.' });
  }

  // User login
  if (action === 'login') {
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    const data = loadUsers();
    const user = data.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return NextResponse.json({ error: 'Not found. Request access first.' }, { status: 404 });
    }
    return NextResponse.json({ status: user.status, name: user.name, message: 
      user.status === 'pending' ? 'Still waiting for approval' :
      user.status === 'rejected' ? 'Access denied' : 'Welcome!'
    });
  }

  // Admin: Get all users
  if (action === 'get-users') {
    if (pass !== ADMIN_PASS) {
      return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
    }
    return NextResponse.json(loadUsers());
  }

  // Admin: Approve
  if (action === 'approve') {
    if (pass !== ADMIN_PASS) {
      return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
    }
    const data = loadUsers();
    const user = data.users.find((u: any) => u.id === id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    user.status = 'approved';
    user.approvedAt = new Date().toISOString();
    saveUsers(data);
    return NextResponse.json({ success: true, user });
  }

  // Admin: Reject
  if (action === 'reject') {
    if (pass !== ADMIN_PASS) {
      return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
    }
    const data = loadUsers();
    const user = data.users.find((u: any) => u.id === id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    user.status = 'rejected';
    saveUsers(data);
    return NextResponse.json({ success: true });
  }

  // Admin: Delete
  if (action === 'delete') {
    if (pass !== ADMIN_PASS) {
      return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
    }
    const data = loadUsers();
    data.users = data.users.filter((u: any) => u.id !== id);
    saveUsers(data);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
