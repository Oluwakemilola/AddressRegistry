import Citizen from "../models/Citizen.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js"

export const signUp = async( req, res, next) => {
    try {
        const {fullname, nin, email, password,} = req.body;

        //To Check if any of the data is missing
        if(!fullname || !nin || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        

        const existingUser = await Citizen.findOne({nin})
        if (existingUser) {
            return res.status(400).json({
                message:"User already exists"
            })
        }

        //To hash Password
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        //To create new User

        const newUser = await Citizen.create([{fullname, nin, email, password:hashedpassword}])

        return res.status(201).json({
            message: "User Signup Succefully",
            user: {
                id: newUser[0].id,
                fullname: newUser[0].name,
                nin: newUser[0].name,
            }
        })


    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong",
            error:error.message
        })
    }
}


export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            res.status(400).json({
                message: "All fields are required"
            })
        }

       const user = await Citizen.findOne({ email });
       if(!user) {
        return res.status(400).json({
            message: "User not found"
        })
       }

       //Compare Password

       const isMatch = await bcrypt.compare(password, user.password)
       if(!isMatch) {
        return res.status(400).json({
            message:"Invalid Password"
        })
       }

       // Generate Token
       const token = jwt.sign({user: user.id},
        JWT_SECRET, {expiresIn: JWT_EXPIRES_IN}
       )
        res.status(200).json({
            success: true,
            message: "User signin Successfully",
            token: token,
            data: {
                id: user.id,
                fullname: user.fullname,
                nin:user.nin
            }
        })

    
    } catch (error) {
        return res.status(500).json({message:"something went wrong",
            error: error.message
        })
    }
}