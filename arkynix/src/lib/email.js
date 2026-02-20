import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendMail({ to, subject, html }) {
  return transporter.sendMail({
    from: `" Contact" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  })
}
