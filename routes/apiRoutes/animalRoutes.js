const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

// To add the route, add the following code before router.listen.
// The get() method takes two parameters, the first is the route the client will have to fetch from. The second is a callback function that executes every time that route is accessed with a GET request. 
router.get('/animals', (req, res) => {
    let results = animals;

    // If I understand correctly, this is checking for query parameters, and if so, filtering accordingly
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});
// To return one specific animal - we use the req.params method, which is defined in the route path ('/api/animals/:id')
// PARAM ROUTES MUST COME AFTER THE GET ROUTE
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

router.post('/animals', (req, res) => {
    // set id based on what the next index of the array will be - if array length is 9, the next id will be 10. 
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // call createNewAnimal function above, pass two arguments
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;