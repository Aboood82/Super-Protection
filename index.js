const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
const app = express(); 
const db = require('quick.db');
const dev = ["713700568954044428", "749668950530326550"];
const prefixx = "+";
const prefix = "+";

app.listen(() => console.log(`Logged On The Server`)); 
client.on("ready", () => {
   console.clear();
   console.log(`${client.user.tag} : I'm Ready To Protect Your Server`)
  client.user.setActivity(`${prefix}help`);
});

// Bot
client.on('message', message => {
    if(message.content.startsWith(prefix + "bot")){
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You dont have premission')
    
        const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
  .addField('**الذاكرة المستخدمة 💾**', `${(process.memoryUsage().rss / 1000000).toFixed()}MB`)
         .addField('**سرعة الاتصال📡**' , `${Date.now() - message.createdTimestamp}` + ' ms')
        .addField('**استخدام المعالج💿**', `${(process.cpuUsage().rss / 10000).toFixed()}%`)
        .addField('**🌐 عدد السيرفرات**' , `${client.guilds.cache.size}`)
        .addField('**عدد المستخدمين 👥 **' , `${client.users.cache.size}`)
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }),)
               message.channel.send(embed);
           }
});

// Invite
client.on("message", async message => {
  if (message.content.startsWith(prefix + "invite")) {
    let invite = new Discord.MessageEmbed()
      .setColor('BLUE')
      .setFooter(`Super Protection✨`,client.user.avatarURL({ dynamic: true }),)
      .setDescription(`
[Click here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) **To invite the bot.**
`);
    message.channel.send(invite);
  }
});

// Help
client.on('message', message => {
  if(message.content.startsWith(prefix + "help")){
          let embed = new Discord.MessageEmbed()
          .setColor('#00FF00')
          .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
          .setFooter(` Requested By : ${message.author.tag}`, client.user.avatarURL())
          .setTitle("Help Commands !")
          .setThumbnail(client.user.avatarURL())
          .setDescription(`**GENERAL COMMANDS**
          ${prefix}invite - \`To add the bot to your server\`
           ${prefix}avatar - \`To veiw a avatar\`
           ${prefix}avatar server - \`To veiw a server avatar\`
           ${prefix}server - \`To see server information\`
           ${prefix}user - \`To see your personal information or someone else's information\`
           ${prefix}bot - \`To see the bot information\`
           ${prefix}ping - \`To see the response speed of the bot\`
           ${prefix}banner - \`To see your banner or someone else's\`\n
          ** ADMINS COMMANDS**
           ${prefix}lock - \`To lock a room\`
           ${prefix}unlock - \`To unlock a room\`
           ${prefix}ping - \`To see the response speed\`
           ${prefix}hide - \`To hide the room\`
           ${prefix}unhide - \`To unhide the room\`\
           ${prefix}inrole - \`To View All Members With The Role\`\n
          ** PROTECTION COMMANDS** 
          ${prefix}config 
          ${prefix}set-bans
          ${prefix}set-kicks
          ${prefix}set-channelcreate
          ${prefix}set-channelupdate
          ${prefix}set-channeldelete
          ${prefix}set-rolescreate
          ${prefix}set-rolesupdate
          ${prefix}set-rolesdelete
          ${prefix}set-logs`)

          message.channel.send(embed)
  }
});

// Vote
client.on('message', message => {
  if (message.content === prefix + "vote") message.channel.send(new Discord.MessageEmbed() .setTitle("My Vote Link :") .setDescription(`https://top.gg/bot/901410279034847283/vote`))
});

client.on("message" , message => {
if(message.content.startsWith(prefix + 'servers')){
let servers = " ";
let num = 0;
let serverr = client.guilds;
client.guilds.cache.forEach(server =>{
num = num + 1;
servers += `\`${num} - \`** ${server.name} - ${server.id} - ${server.memberCount}**\n`;
})
console.log(servers);
}
});

// Banner
client.on('message', message => {
    if (message.content.startsWith(prefix + "banner")) {
        let user = message.mentions.users.first() || message.author
        var id = new Discord.MessageEmbed()
          .setColor(color)
          .setImage(`https://api.abderrahmane300.repl.co/banner/${user.id}.gif`)
        message.channel.send(id)
      }
    });

