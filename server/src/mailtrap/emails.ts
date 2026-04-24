import { verify } from "crypto"
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates"
import { mailTrapClient,sender } from "./mailtrap.config"


export const sendVerificationEmail =async(email:string,verificationToken:string)=>{
    const recipient=[{email}]
    try {
        const response = await mailTrapClient.send({
          from: sender,
          to: recipient,
          subject: "Verify your email",
          html: VERIFICATION_EMAIL_TEMPLATE.replace(
            "{verificationCode}",
            verificationToken,
          ),
          category: "Email verification",
        });
        
    } catch (error:any) {
        throw new Error(`Email failed: ${error.message}`);
        
    }
}
export const sendPassowordResertEmail =async(email:string,resetUrl:string)=>{
    const recipient=[{email}]
    try {
        const response = await mailTrapClient.send({
          from: sender,
          to: recipient,
          subject: "Resert your password",
          html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
            "{resetURL}",
            resetUrl,
          ),
          category: "Email password resert",
        });
        
    } catch (error:any) {
        throw new Error(`Email failed: ${error.message}`);
        
    }
}
export const sendPassowordResertSuccessEmail =async(email:string)=>{
    const recipient=[{email}]
    try {
        const response = await mailTrapClient.send({
          from: sender,
          to: recipient,
          subject: "Successfull password resert",
          html:PASSWORD_RESET_SUCCESS_TEMPLATE,
          category: "Email confirmation",
        });
        
    } catch (error:any) {
        throw new Error(`Email failed: ${error.message}`);
        
    }
}