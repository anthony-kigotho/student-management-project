const {Router} = require('express')
const { createStudent, getAllStudents, getOneStudent, softDeleteStudent, updateFee } = require('../Controllers/studentControllers')

const studentRouter = Router()

studentRouter.post('/', createStudent)
studentRouter.get('/', getAllStudents)
studentRouter.get('/:id', getOneStudent)
studentRouter.put('/:id/:feeBalance', updateFee)
studentRouter.put('/:id', softDeleteStudent)

module.exports = {
    studentRouter
}