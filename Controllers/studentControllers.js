const {v4} = require('uuid')
const mssql = require ('mssql');
const { sqlConfig } = require('../Config/config');


const createStudent = async(req, res)=>{
    try {

        const id = v4()

        const {firstName, lastName, className, feeBalance} = req.body

        if(!firstName || !lastName || !className || !feeBalance ) {
            return res.json({error: "Input all values"})
        }

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){

            const result = await pool.request()
            .input('id', mssql.VarChar, id)
            .input('firstName', mssql.VarChar, firstName)
            .input('lastName', mssql.VarChar, lastName)
            .input('className', mssql.VarChar, className)
            .input('feeBalance', mssql.Float, feeBalance)
            .execute('createStudentPROC')



            if(result.rowsAffected == 1){
            return res.json({
                message: "Student created Successfully",
            })  
            }else{
                return res.json({message: "Creation failed"})
            }   
        }
    } catch (error) {
        return res.json({error})
    }
}

const getAllStudents = async(req, res)=>{
    try {
        const pool = await (mssql.connect(sqlConfig))

        const allstudents = (await pool.request().execute('getAllStudents')).recordset

        res.status(200).json({students: allstudents})
    } catch (error) {
        return res.json({error})
    }
}

const getOneStudent = async(req, res)=>{
    try {
        const {id} = req.params

        const pool = await mssql.connect(sqlConfig)

        const student = (await pool.request().input('id', id).execute('getOneStudent')).recordset

        if(student.length > 0) {
            return res.json({
                student: student
            })
        } else {
            return res.json({
                error: "Student not found"
            })
        }
    } catch (error) {
        return res.json({error})
    }
}

const updateFee = async(req, res)=>{
    try {
        const {id, feeBalance} = req.params


        const pool = await mssql.connect(sqlConfig)

        const result = (await pool.request()
        .input('id', mssql.VarChar, id)
        .input('feeBalance', mssql.Float, feeBalance)

        .execute('updateFee'));

        if(result.rowsAffected == 1){
            res.json({
                message: 'Fee balance updated successfully'
            })
        }else{
            res.json({
                message: 'Student not found'
            })
        }
    } catch (error) {
        return res.json({Error: error})
    }
}

const softDeleteStudent = async (req, res)=>{
    try {
       const id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        const result = await pool.request()
        .input('id', id)
        .execute('deleteStudent')
      
        if(result.rowsAffected == 1){
            res.json({
                    message: 'Student deleted successfully'
            })
        }else{
            res.json({
                message: 'Student not found'
        })
        }
    } catch (error) {
        return res.json({Error: error})
    }
}

module.exports ={
    createStudent,
    getAllStudents,
    getOneStudent,
    softDeleteStudent,
    updateFee
}