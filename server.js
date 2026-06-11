const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL // e.g., Supabase connection string
});

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
// Login Endpoint (Generates JWT)
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    // Note: In production, hash passwords with bcrypt
    const result = await pool.query('SELECT id, role, first_name FROM users WHERE email = $1', [email]);
    
    if (result.rows.length > 0) {
        const user = result.rows[0];
        const accessToken = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '12h' });
        res.json({ accessToken, user });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// --- WEBSOCKETS (Real-Time Engine) ---
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Listen for Service Tech updating a bike status
    socket.on('update_ro_status', async (data) => {
        // e.g., data = { ro_id: 123, status: 'Ready for Delivery' }
        await pool.query('UPDATE repair_orders SET status = $1 WHERE id = $2', [data.status, data.ro_id]);
        
        // Push update to ALL connected clients instantly (Showroom, Managers, etc.)
        io.emit('ro_status_changed', data);
    });

    socket.on('disconnect', () => console.log('Client disconnected'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Apex Backend running on port ${PORT}`));