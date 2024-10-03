"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";

export async function mailAction({ email, domain }) {
  await connectDB();
  const result = await User.findOne({ email });
  if (result) {
    const token = nanoid(32);
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILER_USER, //"hrureferees.hu@gmail.com",
        pass: process.env.MAILER_PASS, //"fmlutfdtwaclqcly",
      },
    });
    console.log("Token ", token);
    const htmlBody = `Kattints ide a jelszó  helyreállításához! <a href="${domain}/jelszo-helyreallitas/${token}"> Jelszó helyreállítása</a>`;
    const message = {
      from: '"HRU Referees" <bgabor91@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Jelszó helyreállítás", // Subject line
      text: "Új jelszó", // plain text body
      html: htmlBody, // html body
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log("Error occurred. " + err.message);
        return process.exit(1);
      }
      console.log("Message sent: %s", info.messageId);
    });

    const res = await User.findOneAndUpdate(
      { email: email },
      { verifyToken: token }
    );
    return res.verifyToken;
  } else {
    console.log("user does not exist", result);
    return result;
  }
}
