const express = require('express');
const fs = require('fs');
const path = require('path');
// This code is used to instantiate the server; express is assigned to the app variable so that we can chain methods to the express.js server
const PORT = process.env.PORT || 3001;
const app = express();
    // ===MIDDLEWARE=== 
    // parse incoming string or array data
    app.use(express.urlencoded({ extended: true })); /* This is a method built into express.js to take incoming POST data and convert it to key value pairs. The ({ extended: true }) option set inside the method call informs the server to look for nested sub-array data as deeply as possible */

    // parse incoming JSON data to req.body
    app.use (express.json());

    // Middleware for certain front-end files to be made available - using the express.static() method, we can instruct that everything in a given location (in this case the 'public' folder) to be a static resource, allowing it to be accessed without creating a specific server endpoint. 
    app.use(express.static('public'));
    // ===MIDDLEWARE ENDS===
const { animals } = require('./data/animals.json');

// function to take in req.query as an argument and filter through the animals, returning a new filtered array.
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.

        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalsArray. but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults array will then contain only the entries that contain the trait, so at the end we'll have an array of animals that have every one of the traits when the .forEach() loop is finished. 
            filteredResults = filteredResults.filter(animal => animal.personalityTraits.indexOf(trait) !== -1);
        });
    }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(

        // this is determining the pathing for where we are adding the new data - in this instance, we are adding a new animal to the animals.json so that new data doesn't exist only on the server. 
        path.join(__dirname, './data/animals.json'),

        // then, we are converting the array data to JSON. The two arguments, null & 2, are for formatting. Null means that we don't want to edit any of our existing data. The 2 means we want to crete white space between our values - this helps for readability. 
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
};

// In this function, the animal parameter is the content from req.body, which is what is being validated. 
function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false; 
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

// To add the route, add the following code before app.listen.
// The get() method takes two parameters, the first is the route the client will have to fetch from. The second is a callback function that executes every time that route is accessed with a GET request. 
app.get('/api/animals', (req, res) => {
    let results = animals;

    // If I understand correctly, this is checking for query parameters, and if so, filtering accordingly
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});
// To return one specific animal - we use the req.params method, which is defined in the route path ('/api/animals/:id')
// PARAM ROUTES MUST COME AFTER THE GET ROUTE
app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});

app.post('/api/animals', (req, res) => {
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

// The '/' brings us to the root route of the server, which is used to create a homepage for the server. This GET route has one job, and that is to respond with an HTML page to display in the browser - this is what the sendFile() method is accomplishing. It is using the path module to ensure that the correct location for the HTML is used. 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});



// To have our servers listen to these requests, we need to chain the listen() method to the server with the following code:
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});


