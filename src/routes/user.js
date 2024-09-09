const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

// Route to get user details
router.get('/me', userController.getUser);
// Route to update user details
router.put('/me', userController.updateUser);
// Route to delete the user
router.delete('/me', userController.deleteUser);

module.exports = router;
