const { Client } = require('pg');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(400).json({ error: 'Missing session token' });
        return;
    }

    const token = authHeader.split(' ')[1];

    const client = new Client({
        connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_YMtVOH1XDR9S@ep-rapid-haze-aqjqgb95-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        await client.query('DELETE FROM public.sessions WHERE token = $1;', [token]);
        res.status(200).json({ message: 'Signed out successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error: ' + err.message });
    } finally {
        await client.end();
    }
};
