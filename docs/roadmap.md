# Roadmap

## Stage 1 — Setup (done)

Expo Go app, theme files, base components, local server with `/health`, test screen.

## Stage 2 — Text chat

- Server `POST /chat`: sends the conversation to OpenAI and streams the reply back word by word.
- App: `MessageList`, `MessageBubble`, `ChatInput` components. Streaming via Expo's built-in `fetch`.
- One shared conversation store (zustand), saved on the phone with AsyncStorage.
- Model names live in one config file on the server.
- Before exposing OpenAI endpoints: protect the server from other devices on the same Wi-Fi (e.g. a shared app token from `.env`).

## Stage 3 — Mic dictation (speech to text)

- `MicButton`: tap, speak, tap again. Recording with `expo-audio`.
- Server `POST /transcribe` sends audio to OpenAI's transcription model. The text is sent as a normal chat message.

## Stage 4 — Live voice (inside Expo Go)

- First, a quick test: confirm mic and live audio work inside a hidden web page (`react-native-webview`, WebRTC) on both iPhone and Android. If iPhone fails, stop and decide.
- Server `POST /realtime-token` creates a short-lived pass (about 1 minute). The real key never reaches the phone.
- Voice mode loads the past conversation into the live session. Every spoken turn (user and AI) is saved as text in the same conversation, so switching back to typing keeps full context.
- `VoiceModeView` component: speaking / listening states, end button.
- Known limits: voice stops when the app is in the background or the screen is locked; iPhone speaker vs earpiece routing may need tuning.

## Stage 5 — Debug modes (not started)

- Hidden debug menu to pick a scenario: happy path, slow network, server error, empty transcription, mic permission denied, etc.
- Scenarios will follow the Figma user flows. Each scenario swaps real server answers for scripted ones.

## Later

- Restyle to match the Figma screens (text and voice) through `src/theme` and components only.
