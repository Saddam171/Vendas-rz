const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const emoji = new JsonDatabase({ databasePath:"./emoji.json" });

module.exports = {
    name: "criar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`${emoji.get(`errado`)} | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(!args[0]) return message.reply(`${emoji.get(`errado`)} | Você não deu nenhum ID a esse produto!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`${emoji.get(`errado`)} | Você não pode colocar dois IDs de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] === `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`${emoji.get(`errado`)} | Esse ID de produto já é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

      const row = new Discord.MessageActionRow()               
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(args[0])
            .setLabel('Comprar')
            .setStyle('SUCCESS'),
      );
       
      const adici = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Bot Store`)
        .setDescription(`
\`\`\`
Sem descrição ainda...
\`\`\`
**${emoji.get(`planeta`)} | Nome:** __Sem nome ainda...__
**${emoji.get(`dinheiro`)} | Preço:** __10__
**${emoji.get(`caixa`)} | Estoque:** __0__`)
        .setColor(config.get(`color`))
        .setImage(config.get(`imagem`))
        .setThumbnail(client.user.displayAvatarURL())
      message.channel.send({embeds: [adici], components: [row]})
        
      const idproduto = args[0]
        db.set(`${idproduto}.idproduto`, `${idproduto}`)
        db.set(`${idproduto}.nome`, `Sem nome ainda...`) 
        db.set(`${idproduto}.desc`, `Sem descrição ainda...`) 
        db.set(`${idproduto}.preco`, `10`) 
        db.set(`${idproduto}.categoria`, `vazio`) 
        db.set(`${idproduto}.subcategoria`, `vazio`) 
        db.set(`${idproduto}.subcategoria2`, `vazio`)
        db.set(`${idproduto}.cupomperm`, `sim`) 

        db.push(`${idproduto}.conta`, `${idproduto}`)
        const a = db.get(`${idproduto}.conta`);
        const removed = a.splice(0, 1);
        db.set(`${idproduto}.conta`, a);
       }
     }
