import connectDB from "@/config/database";
import Calendar from "@/models/Calendar";

export const PUT = async (request, {params}) => {
    try {
      await connectDB();
  
      const { id } = params;
      const data = await request.json();
  
      // Get calendar to update
      const existingCalendar = await Calendar.findById(id);
  
      //const updateCalendar = new Calendar(data);
      const updatedCalendar = await Calendar.findByIdAndUpdate(id, data);
  
      return new Response(JSON.stringify(updatedCalendar), {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return new Response("something went wrong", { status: 500 });
    }
  };
  