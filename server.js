const express = require('express');
// This code is used to instantiate the server; express is assigned to the app variable so that we can chain methods to the express.js server
const app = express();
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

// To have our servers listen to these requests, we need to chain the listen() method to the server with the following code:
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});


