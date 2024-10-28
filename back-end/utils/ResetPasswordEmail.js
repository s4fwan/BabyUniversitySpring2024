const resetPasswordEmail = (otp) => `
<html>
  <body>
    <p>We received a request to reset your password for your Baby University account. To proceed, please use the following One-Time Passcode (OTP):</p>
    
    <p style="font-size: 24px; font-weight: bold; color: #333;">${otp}</p>

    <p>This code is valid for the next 5 minutes. Please enter it on the password reset page to verify your identity.</p>
    
    <p>If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.</p>
    
    <p>Best regards, <br/> The Baby University Team</p>
  </body>
</html>
`;

module.exports = resetPasswordEmail;