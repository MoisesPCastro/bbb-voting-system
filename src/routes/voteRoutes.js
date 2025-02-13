const express = require('express');
const VoteController = require('../controllers/voteControllher.js');

const router = express.Router();

router.post('/', VoteController.create);

module.exports = router;
