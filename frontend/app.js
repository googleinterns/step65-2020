// [START app]
'use strict';

const express = require('express');
const path = require('path');
const app = express();

/* This code makes sure that every request that matches a static file in the build folder, it serves that file. */
app.use(express.static(path.join(__dirname, 'build')));


/* This code makes sure that any request that does not matches a static file in the build folder, will just serve index.html. Client side routing is going to make sure that the correct content will be loaded from there. */
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END app]