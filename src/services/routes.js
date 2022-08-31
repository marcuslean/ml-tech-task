const express = require('express')
const router = express.Router()
const dataset = require('./database')

// Get all task
router.get('/', async (req, res) => {
  try {
    const data = await dataset.find()
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Get one specific task
router.get('/:id', getTask, (req, res) => {
  res.json(res.ase_db)
})

// Create new task
router.post('/', async (req, res) => {
  const task = new dataset({
    name: req.body.name,
    task: req.body.task
  })
  try {
    const newTask = await task.save()
    res.status(201).json(newTask)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Update selected task
router.patch('/:id', getTask, async (req, res) => {
  if (req.body.name != null) {
    res.ase_db.name = req.body.name
  }
  if (req.body.task != null) {
    res.ase_db.task = req.body.task
  }
  try {
    const updatedTask = await res.ase_db.save()
    res.json(updatedTask)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Delete selected task
router.delete('/:id', getTask, async (req, res) => {
  try {
    await res.ase_db.remove()
    res.json({ message: 'Deleted task' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getTask(req, res, next) {
  let item
  try {
    item = await dataset.findById(req.params.id)
    if (item == null) {
      return res.status(404).json({ message: 'Cannot find item' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.ase_db = item
  next()
}

module.exports = router