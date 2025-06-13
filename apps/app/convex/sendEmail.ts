import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { SES_ROLE_ID, SES_ROLE_SECRET } from "./env";

const ses = new SESClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: SES_ROLE_ID || "",
    secretAccessKey: SES_ROLE_SECRET || "",
  },
});

type Payload = {
  to: string[];
  subject: string;
  html: string;
};

export const triggerEmailSend = async (data: Payload) => {
  console.log("Sending email", data);
  console.log("SES Role ID", SES_ROLE_ID);
  console.log("SES Role Secret", SES_ROLE_SECRET);

  const params = {
    Source: "noreply@lucidforms.co",
    Destination: {
      ToAddresses: data.to,
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: data.html,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: data.subject,
      },
    },
  };

  const command = new SendEmailCommand(params);

  try {
    let response = await ses.send(command);
    // process data.
    return response;
  } catch (error) {
    // error handling.
    console.log(error);
    throw new Error("Email sending failed");
  }
};
