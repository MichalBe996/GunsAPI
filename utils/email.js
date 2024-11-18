const nodemailer = require("nodemailer")


const  sendEmail = async options => {
    // 1) Create a transporter (service that actually sends an email)
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }

        // Activate in gmail "less secure app" option
    })




    // 2) Define email options

    const mailOptions = {
        from: "Michal Bielawski <michal.bielawski@hotmail.com>",
        to: options.email,
        subject: options.subject,
        text: options.message,
        // html: 
        
    }



    // 3) Send the email with nodemailer
   await transporter.sendMail(mailOptions)
}


module.exports = sendEmail;