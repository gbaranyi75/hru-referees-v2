import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { NextResponse } from "next/server";

// GET /api/users/:userId
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const userId = params.id;

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const user = await User.findById(userId);
    if (user === null) {
      return new NextResponse("Nincs ilyen ID", { status: 500 });
    }
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};

// Update user
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;
    const data = await request.json();

    // Get user to update
    const existingCalendar = await User.findById(id);

    const updatedUser = await User.findByIdAndUpdate(id, data);

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("something went wrong", { status: 500 });
  }
};
