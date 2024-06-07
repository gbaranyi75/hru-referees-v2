import connectDB from "@/config/database";
import Calendar from "@/models/Calendar";

// GET /api/dashboard/calendar
export const GET = async (request) => {
  try {
    await connectDB();

    const calendars = await Calendar.find({});

    return new Response(JSON.stringify(calendars), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("something went wrong", { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const data = await request.json();
    const newCalendar = new Calendar(data);
    const createdCalendar = await newCalendar.save();

    return new Response(JSON.stringify(createdCalendar), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("something went wrong", { status: 500 });
  }
};
