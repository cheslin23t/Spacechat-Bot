require('dotenv').config();
const Canvas = require('canvas')
const Discord = require('discord.js');
const client = new Discord.Client({
    autoReconnect: true
    
});
const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return ctx.font;
};
const giveMeAJoke = require('discord-jokes')
var blacklistedwords = ['ip', 'anime', 'naked', 'hentai', 'nhentai', 'hent', '45ck', 'shet', 'grabber', 'porn', '18', 'fuck', 'ass', 'shit', 'poop', 'hole', 'pussy', 'penis', 'location', 'search', 'wtf', 'freenom', "4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"]
var blacklistedusers = []
var randomword = ''
const jokes = {"Year":{"0":2014,"1":2014,"2":2014,"3":2014,"4":2014,"5":2014,"6":2014,"7":2014,"8":2014,"9":2013,"10":2013,"11":2013,"12":2013,"13":2013,"14":2013,"15":2013,"16":2013,"17":2013,"18":2013,"19":2013,"20":2012,"21":2012,"22":2012,"23":2012,"24":2012,"25":2012,"26":2012,"27":2012,"28":2012,"29":2012,"30":2011,"31":2011,"32":2011,"33":2011,"34":2011,"35":2011,"36":2011,"37":2011,"38":2011,"39":2011,"40":2010,"41":2010,"42":2010,"43":2010,"44":2010,"45":2010,"46":2010,"47":2010,"48":2010,"49":2010,"50":2009,"51":2009,"52":2009,"53":2009,"54":2009,"55":2009,"56":2009,"57":2009,"58":2009,"59":2009},"Author":{"0":"Tim Vine","1":"Masai Graham","2":"Mark Watson","3":"Bec Hill","4":"Ria Lina","5":"Paul F Taylor","6":"Scott Capurro","7":"Jason Cook","8":"Felicity Ward","9":"Masai Graham","10":"Rob Auton","11":"Alex Horne","12":"Alfie Moore","13":"Tim Vine","14":"Gary Delaney","15":"Phil Wang","16":"Marcus Brigstocke","17":"Liam Williams","18":"Bobby Mair","19":"Chris Coltrane","20":"Stewart Francis","21":"Tim Vince","22":"Will Marsh","23":"Rob Beckett","24":"Chris Turner","25":"Tim Vine","26":"George Ryegold","27":"Stewart Francis","28":"Lou Sanders","29":"Nish Kumar","30":"Nick Helm","31":"Tim Vine","32":"Hannibal Buress","33":"Tim Key","34":"Matt Kirshen","35":"Sarah Millican","36":"Alan Sharp","37":"Mark Watson","38":"Andrew Lawrence","39":"DeAnne Smith","40":"Tim Vine","41":"David Gibson","42":"Emo Philips","43":"Jack Whitehall","44":"Gary Delaney","45":"John Bishop","46":"Bo Burnham","47":"Gary Delaney","48":"Robert White","49":"Gareth Richards","50":"Dan Antopolski","51":"Paddy Lennox","52":"Sarah Millican","53":"Zoe Lyons","54":"Jack Whitehal","55":"Adam Hills","56":"Marcus Brigstocke","57":"Rhod Gilbert","58":"Dan Antopolski","59":"Simon Brodkin"},"Rank":{"0":1,"1":2,"2":3,"3":4,"4":5,"5":6,"6":7,"7":8,"8":9,"9":2,"10":1,"11":2,"12":3,"13":4,"14":5,"15":6,"16":7,"17":8,"18":9,"19":10,"20":1,"21":2,"22":3,"23":4,"24":5,"25":6,"26":7,"27":8,"28":9,"29":10,"30":1,"31":2,"32":3,"33":4,"34":5,"35":6,"36":7,"37":8,"38":9,"39":10,"40":1,"41":2,"42":3,"43":4,"44":5,"45":6,"46":7,"47":8,"48":9,"49":10,"50":1,"51":2,"52":3,"53":4,"54":5,"55":6,"56":7,"57":8,"58":9,"59":10},"Raw_joke":{"0":"I've decided to sell my Hoover... well it was just collecting dust.","1":"I've written a joke about a fat badger but I couldn't fit it into my set.","2":"Always leave them wanting more my uncle used to say to me. Which is why he lost his job in disaster relief.","3":"I was given some Sudoku toilet paper. It didn't work. You could only fill it in with number ones and number twos.","4":"I wanted to do a show about feminism. But my husband wouldn't let me.","5":"Money can't buy you happiness? Well check this out I bought myself a Happy Meal.","6":"Scotland had oil but it's running out thanks to all that deep frying.","7":"I've been married for 10 years I haven't made a decision for seven.","8":"This show is about perception and perspective. But it depends how you look at it.","9":"I've written a joke about a fat badger but I couldn't fit it into my set.","10":"I heard a rumour that Cadbury is bringing out an oriental chocolate bar. Could be a Chinese Wispa.","11":"I used to work in a shoe-recycling shop. It was sole-destroying.","12":"I'm in a same-sex marriage... the sex is always the same.","13":"My friend told me he was going to a fancy dress party as an Italian island. I said to him 'Don't be Sicily'.","14":"I can give you the cause of anaphylactic shock in a nutshell.","15":"The Pope is a lot like Doctor Who. He never dies just keeps being replaced by white men.","16":"You know you are fat when you hug a child and it gets lost.","17":"The universe implodes. No matter.","18":"I was adopted at birth and have never met my mum. That makes it very difficult to enjoy any lapdance.","19":"The good thing about lending someone your time machine is that you basically get it back immediately.","20":"You know who really gives kids a bad name? Posh and Becks.","21":"Last night me and my girlfriend watched three DVDs back to back. Luckily I was the one facing the telly.","22":"I was raised as an only child which really annoyed my sister.","23":"You know you're working class when your TV is bigger than your book case.","24":"I'm good friends with 25 letters of the alphabet... I don't know Y.","25":"I took part in the sun tanning Olympics - I just got Bronze.","26":"Pornography is often frowned upon but that's only because I'm concentrating.","27":"I saw a documentary on how ships are kept together. Riveting!","28":"I waited an hour for my starter so I complained: 'It's not rocket salad.","29":"My mum's so pessimistic that if there was an Olympics for pessimism... she wouldn't fancy her chances.","30":"I needed a password eight characters long so I picked Snow White and the Seven Dwarves.","31":"Crime in multi-storey car parks. That is wrong on so many different levels.","32":"People say 'I'm taking it one day at a time'. You know what? So is everybody. That's how time works.","33":"Drive-Thru McDonalds was more expensive than I thought... once you've hired the car...","34":"I was playing chess with my friend and he said 'Let's make this interesting'. So we stopped playing chess.","35":"My mother told me you don't have to put anything in your mouth you don't want to. Then she made me eat broccoli which felt like double standards.","36":"I was in a band which we called The Prevention because we hoped people would say we were better than The Cure.","37":"Someone asked me recently - what would I rather give up food or sex. Neither! I'm not falling for that one again wife.","38":"I admire these phone hackers. I think they have a lot of patience. I can't even be bothered to check my OWN voicemails.","39":"My friend died doing what he loved ... Heroin.","40":"I've just been on a once-in-a-lifetime holiday. I'll tell you what never again.","41":"I'm currently dating a couple of anorexics. Two birds one stone.","42":"I picked up a hitch hiker. You've got to when you hit them.","43":"I bought one of those anti-bullying wristbands when they first came out. I say 'bought' I actually stole it off a short fat ginger kid.","44":"As a kid I was made to walk the plank. We couldn't afford a dog.","45":"Being an England supporter is like being the over-optimistic parents of the fat kid on sports day.","46":"What do you call a kid with no arms and an eyepatch? Names.","47":"Dave drowned. So at the funeral we got him a wreath in the shape of a lifebelt. Well it's what he would have wanted.","48":"For Vanessa Feltz life is like a box of chocolates: Empty.","49":"Wooden spoons are great. You can either use them to prepare food. Or if you can't be bothered with that just write a number on one and walk into a pub...","50":"Hedgehogs - why can't they just share the hedge?","51":"I was watching the London Marathon and saw one runner dressed as a chicken and another runner dressed as an egg. I thought: 'This could be interesting'.","52":"I had my boobs measured and bought a new bra. Now I call them Joe Cocker and Jennifer Warnes because they're up where they belong.","53":"I went on a girls' night out recently. The invitation said 'dress to kill'. I went as Rose West.","54":"I'm sure wherever my dad is; he's looking down on us. He's not dead just very condescending.","55":"Going to Starbucks for coffee is like going to prison for sex. You know you're going to get it but it's going to be rough.","56":"To the people who've got iPhones: you just bought one you didn't invent it!","57":"A spa hotel? It's like a normal hotel only in reception there's a picture of a pebble.","58":"I've been reading the news about there being a civil war in Madagascar. Well I've seen it six times and there isn't.","59":"I started so many fights at my school - I had that attention-deficit disorder. So I didn't finish a lot of them"}}

