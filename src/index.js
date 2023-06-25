const connectDB = require('./database/mongodb')
const app = require('./app')
const Cache = require('./config/redis')
require('dotenv').config()

const port = process.env.PORT || 4050
const db_url = process.env.DB_URL

connectDB(db_url)

Cache.connect()

app.listen(port, () => {
  console.log(`server is listening on port: ${port}`)
})
