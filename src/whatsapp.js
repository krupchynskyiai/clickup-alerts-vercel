import pkg from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

const { Client, LocalAuth } = pkg;

export const waClient = new Client({
  authStrategy: new LocalAuth({
    dataPath: "./session"
  }),
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  }
});

waClient.on("qr", qr => {
  console.log("📱 Скануй QR код для WhatsApp:");
  qrcode.generate(qr, { small: true });
});

waClient.on("ready", async () => {
  console.log("✅ WhatsApp готовий");
});

export async function sendWhatsApp(groupId, text) {
  await waClient.sendMessage(groupId, text);
}

export function initWhatsApp() {
  waClient.initialize();
}
