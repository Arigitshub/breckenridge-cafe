const { Client } = require('pg');
const crypto = require('crypto');

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        res.status(400).json({ error: 'Missing required fields: email, password, name' });
        return;
    }

    if (password.length < 8) {
        res.status(400).json({ error: 'Password must be at least 8 characters long' });
        return;
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_YMtVOH1XDR9S@ep-rapid-haze-aqjqgb95-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();

        // Check if user already exists
        const checkUser = await client.query('SELECT id FROM public.users WHERE email = $1;', [email.toLowerCase()]);
        if (checkUser.rows.length > 0) {
            res.status(400).json({ error: 'Email already registered' });
            return;
        }

        const hashedPassword = hashPassword(password);

        // Insert user
        const result = await client.query(
            'INSERT INTO public.users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email;',
            [name, email.toLowerCase(), hashedPassword]
        );
        const user = result.rows[0];

        // Create Session
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

        await client.query(
            'INSERT INTO public.sessions (token, user_id, expires_at) VALUES ($1, $2, $3);',
            [token, user.id, expiresAt]
        );

        res.status(200).json({
            user: user,
            session: {
                token: token,
                expiresAt: expiresAt
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error: ' + err.message });
    } finally {
        await client.end();
    }
};
