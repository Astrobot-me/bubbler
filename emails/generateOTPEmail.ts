export interface OtpEmailData {
  email: string;
  username: string;
  otp: string;
}

// utils/email-templates.ts
export default function generateOtpEmailHtml({
  email,
  username,
  otp,
}: OtpEmailData): string {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Login OTP</title>
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              font-family: system-ui, -apple-system, sans-serif;
            }
            .container {
              margin: 16px auto;
              max-width: 600px;
            }
            .image {
              width: 100%;
              border-radius: 12px;
              object-fit: cover;
              height: 320px;
            }
            .content {
              margin-top: 32px;
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .subtitle {
              margin-top: 16px;
              font-size: 18px;
              font-weight: 600;
              line-height: 28px;
              color: #4F46E5;
            }
            .title {
              font-size: 36px;
              font-weight: 600;
              line-height: 40px;
              letter-spacing: 0.4px;
              color: #111827;
            }
            .warning {
              margin-top: 8px;
              font-weight: 700;
              font-size: 20px;
              line-height: 24px;
              color: #111827;
            }
            .otp {
              font-size: 70px;
              font-weight: 600;
              text-align: center;
              line-height: 40px;
              letter-spacing: 0.4px;
              color: #000000;
              margin-top: 32px;
            }
            .username {
              font-style: italic;
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img
              alt="Braun Collection"
              class="image"
              src="https://i.imgur.com/222iK9F.gif"
            />
            <div class="content">
              <div class="subtitle">
                Bubbler Login One Time Password
              </div>
              <div class="title">
                Email ${email}<br/>
                Username <span class="username">${username}</span>
              </div>
              <div class="warning">
                Please don't share this otp with anyone, Keep Your otp Secured
              </div>
              <div class="otp">
                ${otp}
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
}
