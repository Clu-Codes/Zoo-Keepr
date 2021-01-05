const router = require('express').Router();
const path = require('path');

// The '/' brings us to the root route of the server, which is used to create a homepage for the server. This GET route has one job, and that is to respond with an HTML page to display in the browser - this is what the sendFile() method is accomplishing. It is using the path module to ensure that the correct location for the HTML is used. 
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

module.exports = router;