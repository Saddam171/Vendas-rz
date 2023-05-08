const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const emoji = new JsonDatabase({ databasePath:"./emoji.json" });

module.exports = {
    name: "setar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`${emoji.get(`errado`)} | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if (!args[0]) return message.reply(`${emoji.get(`errado`)} | Você não selecionou nenhum ID de produto!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`${emoji.get(`errado`)} | Você não selecionar dois IDs de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`${emoji.get(`errado`)} | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

      const row = new Discord.MessageActionRow()               
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(args[0])
            .setLabel('Comprar')
            .setEmoji(`${emoji.get(`carrinho`)}`)
            .setStyle('SUCCESS'),
      );
        
      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Bot Store`)
        .setDescription(`
\`\`\`
${db.get(`${args[0]}.desc`)}
\`\`\`
**${emoji.get(`planeta`)} | Nome:** __${db.get(`${args[0]}.nome`)}__
**${emoji.get(`dinheiro`)} | Preço:** __${db.get(`${args[0]}.preco`)}__
**${emoji.get(`caixa`)} | Estoque:** __${db.get(`${args[0]}.conta`).length}__`)
        .setColor(config.get(`color`))
        .setImage(config.get(`imagem`))
        .setThumbnail(client.user.displayAvatarURL())
      message.channel.send({embeds: [embed], components: [row]})
    }
}
