import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendEmail=async (options)=>{
    const mailGenerator=new Mailgen({
        theme:"default",
        product:{
            name:"Task Manager",
            link:"https://taskmanagerlink.com"
        }
    })
    var emailHTML=mailGenerator.generate(options.mailgenContent);
    var emailTextual=mailGenerator.generatePlaintext(options.mailgenContent);
    var transporter = nodemailer.createTransport({
                host: process.env.MAILTRAP_SMTP_HOST,
                port: process.env.MAILTRAP_SMTP_PORT,
                auth: {
                    user: process.env.MAILTRAP_SMTP_USER,
                    pass: process.env.MAILTRAP_SMTP_PASS
                }
        });
    const mail={
        from:"mail.taskmanager@example.com",
        to:options.email,
        subject:options.subject,
        text:emailTextual,
        html:emailHTML,
    }
    try{
        await transporter.sendMail(mail)
    }catch(error){
        console.error("Email service failed siliently. Make sure that you have provided your MAILTRAP crendetails in the .env file");
        console.log("Error",error);
    }
}


const emailVerificationMailgenContent=(username,verificationLink)=>{
    return {
    body:{
        name:username,
        intro:"Welcome to the application created by Sarat Satya! We're excited to have you on board",
        action:{
            instructions:"To get started with the application, please click here ",
            button:{
                color:"#1aae5aff",
                text:'Confirm your account',
                link:verificationLink
            }
        },
        outro:"Need help, or have questions? Just reply to this email, we'd love to help."
    }
    }
}

const forgotPasswordMailgenContent=(username,passwordResetUrl)=>{
    return {
        body:{
            name: username,
            intro: "You have received this email because a password reset request for your account was received",
            action:{
                instructions:"Click the button below to reset your password",
                button:{
                    color:"#1aae5aff",
                    text:'Reset your password',
                    link:passwordResetUrl
                }
            },
            outro:"If you did not request a password reset, no further action is required on your part"
        }
    }
}

export{
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
}