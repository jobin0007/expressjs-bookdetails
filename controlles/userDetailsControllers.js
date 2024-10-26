
const asynchandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const User = require('../models/userScehma')

require('dotenv').config()



const userDetailControllers = {
    register: asynchandler(async (req, res) => {
        const { name, email, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        if (!hashedPassword) {
            throw new Error("password not correct")

        }
        const user = await User.create(
            {
                name,
                email,
                password: hashedPassword

            }
        )
        const payload = {
            name,
            email
        }
        const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY)

        res.cookie('token', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "none"
        })
        res.json({
            token
        })
    }),
    login: asynchandler(async (req, res) => {
        const { email, password } = req.body
     
        const userFound = await User.findOne({ email })
        if (!userFound) {
            res.status(500)
            throw new Error("user not found")
        }
        const userPassword = await bcrypt.compare(password,userFound.password)
        console.log(userFound)
        if (!userPassword) {
            throw new Error("password is incorrect")
        }
        const token = jwt.sign({ userId: userFound.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: '4hr' })
        res.cookie('token', token, {
            maxAge: 2 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: "none"

        }

        )
        res.json({
            message: "Login Sucessfull",
            userFound
        }

        )

    }),
    updateUserEmail: asynchandler(async (req,res)=>{
        const id = req.user
        const {email} = req.body
        if(!id){
            throw new Error("user not found")
        }
        const updatedUser= await User.findByIdAndUpdate(id,{email},{new:true,runValidators:true
        })
        if(!updatedUser){
            throw new Error("Email is not updated")
        }
        console.log(updatedUser)
        res.json({message:"updated successfully",updatedUser})
     

    })
    
}
module.exports = userDetailControllers