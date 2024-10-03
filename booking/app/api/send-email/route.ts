// app/api/send-email/route.js
import nodemailer from 'nodemailer';

export async function POST(req:any) {
  const { customerEmail, serviceName, meetingTime } = await req.json();
  
  // Verify if all required data is present
  if (!customerEmail || !serviceName || !meetingTime) {
    console.error('Missing required fields:', { customerEmail, serviceName, meetingTime });
    return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
  }

  try {
    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

    const transporter = nodemailer.createTransport({
      service: 'gmail', // or another email service
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    // Verify the transport connection
    await transporter.verify();
    console.log('SMTP connection verified.');

    // Send confirmation email
    const info = await transporter.sendMail({
      from: SMTP_EMAIL,
      to: customerEmail,
      subject: `Booking Confirmation for ${serviceName}`,
      html: `
        <p>Dear Customer,</p>
        <p>Your booking for the service <strong>${serviceName}</strong> is confirmed.</p>
        <p><strong>Meeting Time:</strong> ${meetingTime}</p>
        <p>Thank you for choosing our services.</p>
        <p>Best regards,<br>CrackInterview</p>`,
    });

    console.log('Email sent:', info.messageId);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Error sending email' }), { status: 500 });
  }
}

// // app/api/send-email/route.js
// import nodemailer from 'nodemailer';

// export async function POST(req:any) {
//   const { customerEmail, serviceName, meetingTime } = await req.json();
  
//   // Verify if all required data is present
//   if (!customerEmail || !serviceName || !meetingTime) {
//     console.error('Missing required fields:', { customerEmail, serviceName, meetingTime });
//     return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
//   }

//   try {
//     const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

//     const transporter = nodemailer.createTransport({
//       service: 'gmail', // or another email service
//       auth: {
//         user: SMTP_EMAIL,
//         pass: SMTP_PASSWORD,
//       },
//     });

//     // Verify the transport connection
//     await transporter.verify();
//     console.log('SMTP connection verified.');

//     // Send confirmation email
//     const info = await transporter.sendMail({
//       from: SMTP_EMAIL,
//       to: customerEmail,
//       subject: `Booking Confirmation for ${serviceName}`,
//       html: `
//         <p>Dear Customer,</p>
//         <p>Your booking for the service <strong>${serviceName}</strong> is confirmed.</p>
//         <p><strong>Meeting Time:</strong> ${meetingTime}</p>
//         <p>Thank you for choosing our services.</p>
//         <p>Best regards,<br>Your Company</p>`,
//     });

//     console.log('Email sent:', info.messageId);

//     return new Response(JSON.stringify({ success: true }), { status: 200 });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return new Response(JSON.stringify({ error: 'Error sending email' }), { status: 500 });
//   }
// }

// // app/api/send-email/route.js
// import nodemailer from 'nodemailer';

// export async function POST(req:any) {
//   const { to, name, subject, body } = await req.json();
//   const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

//   console.log('Sending email to:', to);
//   console.log('Subject:', subject);
//   console.log('SMTP_EMAIL:', SMTP_EMAIL);

//   const transport = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: SMTP_EMAIL,
//       pass: SMTP_PASSWORD,
//     },
//   });

//   try {
//     // Verify connection configuration
//     await transport.verify();
//     console.log('SMTP Transport verified.');

//     // Send email
//     // const sendResult = await transport.sendMail({
//     //   from: SMTP_EMAIL,
//     //   to,
//     //   subject,
//     //   html: body,
//     // });
//     const sendResult = await transport.sendMail({
//       from: process.env.SMTP_EMAIL,
//       to: 'syedahafsa772@gmail.com', // Replace with your email
//       subject: 'Test Email',
//       html: `<p>This is a test email from Nodemailer</p>`,
//     });
    

//     console.log('Email sent:', sendResult);
//     return new Response(JSON.stringify({ success: true }), { status: 200 });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     return new Response(JSON.stringify({ error: 'Error sending email' }), { status: 500 });
//   }
// }