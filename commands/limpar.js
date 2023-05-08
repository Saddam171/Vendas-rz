const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "limpar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`${emoji.get(`errado`)} | Você não está na lista de pessoas!`)
      setTimeout(() => message.channel.bulkDelete(${args[0]}).catch(err => {
        return message.channel.send(`${emoji.get(`errado`)} | Ocorreu algum erro!`);
      }), 400)
      setTimeout(() => message.delete().then(msg => {
        return message.channel.send(`${emoji.get(`certo`)} | Foram deletadas ${args[0] mensagens!`)
      }), 300)
   }
}
