import express from "express";
import dotenv from "dotenv";
import { router } from "./routes.js";
import { initWhatsApp } from "./whatsapp.js";

dotenv.config();

const app = express();
app.use(express.json({
  type: "application/json",
  limit: "1mb"
}));
app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Brainy listening on ${process.env.PORT}`);
});

initWhatsApp();
