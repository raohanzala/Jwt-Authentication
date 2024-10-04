import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import UserModel from './models/user.model.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import validator from 'validator'
import nodemailer from 'nodemailer'
import bodyParser from 'body-parser'


const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

mongoose.connect('mongodb://localhost:27017/employee')

const createToken = (id) => {
	return jwt.sign({ id }, 'shhhhhhhhhhhh')
}

app.post('/register', async (req, res) => {
	try {

		const { name, email, password } = req.body
		// if (!(name && email && password)) {
		//     return res.json({ success: false, message: 'All fiels are required' })
		// }

		// const existingUser = await UserModel.findOne({ email })
		// if (existingUser) {
		//     return res.json({ success: false, message: 'User already exist with this email' })
		// }

		// if (!validator.isEmail(email)) {
		//     return res.json({ success: false, message: 'Please enter a valid email' })
		// }
		// if (password.length < 8) {
		//     return res.json({ success: false, message: 'Please enter at least 9 words' })
		// }

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		const newUser = await UserModel.create({
			name,
			email,
			password: hashedPassword
		})

		const token = createToken(newUser._id)
		res.json({ success: true, message: 'You are registered successfully', token })

	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error.message })
	}
})

app.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await UserModel.findOne({ email })
		const isPassword = await bcrypt.compare(password, user.password)

		if (isPassword) {
			const token = createToken(user._id)
			res.json({ success: true, token })
		} else {
			res.json({ success: false, message: 'Invalid password' })
		}

	} catch (error) {
		console.log(error)
		res.json({ success: false, message: error.message })
	}
})

app.get('/getUsers', async (req, res) => {
	try {
		const { page = 1, limit = 5 } = req.query
		const skip = (page - 1) * limit
		const allUsers = await UserModel.find().skip(skip).limit(Number(limit))
		const total = await UserModel.countDocuments()
		const totalPages = Math.ceil(total / limit)

		res.json({ success: true, allUsers, message: 'All users are fetched', total, totalPages, currentPage: page })
	} catch (error) {
		res.json({ success: false, message: error.message })
	}
})



let verificationCodes = {}
app.post('/send-mail', async (req, res) => {
	const { login, register, name, password, email } = req.body


	if (register ? !(name && email && password) : !(email && password)) {
		return res.json({ success: false, message: 'All fields are required' })
	}

	const existingUser = await UserModel.findOne({ email })
	if (login) {
		if (!existingUser) {
			return res.json({ success: false, message: 'User does not exist with this email' })
		}
	} else {
		if (existingUser) {
			return res.json({ success: false, message: 'User already exist with this email' })
		}
	}

	if (!validator.isEmail(email)) {
		return res.json({ success: false, message: 'Please enter a valid email' })
	}
	if (password.length < 8) {
		return res.json({ success: false, message: 'Please enter at least 9 words' })
	}

	const code = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code

	// Store code in memory (you should use a database in production)
	verificationCodes[email] = code;

	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		auth: {
			user: 'cordell.johns@ethereal.email',
			pass: 'Bh1WmcP94QWgSFaNG8'
		},
	});

	const mailOptions = {
		from: '<raohanzala70.email>', // sender address
		to: email, // list of receivers
		subject: "Email Verification Code", // Subject line
		text: `Your Verificaion code is ${code}`, // plain text body
	}

	try {
		await transporter.sendMail(mailOptions)
		res.json({ success: true, message: 'Verification code sent', code })
	} catch (error) {
		res.json({ success: false, message: 'Error sending email' })
	}

})

app.post('/verify-code', async (req, res) => {
	const { email, code } = req.body;

	if (!code) {
		return res.json({ success: false, message: 'Please enter verification code' })
	}

	if (verificationCodes[email] === code) {
		delete verificationCodes[email]; // Remove code after verification
		res.json({ success: true, message: 'Code verified' });
	} else {
		res.json({ success: false, message: 'Invalid code' });
	}
});


app.listen(3001, () => {
	console.log('Server is running in port 3001')
})


