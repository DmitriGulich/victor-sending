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
    // let emailTransporter = await createTransporter();

    let nodemailer_setting = {
      // pool: true,
      // host: data.host,
      // port: data.port,
      // secure: data.secure,
      // proxy: data.proxy,
      // auth: {
      //     user: data.user,
      //     pass: data.password
      // },
      // tls: {
      //     rejectUnauthorized: false
      // }

      host: 'Mail.digitextt.com',
      port: 587,
      auth: {
          user: 'test@digitextt.com',
          pass: 'Qwerty123@@!!'
      }
  };
  
     let transporter = nodemailer.createTransport(nodemailer_setting);

    console.log('created transport');
    // await emailTransporter.sendMail(emailOptions);
    transporter.sendEmail(emailOptions);
    console.log('sent');
};

