// discord-doc-bot/index.js
const { Client, GatewayIntentBits, EmbedBuilder } = require('bot.js');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const prefix = '!doc';

const docs = {
  html: 'https://developer.mozilla.org/fr/docs/Web/HTML',
  css: 'https://developer.mozilla.org/fr/docs/Web/CSS',
  js: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
  javascript: 'https://developer.mozilla.org/fr/docs/Web/JavaScript',
  php: 'https://www.php.net/manual/fr/',
  bootstrap: 'https://getbootstrap.com/docs/',
  angular: 'https://angular.io/docs',
  symfony: 'https://symfony.com/doc/current/index.html'
};

client.once('ready', () => {
  console.log(`Bot connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const lang = args[0]?.toLowerCase();

  if (!lang) {
    return message.reply("Utilisation: `!doc <langage>`\nEx: `!doc html`");
  }

  if (!docs[lang]) {
    return message.reply(`Désolé, je n'ai pas de documentation pour \`${lang}\`. 😢`);
  }

  const embed = new EmbedBuilder()
    .setColor('#0088cc')
    .setTitle(`Documentation pour ${lang.toUpperCase()}`)
    .setDescription(`[Clique ici pour accéder à la documentation officielle](${docs[lang]})`)
    .setFooter({ text: 'Propulsé par ton bot Discord 🧠' });

  message.channel.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);