const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

const JWT_SECRET = 'apex_super_secret_key_change_in_production';

// --- AUTHENTICATION MIDDLEWARE ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// --- API ENDPOINTS ---
// Login Endpoint — verify email and return uppercase role for client routing
app.post('/api/login', async (req, res) => {
    console.log('[LOGIN] Incoming request body:', req.body);

    const { email } = req.body;
    if (!email) {
        console.log('[LOGIN] Rejected: missing email in payload');
        return res.status(400).json({ error: 'Email is required' });
    }

    const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, role: true, email: true, first_name: true }
    });

    if (user) {
        const role = String(user.role).toUpperCase();
        console.log('[LOGIN] Verified user:', { email: user.email, role });
        res.json({ success: true, role });
    } else {
        console.log('[LOGIN] No user found for email:', email);
        res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
});

// --- WEBSOCKETS (Real-Time Engine) ---
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Listen for Service Tech updating a bike status
    socket.on('update_ro_status', async (data) => {
        // e.g., data = { ro_id: 123, status: 'Ready for Delivery' }
        await prisma.repairOrder.update({
            where: { id: data.ro_id },
            data: { status: data.status }
        });

        // Push update to ALL connected clients instantly (Showroom, Managers, etc.)
        io.emit('ro_status_changed', data);
    });

    socket.on('disconnect', () => console.log('Client disconnected'));
});

// --- STATIC FILES & ROOT ROUTE ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Apex Backend running on port ${PORT}`));
