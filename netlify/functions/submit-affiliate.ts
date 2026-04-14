import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const scriptUrl = "https://script.google.com/macros/s/AKfycbyJctnTEjfciVzd9x5VTRptZW5naDor1JBhebJ-5AV5iqEUPgdN1nLh-_fB9sP0h5R7Kw/exec";

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      body: event.body,
    });

    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Failed to submit data." }),
    };
  }
};
