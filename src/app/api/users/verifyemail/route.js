const { connect } = require("@/dbConfig/dbConfig");
const { default: User } = require("@/models/uerModel");
const { NextRequest, NextResponse } = require("next/server");

connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const token = reqBody;
        console.log(token);
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}