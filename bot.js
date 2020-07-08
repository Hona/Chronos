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
  viewDistance: config.renderDistance,
});

function handleChat(username, message) {
    if (username === bot.username || username !== config.owner) return;
  
    if (message.startsWith(config.commandPrefix)) {
      fullCommand = message.split(config.commandPrefix, 2)[1];
      commandParts = fullCommand.split(" ", 2);
      command = commandParts[0];
      args = commandParts[1];
  
      switch (command) {
        case "tpahere":
          bot.chat(`/tpa ${username}`);
          break;
        case "look":
          target = bot.players[args].entity;
          if (target === null) {
            console.log(`Could not find ${username}`);
            return;
          }
          bot.lookAt(target.position);
          break;
        case "stop":
          bot.navigate.stop();
          console.log("Stopped all actions");
          break;
        case "ping":
          bot.chat("Pong!");
          break;
        case "exec":
          bot.chat(args);
          break;
        case "sethome":
          bot.chat("/sethome");
          break;
        case "home":
          bot.chat("/home")
          break;
      }
    }
  }

function handleError(){
    console.log(err)
}

function handleEnd(){
    console.log("Disconnected from server, waiting to reconnect");
    setTimeout(function () {
      bot = mineflayer.createBot({
        host: config.host,
        port: config.port,
        username: config.userEmail,
        password: config.userPassword,
        version: false, // Auto-version
        viewDistance: config.renderDistance,
      });
      hookEvents()
    }, 4 * 60 * 1000);
}

function hookEvents(){
    bot.on("chat", handleChat);
    bot.on("end", handleEnd);
    bot.on("error", handleError);
}

hookEvents()