import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from 'next/server'
connect()

export async function GET(request: NextRequest) {
     try {
        const response= NextResponse.json({
            message:"Logged Out Succesfully",
            success: true
        })
        response.cookies.set("token","",{
            httpOnly: true,
            expires: new Date(0) // expires immediately
        })
        return response;
     } catch (error:any) {
        return NextResponse.json({
            error: error.message,
            success: false
        },{status: 500})
     }
}