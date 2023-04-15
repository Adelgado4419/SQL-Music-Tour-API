const stage = require('express').Router()
const db = require('../models')
const { Stage } = db
const { Op } = require('sequelize')

// GET ALL STAGES
stage.get('/', async (req, res) => {
    try {
        const foundStages = await Stage.findAll(
            {
            order: [[ 'stage_name', 'ASC' ]],
            where: {
                stage_name: { [Op.like]: `%${req.query.name || ''}%` }
            }
        }
        )
        res.status(200).json(foundStages)
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// GET ONE STAGES BY ID
stage.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_id: req.params.id }
        })
        res.status(200).json(foundStage)
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// CREATE NEW Stage
stage.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Stage created successfully',
            data: newStage
        })
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// UPDATE A STAGE BY ID
stage.put('/:id', async (req, res) => {
    try {
        const updatedStage = await Stage.update(req.body, {
            where: { stage_id: req.params.id }
        })
        res.status(200).json({
            message: `Stage ${req.params.id} updated successfully`
        })
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

// DELETE A STAGE BY ID
stage.delete('/:id', async (req, res) => {
    try {
        const deletedStage = await Stage.destroy({
            where: { stage_id: req.params.id }
        })
        res.status(200).json({
            message: `Stage ${req.params.id} deleted successfully`
        })
    } catch (err) {
        res.status(500).send("Server error")
        console.log(err)
    }
})

module.exports = stage