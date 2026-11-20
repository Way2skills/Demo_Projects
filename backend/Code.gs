function doPost(e) {
  try {
    const data = JSON.parse(e && e.postData ? e.postData.contents : "{}");
    console.log("Contact confirmation request received");
    const expectedSecret = PropertiesService.getScriptProperties()
      .getProperty("APPS_SCRIPT_SHARED_SECRET");

    if (!expectedSecret || data.secret !== expectedSecret) {
      console.warn("Contact confirmation rejected: script secret missing or mismatch");
      return jsonResponse({ ok: false, error: "Unauthorized" });
    }

    const email = String(data.email || "").trim();
    const name = String(data.name || "").trim();
    const subject = String(data.subject || "").trim();
    const message = String(data.message || "").trim();
    if (!email || !name || !subject || !message) {
      console.warn("Contact confirmation rejected: required fields missing");
      return jsonResponse({ ok: false, error: "Missing required contact details" });
    }

    const safeName = escapeHtml(name);
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");
    console.log("Calling MailApp.sendEmail");
    MailApp.sendEmail({
      to: email,
      subject: "We received your message — Decode Institution",
      body:
        "Hello " + name + ",\n\n" +
        "We received your message about \"" + subject + "\". Our team will get back to you soon.\n\n" +
        "Your message:\n" + message + "\n\n" +
        "Decode Institution",
      htmlBody:
        "<p>Hello " + safeName + ",</p>" +
        "<p>We received your message about <strong>" + safeSubject +
        "</strong>. Our team will get back to you soon.</p>" +
        "<p>Your message:<br>" + safeMessage + "</p>" +
        "<p>Decode Institution</p>"
    });

    console.log("MailApp.sendEmail call completed");
    return jsonResponse({ ok: true });
  } catch (error) {
    console.error("Contact confirmation email failed: " + error.name);
    return jsonResponse({ ok: false, error: "Email delivery failed" });
  }
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, function (character) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }[character];
  });
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}