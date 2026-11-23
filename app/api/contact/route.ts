interface ContactSubmission {
  name: string
  phone: string
  email: string
  message: string
}

const MAX_REQUEST_LENGTH = 12_000
const PHONE_PATTERN = /^(?=(?:\D*\d){7,})[\d+ -]{7,20}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function errorResponse(status: number, error: string) {
  return Response.json({ success: false, error }, { status })
}

function validateSubmission(value: unknown): ContactSubmission | null {
  if (!isRecord(value)) return null

  const { name, phone, email, message } = value
  if (
    typeof name !== 'string' ||
    typeof phone !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string'
  ) {
    return null
  }

  const submission = {
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim(),
    message: message.trim(),
  }

  if (
    submission.name.length < 1 ||
    submission.name.length > 120 ||
    !PHONE_PATTERN.test(submission.phone) ||
    submission.email.length > 254 ||
    !EMAIL_PATTERN.test(submission.email) ||
    submission.message.length < 1 ||
    submission.message.length > 5000
  ) {
    return null
  }

  return submission
}

export async function POST(request: Request) {
  const contentType = request.headers.get('content-type')?.toLowerCase() ?? ''
  if (!contentType.includes('application/json')) {
    return errorResponse(415, 'Please submit the enquiry using the contact form.')
  }

  const contentLength = Number(request.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_LENGTH) {
    return errorResponse(413, 'Your message is too long. Please shorten it and try again.')
  }

  let rawBody: string
  try {
    rawBody = await request.text()
  } catch (error) {
    console.error('Unable to read contact enquiry request body.', error)
    return errorResponse(400, 'Please check the form and try again.')
  }

  if (rawBody.length > MAX_REQUEST_LENGTH) {
    return errorResponse(413, 'Your message is too long. Please shorten it and try again.')
  }

  let requestData: unknown
  try {
    requestData = JSON.parse(rawBody)
  } catch {
    return errorResponse(400, 'Please check the form and try again.')
  }

  const submission = validateSubmission(requestData)
  if (!submission) {
    return errorResponse(400, 'Please check that all fields are valid and try again.')
  }

  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_WEB_APP_URL
  const sharedSecret = process.env.GOOGLE_APPS_SCRIPT_SHARED_SECRET
  if (!scriptUrl || !sharedSecret || sharedSecret.length < 32) {
    console.error('Google Apps Script contact integration is not configured.')
    return errorResponse(
      503,
      'Our enquiry service is temporarily unavailable. Please try again later or call us at 63812 43416.',
    )
  }

  let targetUrl: URL
  try {
    targetUrl = new URL(scriptUrl)
  } catch {
    console.error('Google Apps Script Web App URL is invalid.')
    return errorResponse(
      503,
      'Our enquiry service is temporarily unavailable. Please try again later or call us at 63812 43416.',
    )
  }

  if (
    targetUrl.protocol !== 'https:' ||
    targetUrl.hostname !== 'script.google.com' ||
    !targetUrl.pathname.includes('/macros/')
  ) {
    console.error('Google Apps Script Web App URL is not an allowed endpoint.')
    return errorResponse(
      503,
      'Our enquiry service is temporarily unavailable. Please try again later or call us at 63812 43416.',
    )
  }

  try {
    const upstreamResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...submission, secret: sharedSecret }),
      cache: 'no-store',
      redirect: 'follow',
      signal: AbortSignal.timeout(25_000),
    })
    const responseText = await upstreamResponse.text()

    let upstreamData: unknown
    try {
      upstreamData = JSON.parse(responseText)
    } catch {
      console.error('Google Apps Script returned a non-JSON contact response.')
      return errorResponse(
        502,
        'We could not send your enquiry right now. Please try again or call us at 63812 43416.',
      )
    }

    if (
      !upstreamResponse.ok ||
      !isRecord(upstreamData) ||
      upstreamData.success !== true
    ) {
      console.error('Google Apps Script did not confirm the contact enquiry.')
      return errorResponse(
        502,
        'We could not send your enquiry right now. Please try again or call us at 63812 43416.',
      )
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error('Google Apps Script contact request failed.', error)
    return errorResponse(
      502,
      'We could not send your enquiry right now. Please try again or call us at 63812 43416.',
    )
  }
}
