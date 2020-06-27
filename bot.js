// Load config from json
var config = require("./config/config.json");

var mineflayer = require("mineflayer");

// Create and start bot
var bot = mineflayer.createBot({
  host: config.host,
  port: config.port,
  username: config.userEmail,
  password: config.userPassword,
  version: false, // Auto-version
  viewDistance: config.renderDistance
});

bot.once('spawn', () => {
    bot.on("chat", function (username, message) {
        if (username === bot.username || username !== config.owner) return;
      
        if (message.startsWith(config.commandPrefix)) {
          fullCommand = message.split(config.commandPrefix, 2)[1]
          commandParts = fullCommand.split(" ", 2);
          command = commandParts[0]
          args = commandParts[1]
      
          switch (command) {
            case "tpahere":
              bot.chat(`/tpa ${username}`)  
              break;
            case "look":
              target = bot.players[args].entity;
              if (target === null) {
                  console.log(`Could not find ${username}`)
                  return
              }
              bot.lookAt(target.position)
              break;
            case "stop":
                bot.navigate.stop()
                console.log("Stopped all actions")
                break;
          }
        }
      });
      
      bot.on("error", (err) => console.log(err));
});

