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
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: "7d19de003@smtp-brevo.com",
        pass: "PGZnSdgQyfsBYch5",
      },
    });
    console.log("Token ", token);
    //console.log(transporter)
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
    //console.log(res);
    return res.verifyToken;
  } else {
    console.log("user does not exist", result);
    return result;
  }
}
