const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const { createTransport } = require("nodemailer");

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
  
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
  
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });

    console.log(accessToken);
  
    const transporter = createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    return transporter;
};

exports.sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter();
    console.log('created transport');
    await emailTransporter.sendMail(emailOptions);
    console.log('sent');
};

