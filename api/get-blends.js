const { Client } = require('pg');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const { email } = req.query;

    if (!email) {
        res.status(400).json({ error: 'Missing email query parameter' });
        return;
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_YMtVOH1XDR9S@ep-rapid-haze-aqjqgb95-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        const query = 'SELECT * FROM public.user_blends WHERE user_email = $1 ORDER BY created_at DESC;';
        const values = [email];
        const result = await client.query(query, values);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error: ' + err.message });
    } finally {
        await client.end();
    }
};
