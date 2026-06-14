const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

async function sendOtpEmail({ to, otp }) {
  const mailOptions = {
    from: process.env.MAIL_FROM || process.env.MAIL_USER,
    to,
    subject: "Kode OTP Reset Password Foodora",
    html: `
      <div style="font-family: Arial, sans-serif; background: #f8f8f1; padding: 32px;">
        <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 18px; padding: 32px; border: 1px solid #e7e8e1;">
          <h2 style="margin: 0 0 12px; color: #0f5d23;">Reset Password Foodora</h2>
          <p style="color: #555; line-height: 1.6;">
            Gunakan kode OTP berikut untuk mengganti password akun Foodora kamu.
          </p>

          <div style="margin: 28px 0; text-align: center;">
            <span style="display: inline-block; font-size: 32px; letter-spacing: 8px; font-weight: 800; color: #0f5d23; background: #eef4e8; padding: 18px 26px; border-radius: 14px;">
              ${otp}
            </span>
          </div>

          <p style="color: #555; line-height: 1.6;">
            Kode ini berlaku selama <b>10 menit</b>. Jangan berikan kode ini kepada siapa pun.
          </p>

          <p style="margin-top: 28px; color: #999; font-size: 13px;">
            Jika kamu tidak meminta reset password, abaikan email ini.
          </p>
        </div>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = {
  sendOtpEmail,
};