const express = require('express')
const verifyToken = require('../middleware/verify-token')
const Hoot = require('../models/Hoot')
const router = express.Router()

router.post('/', verifyToken, async (req, res) => {
    try {
        req.body.author = req.user._id
        const hoot = await Hoot.create(req.body)
        hoot._doc.author = req.user
        res.status(201).json(hoot)
    } catch (err) {
        res.status(500).json({ err: err.message })
    }

})


module.exports = router