const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');

// Router is using the module exported from animalRoutes.js
router.use(animalRoutes);

module.exports = router;