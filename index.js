require('dotenv').config();

const { App } = require('@slack/bolt');
const axios = require('axios');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

// /harry-ping
// Checks how quickly Harry can respond to a command.
app.command('/harry-ping', async ({ ack, respond }) => {
  const startTime = Date.now();

  try {
    await ack();

    const latency = Date.now() - startTime;

    await respond(`Pong! Latency: ${latency}ms`);
  } catch (error) {
    console.error('Ping command error:', error.message);
  }
});

// /harry-joke
// Gets a random joke from the Official Joke API.
app.command('/harry-joke', async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get(
      'https://official-joke-api.appspot.com/random_joke'
    );

    const { setup, punchline } = response.data;

    await respond(`${setup}\n\n${punchline}`);
  } catch (error) {
    console.error('Joke command error:', error.message);
    await respond('Sorry, I couldn’t get a joke right now.');
  }
});

// /harry-catfact
// Fetches a random cat fact from Cat Facts.
app.command('/harry-catfact', async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get('https://catfact.ninja/fact');
    const fact = response.data.fact;

    await respond(`🐱 ${fact}`);
  } catch (error) {
    console.error('Cat fact command error:', error.message);
    await respond('Sorry, I couldn’t get a cat fact right now.');
  }
});

// Start Harry
(async () => {
  try {
    await app.start();
    console.log('Harry is running!');
  } catch (error) {
    console.error('Could not start Harry:', error);
  }
})();
