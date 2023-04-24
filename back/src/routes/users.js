const express = require('express');
const UserController = require('../control/UserController');

const router = express.Router();

router.post('/create', UserController.create);
router.get('/read', UserController.read);
router.put('/update', UserController.update);
router.delete('/delete', UserController.remove);

module.exports = router;