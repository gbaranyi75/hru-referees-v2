"use server";

import connectDB from "@/config/database";
import User from "@/models/User";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
import { Resend } from "resend";
//import ResetPasswordEmailMsg from "@/components/ResetPasswordEmailMsg";

const resend = new Resend(process.env.RESEND_API_KEY);

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
        user: process.env.MAILER_USER, //"hrureferees.hu@gmail.com",
        pass: process.env.MAILER_PASS, //"fmlutfdtwaclqcly",
      },
    });
    console.log("Token ", token);
    const htmlBody = `Kattints ide a jelszó  helyreállításához! <a href="${domain}/jelszo-helyreallitas/${token}"> Jelszó helyreállítása</a>`;
    //const htmlBody = <ResetPasswordEmailMsg domain={domain} token={token} />;
    const message = {
      from: '"HRU Referees" <bgabor91@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Jelszó helyreállítás", // Subject line
      text: "Új jelszó", // plain text body
      html: htmlBody, // html body
    };

    const info = await transporter.sendMail(message);
    const res = await User.findOneAndUpdate(
      { email: email },
      { verifyToken: token }
    );
    console.log(res.verifyToken);
    return res.verifyToken;
  } else {
    console.log("user does not exist", result);
    return result;
  }
}
