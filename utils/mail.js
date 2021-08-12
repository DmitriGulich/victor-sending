const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { createTransport } = require("nodemailer");

const createTransporter = async () => {
    
  const transporter = createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'valloon91105@gmail.com',
      pass: 'valloon91105!@#'
    }
  })
  

    return transporter;
};

exports.sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();

  
    console.log('created transport');
    await emailTransporter.sendMail(emailOptions);

    console.log('sent');
};

