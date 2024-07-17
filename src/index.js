const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");
const path = require("path");

// const token = process.env.TELEGRAM_BOT_TOKEN;
// const serviceUrl = process.env.SERVICE_URL;
const token = "7207636680:AAG8mujSGaog67rD0i4GtmhESzumGyuhgtw";
const serviceUrl = "https://d595-36-112-189-119.ngrok-free.app";
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
    await bot.sendMessage(chatId, "👏 Welcome to the schrodinger's cat Game!", {
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
        "👏 Draw rare cats, get high yield, super high yield waiting for you to challenge！\n 💪🏻 Buy chips ($SGR), smoke cats, trade cats, and earn extra points!",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "🔥 Adopt cat！",
              web_app: {
                url: "https://127.0.0.1:3000/tg-home",
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
    });
  } catch (error) {
    console.error("onText error", error);
  }
});

bot.on("callback_query", (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;
  // bot.answerCallbackQuery(callbackQuery.id);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  try {
    switch (text) {
      case "📖 Help":
        bot.sendMessage(
          chatId,
          "🐱 Dear Lucky, please feel free to contact us anytime while using our products.\n\n💡*QA Doc*\nIf you have any questions, please first look for answers in the QA section.\nLink：xxxx\n\n📫 *Report*\nIf you encounter any bugs or issues you can't handle, please submit them through the report link.\nlink: xxxx\n\n🔑 *Community*\nThe Schrodinger Announcement channel will provide updates on Schrodinger news. Please follow us there.\nlink: xxxx",
          {
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "💎 Play game",
                    web_app: {
                      url: "https://127.0.0.1:3000/tg-home",
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

app.get("/env", (req, res) => {
  res.send({ token, serviceUrl });
});

app.listen(3333, async () => {
  console.log("Webhook server is listening on port 3333");
  await clearWebhook();
  setWebhook();
});

module.exports = app;
