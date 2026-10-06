/** SMS transport only; challenge creation, expiry and rate limits live in auth.ts. */
export async function sendOtp(phone: string, code: string): Promise<boolean> {
  const { USE_TWILLIO, TWILLIO_CHANNEL, TWILLIO_API_KEY: key,
    TWILLIO_API_SECRET: secret, TWILLIO_ACCOUNT_SID: account,
    TWILLIO_PHONE_NUMBER: from } = process.env;
  if (USE_TWILLIO !== 'true' || TWILLIO_CHANNEL !== 'sms' || !key || !secret ||
      !account || !/^AC[a-f0-9]{32}$/i.test(account) || !from ||
      !/^\+[1-9]\d{7,14}$/.test(from) || !/^[1-9]\d{7,14}$/.test(phone) || !/^\d{6}$/.test(code)) return false;
  try {
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${account}/Messages.json`, {
      method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(15000),
      headers: {
        Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ To: `+${phone}`, From: from,
        Body: `Your AADHI TI verification code is ${code}. It expires in 5 minutes. Do not share this code.` }),
    });
    if (!response.ok) return false;
    const data = await response.json().catch(() => null);
    // Accepted by Twilio does not mean delivered. Never automatically retry a send.
    return typeof data?.sid === 'string' && /^SM[a-f0-9]{32}$/i.test(data.sid) &&
      ['accepted', 'queued', 'sending', 'sent', 'delivered'].includes(data.status);
  } catch { return false; }
}
