import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to handle Google Sheets URL (Proxy)
  app.post("/api/submit-affiliate", async (req, res) => {
    const scriptUrl = "https://script.google.com/macros/s/AKfycbyJctnTEjfciVzd9x5VTRptZW5naDor1JBhebJ-5AV5iqEUPgdN1nLh-_fB9sP0h5R7Kw/exec";
    
    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify(req.body),
      });

      const result = await response.json();
      res.json(result);
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      res.status(500).json({ success: false, message: "Failed to submit data." });
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
