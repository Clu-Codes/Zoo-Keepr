const router = require('express').Router();
const animalRoutes = require('../apiRoutes/animalRoutes');
const zookeeperRoutes = require('../apiRoutes/zookeeperRoutes')

// Router is using the module exported from animalRoutes.js
router.use(animalRoutes);
router.use(zookeeperRoutes);
module.exports = router;