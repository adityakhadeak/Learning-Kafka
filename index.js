const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

app.use(express.json())
const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log("Connected to Port " + port)
})