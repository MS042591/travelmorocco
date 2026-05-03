import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, tour, travelers, timing, requests, type } = body;

    // Use environment variables for security
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.travelmorocco.co',
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'contact@travelmorocco.co',
        pass: process.env.SMTP_PASSWORD, // Must be set in Vercel/Environment
      },
    });

    let emailHtml = '';
    let emailSubject = '';

    if (type === 'booking') {
      emailSubject = `New Booking Request: ${tour}`;
      emailHtml = `
        <h2>New Booking Request</h2>
        <p><strong>Tour:</strong> ${tour}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Travelers:</strong> ${travelers}</p>
        <p><strong>Timing:</strong> ${timing}</p>
        <p><strong>Special Requests:</strong> ${requests}</p>
      `;
    } else {
      emailSubject = `New Contact Inquiry: ${subject || 'General Inquiry'}`;
      emailHtml = `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `;
    }

    const mailOptions = {
      from: `"Travel Morocco Website" <${process.env.SMTP_USER || 'contact@travelmorocco.co'}>`,
      to: 'contact@travelmorocco.co',
      replyTo: email,
      subject: emailSubject,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('SMTP Error:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
  }
}
