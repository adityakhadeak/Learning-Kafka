const express = require('express')
const dotenv = require('dotenv')
const  router1  = require('./routes/crudRoutes.js')

const app = express()
dotenv.config()

app.use(express.json())

const port = process.env.PORT || 4000

app.use('/api', router1)

app.listen(port, () => {
    console.log("Connected to Port " + port)
})