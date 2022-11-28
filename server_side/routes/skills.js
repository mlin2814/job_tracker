const express = require('express')

const {
    getSkills,
    getSkill,
    createSkill,
    deleteSkill,
    updateSkill
} = require('../controllers/skillController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// GET all skills
router.get('/', getSkills)

// GET a single skill
router.get('/:id', getSkill)

// POST a new skill
router.post('/', createSkill)

// DELETE a skill
router.delete('/:id', deleteSkill)

// UPDATE a skill
router.patch('/:id', updateSkill)

module.exports = router