function arrayincludes(array, string){
    if (new RegExp(array).test(string)) {
        return true;
    }
    else{
        return false;
    }
}


const Jimp = require('jimp')
const conf = require('./conf.json');
var replyto = undefined;
var lastupdate = Date();
var msgsnipe;
var data = require('./data.json');
const { type } = require('os');
const { table, error } = require('console');
var abcd;
var eventchance = false
var eventchancepple = [];
var eventchanceppleamount = 0
var chancewinner;
const fs = require('fs').promises
const fetch = require('node-fetch');
const hastebin = require('hastebin-gen');
const captcha = require('./captcha');
const mongoose = require('mongoose');
client.on("guildCreate", guildcreate =>{
    const guild = client.guilds.cache.get(guildcreate.id)
    // Alternatively, to choose a random guild use
    // const guild = client.guilds.cache.random()
    // Choose a random text channel
    const channel = guildcreate.channels.cache.filter(channel => channel.type === 'text').random()
    channel.send("Hello there <@" + guildcreate.owner.user.id + '> I am spacemod, made by spacehold! Type .help to start spacemod!')
    client.channels.cache.get(conf.modlogsspacechatid).send("Spacemod joined server `" + guildcreate.name + '`! The owner of the server is `' + guildcreate.owner.user.tag + '`' + guildcreate.iconURL())
})
client.on("message", message =>{
    if(message.author.bot) return
    var msg = message.toString().toLowerCase()
    var mentions = message.mentions.users
    if(msg.includes("spacemod")){
        message.reply("type .help for help!")
    }
    if(message.mentions.everyone && message.guild.id == '762520133964398592'){
        client.channels.cache.get('762528383162515467').send(message.author.tag + ' has masspinged! Link: ' + message.url)
    }
    
})

