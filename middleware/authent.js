const jwt = require('jsonwebtoken')

const authent=(req,res,next)=>{
const cookies = req.cookies.userData
console.log(cookies);
if(!cookies){
   throw new Error("user not found") 
}

const jwtdecode=jwt.decode(cookies)


if(!jwtdecode){
    throw new Error("Authentication failed")
}

req.user = jwtdecode.userId
next()
}
module.exports = authent