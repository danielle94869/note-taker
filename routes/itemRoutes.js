const router = require('express').Router()
const { join } = require('path')
const fs = require('fs')
const uuid = require('uuid')

// GET all notes
router.get('/notes', (req, res) => {
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data))
  })
})

// POST one item
router.post('/notes', (req, res) => {
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    console.log(req.body)
    if (err) { console.log(err) }

    const notes = JSON.parse(data)
    const item = {
      id: uuid.v1(),
      title: req.body.title,
      text: req.body.text
    }
    notes.push(item)

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }

      res.json(item)
    })
  })
})

// PUT one item
router.put('/notes/:id', (req, res) => {
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    const notes = JSON.parse(data)

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }

      res.sendStatus(200)
    })
  })
})

// DELETE one item
router.delete('/notes/:id', (req, res) => {
  fs.readFile(join(__dirname, '..', 'db', 'db.json'), 'utf8', (err, data) => {
    if (err) { console.log(err) }

    let notes = JSON.parse(data)
    notes = notes.filter(item => item.id !== req.params.id)

    fs.writeFile(join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notes), err => {
      if (err) { console.log(err) }

      res.sendStatus(200)
    })
  })
})

module.exports = router
