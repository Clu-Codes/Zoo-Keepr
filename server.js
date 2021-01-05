const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
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

    // These two methods are informing the server about which route to use whenever a client navigates to a certain end point. If a client navigates to <ourhost>/api, then the app will use apiRoutes. If / is the endpoint, it uses the HTML routes. 
    app.use('/api', apiRoutes);
    app.use('/', htmlRoutes);
    // ===MIDDLEWARE ENDS===
const { animals } = require('./data/animals.json');



// To have our servers listen to these requests, we need to chain the listen() method to the server with the following code:
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});


