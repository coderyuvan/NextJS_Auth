import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if ( emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
                    }
                });
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordTokenExpiry: Date.now() + 3600000
                    }
                })
            }
             
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: "078cb9799efc89",
                    pass: "239bc80dc30021"
                }
            });

            const mailOptions = {

                from: 'yuvan@yuvan.ai',
                to: email,
                subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
                text: "Hello world?", // plain text body
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
            }
            const mailResponse = await transport.sendMail(mailOptions)
            console.log(mailResponse)
            return mailResponse
        
    }
    catch (error: any) {
        throw new error(error.message)
    }
}
