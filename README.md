# AI Prototype

Mobile prototype for text and voice conversations with OpenAI, running in Expo Go.

## What you need

- Node.js 22.18 or newer
- The **Expo Go** app on your phone (App Store / Google Play). Its SDK version must match this project (SDK 57).
- Phone and computer on the **same Wi-Fi**.
- The `server/.env` file (ask a teammate — it holds the OpenAI key and is never committed).

## First run

```sh
npm install
```

Put the shared `.env` file into the `server/` folder. To create one from scratch, copy `server/.env.example` to `server/.env` and fill in `OPENAI_API_KEY`.

## Every run

```sh
npm run dev
```

This starts the local server and the Expo app together. Scan the QR code:

- iPhone: with the Camera app
- Android: from inside Expo Go

The test screen shows **Server: connected** when everything works.

## Troubleshooting

- **Server: not connected** — check that the phone and computer are on the same Wi-Fi. On macOS, allow incoming connections for `node` if the firewall asks.
- **OpenAI key missing** — `server/.env` is missing or `OPENAI_API_KEY` is empty. Restart `npm run dev` after adding it.
- **Wi-Fi blocks phone-to-computer traffic** (office/guest networks) — run `npx expo start --tunnel` and set `EXPO_PUBLIC_SERVER_URL` to a reachable server address.

## Security

- The OpenAI key lives only in `server/.env`, read by the local server. The app never contains it.
- `.env` files are ignored by git. Never commit them, never paste the key into app code.

## Project layout

- `src/app/` — screens (Expo Router)
- `src/components/ui/` — reusable building blocks (text, buttons, inputs, screen)
- `src/theme/` — colors, fonts, spacing. Restyle the app here.
- `src/config/` — server address
- `src/api/` — calls to the local server
- `server/` — local server that holds the OpenAI key
- `docs/roadmap.md` — planned stages
