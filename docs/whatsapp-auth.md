# Phone OTP login via Twilio SMS

## Setup

Website login now uses Twilio SMS. WATI continues to handle the WhatsApp bot independently; its draft OTP template is not needed for website login.

Server-only Vercel environment variables (use the same values as local `.env.local`):

```env
MONGODB_URI=<Atlas URI>
MONGODB_DB=aadhiti
AUTH_SECRET=<stable random secret, at least 32 characters>
USE_TWILLIO=true
TWILLIO_CHANNEL=sms
TWILLIO_API_KEY=<API key SID>
TWILLIO_API_SECRET=<API key secret>
TWILLIO_ACCOUNT_SID=<account SID>
TWILLIO_PHONE_NUMBER=<SMS-capable sender in +countrycode format>
```

The `TWILLIO` spelling is intentional, matching the supplied variables. Credentials were saved locally only. Configure them in Vercel and redeploy. The API key must belong to this account and allow message creation. Sender capability, account balance, destination permissions, and any trial restrictions must allow the recipient. No real SMS has been sent during implementation.

## Behaviour

- `/chat`, `/call`, `/my-data` render a trilingual login gate, with phone number, explicit delivery consent, code input, resend timer and logout.
- Paid web `/api/chat`, `/api/call` and `/api/tts` enforce sessions on the server, not just in the UI. Deterministic emergency text responses from `/api/chat` are available before authentication. Public safety pages and emergency call links remain available. WhatsApp webhook conversations continue independently through the existing authenticated webhook.
- Cryptographically random six-digit codes, five-minute validity, five attempts, one-time atomic consumption, strict 60-second phone cooldown. Persistent Mongo limits: five sends per phone/hour, ten per IP/hour, thirty verifications per IP/hour. Trust forwarded IP headers only behind the hosting provider's proxy.
- Code digests use HMAC with AUTH_SECRET; raw codes and full phone numbers are never persisted by this application or logged. Twilio receives both to send messages.
- One active challenge per phone. Resending invalidates older codes. Provider errors do not leave an active challenge. HTTP acceptance is not a delivery guarantee; the UI asks users to check SMS.
- Seven-day random-token sessions, hashed in Mongo, HttpOnly/SameSite=Strict cookies, Secure in production. Explicit expiry checks plus TTL cleanup. Logout deletes the server session and local profile/chat data.
- Stable keyed phone identity enables cross-device profiles; each account must separately consent to profile/history storage. Login does not automatically opt customers into storage or marketing. Profile deletion deletes customer content, not the current authentication session.
- No static OTP, development bypass or unsigned customer identity accepted.

## Validation

`node --test tests/*.cjs` covers OTP normalization, wrong attempts, cooldown, expiry, replay, send failure, session revocation, origin checks and customer isolation filters. Tests mock the provider and never send messages. Run `npm run build` too.

Live release checklist: configure production secrets; send to an explicitly chosen test phone; confirm receipt and single-use login; verify cross-browser consented profile access and logout. Live delivery remains unverified.

Official reference: https://www.twilio.com/docs/messaging/api/message-resource
