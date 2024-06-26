import connectDB from "@/config/database";
import { NextResponse } from "next/server";
import User from "@/models/User";
import bcrypt from "bcrypt";

export const POST = async (request) => {
  const { displayName, email, password } = await request.json();

  await connectDB();
  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = new User({
    password: hashedPassword,
    email,
    username: displayName,
    image: "",
    role: "user",
    displayName,
  });

  try {
    const res = await newUser.save();
    return new NextResponse("User has been created", { status: 201 });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
