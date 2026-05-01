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
    const scriptUrl = "https://script.google.com/macros/s/AKfycbyxDwd1gPw4fZRmzTk8aU-nzLE4u4bVib4sQ07PJYMAK04Cx9cMNuIxohDDnkcYaSix6w/exec";
    
    console.log("Proxying POST request to Google Script. Data keys:", Object.keys(req.body));

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
        redirect: 'follow'
      });

      const responseText = await response.text();
      console.log("Google Script Response Status:", response.status);
      console.log("Google Script Response Body (first 200 chars):", responseText.substring(0, 200));

      try {
        const result = JSON.parse(responseText);
        res.json(result);
      } catch (e) {
        console.error("Failed to parse Google Script response as JSON:", responseText);
        res.status(500).json({ 
          success: false, 
          message: "Google Script returned non-JSON. This often means the script hasn't been deployed correctly or is returning an HTML error page."
        });
      }
    } catch (error: any) {
      console.error("Error proxying to Google Script:", error);
      res.status(500).json({ success: false, message: "Network error when reaching Google Script: " + error.message });
    }
  });

  // API Route to handle Google Sheets URL (Proxy GET for Balance)
  app.get("/api/cek-saldo", async (req, res) => {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbyxDwd1gPw4fZRmzTk8aU-nzLE4u4bVib4sQ07PJYMAK04Cx9cMNuIxohDDnkcYaSix6w/exec";
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
