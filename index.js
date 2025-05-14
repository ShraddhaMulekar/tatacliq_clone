import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectToDB from "./configDB/db.js"

dotenv.config()

let app = express()
app.use(express.json())
let port = process.env.PORT || 5000
app.use(cors())

app.get("/", async(rep, res)=>{
    await res.json({msg:"get route connect!"})

})

app.listen(port, async ()=>{
    await connectToDB()
    console.log(`server is running on http://localhost:${port}`)
})