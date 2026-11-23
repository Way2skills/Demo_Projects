# Google Apps Script enquiry email setup

The Contact form sends submissions to the Next.js `/api/contact` route. That server-only route forwards validated enquiries to the Apps Script Web App and only reports success when the script returns JSON with `success: true` after `MailApp.sendEmail()` completes.

## 1. Create and authorize the Apps Script

1. Create a new project at [script.google.com](https://script.google.com).
2. Replace the editor contents with the code in [`Code.gs`](./Code.gs), then save the project.
3. Generate a long random shared secret locally. For example, run this from PowerShell:

   ```powershell
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. In **Project Settings → Script properties**, add:
   - Property: `APP_SHARED_SECRET`
   - Value: the generated secret
5. In the editor, select `authorizeEmailAccess` and click **Run**. Review and grant the requested email permission while signed into the Google account that will send the acknowledgements.

## 2. Deploy as a Web App

1. Select **Deploy → New deployment** and choose **Web app**.
2. Set **Execute as** to **Me**.
3. Set **Who has access** to **Anyone**. The script additionally requires the shared secret, which is only sent by the server-side Next.js route.
4. Deploy and copy the Web App URL ending in `/exec`.

If you update the script later, create a new deployment version or edit the existing deployment to use the new version.

## 3. Configure Next.js

1. Copy `.env.example` to `.env.local`.
2. Set the deployed URL and the same generated secret:

   ```dotenv
   GOOGLE_APPS_SCRIPT_WEB_APP_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
   GOOGLE_APPS_SCRIPT_SHARED_SECRET=your-generated-secret
   ```

3. Keep `.env.local` private; never commit it or use a `NEXT_PUBLIC_` prefix for either value.
4. Restart the Next.js server after changing environment variables.

Run the app with `npm run dev`. The form submits to `/api/contact`; invalid fields, an unavailable service, or an Apps Script/email error produce an error message and leave the form contents intact. The form is cleared and the success notification is shown only after the Apps Script confirms the email send.

Apps Script's Content Service may return HTTP 200 for application-level errors, so the Next.js route also checks the returned JSON `success` value rather than treating an HTTP response alone as success.
