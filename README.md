# Harry — Slack Bot

A Slack bot built with Node.js and [Slack Bolt](https://slack.dev/bolt-js/) (Socket Mode), made for the [Hack Club Stardance](https://stardance.hackclub.com/missions/slack-bot) "Make a Slack Bot" mission.

## Commands

| Command | Description |
|---|---|
| `/harry-ping` | Checks if Harry is alive and replies with response latency |
| `/harry-joke` | Fetches and shares a random joke |
| `/harry-catfact` | Fetches and shares a random cat fact |

## Tech stack

- **Node.js** + **@slack/bolt** (Socket Mode — no public URL needed)
- **axios** for external API calls
- **dotenv** for environment variables
- Hosted 24/7 on [Hack Club Nest](https://guides.hackclub.app/)

## Setup (local development)

1. Clone the repo:
   ```bash
   git clone https://github.com/YOUR_USERNAME/harry-bot.git
   cd harry-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root (this file is git-ignored and never committed):
   ```
   SLACK_BOT_TOKEN=xoxb-your-token-here
   SLACK_APP_TOKEN=xapp-your-token-here
   ```

4. Run the bot:
   ```bash
   node index.js
   ```

## Deployment

Harry runs 24/7 on a [Hack Club Nest](https://guides.hackclub.app/) container via a `systemd` service, so it stays online even when my laptop is off.

## APIs used

- [Official Joke API](https://official-joke-api.appspot.com/) — random jokes
- [Cat Facts API](https://catfact.ninja/) — random cat facts

## Notes

Built as part of Hack Club Stardance. Command prefix `harry-` is used to avoid collisions with other bots in the workspace.
