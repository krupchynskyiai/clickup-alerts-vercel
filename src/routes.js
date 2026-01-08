import express from "express";
import { sendWhatsApp } from "./whatsapp.js";
import { sendTelegram } from "./telegram.js";

export const router = express.Router();

router.post("/integrations/clickup/notify", async (req, res) => {
  const auth = req.headers.authorization || "";

  if (auth !== `Bearer ${process.env.BRAINY_TOKEN}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { text, channels = [] } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text" });
  }

  try {
    if (channels.includes("telegram")) {
      await sendTelegram(process.env, text);
    }

    if (channels.includes("whatsapp")) {
      await sendWhatsApp(process.env.WHATSAPP_GROUP_ID, text);
    }

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Send failed" });
  }
});
