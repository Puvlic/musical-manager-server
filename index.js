const express = require('express')
const musicianRouter = require('./routes/musiciansRouter')
const musicRouter = require('./routes/musicRouter')
const bandRouter = require('./routes/bandRouter')
const localityRouter = require('./routes/localityRouter')
const tourRouter = require('./routes/tourRouter')
const cors = require('cors')

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api', musicianRouter)
app.use('/api', musicRouter)
app.use('/api', bandRouter)
app.use('/api', localityRouter)
app.use('/api', tourRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))