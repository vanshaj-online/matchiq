import { User } from "@/models/user.model"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/db"

export async function POST(req: Request) {
    try {
        await connectDB()
        const body = await req.json()

        const { name, email, password } = body

        if (!name || !email || !password) {
            return Response.json({
                success: false,
                message: "All fields are required",
            }, { status: 400 })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return Response.json({
                success: false,
                message: "User already exists",
            }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            passwordHash: hashedPassword
        })

        return Response.json({
            success: true,
            message: "User created successfully",
            user
        },
            { status: 201 }
        )

    }
    catch (error) {
        console.log(error)
        return Response.json({
            success: false,
            message: "Internal server error",
        }, { status: 500 })
    }

}