// Ping
client.on('message', message => {
  if (message.content.startsWith(prefix + "ping")) {
const embed = new Discord.MessageEmbed()
.setTitle('Ping Bot')
.setTimestamp()
  .setColor("BLUE")
  .setFooter(` `,client.user.avatarURL({ dynamic: true }),)
    .addField('📶 **- Bot Ping** ' , `${Date.now() - message.createdTimestamp}` + ' ms')
     message.channel.send(embed)
  }
});

// Ban
client.on("message", message => {
  if (message.author.bot) return;

  if (message.content === prefix + "ban") {
    if (!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("**أنت لا تملك الصلاحيات المطلوبة**")
  return message.channel.send(new Discord.MessageEmbed().setColor("YELLOW").setDescription(`

**__أمر مساعد : "ban"__

- أستخدم : لـحظر أحد من السيرفر 

- كيف إستخدام الأمر , أكتب :

\`${prefix}ban [الشخص] (الوقت) (السبب)\`

- وأضف سبب و مدة الحظر أمثلة ;

\`${prefix}ban [user] 1h سبام \`**

        `).setFooter(`Request By ${message.author.tag}`).setTimestamp());
  }
});

client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
   const args = message.content.slice(prefix.length).trim().split(/ +/);
   const command = args.shift().toLowerCase();
   if(command === 'ban') {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let member = message.guild.member(user)
    if(!message.member.permissions.has('BAN_MEMBERS')) return;
    if(member.roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position)
   return message.channel.send("**لا أستطيع حظر أحد برتبة اعلى مني | :x:**")
   if(member.roles.highest.position > message.guild.members.resolve(message.author).roles.highest.position)
   return message.channel.send("**أنت لا تستطيع حظر احد برتبة أعلى من رتبتك | :x:**")
    if(message.author.id === member.id) return message.channel.send('**أنت لا تستطيع حظر نفسك**')
    if(member.id === client.user.id) return message.channel.send('**لا أستطيع حظر نفسي | :x:**')
    let reason = args.splice(1).join(" ")
    if(!reason) reason = "no reason"
    if(!member.bannable) return message.channel.send('**انا لا استطيع حظر هذا العضو**')
    member.ban({
    reason: `${reason}`
    })
    message.channel.send(`**تم حظر <@!${user.id}> من السيرفر بنجاح | 🚧**`)
  }
   });

// JoinMessage
client.on('guildCreate', guild => {
  let channel = client.channels.cache.find(c => c.id ===  '912040264418361344');
  let embed = new Discord.MessageEmbed()
  .setColor("YELLOW")
  .setAuthor(guild.name,guild.iconURL({dynamic:true}))
  .setTitle(`${client.user.username} , Joined A New Server`)
  .setDescription(`Server ID: **${guild.id}**
Server Members: **${guild.memberCount}**
Creadted at: **${guild.createdAt}**
Region: **${guild.region}**
Verifiy: **${guild.verificationLevel}**

SERVERS NOW: **${client.guilds.cache.size}**`)
.setTimestamp()
channel.send(embed)
});

// LeaveMessage
client.on('guildDelete', guild => {
  let channel = client.channels.cache.find(c => c.id ===  '912040294139199578');
  let embed = new Discord.MessageEmbed()
  .setColor("YELLOW")
  .setAuthor(guild.name,guild.iconURL({dynamic:true}))
  .setTitle(`${client.user.username} , Joined A New Server`)
  .setDescription(`Server ID: **${guild.id}**
Server Members: **${guild.memberCount}**
Creadted at: **${guild.createdAt}**
Region: **${guild.region}**
Verifiy: **${guild.verificationLevel}**

SERVERS NOW: **${client.guilds.cache.size}**`)
.setTimestamp()
channel.send(embed)
});

// Inrole
client.on('message', message => {
if (message.content.startsWith(prefix + "inrole")) {
let args = message.content.split(" ")
  let role = message.mentions.roles.first(); if(!role) role = message.guild.roles.cache.find(r => r.id == args[0]); if(!role) message.reply('that role does not exist!'); 
if (args[1]) {
  let arr = new Array(); role.members.forEach(user => { 	arr.push(`--> **${user.user.username} \n ${user.id}**`); }); if(arr.length == 0) message.channel.send("لا يوجد احد لديه الرتبة")
 if (arr.length > 0) message.channel.send(new Discord.MessageEmbed() .setColor("RED").setDescription (arr.join(`\n`)));
  }}
});

/* --- Protection --- */

