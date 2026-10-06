# WhatsApp service setup

The bot now offers a short main menu (Safety, Schemes, Skills, Talk to someone), language and reply preferences, confirmed reminders and feedback. Safety and skills use a single question with up to three replies. The existing scheme finder asks one question at a time. Scheme detail cards offer translated document checklists and official links; eligibility guidance is not approval.

## Voice

After choosing a language, select Text, Audio, or Text + audio. Type `voice settings` to change this. Preferences last 90 days; chat history lasts 24 hours. Marathi/Hindi voice notes are transcribed using Gemini; replies use Anika. Menus, emergency numbers and document/source links remain text. Audio failure falls back to text. The app does not persist incoming audio. Voice media is limited to 4 MiB. Gemini and ElevenLabs receive the content necessary for transcription and speech.

## Production prerequisites

Configure WATI_API_TOKEN, WATI_WEBHOOK_SECRET, GEMINI_API_KEY, ElevenLabs variables and persistent Upstash Redis. Memory fallback is for development only; reminder scheduling and operations changes refuse to run without Redis. See .env.example for variable names. Keep all actual tokens in deployment environment settings.

In WATI enable **Messages Received** and **Session Message Sent** webhooks at the existing secret-protected webhook URL. The latter uses the documented `sessionMessageSent_v2` event. No messages are sent by the automated tests.

## Human support

Set WATI_HANDOFF_EMAIL and/or WATI_HANDOFF_TEAM to a staffed team. Set WATI_SUPPORT_OPERATOR_EMAILS to a comma-separated allowlist of staff emails. Staff must have appropriate training; the app cannot verify qualifications.

An operator posts `{ "action": "availability", "available": true }` to `/api/wati/operations` with `Authorization: Bearer <WATI_OPERATIONS_SECRET>` at the start of service and renews at least every 15 minutes. This is a staff declaration, not inferred from office hours or assignment. Missing/expired status is shown as unconfirmed. Post false when unavailable.

The user consents before assignment. Successful routing only says a request was sent, not that a person accepted it. A staff member accepts by sending `#accept` as a normal message in that WATI conversation (the customer sees this short command). The matching Session Message Sent webhook must identify an allowlisted operator; only then does the bot acknowledge acceptance. API/bot messages do not send this command. The bot pauses for up to 24 hours and resumes when the user types `menu`. Emergency scripts and STOP remain available. Assignment failure shows available helpline alternatives. A queue is not emergency dispatch.

## Opt-in reminders

Set WATI_REMINDER_KEY to 64 random hex characters, CRON_SECRET and WATI_OPERATIONS_SECRET. The encryption key must stay stable while subscriptions are pending.

Create and obtain approval for one WhatsApp utility template in each language. Each must use custom parameters `event`, `when`, `source` and include instructions to reply STOP. Parameter names must match the WATI template. Templates are required even outside WhatsApp's 24-hour conversation window.

Publish a catalog with `POST /api/wati/operations`, authenticated with the operations bearer token:

```json
{
  "action": "events",
  "events": [{
    "id": "confirmed-workshop-id",
    "title": {"en": "Confirmed workshop", "mr": "निश्चित कार्यशाळा", "hi": "पुष्ट कार्यशाला"},
    "dueAt": "REPLACE_WITH_FUTURE_ISO_TIMESTAMP_WITH_TIMEZONE",
    "eventAt": "REPLACE_WITH_LATER_CONFIRMED_ISO_TIMESTAMP_WITH_TIMEZONE",
    "sourceUrl": "https://YOUR_CONFIRMED_SOURCE",
    "confirmed": true,
    "template": {"en":"YOUR_APPROVED_EN_TEMPLATE","mr":"YOUR_APPROVED_MR_TEMPLATE","hi":"YOUR_APPROVED_HI_TEMPLATE"}
  }]
}
```

These placeholders intentionally fail validation until replaced. Do not populate speculative deadlines. The endpoint replaces the catalog (maximum ten events); publishing an empty array cancels delivery for removed events. Reminder times must be within 90 days and before the event. Use new IDs when changing event details after subscriptions. Personal appointments can be published only with non-identifying titles; do not put private medical or personal details in the shared catalog.

Users review the exact reminder and time (IST), then explicitly opt in. Their number is encrypted for delivery. `STOP`, `unsubscribe`, `थांबा`, `बंद`, or `रोकें` cancel pending reminders even during handoff. A message already submitted to WATI cannot be recalled.

Automatic scheduling is disabled in `vercel.json` so deployments work on Vercel Hobby. Before enabling reminders, configure an authenticated external scheduler to invoke `/api/cron/reminders` every five minutes, or add a five-minute Vercel cron on a compatible paid plan. Each invocation handles at most three jobs, so plan capacity accordingly. The sender uses WATI's documented v3 messageTemplates/send endpoint. A successful response is recorded as **accepted**, never **delivered**. Failed sends are not automatically retried; ambiguous network outcomes become **unknown** to avoid duplicate notifications. Subscription/delivery records expire after 100 days, encrypted recipients are cleared after processing/cancellation. Jobs interrupted after claiming need operator review rather than blind resend.

## Feedback and review

After ordinary AI answers, users can choose Helpful, Not yet or Talk to someone. `GET /api/wati/operations` (operations bearer token required) reports the current UTC day's aggregate ratings, unanswered topic counts, live staff declaration and reminder readiness. Ratings store topic + count, not message text or phone numbers, and expire after 30 days. Readiness alone does not confirm credentials or template approval. Review unanswered topics to improve content. No public analytics dashboard or transcript export is exposed.

## Validation

Run `node --test tests/*.cjs` and `npm run build`. Mocked WhatsApp tests cover preference changes, voice replies, menus, scheme checklist access, feedback, explicit staff acceptance, reminder consent, encrypted recipients, cancellation and duplicate scheduling. Live WATI, approved templates, real agent workflows and phone playback still require a controlled deployment test after configuration.

References: https://docs.wati.io/reference/session-message-sent and https://docs.wati.io/reference/messagetemplate_sendtemplatemessages
