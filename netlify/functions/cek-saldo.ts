import { Handler } from "@netlify/functions";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const scriptUrl = "https://script.google.com/macros/s/AKfycbwCkJqLGB4Ukoqy5mV2ImTRCgP3HijGKXa8FZ4r169k7CUX6euS7KWHPN8jyaahCCjHHQ/exec";
  const whatsapp = event.queryStringParameters?.whatsapp;

  if (!whatsapp) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "WhatsApp number is required" }),
    };
  }

  const targetUrl = `${scriptUrl}?action=cekSaldo&whatsapp=${whatsapp}`;

  try {
    const response = await fetch(targetUrl, { redirect: 'follow' });
    const responseText = await response.text();

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: "Invalid response from server." }),
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
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Failed to fetch balance." }),
    };
  }
};
