const nodeMailer = require('nodemailer');

// Sending token via email
const sendEmail = async options => {

    const transport = nodeMailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "9d4d36c5e068e9",
            pass: "f8f3e7dd4cab16"
        }
    });

    // Message options
    const message = {
        from: "Supermasters bookstore Store <noreply@supermasters.com>",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transport.sendMail(message)
}
module.exports = sendEmail;



