const express = require('express');
const router = express.Router();
const profilController = require('../controllers/profilController');
const verifyToken = require('../middlewares/verifyToken');


router.post('/create-profil', verifyToken, profilController.createProfil);
router.get('/my-profil/:userId', verifyToken, profilController.getMyProfil);
router.put('/update-profil/:userId', verifyToken, profilController.updateProfil);

module.exports = router;
