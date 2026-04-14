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

  // API Route to handle Google Sheets URL (Proxy)
  app.post("/api/submit-affiliate", async (req, res) => {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbwEVgPsZ0nSdpsPM9kkOg4-uTpNTDWzzuk-HoO1CeweLfWCXM-c12XcRkXSR6KSsCrhCA/exec";
    
    console.log("Proxying request to Google Script. Body size:", JSON.stringify(req.body).length);

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
        redirect: 'follow'
      });

      const responseText = await response.text();
      console.log("Google Script Response (first 200 chars):", responseText.substring(0, 200));

      try {
        const result = JSON.parse(responseText);
        res.json(result);
      } catch (e) {
        res.status(500).json({ success: false, message: "Google Script returned non-JSON: " + responseText.substring(0, 100) });
      }
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      res.status(500).json({ success: false, message: "Failed to submit data: " + (error instanceof Error ? error.message : String(error)) });
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
