const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userService = require("../services/user-services");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ error: "Access token missing" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
}

router.post("/", async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", authenticateToken, async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:username", authenticateToken, async (req, res) => {
    try {
        const user = await userService.getUserByUsername(req.params.username);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/wallet/:walletaddress", authenticateToken, async (req, res) => {
    try {
        const user = await userService.getUserByWalletAddress(req.params.walletaddress);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/nic/:nic", authenticateToken, async (req, res) => {
    try {
        const user = await userService.getUserByNIC(req.params.nic);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:username/wallet", authenticateToken, async (req, res) => {
    try {
        const updated = await userService.updateUserWallet(req.params.username, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:username", authenticateToken, async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.params.username);
        if (!deleted) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
