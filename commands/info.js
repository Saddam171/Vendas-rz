const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const db3 = new JsonDatabase({ databasePath:"./databases/myJsonIDs.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const emoji = new JsonDatabase({ databasePath:"./emoji.json" });

module.exports = {
    name: "info",
    run: async(client, message, args) => {
      const embederro2 = new Discord.MessageEmbed()
      if (!args[0]) return message.reply(`${emoji.get(`errado`)} | Você não selecionou nenhum ID de compra!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db3.get(`${args[0]}.id`)}`) return message.reply(`${emoji.get(`errado`)} | Esse ID de compra não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
      const id = args[0]
      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Compra Aprovada`)
        .addField(`${emoji.get(`desc`)} | ID Da compra:`, `${db3.get(`${args[0]}.id`)}`)
        .addField(`${emoji.get(`delay`)} | Status:`, `${db3.get(`${args[0]}.status`)}`)
        .addField(`${emoji.get(`users`)} | Comprador:`, `<@${db3.get(`${args[0]}.userid`)}>`)
        .addField(`${emoji.get(`idd`)} | Id Comprador:`, `${db3.get(`${args[0]}.userid`)}`)
        .addField(`📅 | Data da compra:`, `${db3.get(`${args[0]}.dataid`)}`)
        .addField(`${emoji.get(`planeta`)} | Produto:`, `${db3.get(`${args[0]}.nomeid`)}`)
        .addField(`${emoji.get(`caixa`)} | Quantidade:`, `${db3.get(`${args[0]}.qtdid`)}`)
        .addField(`${emoji.get(`dinheiro`)} | Preço:`, `${db3.get(`${args[0]}.precoid`)}`)
        .setColor(config.get(`color`))
      message.reply({embeds: [embed], content: `${emoji.get(`certo`)} | Encontrado!`})
    }
}
