const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const emoji = new JsonDatabase({ databasePath:"./emoji.json" });
const config = new JsonDatabase({ databasePath:"./emoji.json" });

module.exports = {
    name: "botinfo", // Coloque o nome do comando do arquivo
    aliases: ["infobot"], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        let servidor = client.guilds.cache.size;
        let usuarios = client.users.cache.size;
        let canais = client.channels.cache.size;
        let ping = client.ws.ping;
        let dono_id = "841029765015142410"; // Seu ID
        let dono = client.users.cache.get(dono_id);
        let prefixo = ".";
        let versao = `${config.get(`versao`)}`;

        let embed = new Discord.MessageEmbed()
            .setColor("#9400D3")
            .setTimestamp(new Date)
            .setDescription(`<:developer:1075506390090661970>  | Olá, tudo bem? me chamo, **[${client.user.username}](${config.get(`serverofc`)})**  e fui desenvolvido para facilitar a vida dos meus usuários.


\ **・<:developer:1075506390090661970>| Desenvolvedores: ** [${config.get(`developer`)}](${config.get(`serverofc`)})
\ **・<:nodejs:1075505641944268960>| Linguagem: ** [node.js](https://nodejs.org/en/)
\ **・🛡| Versão: ** ${versao}

\ **・<:ping:1060990970990178304> | Ping:** ${ping}`);



        message.reply({ embeds: [embed] })



    }
}