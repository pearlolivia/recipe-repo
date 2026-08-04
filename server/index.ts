import './loadEnv'
import mainRouter from './routes'
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const port = 3200
const app = express()

app.use(cors())

// Parsing JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING)
        app.listen(process.env.PORT_NUMBER, () => {
            console.info(`Server running on port: ${port}`)
        })
        app.get('/test', (req, res) => {
            res.send({ data: 'Hello from server '})
        })
        // Routes
        app.use('/api', mainRouter)
    } catch (error) {
        console.error(`Failed to start server: ${error}`)
        process.exit(1)
    }
}

start()