// Config
client.on('message', async(message) => {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(message.content === prefix + "config") {
          let protectionmode = "⚠️"
          let logs = db.get(`logsch_${message.guild.id}`)
          if(!logs) logs = "No Logs Channel Is Selected!."
        if(db.has(`on_${message.guild.id}`)) protectionmode = "✅"
        let bans = db.get(`limitedban_${message.guild.id}`) || "None"
        let kicks = db.get(`limitedkick_${message.guild.id}`)|| "None"
        let channelc = db.get(`limitedchc_${message.guild.id}`)|| "None"
        let channelu = db.get(`limitedchupdate_${message.guild.id}`)|| "None"
        let channeld =  db.get(`limitedchd_${message.guild.id}`)|| "None"
        let rolesc = db.get(`limitedrole_${message.guild.id}`)|| "None"
        let roleu = db.get(`limitedroleu_${message.guild.id}`) || "None"
        let roled =  db.get(`limitedroled_${message.guild.id}`)|| "None"
   if (!dev.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can Use this Command **`
      );
        message.channel.send(new Discord.MessageEmbed()
          .setColor('#00FF00')
          .setAuthor(message.guild.name,message.guild.iconURL({dynamic:true}))
          .addFields({name:`Protection Mode`,value:protectionmode},
          {name:`Logs Channel`,value:`<#` + logs+`>`},
          {name:`Bans Limites`,value:bans},
          {name:`Kicks Limites`,value:kicks},
          {name:`Channels Create Limites`,value:channelc},
          {name:`Channels Update Limites`,value:channelu},
          {name:`Channels Delete Limites`,value:channeld},
          {name:`Roles Update Limites`,value:roleu},
          {name:`Roles Delete Limites`,value:roled},
          {name:`Roles Create Limites`,value:rolesc})
          .setTimestamp()
          .setFooter(`Super Protection✨`))
      }
        if(command === "set-logs") {
   if (!dev.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can Use this Command **`
      );
        if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Invalid channel!. Please Write The ID of channel or mention it.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          let logsch = message.mentions.channels.first()|| message.guild.channels.cache.find(ch => ch.id === args[0])
          if(!logsch) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Invalid channel!. Please Write The ID of channel or mention it.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          db.set(`logsch_${message.guild.id}`, logsch.id)
          message.channel.send(new Discord.MessageEmbed()
          .setColor('#00FF00')
          .setDescription(`**✅ || New Logs channel set to: ${logsch}**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          
      }
      if(command === 'protection') {
   if (!dev.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can   Use this Command **`
      );
        if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must Choose 1 Option. Exemple: \n ${prefix}protection on/off**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(args[0] !== "on" && args[0] !== "off") return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must Choose 1 Option. Exemple: \n ${prefix}protection on/off**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(args[0] === "on") {
              if(db.has(`on_${message.guild.id}`)) return message.channel.send(new Discord.MessageEmbed()
              .setColor('#00FF00')
              .setDescription(`**✅ || protection mode is already \`on\` in this server.**`)
              .setTimestamp()
          .setFooter(`Super Protection✨`))
            db.set(`on_${message.guild.id}`, "on")
            message.channel.send(new Discord.MessageEmbed()
            .setColor('#FFD700')
            .setDescription(`**✅ || protection mode in now: \`on\`**`)
            .setTimestamp()
          .setFooter(`Super Protection✨`))
          }
          if(args[0] === "off") {
            if(!db.has(`on_${message.guild.id}`)) return message.channel.send(new Discord.MessageEmbed()
            .setColor('#FFD700')
            .setDescription(`**✅ || protection mode is already \`off\` in this server.**`)
            .setTimestamp()
          .setFooter(`Super Protection✨`))
            db.delete(`on_${message.guild.id}`)
            message.channel.send(new Discord.MessageEmbed()
            .setColor('#FFD700')
            .setDescription(`**✅ || protection mode in now: \`off\`**`))
          }
          
      }
      if(command === "set-bans") {
   if (!dev.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can   Use this Command **`
      );
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Numbed Of Max Bans Limites!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Only Numbers!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedban_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor('#FFD700')
          .setDescription(`**✅ || New max bans limites set to: \`${args[0]}\`**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
      }

});

//////////////////////////////////////////////////////////////////////////////

client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(!prefix) prefix = prefixx
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-kicks") {
   if (!dev.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can   Use this Command **`
      );
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Numbed Of Max Kicks Limites!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Only Numbers!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedkick_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor('#FFD700')
          .setDescription(`**✅ || New max Kicks limites set to: \`${args[0]}\`**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
      }

});




//////////////////////////////////////////////////////////////////////////////



client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    let prefix = db.get(`prefix_${message.guild.id}`) 
    if(!prefix) prefix = prefixx
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-channelcreate") {
   if (!dev.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can   Use this Command **`
      );
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Numbed Of Max channels Limites!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Only Numbers!.**`))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedchc_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor('#FFD700')
          .setDescription(`**✅ || New max channels limites set to: \`${args[0]}\`**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
      }

});

// RolesCreate
client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(!prefix) prefix = prefixx
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-rolescreate") {
    if (!dev.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can   Use this Command **`
      );
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Numbed Of Max Roles Create Limites!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Only Numbers!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedrole_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor('#FFD700')
          .setDescription(`**✅ || New max Roles Create limites set to: \`${args[0]}\`**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
      }

});

// ChannelUpdate
client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(!prefix) prefix = prefixx
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-channelupdate") {
    if (!dev.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can   Use this Command **`
      );
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Numbed Of Max Channels Update Limites!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Only Numbers!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedchupdate_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor('#FFD700')
          .setDescription(`**✅ || New max Channels Update limites set to: \`${args[0]}\`**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
      }

});

// RolesUpdate
client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(!prefix) prefix = prefixx
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-rolesupdate") {
   if (!dev.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can Use this Command **`
      );
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Numbed Of Max Roles Update Limites!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Only Numbers!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedroleu_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor('#FFD700')
          .setDescription(`**✅ || New max Roles Update limites set to: \`${args[0]}\`**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
      }

});





//////////////////////////////////////////////////////////////////////////////




client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(!prefix) prefix = prefixx
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-rolesdelete") {
   if (!dev.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can   Use this Command **`
      );
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Numbed Of Max Roles Delete Limites!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Only Numbers!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedroled_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor('#FFD700')
          .setDescription(`**✅ || New max Roles Delete limites set to: \`${args[0]}\`**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
      }

});

//////////////////////////////////////////////////////////////////////////////

client.on('message', async(message) => {
    if(message.channel.type === "dm") return;
    let prefix = db.get(`prefix_${message.guild.id}`)
    if(!prefix) prefix = prefixx
    const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();
      if(command === "set-channeldelete") {
   if (!dev.includes(message.author.id))
      return message.channel.send(
        `** :x: Only Owners Can   Use this Command **`
      );
          if(!args[0]) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Numbed Of Max Roles Delete Limites!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Only Numbers!.**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
          if(args[0] === '0') return message.channel.send(new Discord.MessageEmbed()
          .setColor('#CC0000')
          .setDescription(`**❌ Error: Must provide Valid Number!.**`))
          db.set(`limitedchd_${message.guild.id}`, args[0])
          message.channel.send(new Discord.MessageEmbed()
          .setColor('#FFD700')
          .setDescription(`**✅ || New max Roles Delete limites set to: \`${args[0]}\`**`)
          .setTimestamp()
          .setFooter(`Super Protection✨`))
      }

});

