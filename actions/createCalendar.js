"use server";
import connectDB from "@/config/database";
import Calendar from "@/models/Calendar";
import { getSessionUser } from "@/utils/getSessionUser";

async function createNewCalendar(data) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return { error: "You must be logged in to create a match" };
  }

  const { user } = sessionUser;

  const newCalendar = new Calendar({
    name: data.name,
    days: data.days,
    userSelections: data.userSelections,
  });

  await newCalendar.save();

  return { submitted: true };
}

export default createNewCalendar;
