const { filterByQuery, findById, createNewNote, validateNotes }  = require('../../lib/notes');
const { notes } = require('../../db/db.json');

const router = require('express').Router();

// creates an api endpoint to return notes stored in db.json
router.get('/notes', (req, res) => {
    let results = notes;
    
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    // console.log(req.query);
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);

    if (result) {
        res.json(result);
    } 
    else {
        res.send(404);
    }
}); 

router.post('/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();

    if (!validateNotes(req.body)) {
        res.status(400).send('The note is not formatted properly.');
    }
    else {
        // add note to json file and notes array in this function
        const note = createNewNote(req.body, notes);

        // req.body is where our incoming content will be
        res.json(note);
    }
}); 


// create the functionality to add notes 

module.exports = router;