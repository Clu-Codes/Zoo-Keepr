// Need to create routes similar to those in animalRoute.js. Use that as reference to try this on your own. 
const router = require('express').Router();
const { zookeepers } = require('../../data/zookeepers');
const { findById, createNewZookeeper, validateZookeeper, filterByQuery } = require('../../lib/zookeepers');

router.get('/zookeepers', (req, res) => {
    let results = zookeepers;

    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.param.id, zookeepers);

    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/zookeepers', (req, res) => {
    req.body.id = zookeepers.length.toString();

    if(!validateZookeeper(req.body)) {
        res.status(404).send('The zookeeper is not formatted properly');
    } else {
        const newZookeeper = createNewZookeeper(req.body, zookeepers);
        res.json(newZookeeper);
    }
});

module.exports = router;