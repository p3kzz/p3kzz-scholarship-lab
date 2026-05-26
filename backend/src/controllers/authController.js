const prisma = require("../lib/prisma")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

const crypto = require("crypto")

const JWT_SECRET = process.env.JWT_SECRET

const { OAuth2Client } = require("google-auth-library")
const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
)

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // CHECK EMAIL
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered",
            })
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10)

        // CREATE USER
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

        return res.status(201).json({
            message: "Register berhasil",

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            message: "Internal server error",
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        // CEK USER
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (!user) {
            return res.status(400).json({
                message: "Email atau password salah",
            })
        }

        // CEK PASSWORD
        const isMatch = await bcrypt.compare(
            password,
            user.password
        )

        if (!isMatch) {
            return res.status(400).json({
                message: "Email atau password salah",
            })
        }

        // GENERATE JWT
        const token = jwt.sign(
            {
                userId: user.id,
            },

            JWT_SECRET,

            {
                expiresIn: "7d",
            }
        )

        return res.status(200).json({
            message: "Login berhasil",

            token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            message: "Internal server error",
        })
    }
}

exports.googleLogin = async (req, res) => {
    try {
        const { credential } = req.body

        // VERIFY TOKEN GOOGLE
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        })

        // AMBIL DATA USER GOOGLE
        const payload = ticket.getPayload()

        const {
            email,
            name,
            picture,
        } = payload

        // CEK USER
        let user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        // JIKA BELUM ADA → CREATE
        if (!user) {
            user = await prisma.user.create({
                data: {
                    name,
                    email,

                    password: await bcrypt.hash(
                        crypto.randomUUID(),
                        10
                    )
                },
            })
        }

        // GENERATE JWT INTERNAL
        const token = jwt.sign(
            {
                userId: user.id,
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d",
            }
        )

        return res.status(200).json({
            message: "Google login berhasil",

            token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        })

    } catch (error) {
        console.error(error)

        return res.status(500).json({
            message: "Google authentication failed",
        })
    }
}