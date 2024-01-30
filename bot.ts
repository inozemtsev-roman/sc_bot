import fetch from "node-fetch";
import TelegramBot, {
  ChatId,
  MessageEntityType,
  SendMessageOptions,
} from "node-telegram-bot-api";
import "dotenv/config";
import http from "http";
import express from "express";

const SERVER_PORT = process.env.PORT || "3005";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(TOKEN || "", { polling: true });

bot.onText(/\/start/, (msg: any) => {
  //todo rm any
  const chatId = msg.chat.id;

  const message = `☝️ * Welcome to TON Fingerprints Scanner *
  \nWebApp "Scanner" is an exciting game in which you have to scan digital fingerprints and earn bulbs and keys. Using an incredibly accurate scanner, your task is to recognize and collect fingerprints in order to get the maximum amount of game resources.
  \nThe main feature of the game is the motivation of players through the achievement standings. You will be able to compete with other players, comparing your results and rising in the ranking. Be the best and become the real masters of fingerprint scanning!
  \n"Scanner" is based on the NFT collection of open source with [CC0 1.0 Universal license](https://creativecommons.org/publicdomain/zero/1.0/) - [TON Fingerprints](https://getgems.io/collection/fingerprints). Unique and impressive fingerprints are waiting for you, which you can collect and use for your own purposes.
  \nImmerse yourself in the fascinating world of fingerprint scanning, compete with friends and reach new heights in the "Scanner"!`;
  const options: SendMessageOptions = {
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "☝️ Launch Scanner",
            web_app: { url: "https://scanner.mir.one" },
          },
        ],
        [
          {
            text: "✋ Hands",
            web_app: { url: "https://spatial.mir.one" },
          },
          {
            text: "🛠 Github",
            web_app: { url: "https://github.com/mir-one/fingerprints" },
          },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, message, options);
});

bot.onText(/\/help/, (msg: any) => {
  //todo rm any
  const chatId = msg.chat.id;

  const message = `How to play Fingerprint Scanner ⚡ 

Open the full [guide](https://scanner.mir.one)


/help to get this guide`;
  const options: SendMessageOptions = {
    parse_mode: "Markdown",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "☝️ Launch Scanner",
            web_app: { url: "https://scanner.mir.one" },
          },
        ],
        [
          {
            text: "🛠 Github",
            web_app: { url: "https://github.com/mir-one/fingerprints" },
          },
        ],
      ],
    },
  };

  bot.sendMessage(chatId, message, options);
});

bot.on("polling_error", console.log);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(express.static(join(path.resolve(''), 'public')));

app.set("port", SERVER_PORT);

const server = http.createServer(app);
server.listen(SERVER_PORT);

server.on("listening", () => {
  console.info(`Listening on ${SERVER_PORT}`);
});
