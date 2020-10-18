const { filterByQuery, findById, createNewNote, validateNotes }  = require('../../lib/notes');
const { notes } = require('../../db/db.json');
const fs = require('fs');
const path = require('path');

const router = require('express').Router();

// creates an api endpoint to return notes stored in db.json
router.get('/notes', (req, res) => {
    let results = notes;
    console.log(results);
    
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    // console.log(req.query);
    res.json(results);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        console.log(result);
        res.json(result);
    } 
    else {
        res.send(404);
    }
}); 

// create a delete request 
router.delete('/notes/:id', (req, res) => {
    // get the id numbers from the notes array
    let noteId = req.params.id;

    // loop through the selected notes and delete them 
    for (let i = 0; i < notes.length; i++) {
       const selectedNote = noteId;

        // if the selected note is equal to the id of the current index of the array then delete that selected note
        if(selectedNote === notes[i].id) {
            let noteIndex = notes.indexOf(notes[i]);
            notes.splice(noteIndex, 1);
        }
    }

     // save the updated notes object db.json
     fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    
    // send the updated object to the webpage
    res.send({ notes });
    console.log("Note Deleted");
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




module.exports = router;