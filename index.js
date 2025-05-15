import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectToDB from "./configDB/db.js"
import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"

dotenv.config()

let app = express()
app.use(express.json())
let port = process.env.PORT || 5000
app.use(cors())

app.use("/user", userRouter)
app.use("/product", productRouter)

app.listen(port, async ()=>{
    await connectToDB()
    console.log(`server is running on http://localhost:${port}`)
})