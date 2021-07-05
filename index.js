const mongoose = require("mongoose")
const express = require("express")
const config = require("config")
const bodyParser = require("body-parser")
const cors = require("cors")

mongoose.connect("mongodb://localhost:27017/emailDB")

const app = express()

app.use(express.json())
app.use(cors({origin: "*"}))


const userRouter = require("./routes/users")


app.use("/api", userRouter)




const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log("Listening on port: " + PORT))