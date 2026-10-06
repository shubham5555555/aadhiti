# Call AADHI TI — ElevenLabs conversation

Home dashboard, desktop header on all pages and mobile floating action link to `/call-aditi`. The emergency directory and public 112 links remain separate. The caller is explicitly identified as an AI assistant, not the politician or an emergency dispatcher. `/call` uses the same shared conversation component; `/call?mode=fake` preserves the simulated call tool.

Set server-only `ELEVENLABS_API_KEY` and `ELEVENLABS_AGENT_ID` in Vercel. Locally created agent ID: `agent_5001m48p0ghxe8f92n7wcmfwg4gb`. Configuration is documented in `config/elevenlabs-agent.json`; changes there do not automatically update the hosted agent.

Authenticated same-origin POST `/api/conversation` obtains a signed WebSocket URL. Five starts per IP/minute (in-memory limiter). API keys never reach the browser. Calls have a ten-minute provider cap. Language and greeting follow the selected Marathi/Hindi/English UI. The provider handles interruption and two-way speech. The call ends on navigation/unmount. No transcripts are persisted by this page to MongoDB. Provider recording is disabled and transcript retention is one day; disclosed before starting.

Verified: hosted agent exists, authentication required, language/greeting overrides enabled, signed URL issuance succeeds. Live microphone/audio quality still needs a user test. This agent currently has guidance in its system prompt, not access to the website knowledge base or customer history. It refers users to scheme pages instead of asserting current eligibility.

SDK: https://elevenlabs.io/docs/eleven-agents/libraries/react

Audio tuning: SDK microphone capture enables echo cancellation, noise suppression and automatic gain control. Permission capture requests the same constraints. Hosted agent uses eager turn-taking and speculative generation (may increase LLM cost) with brief responses. Background sound cannot be eliminated completely; test on target phones.
