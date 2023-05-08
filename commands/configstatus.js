const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const emoji = new JsonDatabase({ databasePath:"./emoji.json" });

module.exports = {
    name: "configstatus", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.channel.send(`${emoji.get(`errado`)} | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(`tokenconfig`)
            .setEmoji(`${emoji.get(`config`)}`)
            .setLabel(`Mercado Pago`)
            .setStyle(`SECONDARY`),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(`prefixconfig`)
            .setEmoji(`${emoji.get(`config`)}`)
            .setLabel(`Prefixo`)
            .setStyle(`SECONDARY`),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(`statusconfig`)
            .setEmoji(`${emoji.get(`config`)}`)
            .setLabel(`Status`)
            .setStyle(`SECONDARY`),
        );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Configuração dos status`)
          .setDescription(`
${emoji.get(`mp`)} | Token Mercado Pago: \`\Token Seguro\`
${emoji.get(`dev`)} | Prefixo: \`${config.get(`prefix`)}\`
${emoji.get(`bot`)} | Status do Bot: \`${config.get(`status`)}\``)
          .setColor(config.get(`color`))], components: [row]})
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", });
         interação.on("collect", async (interaction) => {
          if (message.author.id != interaction.user.id) {
           return;
          }

          if (interaction.customId === "tokenconfig") {
            interaction.deferUpdate();
            message.channel.send("❓ | Qual o novo access token do seu mp?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", access_token => {
                 access_token.delete()
                 const newt = access_token.content
                 config.set(`access_token`, newt)
                 msg.edit(`${emoji.get(`certo`)} | Alterado!`)
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)} | Configuração dos status`)
                   .setDescription(`
${emoji.get(`mp`)} | Token Mercado Pago: \`\Token Seguro\`
${emoji.get(`dev`)} | Prefixo: \`${config.get(`prefix`)}\`
${emoji.get(`bot`)} | Status do Bot: \`${config.get(`status`)}\``)
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
          if (interaction.customId === "prefixconfig") {
            interaction.deferUpdate();
            message.channel.send("❓ | Qual o novo prefixo do bot?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", prefix => {
                 prefix.delete()
                 const newt = prefix.content
                 config.set(`prefix`, newt)
                 msg.edit(`${emoji.get(`certo`)} | Alterado!`)
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)} | Configuração dos status`)
                   .setDescription(`
${emoji.get(`mp`)} | Token Mercado Pago: \`\Token Seguro\`
${emoji.get(`dev`)} | Prefixo: \`${config.get(`prefix`)}\`
${emoji.get(`bot`)} | Status do Bot: \`${config.get(`status`)}\``)
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
          if (interaction.customId === "statusconfig") {
            interaction.deferUpdate();
            message.channel.send("❓ | Qual os novos status do bot?").then(msg => {
             const filter = m => m.author.id === interaction.user.id;
             const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", status => {
                 status.delete()
                 const newt = status.content
                 config.set(`status`, newt)
                 msg.edit(`${emoji.get(`certo`)} | Alterado!`)
                            
                 const embednew = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)} | Configuração dos status`)
                   .setDescription(`
${emoji.get(`mp`)} | Token Mercado Pago: \`\Token Seguro\`
${emoji.get(`dev`)} | Prefixo: \`${config.get(`prefix`)}\`
${emoji.get(`bot`)} | Status do Bot: \`${config.get(`status`)}\``)
                   .setColor(config.get(`color`))
                 embed.edit({ embeds: [embednew] })
                 })
               })
             }
           })
         }
       };

