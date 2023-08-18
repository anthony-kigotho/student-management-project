import mssql, { Float } from 'mssql'
import { describe } from 'node:test'
import { createStudent, deleteStudent, getAllStudents, getOneStudent, updateFee } from './studentControllers'


describe("Students Controller", ()=>{

    describe("Create a student", ()=>{
        it("should throw an error 'Input all values' if any student details is missing", async()=>{
            const req =  {
                    body: {
                        
                    }
                }
            

            const res = await createStudent(req, res);

            expect(res.body.error).toBe('Input all values')
        })

        it("should create a student successfully", async()=>{
            
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                connected: true,
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })
            const req =  {
                    body: {
                        firstName: expect.any(String),
                        lastName: expect.any(String),
                        className: expect.any(String),
                        feeBalance: expect.any(Float)
                    }
                }
            

            const res = await createStudent(req, res);
            expect(res.body.message).toBe('Student created Successfully')
        })
    })

    describe("Gets all students", ()=>{
        it("should return all students" , async()=>{
            const mockStudents = [
                {
                    "firstName": expect.any(String),
                    "lastName": expect.any(String),
                    "className": expect.any(String),
                    "feeBalance": expect.any(Number),
                },
                {
                    "firstName": expect.any(String),
                    "lastName": expect.any(String),
                    "className": expect.any(String),
                    "feeBalance": expect.any(Number),
                }
            ]

            const req = {}

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: mockStudents
                })
            })

            const res = await getAllStudents(req, res)

            expect(res.body.students).toBeInstanceOf(Array)
        })
    })

    describe("Getting student By ID", ()=>{
        it ("should return the specified student", async()=>{
            const studentID = '1464dda6-5651-4d3c-8c1c-527d977e15d8'
            const mockStudent = {
                "firstName": expect.any(String),
                "lastName": expect.any(String),
                "className": expect.any(String),
                "feeBalance": expect.any(Number),
            }

            const req = {
                params: {
                    id: studentID
                }
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: [mockStudent]
                })
            })

            const res = await getOneStudent(req, res)

            expect(res.body.student).toBeInstanceOf(Array)        })

    })


    describe("Deleting a note", ()=>{
        it("should delete the note successfully", async()=>{
            const studentID = '1464dda6-5651-4d3c-8c1c-527d977e15d8'
            const req = {
                params:{
                    id: studentID
                }
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })

            const res = await deleteStudent(req, res)

            expect(res.body.message).toBe('Student deleted Successfully')
        })

        it("should return an error 'student not found'", async()=>{
            const noteID = '1464dda6-5651-4d3c-8c1c-527d977e15d8'
            const req = {
                params:{
                    id: noteID
                }
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [0]
                })
            })

            const res = await deleteNote(req, res)


            expect(res.body.message).toBe('Student not found')
        })
    })
})