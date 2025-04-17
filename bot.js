// discord-doc-bot/index.js
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
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
  const command = args[0]?.toLowerCase();

  if (!command) {
    return message.reply("Utilisation: `!doc <langage>`\nEx: `!doc html` ou `!doc help`");
  }

  if (command === 'help') {
    const helpEmbed = new EmbedBuilder()
      .setColor('#ffaa00')
      .setTitle('Aide – Commandes disponibles')
      .setDescription('Voici les langages pour lesquels tu peux obtenir de la documentation :')
      .addFields(
        Object.keys(docs).map(lang => ({ name: lang.toUpperCase(), value: docs[lang] }))
      )
      .setFooter({ text: 'Utilise !doc <langage> pour accéder à la documentation 📚' });

    return message.channel.send({ embeds: [helpEmbed] });
  }

  if (!docs[command]) {
    return message.reply(`Désolé, je n'ai pas de documentation pour \`${command}\`. 😢\nTape \`!doc help\` pour voir la liste.`);
  }

  const embed = new EmbedBuilder()
    .setColor('#0088cc')
    .setTitle(`Documentation pour ${command.toUpperCase()}`)
    .setDescription(`[Clique ici pour accéder à la documentation officielle](${docs[command]})`)
    .setFooter({ text: 'Propulsé par ton bot Discord 🧠' });

  message.channel.send({ embeds: [embed] });
});

client.login(process.env.TOKEN);