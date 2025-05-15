import jwt from "jsonwebtoken"

const auth = (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.json({msg: "Access denied!"})
    }

    try {
        let decoded = jwt.verify(token, process.env.JWT_SECREATE_KEY)

        if(decoded.role !== "admin"){
            return res.json({msg: "Only Admin!"})
        }

        req.user = decoded
        next()

    } catch (error) {
        return res.json({msg: "Invalid token!"})
    }
}

export default auth