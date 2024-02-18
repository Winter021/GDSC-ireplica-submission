const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER, // sender gmail and password
        pass: process.env.APP_PASSWORD,
    },
});

const mailOptions = {
    from: {
        name: "iReplica",
        address: process.env.USER
    },
    to: [],
    subject: "iReplica Product Buying Request OTP",
    text: "Hello world",
    html: "",
    // attachments: [
    //     {
    //         filename: 'test.pdf',
    //         path: path.join(__dirname, 'test.pdf'),
    //         contentType: 'application/pdf'
    //     },
    //     {
    //         filename: 'sample.jpg',
    //         path: path.join(__dirname, 'test.pdf'),
    //         contentType: 'image/jpg'
    //     }
    // ]
};

const sendMail = async (Gotp, ownerEmail,thash) => {
    mailOptions.html = ` <b> ${Gotp} </b> is your otp for the transaction : ${thash}  `;
    mailOptions.to.push(`${ownerEmail}`);

    const finalmailOptions = { ...mailOptions }; // Create a copy to avoid modifying the original object

    try {
        const transpresp = await transporter.sendMail(finalmailOptions);
        console.log("EMAIL SENT SUCCESS : ", transpresp);
    } catch (err) {
        console.log("Sendmail.js /Send mail function err", err);
    }
};

// export { transporter, mailOptions, sendMail };
module.exports = { transporter, mailOptions, sendMail };
