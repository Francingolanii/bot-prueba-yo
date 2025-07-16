const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Servidor web para que UptimeRobot mantenga vivo el repl
app.get('/', (req, res) => {
  res.send('Bot activo');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor web activo en puerto ${PORT}`);
});

function createBot() {
  const bot = mineflayer.createBot({
    host: '191.96.231.2',
    port: 30862,
    username: 'oscar',
    version: '1.16.5'
  });

  bot.once('spawn', () => {
    setTimeout(() => {
      bot.chat('/login 123456');
      setTimeout(() => {
        bot.chat('Nashe');
      }, 1000);
    }, 2000);
  });

  bot.on('error', err => {
    console.log('Error:', err);
  });

  bot.on('end', () => {
    console.log('Bot desconectado. Reconectando en 5 segundos...');
    setTimeout(createBot, 5000); // intenta reconectar después de 5 segundos
  });

  return bot;
}

// Inicializa el bot la primera vez
createBot();
