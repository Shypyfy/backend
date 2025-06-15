const express = require('express');
const router = express.Router();
const user = require('../services/user-services');

router.post('/', async(req, res)=>{
    try {
        const {username} = req.body;
        const saved = await user.saveuser(username);
    } catch(err) {
        res.status(500).json({error: "server error", details: err.message});
    }
});

router.get('/', async(req, res)=>{
    try {
        const users = await user.getallusers();
        res.json(users);
    } catch(err) {
        res.status(500).json({error: "server error", details: err.message});
    }
});

module.exports = router;