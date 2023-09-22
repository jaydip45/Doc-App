const express = require('express');
const router = express.Router();
const doctorController = require('../Controller/DoctorController');

router.post('/doctor', doctorController.addDoctor);
router.get('/doctor', doctorController.getAllDoctor);
// router.get('/role/:id', roleController.getRoleById);
module.exports = router;