const express = require('express');
const { downloadHandler, searchHandler } = require('../controllers/downloaderController');

const router = express.Router();

router.get('/download', downloadHandler);
router.get('/search', searchHandler);

module.exports = router;
