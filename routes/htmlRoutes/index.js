// create routes to link html to the server
// homepage needs to be ('/')
// notes page needs to be ('/notes')


const path = require('path');

const router = require('express').Router();

// on the homepage the server will send the html/css 
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

module.exports = router;