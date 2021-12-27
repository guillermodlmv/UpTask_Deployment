const express = require('express');
const router = express.Router();

router.get('/users/signin', (req, res) => {
    res.send('Signing In')
})
router.get('/users/signup', (req, res) => {
    res.render('/users/singup')
})
module.exports = router