# Customer storage (MongoDB Atlas)

## Connect your existing account

1. In Atlas, use a cluster and create a database user with read/write access limited to `aadhi_ti`.
2. Configure Atlas Network Access for the deployment's outbound addresses. Use fixed egress/private connectivity if available; do not expose unrestricted access as a default.
3. Open Connect → Drivers → Node.js and copy the connection string. Replace the database-user password with its URL-encoded value.
4. Add these **server-only** values to `.env.local` and Vercel environment variables, then redeploy:

```env
MONGODB_URI=<your MongoDB Atlas connection URI>
MONGODB_DB=aadhi_ti
```

Do not commit credentials or use NEXT_PUBLIC_ variables. Merely having an Atlas account does not connect the app. No customer data has been written until the connection is configured and a customer explicitly saves their profile.

## Customer experience

The footer and chat link to `/my-data`. Profile saving and history saving require separate unchecked consent controls. A save creates the `aadhi_ti.customers` collection on first write. Stores name (optional), taluka, age group, language and answer preference, plus consent version/time. Pregnancy month and child details are excluded from the profile. Existing local conversations are not uploaded.

When history consent is enabled, future website question/answer exchanges are saved (most recent 100, up to 1,000 question and 6,000 answer characters). Local safety/knowledge answers are included; menus and failed answers are excluded. Records persist until the customer deletes them; older conversations are removed as the 100-exchange cap is exceeded. Revoking history consent and saving clears stored history. Deleting server data removes profile, consent and history together but does not clear existing local browser data.

Verified WhatsApp login now identifies customers across devices. An opaque 256-bit HttpOnly, SameSite=Strict session cookie is hashed in MongoDB; sessions expire after seven days and are revoked on logout. A keyed phone identifier links customer records without storing the full phone number in this database. The last four digits are kept for the sign-in display. WATI necessarily receives the full phone number to deliver codes. Changing AUTH_SECRET changes phone identifiers and requires an account migration plan.

Earlier browser-only records are not automatically merged into verified accounts. This avoids copying potentially shared-device conversations into the wrong account. Before this rollout there were no real customer records written in this development session, only deleted temporary test records. Existing deployments with anonymous data need a separate explicit migration process.

Database administrators with permission can see saved content, including sensitive questions. The consent screen explains this. There is no public customer-list API. Use Atlas Data Explorer with appropriate database permissions to manage records. WhatsApp's existing Redis/session storage is unchanged; WhatsApp MongoDB consent requires a separate channel flow.

## Engineering and checks

- Native MongoDB driver, one cached pool per process, maxPoolSize 5; failed connections reset safely.
- `/api/customer`: GET own records/config status; PUT explicit consent and allowlisted profile; POST current exchange only if stored consent is true; DELETE own document.
- Mutations require same-origin requests; every operation is scoped to the verified-session customer key. Updates of history and consent are atomic in one document. Duplicate exchange ids are ignored.
- No URI, password or customer content is logged on connection failures.
- `node --test tests/customer-storage.cjs` covers validation, origin rejection, consent guard, scoped updates, cap and deletion with mocked storage. Live Atlas connectivity is not covered by mocks.
- Live acceptance: opt in with test data → confirm the document in Atlas → save a chat → disable history and save → confirm history removed → delete profile → confirm document absent. Repeat two browsers to check isolation. No real-customer data should be used for this check.

Driver reference: https://www.mongodb.com/docs/drivers/node/current/connect/connection-options/connection-pools/

## Verified user directory

Every successful website OTP verification upserts one record in `aadhiti.users`, keyed by the same protected account identifier as `customers`. Fields: `_id`, `last4`, `phoneVerified`, `authMethod`, `createdAt`, `lastLoginAt`, `loginCount`. Repeat logins update the existing record. These records have no session TTL and remain after logout. Failed verification never creates a user. Full phone numbers, OTPs and chats are not included.

In Atlas Data Explorer, open `aadhiti` → `users`, use filter `{}` and sort `{ "lastLoginAt": -1 }` to see all users who completed authentication since this feature was enabled. Optional profiles remain in `customers` with the same `_id`; profile/history consent is still separate. Earlier expired sessions cannot be reconstructed into a complete historical user list.
