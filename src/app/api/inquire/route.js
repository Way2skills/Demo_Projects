const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzlexnylkT5fkn5PLHCiJBFwnN8SAjz6__hTFkuZvZHyPBgL5no3ct1s2Noec56eyXxWQ/exec";

const SUBMISSION_ERROR =
  "We couldn't send your message. Please try again later.";

export async function POST(request) {
  let formData;

  try {
    formData = await request.formData();
  } catch {
    return Response.json(
      { ok: false, error: "The inquiry form data is invalid." },
      { status: 400 },
    );
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    !message.trim() ||
    name.length > 200 ||
    email.length > 254 ||
    message.length > 5000
  ) {
    return Response.json(
      { ok: false, error: "Enter a valid name, email address, and message." },
      { status: 400 },
    );
  }

  const body = new URLSearchParams({
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  });

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      redirect: "follow",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Google Apps Script inquiry request returned HTTP ${response.status}.`,
      );
      return Response.json(
        { ok: false, error: SUBMISSION_ERROR },
        { status: 502 },
      );
    }

    if (
      !response.headers
        .get("content-type")
        ?.toLowerCase()
        .includes("application/json")
    ) {
      console.error("Google Apps Script returned a non-JSON inquiry response.");
      return Response.json(
        { ok: false, error: SUBMISSION_ERROR },
        { status: 502 },
      );
    }

    let result;
    try {
      result = await response.json();
    } catch (error) {
      console.error("Could not parse the Google Apps Script response.", error);
      return Response.json(
        { ok: false, error: SUBMISSION_ERROR },
        { status: 502 },
      );
    }

    if (result?.success !== true) {
      console.error("Google Apps Script did not confirm the inquiry submission.");
      return Response.json(
        { ok: false, error: SUBMISSION_ERROR },
        { status: 502 },
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Google Apps Script inquiry request failed.", error);
    return Response.json(
      { ok: false, error: SUBMISSION_ERROR },
      { status: 502 },
    );
  }
}
