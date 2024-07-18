module.exports = {
  apps: [
    {
      name: "tgbot-test",
      script: "./src/index.js",
      instances: 1,
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "test",
        TELEGRAM_BOT_TOKEN: "7211975687:AAEsrpXXak8SKCfJtJQFVTosV-w04bQ95Xs",
        SERVICE_URL: "https://384d-36-112-189-119.ngrok-free.app",
      },
    },
    {
      name: "tgbot",
      script: "./src/index.js",
      instances: 1,
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
