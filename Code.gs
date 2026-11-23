function authorizeEmailAccess() {
  MailApp.getRemainingDailyQuota();
}

function doPost(event) {
  try {
    var rawBody = event && event.postData && event.postData.contents;
    if (typeof rawBody !== 'string' || rawBody.length > 12000) {
      return jsonResponse({ success: false, error: 'Invalid request.' });
    }

    var submission;
    try {
      submission = JSON.parse(rawBody);
    } catch (error) {
      return jsonResponse({ success: false, error: 'Invalid request.' });
    }

    if (!submission || typeof submission !== 'object' || Array.isArray(submission)) {
      return jsonResponse({ success: false, error: 'Invalid request.' });
    }

    var expectedSecret = PropertiesService.getScriptProperties().getProperty('APP_SHARED_SECRET');
    if (
      !expectedSecret ||
      typeof submission.secret !== 'string' ||
      submission.secret !== expectedSecret
    ) {
      return jsonResponse({ success: false, error: 'Unauthorized request.' });
    }

    var enquiry = validateEnquiry(submission);
    if (!enquiry) {
      return jsonResponse({
        success: false,
        error: 'Please provide valid values for all required fields.',
      });
    }

    if (MailApp.getRemainingDailyQuota() < 1) {
      return jsonResponse({
        success: false,
        error: 'The acknowledgement email service is temporarily unavailable.',
      });
    }

    MailApp.sendEmail({
      to: enquiry.email,
      subject: 'Thank You for Reaching THEMO TILE!',
      body: plainTextEmail(enquiry.name),
      htmlBody: htmlEmail(enquiry.name),
      name: 'THEMO TILE Team',
    });

    return jsonResponse({ success: true });
  } catch (error) {
    console.error('THEMO TILE enquiry email failed.', error);
    return jsonResponse({
      success: false,
      error: 'The acknowledgement email could not be sent. Please try again later.',
    });
  }
}

function validateEnquiry(value) {
  if (
    typeof value.name !== 'string' ||
    typeof value.phone !== 'string' ||
    typeof value.email !== 'string' ||
    typeof value.message !== 'string'
  ) {
    return null;
  }

  var enquiry = {
    name: value.name.trim(),
    phone: value.phone.trim(),
    email: value.email.trim(),
    message: value.message.trim(),
  };
  var phonePattern = /^(?=(?:\D*\d){7,})[\d+ -]{7,20}$/;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    enquiry.name.length < 1 ||
    enquiry.name.length > 120 ||
    !phonePattern.test(enquiry.phone) ||
    enquiry.email.length > 254 ||
    !emailPattern.test(enquiry.email) ||
    enquiry.message.length < 1 ||
    enquiry.message.length > 5000
  ) {
    return null;
  }

  return enquiry;
}

function plainTextEmail(name) {
  return [
    'Hello ' + name + ',',
    '',
    'Thank you for reaching out to the THEMO TILE team!',
    '',
    'Your message has been recorded successfully. We truly appreciate your interest in our tiles and services.',
    '',
    'Our team will contact you through a phone call within 2–3 working days to assist you with your enquiry.',
    '',
    'Thank you for choosing THEMO TILE. We look forward to serving you!',
    '',
    'Warm Regards,',
    'THEMO TILE Team',
    '',
    'Salem Road, Namakkal - 637001',
    'Phone: 63812 43416',
  ].join('\n');
}

function htmlEmail(name) {
  var safeName = escapeHtml(name);

  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>',
    '<body style="margin:0;padding:32px 12px;background:#f4f1ea;font-family:Arial,Helvetica,sans-serif;color:#141b2d;">',
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:0 auto;background:#ffffff;border:1px solid #e8e4dc;">',
    '<tr><td style="height:5px;background:#ff5a4e;font-size:0;line-height:0;">&nbsp;</td></tr>',
    '<tr><td style="padding:34px 38px 12px;">',
    '<p style="margin:0;color:#ff5a4e;font-size:12px;font-weight:bold;letter-spacing:2px;">THEMO TILE</p>',
    '<h1 style="margin:18px 0 24px;font-family:Georgia,serif;font-size:30px;font-weight:normal;line-height:1.25;color:#141b2d;">Thank you for reaching out.</h1>',
    '<p style="margin:0 0 16px;font-size:15px;line-height:1.7;">Hello ' + safeName + ',</p>',
    '<p style="margin:0 0 16px;font-size:15px;line-height:1.7;">Thank you for reaching out to the THEMO TILE team!</p>',
    '<p style="margin:0 0 16px;font-size:15px;line-height:1.7;">Your message has been recorded successfully. We truly appreciate your interest in our tiles and services.</p>',
    '<p style="margin:0 0 16px;font-size:15px;line-height:1.7;">Our team will contact you through a phone call within <strong>2–3 working days</strong> to assist you with your enquiry.</p>',
    '<p style="margin:0 0 24px;font-size:15px;line-height:1.7;">Thank you for choosing THEMO TILE. We look forward to serving you!</p>',
    '<p style="margin:0 0 6px;font-size:15px;line-height:1.7;">Warm Regards,</p>',
    '<p style="margin:0;font-size:15px;font-weight:bold;line-height:1.7;">THEMO TILE Team</p>',
    '</td></tr>',
    '<tr><td style="padding:18px 38px 30px;border-top:1px solid #eeeae2;">',
    '<p style="margin:0;color:#6b6d72;font-size:13px;line-height:1.8;">Salem Road, Namakkal - 637001<br>Phone: <a href="tel:+916381243416" style="color:#141b2d;text-decoration:none;">63812 43416</a></p>',
    '</td></tr>',
    '</table>',
    '</body>',
    '</html>',
  ].join('');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
