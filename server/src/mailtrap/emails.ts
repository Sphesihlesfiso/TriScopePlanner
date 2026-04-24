import { verify } from "crypto"
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates"
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