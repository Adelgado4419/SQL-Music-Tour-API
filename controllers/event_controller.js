const event = require('express').Router()
const db = require('../models')
const { Event } = db
const { Op } = require('sequelize')

// GET ALL EVENTS
event.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [[ 'start_time', 'ASC' ]],
            where: {
                name: { [Op.like]: `%${req.query.name || ''}%` }
            }
        })
        res.status(200).json(foundEvents)
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// GET ONE EVENTS BY ID
event.get('/:id', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { event_id: req.params.id }
        })
        res.status(200).json(foundEvent)
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// CREATE NEW EVENT
event.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Event created successfully',
            data: newEvent
        })
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// UPDATE A EVENT BY ID
event.put('/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.update(req.body, {
            where: { event_id: req.params.id }
        })
        res.status(200).json({
            message: `Event ${req.params.id} updated successfully`
        })
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// DELETE A EVENT BY ID
event.delete('/:id', async (req, res) => {
    try {
        const deletedEvent = await Event.destroy({
            where: { event_id: req.params.id }
        })
        res.status(200).json({
            message: `Event ${req.params.id} deleted successfully`
        })
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

module.exports = event