const { notes } = require('../../db/db.json');
const router = require('express').Router();

// creates an api endpoint to return notes stored in db.json
router.get('/notes', (req, res) => {
    res.json(notes);
});


// create the functionality to add notes 

module.exports = router;