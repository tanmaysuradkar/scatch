const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

module.exports.sendEmail = async ({ email, emailType, user }) => {
    try {
        console.log(user)
        // create a hased token
        const hashedToken = await user.generateAuthToken();
        if (emailType === "VERIFY") {
            await UserModel.findByIdAndUpdate(user,
                { $set: { verifiedToken: hashedToken, verifiedTokenExpiry: Date.now() + 3600000 } })
        } else if (emailType === "RESET") {
            await UserModel.findByIdAndUpdate(user,
                { $set: { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 } })
        }
        console.log("hashed token", hashedToken + " emailType: " + emailType);
        let transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "4d3fdd70a950fe",
              pass: "81ce72804460a9"
            }
        });
        const mailOptions = {
            from: 'tanmaysuradkar2008@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.frontentURL}verified/token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br>${process.env.frontentURL}verified?token=${hashedToken}
            </p>`
        }
        const mailresponse = await transport.sendMail(mailOptions);
        return mailresponse;

    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error(error.message);
    }
};
