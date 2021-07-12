const mongoose = require("mongoose")
const express = require("express")
const config = require("config")
const bodyParser = require("body-parser")
const cors = require("cors")

const URI = config.get("URI")

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})

const app = express()

app.use(express.json())
app.use(cors({origin: "*"}))


const userRouter = require("./routes/users")
const messageRouter = require("./routes/messages")

app.use("/api", userRouter)
app.use("/api", messageRouter)




const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log("Listening on port: " + PORT))