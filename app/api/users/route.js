import connectDB from "@/config/database";
import User from "@/models/User";

// GET /api/users
export const GET = async (request) => {
  try {
    await connectDB();

    const users = await User.find({});

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("something went wrong", { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  try {
    await connectDB();

    const email = params.credentials.email;

    const user = await User.findOne({ email });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("something went wrong", { status: 500 });
  }
};
