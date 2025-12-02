import { NextResponse } from "next/server";
import * as yup from "yup";

// Validate schema
const userSchema = yup.object().shape({
    username: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().required().min(8)
});

// Endpoint POST
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validData=await userSchema.validate(body)

        // Call mongoose method to save in db
        return NextResponse.json(
            {message: "Not valid user", data:validData},
            {status:200}
        );
    } catch (error:any){
        return NextResponse.json(
            {error: error.message}, {status:400}
        )
    }
}