const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");
const path = require("path");
const config = require("./config");

const token = process.env.TELEGRAM_BOT_TOKEN;
const serviceUrl = process.env.SERVICE_URL;
const bot = new TelegramBot(token, { polling: false });

const app = express();
app.use(bodyParser.json());

const webhookPath = "/path-to-webhook";

const webhookUrl = `${serviceUrl}${webhookPath}`;

bot.onText(/\/start/, async (msg) => {
  try {
    const chatId = msg.chat.id;
    const relativePath = "images/banner-img.jpg";
    const absolutePath = path.resolve(__dirname, relativePath);
    await bot.sendMessage(chatId, "Welcome to Schrodinger's Cat Game!🐱", {
      reply_markup: {
        keyboard: [
          [
            {
              text: "📖 Help",
            },
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: false,
        selective: false,
      },
    });
    await bot.sendPhoto(chatId, absolutePath, {
      caption:
        "Adopt Cats, Trade Rare Cats, and Earn Flux Points to farm $SGR token rewards!💎\nPlay and Earn token rewards now!🚀",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🐱 Play and Earn",
              web_app: {
                url: config.tgHomeUrl,
              },
            },
          ],
          [
            {
              text: "Join Community",
              url: "https://t.me/projectschrodingercat",
            },
          ],
          [
            {
              text: "Follow X",
              url: "https://x.com/ProjSchrodinger",
            },
          ],
        ],
      },
    });
  } catch (error) {
    console.error("onText error", error);
  }
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  try {
    switch (text) {
      case "📖 Help":
        bot.sendMessage(
          chatId,
          `🐱 Hey Kitty! We're here for you anytime while you're exploring the world of Schrodinger's Cats.\n\n💡*🙀 Got Questions?*\nCheck out our Q&A section for quick answers.\nLink：${config.websiteUrl} \n\n📫 *🔥 Stay Connected*\nBe part of our vibrant community for all the latest Schrodinger updates. Join our TG channel today! \nlink: https://t.me/projectschrodingercat`,
          {
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "💎 Play game",
                    web_app: {
                      url: config.tgHomeUrl,
                    },
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
  } catch (error) {
    console.error("onMessage error", msg, error);
  }
});

async function clearWebhook() {
  try {
    await bot.setWebHook();
    console.log("Webhook cleared");
  } catch (error) {
    console.error("Error clearing webhook:", error);
  }
}

async function setWebhook() {
  try {
    await bot.setWebHook(webhookUrl, {
      max_connections: 1000,
      drop_pending_updates: true,
      allowed_updates: [
        "message",
        "callback_query",
        "inline_query",
        "chosen_inline_result",
        "edited_message",
        "channel_post",
        "edited_channel_post",
        "poll",
        "my_chat_member",
        "chat_member",
        "poll_answer",
        "chat_join_request",
      ],
    });
    console.log(`Webhook set to ${webhookUrl}`);
  } catch (error) {
    console.error("Error setting webhook:", error);
  }
}

app.post(webhookPath, (req, res) => {
  try {
    console.log("==request", req?.body?.message?.text);
    bot.processUpdate(req.body);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error handling webhook update:", error);
    res.sendStatus(500);
  }
});

app.listen(3333, async () => {
  console.log("Webhook server is listening on port 3333");
  await clearWebhook();
  setWebhook();
});

module.exports = app;
