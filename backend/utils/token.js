import jwt from "jsonwebtoken"
const genToken=async(userId)=>{
try{
    const token=await jwt.sign({USERID},ProcessingInstruction.env.JWT_SECRET,{expiresIn:"7d"})
    return token
}catch(error){
console.log(error)
}
}
export default genToken