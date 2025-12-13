import { NextResponse } from "next/server"

export async function POST(){
	console.log("hello formPOST")

	return NextResponse.json({ success: true })
}