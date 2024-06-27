import connectDB from "@/config/database";
import Calendar from "@/models/Calendar";

// Update calendar
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;
    const data = await request.json();

    // Get calendar to update
    const existingCalendar = await Calendar.findById(id);

    const updatedCalendar = await Calendar.findByIdAndUpdate(id, data);

    return new Response(JSON.stringify(updatedCalendar), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("something went wrong", { status: 500 });
  }
};

// Delete calendar
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const calendar = await Calendar.findById(id);
    if (!calendar) return new Response("Calendar not found", { status: 404 });

    const updatedCalendar = await calendar.deleteOne();

    return new Response(JSON.stringify(updatedCalendar), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
  }
};
