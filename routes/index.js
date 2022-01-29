const router = require('express').Router()

const notesRoutes = require('./notesRouter')
router.use('/notes',notesRoutes)

module.exports = router