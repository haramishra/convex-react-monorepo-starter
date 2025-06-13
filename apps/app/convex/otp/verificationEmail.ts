export const VerificationCodeEmailHtml = (code: string) =>
  `
<body style="margin:auto;background-color:rgb(255,255,255);padding-left:0.5rem;padding-right:0.5rem;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:465px;margin-left:auto;margin-right:auto;margin-top:40px;margin-bottom:40px;border-radius:0.25rem;border-width:1px;border-style:solid;border-color:rgb(234,234,234);padding:20px">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px">
              <tbody>
                <tr>
                  <td><img alt="lucid forms logo" height="40" src="https://res.cloudinary.com/dq1btdcg9/image/upload/v1723314527/lucid-forms-icon-dark_eivu1z.png" style="display:block;outline:none;border:none;text-decoration:none;margin-left:auto;margin-right:auto;margin-top:0px;margin-bottom:0px" width="40" /></td>
                </tr>
              </tbody>
            </table>
            <h1 style="margin-left:0px;margin-right:0px;margin-top:30px;margin-bottom:30px;padding:0px;text-align:center;font-size:24px;font-weight:400;color:rgb(0,0,0)">Verify your email address</h1>
            <hr style="width:100%;border:none;border-top:1px solid #eaeaea;margin-left:0px;margin-right:0px;margin-top:26px;margin-bottom:26px;border-width:1px;border-style:solid;border-color:rgb(234,234,234)" />
            <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Hello,</p>
            <p style="font-size:14px;line-height:24px;margin:16px 0;color:rgb(0,0,0)">Enter the following code to verify your email address.</p>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="margin-top:32px;margin-bottom:32px;text-align:center">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:1.5rem;line-height:2rem;margin:16px 0;border-radius:0.25rem;background-color:rgb(209,213,219);padding:0.5rem;letter-spacing:0.6rem">${code}</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size:10px;line-height:22px;margin:16px 0;color:rgb(156,163,175)">©️ <!-- -->2024<!-- --> <a href="https://kohi.studio" style="color:#067df7;text-decoration:none" target="_blank">Kohi Labs</a> . All Rights Reserved</p>
                    <p style="font-size:10px;line-height:22px;margin:16px 0;color:rgb(156,163,175)">Have questions? Get in touch at<!-- --> <a href="mailto:support@lucidforms.co" style="color:#067df7;text-decoration:none" target="_blank">support@lucidforms.co</a></p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>`;
