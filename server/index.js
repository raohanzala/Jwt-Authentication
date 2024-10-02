import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import UserModel from './models/user.model.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import validator from 'validator'


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/employee')

const createToken = (id) => {
    return jwt.sign({ id }, 'shhhhhhhhhhhh')
}

app.post('/register', async (req, res) => {
    try {

        const { name, email, password } = req.body
        if (!(name && email && password)) {
            return res.json({ success: false, message: 'All fiels are required' })
        }

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: 'User already exist with this email' })
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Please enter at least 9 words' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword
        })

        const token = createToken(newUser._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
            return res.json({ success: false, message: 'Please fill all the fields' })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: 'User does not exist' })
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (isPassword) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }else{
            res.json({success : false, message : 'Invalid password'})
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
})


app.listen(3001, () => {
    console.log('Server is running in port 3001')
})
