// import nodemailer from "nodemailer";

// export default async function sendEmail(to, subject, text) {
//   const transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: Number(process.env.MAIL_PORT),
//     secure: false,
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS
//     }
//   });

//   await transporter.sendMail({
//     from: process.env.MAIL_FROM,
//     to,
//     subject,
//     text
//   });
// }

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER, // Usually your Brevo login email
    pass: process.env.BREVO_SMTP_KEY, // SMTP Key from Brevo
  },
});

export const sendOtpEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.BREVO_USER,
    to: email,
    subject: "Your OTP Code",
    html: `<h2>Your OTP is: ${otp}</h2>`,
  });
};