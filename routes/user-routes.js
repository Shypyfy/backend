const express = require("express");
const router = express.Router();
const userService = require("../services/user-services");

router.post("/", async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:username", async (req, res) => {
    try {
        const user = await userService.getUserByUsername(req.params.username);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/wallet/:walletaddress", async (req, res) => {
    try {
        const user = await userService.getUserByWalletAddress(req.params.walletaddress);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/nic/:nic", async (req, res) => {
    try {
        const user = await userService.getUserByNIC(req.params.nic);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/:username/wallet", async (req, res) => {
    try {
        const updated = await userService.updateUserWallet(req.params.username, req.body);
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete("/:username", async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.params.username);
        if (!deleted) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
