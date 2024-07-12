import TelegramBot from "node-telegram-bot-api";
import path from "path";
import { fileURLToPath } from "url";

const token = "7207636680:AAG8mujSGaog67rD0i4GtmhESzumGyuhgtw";

const requestOptions = {
  proxy: "http://127.0.0.1:7890",
};

const keyboard = [["💎 Play game", "📖 Help"]];

function main() {
  const bot = new TelegramBot(token, {
    polling: true,
    request: requestOptions,
  });

  bot.on("polling_error", (error) => {
    console.error("Telegram error:", error);
  });

  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const imgPath = path.join(__dirname, "images", "test-img.png");
    await bot.sendMessage(chatId, "👏 Welcome to the schrodinger's cat Game!", {
      reply_markup: {
        keyboard,
        resize_keyboard: true,
        one_time_keyboard: false,
        selective: false,
      },
    });
    await bot.sendMediaGroup(chatId, [
      {
        media: imgPath,
        type: "photo",
        caption: "",
      },
    ]);
    await bot.sendMessage(
      chatId,
      "👏 Draw rare cats, get high yield, super high yield waiting for you to challenge！\n 💪🏻 Buy chips ($SGR), smoke cats, trade cats, and earn extra points!",
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🔥 Adopt cat！",
                callback_data: "adoptCat",
                web_app: {
                  url: "https://sgr.schrodingernft.ai/",
                },
              },
            ],
            [
              {
                text: "💰 Join community",
                callback_data: "joinCommunity",
              },
            ],
            [
              {
                text: "🐱 Follow X",
                callback_data: "followX",
              },
            ],
          ],
        },
      }
    );
  });

  bot.on("callback_query", (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
  });

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    switch (text) {
      case "💎 Play game":
        // open game in full screen
        break;
      case "📖 Help":
        bot.sendMessage(
          chatId,
          "🐱 Dear Lucky, please feel free to contact us anytime while using our products.\n\n💡QA Doc\nIf you have any questions, please first look for answers in the QA section.\nLink：xxxx\n\n📫 Report\nIf you encounter any bugs or issues you can't handle, please submit them through the report link.\nlink: xxxx\n\n🔑 Community\nThe Schrodinger Announcement channel will provide updates on Schrodinger news. Please follow us there.\n\nlink: xxxx",
          {
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "💎 Play game",
                    callback_data: "playGame",
                  },
                ],
              ],
            },
          }
        );
        break;
      default:
        break;
    }
  });
}

main();
