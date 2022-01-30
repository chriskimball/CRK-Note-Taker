const router = require('express').Router();

// Importing the modular router for /notes
const notesRoutes = require('./notesRouter');
router.use('/notes',notesRoutes);

module.exports = router;