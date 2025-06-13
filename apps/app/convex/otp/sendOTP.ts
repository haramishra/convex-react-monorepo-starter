"use node";
import { Email } from "@convex-dev/auth/providers/Email";
import { generateRandomString } from "@oslojs/crypto/random";
import type { RandomReader } from "@oslojs/crypto/random";
import { triggerEmailSend } from "@cvx/sendEmail";
import { VerificationCodeEmailHtml } from "./verificationEmail";

const SendEmailOTP = Email({
  id: "EmailProvider",
  maxAge: 60 * 20,
  async generateVerificationToken() {
    const alphabet = "0987654321";
    const random: RandomReader = {
      read(bytes) {
        crypto.getRandomValues(bytes);
      },
    };
    const code = generateRandomString(random, alphabet, 6);
    console.log(`Generated OTP code: ${code}`);
    return code;
  },
  async sendVerificationRequest({
    identifier: email,
    provider,
    token,
    expires,
  }) {
    console.log("Sending OTP Email");

    await triggerEmailSend({
      to: [email],
      subject: "Please enter the one time password to login your account",
      html: VerificationCodeEmailHtml(token),
    })
      .then(() => console.log("Sent email", [email]))
      .catch((error) => console.error("Error sending email ", error));
  },
});

export default SendEmailOTP;
