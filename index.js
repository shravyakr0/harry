// Load environment variables from .env file
require('dotenv').config();

const { App } = require('@slack/bolt');
const axios = require('axios');

// Initialize the Slack Bolt app using Socket Mode
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

/**
 * Slash Command 1: /harry-ping
 * Acknowledges immediately, measures latency between receipt and ack,
 * and replies with "Pong! Latency: Xms".
 */
app.command('/harry-ping', async ({ command, ack, respond }) => {
  // Record start time right when command is received
  const startTime = Date.now();

  try {
    // Acknowledge the command receipt immediately
    await ack();

    // Calculate latency (time taken to ack)
    const latency = Date.now() - startTime;

    // Respond back to Slack channel/user
    await respond(`Pong! Latency: ${latency}ms`);
  } catch (error) {
    console.error('Error handling /harry-ping:', error.message);
  }
});

/**
 * Slash Command 2: /harry-joke
 * Fetches a random joke from Official Joke API using axios
 * and replies with the setup + punchline.
 */
app.command('/harry-joke', async ({ command, ack, respond }) => {
  // Acknowledge the command receipt immediately
  await ack();

  try {
    // Fetch random joke from external API
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
    const { setup, punchline } = response.data;

    // Reply with the joke setup and punchline
    await respond(`${setup}\n\n${punchline}`);
  } catch (error) {
    console.error('Error handling /harry-joke:', error.message);
    await respond('Failed to fetch a joke right now. Please try again later.');
  }
});

/**
 * Slash Command 3: /harry-catfact
 * Fetches a random cat fact from catfact.ninja using axios
 * and replies with the cat fact.
 */
app.command('/harry-catfact', async ({ command, ack, respond }) => {
  // Acknowledge the command receipt immediately
  await ack();

  try {
    // Fetch random cat fact from external API
    const response = await axios.get('https://catfact.ninja/fact');
    const fact = response.data.fact;

    // Reply with the cat fact
    await respond(`🐱 ${fact}`);
  } catch (error) {
    console.error('Error handling /harry-catfact:', error.message);
    await respond('Failed to fetch a cat fact right now. Please try again later.');
  }
});

// Start the Bolt application
(async () => {
  try {
    await app.start();
    console.log('Harry is running!');
  } catch (error) {
    console.error('Error starting Harry app:', error);
  }
})();