//////////////////////////////////////////////////////////////////////////////





client.on('channelUpdate', async (oldChannel, newChannel) => {
    if(oldChannel.type === "dm") return;
    if(newChannel.type === "dm") return;
    if(!db.has(`on_${oldChannel.guild.id}`)) return;
    let logsch = db.get(`logsch_${oldChannel.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await oldChannel.guild.fetchAuditLogs({
		limit: 1,
		type: 'CHANNEL_UPDATE',
	});
    const chupdater = fetchedLogs.entries.first();
    if (!chupdater) return
    const { executor, target } = chupdater;
        if(db.has(`${executor.id}_chupdater`)) {db.add(`${executor.id}_chupdater`, 1)}
        if(!db.has(`${executor.id}_chupdater`)) {db.set(`${executor.id}_chupdater`, 1)}
        if(!db.has(`limitedchupdate_${oldChannel.guild.id}`)) {db.set(`limitedchupdate_${oldChannel.guild.id}`, 15)}
        let rc = newChannel.name
        if(oldChannel.name === rc) rc = "None"
        if(db.has(`${executor.id}_chupdater`)) {
            let createchcounts = db.get(`${executor.id}_chupdater`)
            let maxcreatech = db.get(`limitedchupdate_${oldChannel.guild.id}`)
                let creatchembed1 = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("update channel actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('updated channel:', `${oldChannel.name}`)
                .addField('New channel name:', `${rc}`)
                .addField(`update count:`, createchcounts)
                .addField(`max updates limite:`, maxcreatech)
                .addField('action taken:', 'roles removed')



                let creatchembed = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("update channel actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('updated channel:', `${oldChannel.name}`)
                .addField('New channel name:', `${rc}`)
                .addField(`update count:`, createchcounts)
                .addField(`max updates limite:`, maxcreatech)
                .addField('action taken:', 'no actions taken.')

                if(Number(db.get(`${executor.id}_chupdater`)) <= Number(db.get(`limitedchupdate_${oldChannel.guild.id}`))) {
                    oldChannel.guild.channels.cache.get(db.get(`logsch_${oldChannel.guild.id}`)).send(creatchembed);
                }
                    if(Number(db.get(`${executor.id}_chupdater`)) > Number(db.get(`limitedchupdate_${oldChannel.guild.id}`))) {
                        oldChannel.guild.channels.cache.get(db.get(`logsch_${oldChannel.guild.id}`)).send(creatchembed1);
                        oldChannel.guild.members.cache.get(executor.id).roles.cache.forEach(role => {
                            if(role.permissions.has("MANAGE_CHANNELS")) {
                                oldChannel.guild.members.cache.get(executor.id).roles.remove(role.id)    
                            }
                        });
                    }
            
            
                
            
        
	}
});


//////////////////////////////////////////////////////////////////////////////




client.on('channelCreate', async channel => {
    if(channel.type === "dm") return;
    if(!db.has(`on_${channel.guild.id}`)) return;
    let logsch = db.get(`logsch_${channel.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await channel.guild.fetchAuditLogs({
		limit: 1,
		type: 'CHANNEL_CREATE',
	});
    const chdeletor = fetchedLogs.entries.first();
    if (!chdeletor) return
    const { executor, target } = chdeletor;
        if(db.has(`${executor.id}_chc`)) {db.add(`${executor.id}_chc`, 1)}
        if(!db.has(`${executor.id}_chc`)) {db.set(`${executor.id}_chc`, 1)}
        if(!db.has(`limitedchc_${channel.guild.id}`)) {db.set(`limitedchc_${channel.guild.id}`, 15)}

        if(db.has(`${executor.id}_chc`)) {
            let createchcounts = db.get(`${executor.id}_chc`)
            let maxcreatech = db.get(`limitedchc_${channel.guild.id}`)
                let creatchembed1 = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("create channel actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('created channel:', `${channel.name}`)
                .addField(`create count:`, createchcounts)
                .addField(`max creates limite:`, maxcreatech)
                .addField('action taken:', 'roles removed')



                let creatchembed = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("create channel actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('created channel:', `${channel.name}`)
                .addField(`create count:`, createchcounts)
                .addField(`max creates limite:`, maxcreatech)
                .addField('action taken:', 'no actions taken.')

                if(Number(db.get(`${executor.id}_chc`)) <= Number(db.get(`limitedchc_${channel.guild.id}`))) {
                    channel.guild.channels.cache.get(db.get(`logsch_${channel.guild.id}`)).send(creatchembed);
                }
                    if(Number(db.get(`${executor.id}_chc`)) > Number(db.get(`limitedchc_${channel.guild.id}`))) {
                        channel.guild.channels.cache.get(db.get(`logsch_${channel.guild.id}`)).send(creatchembed1);
                        channel.guild.members.cache.get(executor.id).roles.cache.forEach(role => {
                            if(role.permissions.has("MANAGE_CHANNELS")) {
                                channel.guild.members.cache.get(executor.id).roles.remove(role.id)    
                            }
                        });
                    }
            
            
                
            
        
	}
});


//////////////////////////////////////////////////////////////////////////////




client.on('roleDelete', async role => {
    if(!db.has(`on_${role.guild.id}`)) return;
    let logsch = db.get(`logsch_${role.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await role.guild.fetchAuditLogs({
		limit: 1,
		type: 'ROLE_DELETE',
	});
    const roledeletor = fetchedLogs.entries.first();
    if (!roledeletor) return
    const { executor, target } = roledeletor;
        if(db.has(`${executor.id}_rd`)) {db.add(`${executor.id}_rd`, 1)}
        if(!db.has(`${executor.id}_rd`)) {db.set(`${executor.id}_rd`, 1)}
        if(!db.has(`limitedroled_${role.guild.id}`)) {db.set(`limitedroled_${role.guild.id}`, 15)}

        if(db.has(`${executor.id}_rd`)) {
            let deletecountrole = db.get(`${executor.id}_rd`)
            let maxdeleterole = db.get(`limitedroled_${role.guild.id}`)
                let deleterembed1 = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("role Delete actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('role :', `${role.name}`)
                .addField(`role Delete count:`, deletecountrole)
                .addField(`max role Delete limite :`, maxdeleterole)
                .addField('action taken:', 'roles removed')



                let deleterembed = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("role Delete actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('role :', `${role.name}`)
                .addField(`role Delete count :`, deletecountrole)
                .addField(`max role Delete limite :`, maxdeleterole)
                .addField('action taken:', 'no actions taken.')

                if(Number(db.get(`${executor.id}_rd`)) <= Number(db.get(`limitedroled_${role.guild.id}`))) {
                    role.guild.channels.cache.get(db.get(`logsch_${role.guild.id}`)).send(deleterembed);
                }
                    if(Number(db.get(`${executor.id}_rd`)) > Number(db.get(`limitedroled_${role.guild.id}`))) {
                        role.guild.channels.cache.get(db.get(`logsch_${role.guild.id}`)).send(deleterembed1);
                        role.guild.members.cache.get(executor.id).roles.cache.forEach(rolea => {
                            if(rolea.permissions.has("MANAGE_ROLES")) {
                                role.guild.members.cache.get(executor.id).roles.remove(rolea.id)    
                            }
                        });
                    }
            
            
                
            
        }
});

//////////////////////////////////////////////////////////////////////////////





client.on('roleCreate', async role => {
    if(!db.has(`on_${role.guild.id}`)) return;
    let logsch = db.get(`logsch_${role.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await role.guild.fetchAuditLogs({
		limit: 1,
		type: 'ROLE_CREATE',
	});
    const roledeletor = fetchedLogs.entries.first();
    if (!roledeletor) return
    const { executor, target } = roledeletor;
        if(db.has(`${executor.id}_r`)) {db.add(`${executor.id}_r`, 1)}
        if(!db.has(`${executor.id}_r`)) {db.set(`${executor.id}_r`, 1)}
        if(!db.has(`limitedrole_${role.guild.id}`)) {db.set(`limitedrole_${role.guild.id}`, 15)}

        if(db.has(`${executor.id}_r`)) {
            let createcount = db.get(`${executor.id}_r`)
            let maxcreate = db.get(`limitedrole_${role.guild.id}`)
                let createembed1 = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("role create actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('role :', `${role.name}`)
                .addField(`role create count:`, createcount)
                .addField(`max role create limite :`, maxcreate)
                .addField('action taken:', 'roles removed')



                let createembed = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("role create actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('role :', `${role.name}`)
                .addField(`role create count :`, createcount)
                .addField(`max role create limite :`, maxcreate)
                .addField('action taken:', 'no actions taken.')

                if(Number(db.get(`${executor.id}_r`)) <= Number(db.get(`limitedrole_${role.guild.id}`))) {
                    role.guild.channels.cache.get(db.get(`logsch_${role.guild.id}`)).send(createembed);
                }
                    if(Number(db.get(`${executor.id}_r`)) > Number(db.get(`limitedrole_${role.guild.id}`))) {
                        role.guild.channels.cache.get(db.get(`logsch_${role.guild.id}`)).send(createembed1);
                        role.guild.members.cache.get(executor.id).roles.cache.forEach(rolee => {
                            if(rolee.permissions.has("MANAGE_ROLES")) {
                                role.guild.members.cache.get(executor.id).roles.remove(rolee.id)    
                            }
                        });
                    }
            
            
                
            
        
	}
});




//////////////////////////////////////////////////////////////////////////////
client.on('roleUpdate', async (oldRole, newRole) => {
    if(!db.has(`on_${oldRole.guild.id}`)) return;
    let logsch = db.get(`logsch_${oldRole.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await newRole.guild.fetchAuditLogs({
		limit: 1,
		type: 'ROLE_UPDATE',
	});
    const roleu = fetchedLogs.entries.first();
    if (!roleu) return
    const { executor, target } = roleu;
        if(db.has(`${executor.id}_ru`)) {db.add(`${executor.id}_ru`, 1)}
        if(!db.has(`${executor.id}_ru`)) {db.set(`${executor.id}_ru`, 1)}
        if(!db.has(`limitedroleu_${newRole.guild.id}`)) {db.set(`limitedroleu_${newRole.guild.id}`, 15)}
        let rn = oldRole.name
        if(rn === oldRole.name) rn = 'None'
        if(db.has(`${executor.id}_ru`)) {
            let updatecounte = db.get(`${executor.id}_ru`)
            let maxupdate = db.get(`limitedroleu_${newRole.guild.id}`)
                let updateroleembed1 = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("role Update actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})`)
                .addField('old role name :', `${oldRole.name}`)
                .addField('new name :', rn)
                .addField(`role Update count:`, updatecounte)
                .addField(`max role update limite :`, maxupdate)
                .addField('action taken:', 'roles removed')



                let updateroleembed = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("role update actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})`)
                .addField('role :', `${oldRole.name}`)
                .addField('new name :', rn)
                .addField(`role update count :`, updatecounte)
                .addField(`max role update limite :`, maxupdate)
                .addField('action taken:', 'no actions taken.')

                if(Number(db.get(`${executor.id}_ru`)) <= Number(db.get(`limitedroleu_${newRole.guild.id}`))) {
                    oldRole.guild.channels.cache.get(db.get(`logsch_${oldRole.guild.id}`)).send(updateroleembed);
                }
                    if(Number(db.get(`${executor.id}_ru`)) > Number(db.get(`limitedroleu_${newRole.guild.id}`))) {
                        oldRole.guild.channels.cache.get(db.get(`logsch_${oldRole.guild.id}`)).send(updateroleembed1);
                        oldRole.guild.members.cache.get(executor.id).roles.cache.forEach(role => {
                            if(role.permissions.has("MANAGE_ROLES")) {
                                newRole.guild.members.cache.get(executor.id).roles.remove(role.id)    
                            }
                        });
                    }
            
            
                
            
        }
});

// Member Kick
client.on('guildMemberRemove', async member => {
    if(!db.has(`on_${member.guild.id}`)) return;
    let logsch = db.get(`logsch_${member.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_KICK',
	});
    const banlog = fetchedLogs.entries.first();
    if (!banlog) return
    const { executor, target } = banlog;
    if (target.id === member.id) {
        if(db.has(`${executor.id}_kicks`)) {db.add(`${executor.id}_kicks`, 1)}
        if(!db.has(`${executor.id}_kicks`)) {db.set(`${executor.id}_kicks`, 1)}

        if(!db.has(`limitedkick_${member.guild.id}`)) {db.set(`limitedkick_${member.guild.id}`, 15)}

        if(db.has(`${executor.id}_kicks`)) {
            let kickscount = db.get(`${executor.id}_kicks`)
            let maxkicks = db.get(`limitedkick_${member.guild.id}`)
                let kicksembed = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("kick actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('kicked member:', `${member.user.tag}(${member.user.id}`)
                .addField(`kick count:`, kickscount)
                .addField(`max kicks limite:`, maxkicks)
                .addField('action taken:', 'roles removed')



                let kickembed1 = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("kick actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('kicked member:', `${member.user.tag}(${member.user.id}`)
                .addField(`kicks count:`, kickscount)
                .addField(`max kicks limite:`, maxkicks)
                .addField('action taken:', 'no actions taken.')

                if(Number(db.get(`${executor.id}_kicks`)) <= Number(db.get(`limitedkick_${member.guild.id}`))) {
                    member.guild.channels.cache.get(db.get(`logsch_${member.guild.id}`)).send(kickembed1);
                }
                    if(Number(db.get(`${executor.id}_kicks`)) > Number(db.get(`limitedkick_${member.guild.id}`))) {
                        member.guild.channels.cache.get(db.get(`logsch_${member.guild.id}`)).send(kicksembed);
                        member.guild.members.cache.get(executor.id).roles.cache.forEach(role => {
                            if(role.permissions.has("KICK_MEMBERS")) {
                                member.guild.members.cache.get(executor.id).roles.remove(role.id)    
                            }
                        });
                    }
            
            
                
            
        }
	}
});


// Channel Delete
client.on('channelDelete', async channel => {
    if(channel.type === "dm") return;
    if(!db.has(`on_${channel.guild.id}`)) return;
    let logsch = db.get(`logsch_${channel.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await channel.guild.fetchAuditLogs({
		limit: 1,
		type: 'CHANNEL_DELETE',
	});
    const chdeletor = fetchedLogs.entries.first();
    if (!chdeletor) return
    const { executor, target } = chdeletor;
        if(db.has(`${executor.id}_chd`)) {db.add(`${executor.id}_chd`, 1)}
        if(!db.has(`${executor.id}_chd`)) {db.set(`${executor.id}_chd`, 1)}
        if(!db.has(`limitedchd_${channel.guild.id}`)) {db.set(`limitedchd_${channel.guild.id}`, 15)}

        if(db.has(`${executor.id}_chd`)) {
            let deletescount = db.get(`${executor.id}_chd`)
            let maxdeletes = db.get(`limitedchd_${channel.guild.id}`)
                let deletechembed1 = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("delete channel actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('delete channel:', `${channel.name}`)
                .addField(`delete count:`, deletescount)
                .addField(`max deletes limite:`, maxdeletes)
                .addField('action taken:', 'roles removed')



                let deletechembed = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("delete channel actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('deleted channel:', `${channel.name}`)
                .addField(`delete count:`, deletescount)
                .addField(`max deletes limite:`, maxdeletes)
                .addField('action taken:', 'no actions taken.')

                if(Number(db.get(`${executor.id}_chd`)) <= Number(db.get(`limitedchd_${channel.guild.id}`))) {
                    channel.guild.channels.cache.get(db.get(`logsch_${channel.guild.id}`)).send(deletechembed);
                }
                    if(Number(db.get(`${executor.id}_chd`)) > Number(db.get(`limitedchd_${channel.guild.id}`))) {
                        channel.guild.channels.cache.get(db.get(`logsch_${channel.guild.id}`)).send(deletechembed1);
                        channel.guild.members.cache.get(executor.id).roles.cache.forEach(role => {
                            if(role.permissions.has("MANAGE_CHANNELS")) {
                                channel.guild.members.cache.get(executor.id).roles.remove(role.id)    
                            }
                        });
                    }
            
            
                
            
        
	}
});


// Member Ban
client.on('guildMemberRemove', async member => {
    if(!db.has(`on_${member.guild.id}`)) return;
    let logsch = db.get(`logsch_${member.guild.id}`)
    if(!logsch) return;
	const fetchedLogs = await member.guild.fetchAuditLogs({
		limit: 1,
		type: 'MEMBER_BAN',
	});
    const kickLog = fetchedLogs.entries.first();
    if (!kickLog) return
    const { executor, target } = kickLog;
    if (target.id === member.id) {
        if(db.has(`${executor.id}_bans`)) {db.add(`${executor.id}_bans`, 1)}
        if(!db.has(`${executor.id}_bans`)) {db.set(`${executor.id}_bans`, 1)}

        if(!db.has(`limitedban_${member.guild.id}`)) {db.set(`limitedban_${member.guild.id}`, 15)}

        if(db.has(`${executor.id}_bans`)) {
            let banscount = db.get(`${executor.id}_bans`)
            let maxbans = db.get(`limitedban_${member.guild.id}`)
                let bansembed = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("ban actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField(`bans count:`, banscount)
                .addField(`max bans limite:`, maxbans)
                .addField('action taken:', 'roles removed')



                let bansembed1 = new Discord.MessageEmbed()
                .setColor("#034B03")
                .setAuthor(client.user.tag,client.user.displayAvatarURL())
                .setTitle("ban actions:")
                .addField(`mod:`, `${executor.tag}(${executor.id})` )
                .addField('banned member:', `${member.user.tag}(${member.user.id}`)
                .addField(`bans count:`, banscount)
                .addField(`max bans limite:`, maxbans)
                .addField('action taken:', 'no actions taken.')

                if(Number(db.get(`${executor.id}_bans`)) <= Number(db.get(`limitedban_${member.guild.id}`))) {
                    client.channels.cache.get(db.get(`logsch_${member.guild.id}`)).send(bansembed1);
                }
                    if(Number(db.get(`${executor.id}_bans`)) > Number(db.get(`limitedban_${member.guild.id}`))) {
                        client.channels.cache.get(db.get(`logsch_${member.guild.id}`)).send(bansembed);
                        member.guild.members.cache.get(executor.id).roles.cache.forEach(role => {
                            if(role.permissions.has("BAN_MEMBERS")) {
                                member.guild.members.cache.get(executor.id).roles.remove(role.id)    
                            }
                        });
                    }
            
            
                
            
        }
	}
});



client.login(process.env.token)
