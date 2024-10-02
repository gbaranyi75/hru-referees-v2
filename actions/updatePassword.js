"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function updatePassword({ password, token }) {
  await connectDB();
  const salt = await bcrypt.genSalt(8);
  const passwordHashed = await bcrypt.hash(password, salt);
  await User.findOneAndUpdate(
    { verifyToken: token },
    { password: passwordHashed }
  );
  redirect("/auth/belepes");
}
