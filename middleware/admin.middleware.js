const isAdmin = (req, res, next)=>{
    if(req.user?.role === "admin"){
        next()
    } else{
        return res.json({msg: "Access denied. Admins only."})
    }
}

export default isAdmin