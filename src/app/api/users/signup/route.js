import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/uerModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
 
        // check if user already exists
        const user = await User.findOne({ email });
        if(user) {
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }
        console.log("this is user", user);
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });


        const savedUser = await newUser.save();
        
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })

    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}