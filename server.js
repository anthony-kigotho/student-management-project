const express = require('express')
const { studentRouter } = require('./Routes/studentRoutes')

const app = express()

app.use(express.json())
app.use('/student', studentRouter)

app.use((err, req, res, next) => {
    res.json({Error: err})
})

app.listen(4500, ()=>{
    console.log('Server running on port 4500');
})