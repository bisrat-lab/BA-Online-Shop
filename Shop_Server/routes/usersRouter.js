var express = require('express');
const usersController = require('../controllers/usersController')
const roleController = require('../controllers/rolecontroller')


var router = express.Router();

router.get('/users',usersController.getUsers)
router.post('/users',usersController.save);
router.post('/users',roleController.authorizeAdmin);
router.get('/users/:id',usersController.getByID);
router.put('/users/:id',usersController.updateById);

// router.delete('/users/:id',usersController.deleteUserById);

module.exports = router;
