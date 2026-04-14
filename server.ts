import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  // API Route to handle Google Sheets URL (Proxy POST)
  app.post("/api/submit-affiliate", async (req, res) => {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbwCkJqLGB4Ukoqy5mV2ImTRCgP3HijGKXa8FZ4r169k7CUX6euS7KWHPN8jyaahCCjHHQ/exec";
    
    console.log("Proxying POST request to Google Script.");

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
        redirect: 'follow'
      });

      const responseText = await response.text();
      try {
        const result = JSON.parse(responseText);
        res.json(result);
      } catch (e) {
        res.status(500).json({ success: false, message: "Google Script returned non-JSON: " + responseText.substring(0, 100) });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to submit data." });
    }
  });

  // API Route to handle Google Sheets URL (Proxy GET for Balance)
  app.get("/api/cek-saldo", async (req, res) => {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbwCkJqLGB4Ukoqy5mV2ImTRCgP3HijGKXa8FZ4r169k7CUX6euS7KWHPN8jyaahCCjHHQ/exec";
    const { whatsapp } = req.query;
    
    const targetUrl = `${scriptUrl}?action=cekSaldo&whatsapp=${whatsapp}`;
    console.log("Proxying GET request to Google Script for WA:", whatsapp);

    try {
      const response = await fetch(targetUrl, { redirect: 'follow' });
      const responseText = await response.text();
      try {
        const result = JSON.parse(responseText);
        res.json(result);
      } catch (e) {
        res.status(500).json({ success: false, message: "Invalid response from server." });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch balance." });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
