import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const scriptUrl = "https://script.google.com/macros/s/AKfycbwDNuqRdfgBbQIDYHZBCznML5q2av-t2KdHbNSITrRC--WSHcqqBdMH5NlejOx66tRsnQ/exec";

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: event.body,
      redirect: 'follow'
    });

    const responseText = await response.text();
    console.log("Google Script Response:", responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: "Google Script returned non-JSON response: " + responseText }),
      };
    }

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