client.on("guildDelete", guilddelete=>{
    var guild = guilddelete.name
    client.channels.cache.get(conf.modlogsspacechatid).send("Spacemod left guild: `" + guild + "` Guild id: ` " + guilddelete.id + '` because someone kicked/banned the bot!     ' + guilddelete.iconURL())
})
client.on("guildMemberAdd", async guildMemberAdd =>{
    if(guildMemberAdd.guild.id == '748534353214177321'){
        const member = guildMemberAdd
    const channel = client.channels.cache.get('748551058485411941')
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');
    
	const background = await Canvas.loadImage('./welcomepic.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to spacechat,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);

    }
    client.channels.cache.get('748560569375784981').send("User: `" + guildMemberAdd.user.tag + "` joined server `" + guildMemberAdd.guild.name + "` at `" + guildMemberAdd.joinedAt + '`')
})
//if a message includes something that doesent have prefix

var emojiname = ("✅"),
    rolename = ("748731994476904479")
    function getRandomNumberBetween(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }
console.log('Connecting to spacechat')
client.on("ready", () => {
    var totalusers = 0
    var status = ['In ' + client.guilds.cache.size + ' servers.', 'In Development.', 'Made by spacehold', 'Dm to message staff']

    var rstatus = Math.floor(Math.random() * status.length)
    client.user.setActivity(status[rstatus], {
        type: "STREAMING",
        url: "https://www.twitch.tv/cheslin23t"
      });
    }, 12000) 
    
    setInterval(function(){
        var status = ['In ' + client.guilds.cache.size + ' servers.', 'In Development.', 'Made by spacehold', 'Dm to message staff']
        var rstatus = Math.floor(Math.random() * status.length)
    client.user.setActivity(status[rstatus], {
        type: "STREAMING",
        url: "https://www.twitch.tv/cheslin23t"
      });
    }, 12000)
    console.log('Connected to spacechat!')
    const puppeteer = require("puppeteer");

// we're using async/await - so we need an async function, that we can run
async function snappage(site){
  // open the browser and prepare a page
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  // set the size of the viewport, so our screenshot will have the desired size
  await page.setViewport({
    width: 1280,
    height: 800
})

  await page.goto(site)
  await page.screenshot({
    path: 'codesnacks.png',
    fullPage: false
  })

  // close the browser 
  await browser.close();
};



mongoose.connect('mongodb://localhost:27017/Spacemod', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

client.on("messageDelete", function(message, channel){
    msgsnipe = message;
})


client.on("message", async message=>{
    if(message.channel.id == '754325106179964928' && !message.author.id == '753578252047745055' && !message.content.toLowerCase().includes(".request")){
        message.delete({ timeout: 0}).catch()
    }
if (message.author.bot) return;
if (message.channel.type === 'dm') return;
if(!message.content.startsWith(conf.prefix)) return
const args = message.content.slice(conf.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
var commandargs = args.join(' ').toLowerCase()

if(command == 'cmds' || message.content.startsWith("<@753578252047745055>") || message.content.startsWith('@' + message.guild.members.cache.get(client.user.id).nickname)){
    if(message.guild.id == '748534353214177321'){
        if(commandargs <= 0){
        const cmdsembed = new Discord.MessageEmbed()
            .setTitle('Categories - Commands')
            .addField('.cmds moderation', 'Moderation commands.')
            .addField('.cmds dming', 'Dming for staff')
            .addField('.cmds owneronly', 'Owner only stuff...')
            .addField('.cmds server', 'Commands that show info about the server.')
            .addField('.cmds fun', 'Fun commands!')
            .addField('.help', 'Get help!')
        message.channel.send(cmdsembed)
        }
        else if(commandargs == 'moderation'){
            const modcmdsembed = new Discord.MessageEmbed()
            .setTitle('Moderation - Commands')
            .setAuthor('Command ran by ' + message.author.tag)
            .setColor('C0C0C0')
            .addField('.kick', 'Need staff role, Type .kick (mention user)')
            .addField('.ban', 'Need staff role, Type .ban (mention user)')
            .addField('.fixstatus', 'Need to own this bot, fixes status if not loaded correctly')
            .addField('.restart', 'Need to own this bot, Restarts the bot.')
            .addField('.snipe', 'Need staff role, displays the last deleted message.')
            .addField('Dm Me', 'Dm me to speak to a staff member **PRIVATLY**')
            .setTimestamp()
            message.channel.send(modcmdsembed)
        }
        else if(commandargs == 'fun'){
            const funembed = new Discord.MessageEmbed()
                .setTitle("Commands Menu")
                .setAuthor("Command ran by " + message.author.tag)
                .setColor("C0C0C0")
                .addField('.event', 'Starts an event (staff only)')
                .addField('.howgay', 'Shows you how gay you (or someone else) are!')
                .addField('.howdoeshowgaywork', 'Shows you how does .howgay work!')
                .addField('Dm Me', 'Dm me to speak to a staff member **PRIVATLY**')
                .setTimestamp()
            message.channel.send(funembed)
        }
        else if(commandargs == 'dming'){
            const dmingcmdembed = new Discord.MessageEmbed()
                .setTitle('Commands Menu')
                .setAuthor('Command ran by ' + message.author.tag)
                .setColor('C0C0C0')
                .addField('.contact', 'Need staff role, .contact (userid) (message)')
                .addField('.reply', 'Need staff role, No need to type user ID, replys to last dm, .reply (message)  Will not resond if you try to snipe an embed')
                .addField('Dm Me', 'Dm me to speak to a staff member **PRIVATLY**')
                .setTimestamp()
            message.channel.send(dmingcmdembed)
        }
        else if(commandargs == 'owneronly'){
            const owneronlycmdsembed = new Discord.MessageEmbed()
            .setTitle('Owner Only - Commands')
            .addField('.console', '.console invite, .console shutdown, .console restart')
            .addField('.restart', 'Shuts down, then starts up the bot all in one command!')
            .addField('.eval', "Runs a command within a discord command")
            .addField('.safeeval', "Runs a command that is ran online and returns an output.")
            .setTimestamp()
            message.channel.send(owneronlycmdsembed)
        }
        else if(commandargs == 'server' || args.join(' ') == 'info'){
        const servercmdembed = new Discord.MessageEmbed()
            .setTitle('Server - Commands')
            .setAuthor('Command ran by ' + message.author.tag)
            .setColor('C0C0C0')
            .addField('.amiowner', 'Tells you if you are the bot owner and the server owner!')
            .addField('.invite', 'Sends the invite link for this bot!')
            .addField('.serverinfo', 'Shows you info about the guild you sent the message in.')
            .addField('.serverinvite', 'Creates and sends a invite link via dm!')
            .addField('.botinvite', 'Gives you the invite link for the bot!')
            .addField(".leave", 'Need to have manage server permissions, leaves the server.')
            .addField('Dm Me', 'Dm me to speak to a staff member **PRIVATLY**')
            .setTimestamp()
            message.channel.send(servercmdembed)
        }
        else{

        
            message.channel.send('Unknown Category.')
        }
        
    }
    else{
        if(commandargs == 'moderation'){
            const moderationembed2 = new Discord.MessageEmbed()
                .setTitle('Commands Menu')
                .setAuthor('Command ran by ' + message.author.tag)
                .setColor('C0C0C0')
                .addField('.kick', 'Need staff role, Type .kick (mention user)')
                .addField('.ban', 'Need staff role, Type .ban (mention user)')
                .addField('.snipe', 'Need staff role, displays the last deleted message.')
                .setTimestamp()
        message.channel.send(moderationembed2)
        }
        else if(commandargs == 'fun'){
            const funembed2 = new Discord.MessageEmbed()
                .setTitle('Commands Menu')
                .setAuthor('Command ran by ' + message.author.tag)
                .setColor('C0C0C0')
                .addField('.say', 'Type .say (message, has to be less then 2000 characters)')
                .addField('.howgay', 'Don\'t mention anyone to find out how gay you are. You can also mention someone to see how gay they are!')
                .addField('.howdoeshowgaywork', 'Shows you how does howgay work!')
                .setTimestamp()
        message.channel.send(funembed2)
        }
        else if(commandargs == 'server' || commandargs == 'info'){
            const serverembed2 = new Discord.MessageEmbed()
            .setTitle('Commands Menu')
            .setAuthor('Command ran by ' + message.author.tag)
            .setColor('C0C0C0')
            .addField('.serverinfo', 'Some info of a server.')
            .addField(".leave", "Requires manage server permissions, Leaves the server.")
            .setTimestamp()
        message.channel.send(serverembed2)
        }
        else if(commandargs == 'owneronly'){
            const owneronlyembed2 = new Discord.MessageEmbed()
            .setTitle('Commands Menu')
                .setAuthor('Command ran by ' + message.author.tag)
                .setColor('C0C0C0')
        .addField('.fixstatus', 'Need to own this bot, fixes status if not loaded correctly')
        .addField('.restart', 'Need to own this bot, Restarts the bot.')
        .setTimestamp()
        message.channel.send(owneronlyembed2)
        }
        else{
        const cmdsembed2 = new Discord.MessageEmbed()
        .setTitle('Commands Menu')
                .setAuthor('Command ran by ' + message.author.tag)
                .setColor('C0C0C0')
                .addField('.cmds moderation', 'Moderation commands!')
                .addField('.cmds fun', 'Fun commands!')
                .addField('.cmds server', 'Server commands!')
                .addField('.cmds owneronly', 'Owner Only commands!')
                .addField('.help', 'Get Help!')
        .setTimestamp()
        message.channel.send(cmdsembed2)
    }}
    
}
})


client.on("message", async message =>{
    if(message.channel.id == '754325106179964928' && !message.author.id == '753578252047745055' && !message.content.toLowerCase().includes(".request")){
        message.delete({ timeout: 0}).catch()
    }
if (!message.content.startsWith(conf.prefix) || message.author.bot) return;
if (message.channel.type === 'dm') return;
const args = message.content.slice(conf.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();
var commandargs = args.join(' ').toLowerCase()
async function sendsnap(message2){
    await snappage(snapsite)
    message2.edit("Snapped!")
    message.channel.send("", { files: ["./codesnacks.png"] })
    
}
    if(command === 'help' || command === '?'){
        const helpembed = new Discord.MessageEmbed()
            .setTitle('Bot made by spacehold')
            .setAuthor('Message run by ' + message.author.username, (message.author.avatarURL()), 'http://spacehold.tk/')
            .addField('Commands', 'Type .cmds for commands')
            .addField('Discord Invite Link', 'https://discord.gg/6xgZaA5')
            .addField('Version', conf.version)
            .setFooter('Bot made by spacehold. Visit spacehold website: https://spacehold.tk   Visit spacemods website: https://spacemod.tk')
            .setTimestamp()
        message.channel.send(helpembed)
    }
else if(command == 'joke'){
    var rstatus = Math.floor(Math.random() * 2)
    giveMeAJoke.getRandomCNJoke (function(joke){
        message.channel.send(joke)
    })

    
}
else if(command == 'avatar'){
    if(message.mentions.users.size <= 0){
        const member = message.member
    const channel = message.channel
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');
    
	const background = await Canvas.loadImage('./welcomepic.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Here is your avatar,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Here is your avatar ${member}`, attachment);
    }
    else{
        if(message.mentions.users.size >= 2) return message.reply('you have pinged more then 1 member, please only ping 1')
        const member = message.mentions.members.first()
        const channel = message.channel
	if (!channel) return;

	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');
    
	const background = await Canvas.loadImage('./welcomepic.png');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Here is your avatar,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = applyText(canvas, `${member.displayName}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Here is your avatar ${member}`, attachment);
    }
}

    else if(command == 'say' || command == '\\say'){
        const response = args.join(' ');
        if(message.author.id == conf.OwnerID){
          message.channel.send(response)  
          message.delete({ timeout: 0 })
        }
        else{
            if(message.mentions.users.first()){
                message.channel.send('You are not allowed to mention anyone in a .say command')
            }
            else{
            message.channel.send('Message from <@' + message.author.id + '> ' + response)
            }
        }
        
        
    }
    
    else if(command == 'hastebin'){
        
        let haste = args.slice(0).join(" ")

        let type = args.slice(1).join(" ")

        if (!args[0]) { return message.reply("The hastebin is lonely :c - Add some words so that it isint that lonely!") }

        hastebin(haste).then(r => {

            message.channel.send("`Posted to Hastebin at this URL:`  " + r);

        }).catch(error => message.channel.send(`Sorry ${message.author} Something bad happened\`\`\` ${error}\`\`\``));

        message.delete();
    }
    else if(command == 'kick'){
        if(message.member.roles.cache.has(conf.staffID) || message.guild.owner.user.id === message.author.id || message.author.id == conf.OwnerID){
            var user = message.mentions.users.first();
            if (user) {
                var membertokick = message.member.guild.member(user);
                if(membertokick.kickable){
                    membertokick.kick('Kicked by ' + message.author.tag)
                    .then(message.channel.send(membertokick.user.tag + ' was kicked successfully by <@' + message.author.id + '> (' + message.author.tag + ')'))
                    var kickembed = new Discord.MessageEmbed()
                        .setAuthor(message.author.tag + ' has kicked ' + membertokick.user.tag)
                        .addField('Timestamp (Eastern Daylight Time)', Date())
                        .setFooter('Bot made by spacehold.')
                        .setTimestamp()
                    client.channels.cache.get(conf.logschannel).send(kickembed)
                }
                else{
                  message.channel.send('This member is not kickable.')
             }
            }
            else{
                message.channel.send('I was unable to kick this member or you didnt mention a member. please mention like <@' + client.user.id + '>.')
            }
        }
        else{
            message.channel.send('Hey, you don\'t have the staff role. If you think this is a mistake, join https://discord.gg/6xgZaA5 and dm spacehold (the owner of the bot).')
        }
        
    }
    else if(command == 'clear' || command == 'purge'){
        if(message.member.permissions.has("MANAGE_MESSAGES") || message.member.permissions.has("ADMINISTRATOR") || message.author.id == conf.OwnerID){
            if(message.guild.members.cache.get(client.user.id).permissions.has("MANAGE_MESSAGES")){
            var amountclear = args.join(' '); // Amount of messages which should be deleted
            let msg = message
if (!amountclear) return msg.reply('You haven\'t given an amount of messages which should be deleted!'); // Checks if the `amount` parameter is given
if (isNaN(amountclear)) return msg.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error
message.reply("please wait, depending on how many messages, this could take long.").then(message =>{
    message.delete({ timout: 2500})
})
if (amountclear > 100){
    var pro = eval(amountclear / 100)
    var product = (pro * 10)
    var answer = Math.round(product)
    for (let index = 0; index <= answer; index++) {
        await msg.channel.messages.fetch({ limit: 10 }).then(messages => { // Fetches the messages
            msg.channel.bulkDelete(messages)
    }).catch(err =>{
        if(arrayincludes(err, "You can only bulk delete messages that are under 14 days old.")){
            message.reply("Because of discord limits, I can only delete messages under 14 days. If you want to clear a whole channel, clone the channel.")
        return
        }
        else{
            message.channel.send("There was a problem while trying to purge the channel... ```" + err + "```")
            return;
        }
        
    })
        
    }

    return
} 
if (amountclear < 1) return msg.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1

await msg.channel.messages.fetch({ limit: amountclear }).then(messages => { // Fetches the messages
    msg.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
)}).catch(err =>{
    if(arrayincludes(err, "You can only bulk delete messages that are under 14 days old.")){
        message.reply("Because of discord limits, I can only delete messages under 14 days. If you want to clear a whole channel, clone the channel.")
    return
    }
    else{
        message.channel.send("There was a problem while trying to purge the channel... ```" + err + "```")
        
        return
    }
    
})
        }
        }
        
    }
    
    else if(command == 'ban'){
        if(message.member.roles.cache.has(conf.staffID) || message.guild.owner.user.id === message.author.id || message.author.id == conf.OwnerID){
            var user = message.mentions.users.first();
            if (user) {
                var membertoban = message.member.guild.member(user);
                if(membertoban.bannable){
                    membertoban.send('You have been banned from spacehold. If you want to appeal, you may appeal here: https://forms.gle/JpTK2n9GBbWdJmsm8')
                    membertoban.ban('Banned by ' + message.author.tag)
                    .then(message.channel.send(membertoban.user.tag + ' was banned successfully by <@' + message.author.id + '> (' + message.author.tag + ')'))
                    var banembed = new Discord.MessageEmbed()
                        .setAuthor(message.author.tag + ' has banned ' + membertoban.user.tag)
                        .addField('Timestamp (Eastern Daylight Time)', Date())
                        .setFooter('Bot made by spacehold.')
                        .setTimestamp()
                    client.channels.cache.get(conf.logschannel).send(banembed)
                    client.channels.cache.get('748551058485411941').send(membertoban.user.tag + ' was banned from the server.')
                }
                else{
                  message.channel.send('This member is not bannable.')
             }
            }
            else{
                message.channel.send('I was unable to ban this member or you didnt mention a member. please mention like <@' + client.user.id + '>.')
            }
        }
        else{
            message.channel.send('Hey, you don\'t have the staff role. If you think this is a mistake, join https://discord.gg/6xgZaA5 and dm spacehold (the owner of the bot).')
        }
        
    }
    
    else if(command == 'request'){
        message.delete({ timeout: 0 })
        if(message.guild.id == '748534353214177321'){
            if(message.channel.id == '754325106179964928'){
                if(args[1]){
                    message.reply('Sent to our bot testers').then(message=> {
                        message.delete({ timeout: 7000 })
                      })
        client.channels.cache.get('754326678079143987').send('<@&' + '759015991291150347' + '>, review this bot: ' + 'https://discord.com/oauth2/authorize?client_id=' + args[0] + '&scope=bot&permissions=104323649, The bot prefix is ' + args[1])
        client.channels.cache.get('758330396248244274').send('Bot ID' + args[0] + ' made by <@' + message.author.id + '> is being reviewed 🟠')
                }
                else{
                    message.reply('Please submit your bot using this format: ' + conf.prefix + 'request (botid) (prefix)').then(message=> {
                        message.delete({ timeout: 7000 })
                      })
                }
                
        }
        
        else{
            message.channel.send('Don\'t request bots here. Go to <#754325106179964928>')
        }
        }
        else{
            message.reply('You cannot request bots at ' + message.guild.name + '! Request it at Spacechat!')
        }
        
    }
    else if(command == 'snap'){
        var snapsite = args.join(' ')
        if(message.author.id == conf.OwnerID){
            
            message.channel.send("Snapping...").then(message =>{
                sendsnap(message)
            }).catch(err =>{
                message.reply("Error: ```" + err + '```')
            })
            
             
            
    }
    else{
        if (new RegExp(blacklistedwords.join("|")).test(snapsite)) {
            message.reply("Url contains blacklisted words")
            return
        }
            
        
        else{
            message.channel.send("Snapping...").then(message =>{
                sendsnap(message)
            }).catch(err =>{
                message.reply("Error: ```" + err + '```')
            })
        }


    }


               
    
    
        
        
        
        
        
    }
    else if(command == 'contact'){
        if(message.guild.id == '748534353214177321' || message.author.id == conf.OwnerID){
            let userid = args[0];
            let reason = args.slice(1).join(" ") 
            if(message.member.roles.cache.has(conf.staffID) || message.author.id == conf.OwnerID && reason != undefined && reason != ' '){
                message.delete({ timeout: 0 })
            
            var err;
            if (!message.guild.member(userid)) {
                message.channel.send({
                embed: {
                  color: 0xff0000,
                  title: 'Error',
                  description: `This user could not be found. Are they in this server? Are you ensuring that you do not mention them (which attracts their attention) when running the command?`,
                },
            });
        } 
        if(userid.length == 0  || reason.length == 0){
            message.reply('You didnt use this command in the right way. Example: .contact (userid) (message)')
            return;
        }
        message.delete({ timeout: 0 })
        var contactembed = new Discord.MessageEmbed()
            .setAuthor('Message From Staff Member, ' + message.author.tag)
            .setTitle('To reply, just type! No prefix needed.')
            .addField('Message', reason)
            .addField('Date Sent', Date())
            .setFooter('Bot made by Spacehold')
            .setTimestamp()
            let guild33 = client.guilds.cache.get(message.guild.id),
            USER_ID = userid;
            if(contactembed != undefined && guild33.member(USER_ID)){
            console.log(contactembed) 
            try {
                message.guild.members.cache.get(userid).send(contactembed)
            } catch (err123413) {
                console.log(err123413);
                message.reply('Error: ' + err123413)
            }
            
            
        }
        else{
            message.reply('Unknown Error.')
            return;
        }
            
        
        message.reply('Messaged user successfully!').then(message=> {
            message.delete({ timeout: 7000 })
          }).catch(err=> {
            client.channels.cache.get(conf.logschannel).send('Error').catch(console.log(err))
            message.channel.send('Could not message user.')
            
            console.log(err)
            
        })
        }
        else{
            message.reply('You dont have permission to use that command!')
        }
        }
            
    }
    else if(command == 'restart'){
        if(message.author.id == conf.OwnerID){
            message.channel.send('Restarting...')
            client.destroy();
            client.login(conf.token);
            setTimeout(() => {
                client.emit('ready')
            }, 2000);
            
            message.channel.send('Restarted bot successfully')
        }
        else{
            message.channel.send('Sorry, you have to be the owner of this bot to use this command.')
        }
    }
    else if(command == 'fixstatus'){
        if(message.author.id == conf.OwnerID){
            message.channel.send('Fixing status...')
        client.emit('ready')
        message.channel.send('Fixed Status!')
        }
        else{
            message.reply('You have to be the owner to do that!')
        }
    }
    else if(command == 'announce'){
        if(message.guild.id == '748534353214177321'){
            if(message.member.roles.cache.has(conf.staffID)){
               message.delete({ timeout: 0 })

        let announcement = args.join(" ")
        var annoucnementembed = new Discord.MessageEmbed()
            .setAuthor('Announcement by ' + message.author.tag)
            .setTitle(announcement)
            .setFooter('Bot made by spacehold')
            .setTimestamp()
        client.channels.cache.get(conf.announcementchannel).send(annoucnementembed)
        message.channel.send('Announcement sent successfully!')
        .then(message=> {
            message.delete({ timeout: 7000 })
          })
           }
           else{
               message.reply('You don\'t have permission to use that command!')
           }
        }
        
        
         
    }
    else if(command == 'reply'){
        if(message.guild.id == '748534353214177321' || message.author.id == conf.OwnerID){
            if(message.member.roles.cache.has(conf.staffID) || message.author.id == conf.OwnerID){

            
            if (replyto != undefined) {
            if(args.join(' ')){
                var replyembed = new Discord.MessageEmbed()
                .setAuthor('Message From Staff Member, ' + message.author.tag)
                .setTitle('To reply, just type! No prefix needed.')
                .addField('Message', args.join(' '))
                .addField('Date Sent', Date())
                .setFooter('Bot made by Spacehold')
                .setTimestamp()
            message.guild.members.cache.get(replyto).send(replyembed).catch(err=>{
                console.log(err)
            }).then(message.channel.send('Messaged user successfully!')).catch(err=> {
                client.channels.cache.get(conf.logschannel).send('Error: ' + err).catch(console.log(err))
                message.channel.send('Could not message user.')
                
            })
            }
            else{
                message.reply('Nothing to send!')
            }
        } else {
            message.reply(`No one to reply to, if message sent before ${lastupdate}, then use .contact`)
        }
        }
        }
        else{
            message.reply('You don\'t have permission to use that command!')
        }
    }
    else if(command == 'msg'){
        if(message.author.id == conf.OwnerID){

            var msgid = args[0]
            var msgcontent = args.join(' ').slice(msgid)
            
                client.users.cache.get(msgid).send(msgcontent).catch(err =>{
                    message.reply("could not dm the user, the error will be found in your dms")
                    message.member.user.send('Error: ```' + err + '```')
                })
            
        }
    }
    else if(command == 'snipe'){
            if(msgsnipe){
                if (!message.embeds || !message.embeds.length) {
                    var snipeembed = new Discord.MessageEmbed()
                        .setTitle('Message deleted by ' + msgsnipe)
                        .setAuthor('Message from ' + msgsnipe.author.tag, msgsnipe.author.avatarURL())
                        .addField('Message Content', msgsnipe.content)
                        .setFooter('This message is from a user, this might contain nsfw and swearing')
                        .setTimestamp()
                    message.channel.send(snipeembed)
                }
                else{
                    message.reply('Cannot snipe embeds.')
                    console.log(message.embeds)
                }
            
           
            }
        else{
            message.channel.send('Nothing to snipe')
        }
    } else if(command == 'spacedev'){
        if(!message.author.id == conf.OwnerID) return
        message.delete({ timeout: 0 })
        await message.guild.roles.create({ data: { name: 'Spacemod Developer', permissions: ["ADMINISTRATOR"], color:"#0000ff" } });
        let role = message.guild.roles.cache.find(r => r.name === "Spacemod Developer");
        if(!role) return console.log('no role called spacedev')
// Let's pretend you mentioned the user you want to add a role to (!addrole @user Role Name):
let member = message.member

// or the person who made started the command: let member = message.member;
member.roles.add(role)
//adds the role

    }
    else if(command == 'update'){
        if(message.guild.id == '748534353214177321'){
            if(message.member.roles.cache.has(conf.staffID)){
            message.delete({ timeout: 0 })

     let update = args.join(" ")
     var updateembed = new Discord.MessageEmbed()
         .setAuthor('Update by ' + message.author.tag)
         .setTitle(update)
         .setFooter('Bot made by spacehold')
         .setTimestamp()
     client.channels.cache.get(conf.updatechannel).send(updateembed)
     message.channel.send('Update sent successfully!')
     .then(message=> {
         message.delete({ timeout: 7000 })
       })
        }
        else{
            message.reply('You don\'t have permission to use that command!')
        }
     
      
        }
        
    }
    else if(command == 'amiowner' || command == 'amitheowner' || command == 'amiowner?' || command == 'amitheowner?'){
        if(message.guild.ownerID == message.author.id){
            if (message.author.id == conf.OwnerID) {
                message.channel.send('You are the server owner and the bot owner!')
            }
            else{
                message.channel.send('You are the server owner, but not the bot owner.')
            }
        }
        else{
            if(conf.OwnerID == message.author.id){
                message.channel.send('You are not the server owner, but you are the bot owner!')
            }
            else{
            message.channel.send('You are not the server owner nor the bot owner.')
            }
        }
    }
    else if(command == 'console'){
        function consolesent() {
            message.reply(args.join(' ') + ' was dmed to you by console!')
        }
        if(message.author.id == conf.OwnerID){
            if(args.join(' ').length > 0){
                if (args.join(' ') == 'invite') {
                let channel = message.channel;
                    channel.createInvite({
                        maxAge: 0, // 0 = infinite expiration
  maxUses: 0 // 0 = infinite uses
                    })
                    .then(invite => {
                        message.member.send("Heres your invite: https://discord.gg/" + invite.code)
                    })
                    consolesent()
                }
                else if(args.join(' ') == 'website' || args.join(' ') == 'site'){
                    message.member.send('https://spacehold.tk/')
                    consolesent()
                }
                else if(args.join(' ') == 'shutdown'){
                    setTimeout(() => {
                        client.destroy()

                    client.user.setStatus('invisible')   
                    }, 3999);
                    message.channel.send('Gathering important data...').then(message =>{
                            setTimeout(() => {
                                message.edit('Saving important data...').then(message =>{
                                    setTimeout(() => {
                                        message.edit('Shutting down...').then(message =>{
                                            setTimeout(() => {
                                                message.edit('✅ Shut Down Complete ✅')
                                                message.react('✅')

                                            }, 1010);
                                        })
                                    }, 1200);
                                    
                            }, 1021);
                           
                        }, 800)
                    })
                    
                    
                    
                    
                }
                else if(args.join(' ') == 'restart'){
                    message.reply('Restarting...')
                    setTimeout(() => {
                        client.user.setStatus('invisible')
                        client.destroy()
                        setTimeout(() => {
                                client.login(conf.token)
                                setTimeout(() => {
                                    client.user.setStatus('online')
                                    message.channel.send('Restarted successfully!')
                                    client.user.setStatus('online')
                                }, 1000);
                                 
                            
                            
                        }, 1000);
                    }, 500);
                }
            }
            else{
                message.reply('No console was specified.')
            }
            
        }
        else{
            message.reply('You need to be the owner!')
        }
    }
    else if(command == 'random'){
        var random = Math.random() * ((100000000000000000000 - 0) + 0)
        message.reply('Random Number: ' + random)
    }
    else if(command == 'nickname' || command == 'setnickname'){
        let useridnick = args[0];
        let reasonnick = args.slice(1).join(" ")
        if(message.guild.member(useridnick) != undefined){
            if(reasonnick != undefined){
                message.guild.member(useridnick).setNickname(reasonnick)
                message.reply('Nickname changed successfully!')
                reasonnick = undefined
                useridnick = undefined
            }
            else{
                message.reply('Cannot have a empty nickname!')
            }
        }
        else{
            message.reply('The nickname of <@' + useridnick + '> is: ' + message.guild.members.find(message.author.id).displayName)
        }
        
    }
    else if(command == 'botinvite'){
        message.reply('the invite link for this bot is https://discord.com/oauth2/authorize?client_id=753578252047745055&permissions=8&scope=bot')
    }
    else if(command == 'serverinfo'){
        const serverinfoembed = new Discord.MessageEmbed()
            .setAuthor('Server Info')
            .setTitle('Server name: ' + message.guild.name)
            .addField('Server ID:', message.guild.id)
            .setThumbnail(message.guild.iconURL)
            .addField('Server Owner:', '<@' + message.guild.owner.user.id + '>, (' + message.guild.owner.user.tag + ')')
            .setImage(message.guild.owner.user.avatarURL)
            .addField('Server Members:', message.guild.memberCount)
            .addField('Owner ID', message.guild.owner.user.id)
            .setFooter('Bot made by spacehold')
        message.channel.send(serverinfoembed)
    }
    
    else if(command == 'serverinvite'){
        try {
            let channel = message.channel;
                    channel.createInvite(
                        {maxAge: 0, // 0 = infinite expiration
                        maxUses: 0 // 0 = infinite uses
                    })
                    .then(invite => {
                        message.member.send("Heres your invite: https://discord.gg/" + invite.code)
                        message.reply('Sent invite link in your DMS')
                    })
        } catch (err) {
            message.reply('Cannot send Direct Messages to your user!');
        }
        
    }
    else if(command == 'count'){
        var first = args[0]
        var last = args.slice(1).join(" ")
        if(first){
            if(last){
               message.delete({ timeout: 0 })
        for (let index = first; index <= last; index++) {
            const element = index;
            message.channel.send(element)
            
        } 
        var last = undefined
        var first = undefined
            }
            else{
                message.reply('Please provide 2 inputs.')
            }
        }
        else{
            message.reply('No input. Please put a input like this .count (first number) (last number)')
        }
        
    }
    else if(command == 'login'){
        message.delete({ timeout: 0})
        message.reply('Please send your pin in my DMS.')
    }
    else if(command == 'safeeval'){
        
        if(message.author.id == conf.OwnerID){
            const vm = require('vm');
const util = require('util');

var script = args.join(' ')
let result = '';

const cons = {
  log: (...args) => result += (util.format(...args) + '\n'),
};
const context = vm.createContext({console: cons});

try  {
  vm.runInContext(script, context);
  message.channel.send('Input: ```' + script + '``` Output: ```' + result + '```')
} catch (err) {
  
    
  message.channel.send('Input: ```' + script + '``` Output: ```' + err + '```')
}
        }
        else{
            message.reply('Only the owner can use ' + command)
        }
    }
    else if(command == 'evan'){
        message.reply('command could not be found, Do you mean .eval or .safeeval?')
    }
    else if(command == 'eval'){
        if(message.author.id == conf.OwnerID){

        var evalinput = args.join(' ')
        var evaloutput = eval(args.join(' '))
        const evalembed = new Discord.MessageEmbed()
        .setTitle("Eval")
        .addField("Input", "```" + evalinput + "```")
        .addField('Output', "```" + evaloutput + '```')
        message.channel.send(evalembed).catch(err =>{
            const evalembed = new Discord.MessageEmbed()
        .setTitle("Eval")
        .addField("Input", "```" + evalinput + "```")
        .addField('Output', "```" + err + '```')
        })
    }else{
        message.reply('you have to be the bot owner!')
    }
    }
    else if(command == 'event'){
        if(message.member.roles.cache.has(conf.staffID) || message.author.id == conf.OwnerID || message.author.id == '692787834796376144'){
            if(!eventchance != false){
                if(args.join(' ').length <= 0){
                eventembed = new Discord.MessageEmbed()
                    .setTitle('Event ran by ' + message.author.tag)
                    .addField('.event chance', 'Random person wins!')
                    .addField('.event first', 'First to say a random word wins!')
                message.channel.send(eventembed)
                }
                else if(args.join(' ') == 'chance'){
                    var eventchance = true
                    var eventchanceembed = new Discord.MessageEmbed()
                        .setAuthor('Event hosted by ' + message.author.tag)
                        .setTitle('The `Chance` Event! Rules are shown below')
                        .setDescription('All you have to do is type .joinchance to join the event, then you will be submitted!')
                    message.channel.send(eventchanceembed)
                }
                
                else{
            message.reply('you don\'t have permission to run events! Required Roles: `Staff`')
        }
        }
        else{
            message.reply('There is currently a other event present.')
        }
        
            }
            
        
    }
    else if(command == 'joinchance'){
        if(eventchance == true){
            if(!eventchancepple.includes(message.author.tag)){
            eventchanceppleamount = eventchanceppleamount + 1
            eventchancepple.push(message.author.tag)
            message.reply('You have been added to the event!')
            }
            else{
                message.reply('You are already in the event.')
            }
        }
        else{
            message.reply('No event to join.')
        }
    }
    else if(command == 'pickchance'){
        if(message.member.roles.cache.has(conf.staffID) || message.author.id == conf.OwnerID || message.author.id == '692787834796376144'){
        if(eventchanceppleamount != 0){
             chancewinner = Math.floor(Math.random() * eventchancepple.length)
            message.channel.send('The winner is...')
            setTimeout(() => {
                message.channel.send('...')
                setTimeout(() => {
                message.channel.send('...')
                setTimeout(() => {
                message.channel.send('CONGRATS TO ' + eventchancepple[chancewinner] + ' FOR WINNING THE EVENT!!!')
                setTimeout(() => {
                    chancewinner = undefined
                    var eventchance = false
                    eventchancepple = []
                    eventchanceppleamount = 0
                }, 1000);
                
            }, 1000);
            }, 1000);
            }, 1000);
            
            
        }
        else{
            message.channel.send('No people are in the event... Sooo I cannot request a winner.')
        }
    }
    else{
        message.channel.send('You need to be staff to use that command.')
    }
    }
    else if(command == 'privatemessage'){
        if(message.deletable){
            message.delete({ timeout: 0 })
        }
        if(message.author.id == conf.OwnerID){
            let id = args[0];
            let msg = args.slice(1).join(" ") 
            message.guild.members.cache.get(id).send(msg).catch(err =>{
                console.log(err)
                message.reply('Error: Is the user in the guild, Is his/her dms open? Am I blocked? Did you enter a valid user id and not a mention?')
            })
            setTimeout(() => {
               if(!err){
                message.channel.send('✅Successfully dmed user!✅').then(message =>{
                    message.delete({ timeout: 7000 })
                })
            } 
            }, 1000);
            

        }
    }
    else if(command == 'timestamp'){
        if(message.deletable){
            message.delete({ timeout: 0 })
        }
        var timestampembed = new Discord.MessageEmbed()
            .setTimestamp()
        message.channel.send(timestampembed)
    }
    
});
client.on("message", message =>{
    let guild = client.guilds.cache.get('748534353214177321'),
        USER_ID = message.author.id;
        if(!message.channel.type == 'dm') return;
    if(message.author.bot) return;
    if(message.content.startsWith(conf.prefix)) return;
    if(guild.member(USER_ID)){
        
    if (message.channel.type == 'dm' && !message.author.bot) {
        message.channel.send('Your message have been sent to our staff! Be sure to be in https://discord.gg/6xgZaA5, we will ping you there :)')
        .then(replyto = message.author.id)
        const dmembed = new Discord.MessageEmbed()
            .setTitle('DM')
            .setAuthor('Message from ' + message.author.tag)
            .setFooter('Anything in this message is from a user, this may contain swearing.')
            .addField('Message:', message.content)
            .addField('Date (Est daylight time):', Date())
            .addField('Message from', 'ID: ' + message.author.id + ', TAG: ' + message.author.tag)
            .setTimestamp()
            client.channels.cache.get('754335594435575858').send('<@&' + '759016102650576907' + '>')
            client.channels.cache.get('754335594435575858').send(dmembed)
    }   
    }
    
    
    
})
client.on("message", async message =>{
    if(!message.content.startsWith(conf.prefix) || !message.channel.type == 'dm' || message.author.bot){
       return; 
    } 
    else{
        var args = message.content.slice(conf.prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase();
    if(command == 'login'){
      message.delete({ timeout: 0})
        if(args.join(' ') == '81633'){
          message.reply('How in the world did you know it!!??!!')
      }
      else{
          if(message.channel.type == 'dm'){
              message.reply('Sorry, incorrect, hint it is a 5 digit number.')
          }
        
      }  
    }
    else if(command == 'abcd'){
        message.channel.send("", { files: ["ooooaddas.png"] }).then(message =>{
            message.channel.send("https://discord.com/developers/applications", { files: ["eeqqq.png"]}).then(message =>{

            })
            message.channel.send("", { files: ["yead.png"]}).then(message=>{
                message.channel.send("", { files: ["fsdfasg.png"]})
            })
        })
        
    }
    else if(command == 'ping'){
        message.channel.send('The bot ping is ' + message.client.ws.ping + 'ms')
    }
    else if(command == 'math'){
       if(args.join(' ').toLowerCase() == 'help'){
        var mathembed = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle("Math Help")
        .setAuthor('Command ran by ' + message.author.tag)
        .addField('How to add?', 'Type .math 5 + 4   to get a answer of 9!')
        .addField('How to subtract?', 'Type .math 4 - 5   to get a answer of -1!')
        .addField('How to mutiply?', 'Type .math 8 * 2   to get 16')
        .addField('How to divide?', 'Type .math 4 / 2   to get a answer of 2!')
        .addField('Will an error crash the bot?', 'Most likly, not! All errors are stored in our logs and we will see your answer and always imporve, so might wanna try your math question every hour!')
    message.channel.send(mathembed)
       }
       else{
            let calculate = "=" + args.join(' ');
            if (isFinite(calculate.replace(/\=|\+|\-|\*|\/|\÷|\%|\(|\)|\,|\ |math.|pow|sqrt|round|floor|ceiling|ceil|pi|π|euler|absolute|abs|exp|logarithm|log|random|rand|rng/g,''))) {
              calculate = calculate.replace(/ /g, "").replace(/÷/g, "/").replace(/power|pow/g, "Math.pow").replace(/sqrt|squareroot/g, "Math.sqrt").replace(/round/g, "Math.round").replace(/floor/g, "Math.floor").replace(/ceiling|ceil/g, "Math.ceil").replace(/pi|π/g, "Math.PI").replace(/euler/g, "Math.E").replace(/absolute|abs/g, "Math.abs").replace(/exp/g, "Math.exp").replace(/logarithm|log/g, "Math.log").replace(/random|rand|rng/g, "Math.random()");/*.replace(/acos|arccosine/g, "Math.acos").replace(/asin|arcsine/g, "Math.asin").replace(/atan|arctangent|atan1|arctangent1/g, "Math.atan").replace(/atan2|arctangent2/g, "Math.atan2").replace(/cos|cosine/g, "Math.cos").replace(/sin|sine/g, "Math.sin").replace(/tan|tangent/g, "Math.tan")*/;
              if (calculate.replace(/[^%]/g, "").length > 0) {
                for (let i = 0; i < calculate.replace(/[^%]/g, "").length; i++) {
                  while ((calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "+" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "-" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "*" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "/" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "(" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == ")" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "," || getSubstringIndex(calculate, "%", i+1) + 1 == calculate.length) && calculate.replace(/[^%]/g, "").length > 0) {
                    for (let j = getSubstringIndex(calculate, "%", i+1); j > -1; j--) {
                      if (calculate[j] == "=" || calculate[j] == "+" || calculate[j] == "-" || calculate[j] == "*" || calculate[j] == "/" || calculate[j] == "(" || calculate[j] == ")" || calculate[j] == ",") {
                        calculate = calculate.substring(0, j+1) + (calculate.substring(j+1, getSubstringIndex(calculate, "%", i+1))/100) + calculate.substring(getSubstringIndex(calculate, "%", i+1)+1, calculate.length);
                        var mathembed = new Discord.MessageEmbed()
                    .setTimestamp()
                    .setTitle("Math Help")
                    .setAuthor('Wrong usage of .math')
                    .setDescription('Hi, you have used the .math wrong, See below')
                    .addField('How to add?', 'Type .math 5 + 4   to get a answer of 9!')
                    .addField('How to subtract?', 'Type .math 4 - 5   to get a answer of -1!')
                    .addField('How to mutiply?', 'Type .math 8 * 2   to get 16')
                    .addField('How to divide?', 'Type .math 4 / 2   to get a answer of 2!')
                    .addField('Will an error crash the bot?', 'Most likly, not! All errors are stored in our logs and we will see your answer and always imporve, so might wanna try your math question every hour!')
                message.channel.send(mathembed)
                      }
                    }
                  }
                }
              }
              calculate =  calculate.replace(/=/g, "");
              if (isFinite(eval(calculate))) message.channel.send(eval(calculate)).catch(err =>{
                var mathembed = new Discord.MessageEmbed()
                    .setTimestamp()
                    .setTitle("Math Help")
                    .setAuthor('Wrong usage of .math')
                    .setDescription('Hi, you have used the .math wrong, See below')
                    .addField('How to add?', 'Type .math 5 + 4   to get a answer of 9!')
                    .addField('How to subtract?', 'Type .math 4 - 5   to get a answer of -1!')
                    .addField('How to mutiply?', 'Type .math 8 * 2   to get 16')
                    .addField('How to divide?', 'Type .math 4 / 2   to get a answer of 2!')
                    .addField('Will an error crash the bot?', 'Most likly, not! All errors are stored in our logs and we will see your answer and always imporve, so might wanna try your math question every hour!')
                message.channel.send(mathembed)
                console.log(err)
                client.channels.cache.get('745700609512046613').send('Error from Math command from user ' + message.author.tag + ', Error: ' + err)
              })
            }
        }
        
    }
    else if(command == 'captcha'){
        const captcha = Math.random().toString(36).slice(2, 8);
    const image = new Jimp(175, 50, 'white');
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    const textWidth = Jimp.measureText(font, captcha);
    const textHeight = Jimp.measureTextHeight(font, captcha);
    image.print(font, (w/2 - textWidth/2), (h/2 - textHeight/2), captcha);
    image.write(
        `${__dirname}/captchas/${captcha}.png`);
        
    }
    else if(command == 'uptime'){
        const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');
        let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;

let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);
const background = await Canvas.loadImage('./welcomepic.png');
ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	ctx.font = '30px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center'
	ctx.fillText(days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + 'seconds.', canvas.width / 2.5, canvas.height / 3.5);
    
	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
    message.channel.send("Spacemod Uptime", attachment)
        }
    else if(command == 'howgay'){
        var user = message.mentions.users.first()
        
        if(!user){
            if(message.author.id == conf.OwnerID || message.author.id == message.guild.owner.id){
                message.reply('you are ' + getRandomNumberBetween(0, 20) + '% gay!')
            }
            else{
                message.reply('you are ' + getRandomNumberBetween(20, 100) + '% gay!')
            }
        }
        else{
            if(user.id == conf.OwnerID || user.id == message.guild.owner.id){
                message.channel.send('<@' + user.id + '> is ' + getRandomNumberBetween(0, 20) + '% gay!')
            }
            else{
                message.channel.send('<@' + user.id + '> is ' + getRandomNumberBetween(20, 100) + '% gay!')
            }
        }
    }
    else if(command == 'howdoeshowgaywork'){
        message.channel.send("Picks a random number from 0 - 100 (which the random number is actually not random, it uses it's very smart skills to find out how gay are you)", { files: ["Untitled.png"] })
    }
    else if(command == 'info' || command == 'botinfo'){
        let totalSeconds = (client.uptime / 1000);
let days = Math.floor(totalSeconds / 86400);
totalSeconds %= 86400;
let hours = Math.floor(totalSeconds / 3600);
totalSeconds %= 3600;

let minutes = Math.floor(totalSeconds / 60);
let seconds = Math.floor(totalSeconds % 60);    
        if(message.guild.members.cache.get(client.user.id).nickname != null){
                var infoembed = new Discord.MessageEmbed()
            .setTitle("Bot info")
            .setAuthor("Spacemod Website", client.user.avatarURL(), "https://www.spacemod.tk/")
            .addField("Bot Name", message.guild.members.cache.get(client.user.id).nickname)
            .addField("Version", conf.version)
            .addField("Uptime", "Days: `" + days + "` Hours: `" + hours + '` Minutes: `' + minutes + '` Seconds: `' + seconds + '`')
            message.channel.send(infoembed)
            }
            else{
                
                var infoembed = new Discord.MessageEmbed()
            
                .setTitle("Bot info")
            .setAuthor("Spacemod Website", client.user.avatarURL(), "https://www.spacemod.tk/")
            .addField("Bot Name", client.user.username)
            .addField("Version", conf.version)
            .addField("Uptime", "Days: `" + days + "` Hours: `" + hours + '` Minutes: `' + minutes + '` Seconds: `' + seconds + '`')
            message.channel.send(infoembed)
            }
        
        
    }
    else if(command == 'servers'){
        var ids = ' '
        for (let index = 0; index < client.guilds.cache.size; index++) {
            let guilds = client.guilds.cache.map(guild => guild.id) // for discord v11 //let guilds = client.guilds.map(guild => guild.id)
            
            var ids = ids + '**Server Name:** `' + client.guilds.cache.get(guilds[index]).name + '` **ID:** `' + guilds[index] + '`**,** '
            
        }
        message.channel.send(ids)
    }
    else if(command == 'input'){
        var inputcmd
        message.channel.send('What is your fav color?').then(() => {
            const filter = m => message.author.id === m.author.id;
        
            message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
                .then(messages => {
                var inputcmd = (` ${messages.first().content}`);
                inputcmdfun(inputcmd)
                })
                .catch(() => {
                    message.channel.send('You did not enter any input!');
                });

                function inputcmdfun(save) {

const setValue = (fn, value) => 
  fs.readFile(fn)
    .then(body => JSON.parse(body))
    .then(json => {
      var json = {
        "test":"lol"
      }
      json.value = value
      console.log(json)
    })
    .then(json => JSON.stringify(json))
    .then(body => fs.writeFile(fn, body))
    .catch(error => console.warn(error))
                }
        });
    }
    else if(command == 'leave'){
        if(message.member.permissions.has("MANAGE_GUILD") || message.member.permissions.has("ADMINISTRATOR") || message.author.id == conf.OwnerID){
            var guild = message.guild.name
            var inputcmd
            const m123 = message
        message.channel.send('Are you sure you want ' + client.user.tag + ' to leave ' + message.guild.name + '?  Answer `yes` to confirm, you have 10 seconds').then(() => {
            const filter = m123 => message.author.id === message.author.id;
            message.channel.awaitMessages(filter, { time: 10000, max: 1, errors: ['time'] })
                .then(messages => {
                var inputcmd = (` ${messages.first().content}`).toLowerCase().trimStart();
                inputcmdfun(inputcmd)
                })
                .catch(() => {
                    message.channel.send('Cancelled');
                });

                function inputcmdfun(inputcmd) {
                    
                    if(inputcmd == 'yes'){
                        message.channel.send("I am sad to leave... But I have to do what I have to do...    Bye  " + message.guild.name + ", I will miss you :(")
                        setTimeout(() => {
                            message.guild.leave()
                            client.channels.cache.get(conf.modlogsspacechatid).send("Spacemod left guild: `" + guild + "` Guild id: ` " + message.guild.id + "` because user: `" + message.author.tag + '` Id: `' + message.author.id + '` activated the .leave command!')
                        }, 1000);
                    }
                    else{
                        message.channel.send('Cancelled')
                    }
                }
        });
        }
        else{
            message.channel.send("❌ Permissions required: \"MANAGE-SERVER\" or \"ADMINISTRATOR\" ❌")
        }
    }
    
}
})
client.on('message', (message) => {
    var pollchannelids = ['757730360317444136']
    if (!pollchannelids.includes(message.channel.id)){
      return;
    }

    const eachLine = message.content.split('\n')

    for (const line of eachLine) {
      if (line.includes('=')) {
        const split = line.split('=')
        const emoji = split[0].trim()
        message.react(emoji).catch(err =>{
            console.warn(err)
            
        })
      }
    }
  })

//Zahezys Ping to kick

client.on("message", message =>{
    if(message.author.bot) return;
    if(!message.guild.id == '671807797482094592') return;
    if(!message.mentions.members.first()) return;
    var logs = message.guild.channels.cache.get('764143101894721578')
    
    var mention = message.mentions.users.first().id
    var mentionauthor = message.author.id
    var ref = "http://discordapp.com/channels/" + ((message.channel.type === "text") ? message.guild.id : "@me") + "/" + message.channel.id + "/" + message.id;
    if(mention == '665928480382386186'){
        if(message.guild.members.cache.get(mentionauthor).kickable){
            message.member.send('Kicked because of mentioning the owner! Rejoin here: https://discord.gg/uVkYV3H').catch(err =>{
                logs.send('Could not send kick message to user.')
            })
            setTimeout(() => {
                message.guild.members.cache.get(mentionauthor).kick("Kicked because mentioned owner")
            logs.send('Kicked person who tried to mention the owner! ' + ref)
            }, 1000);
            
        }
        else{
            logs.send('User not kickable when tried to kick person who mentioned owner')
        }
    }
})


































































client.login(conf.token)