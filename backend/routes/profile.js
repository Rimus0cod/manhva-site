app.get('/api/profile', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ 
            profile: { 
                username: user.username, 
                email: user.email 
            } 
        });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});