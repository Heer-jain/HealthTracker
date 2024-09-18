const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")
const bodyParser = require("body-parser")
const HealthRecordRouter = require('./Routes/HealthRecordRouter')
require('dotenv').config()
require('./Models/db')

app.use(bodyParser.json())
app.use(cors())
app.use('/', HealthRecordRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})