import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      error: "All fields are required.",
    });
  }

  console.log("📨 New Contact Message");
  console.log({
    name,
    email,
    subject,
    message,
    date: new Date().toISOString(),
  });

  return res.status(200).json({
    success: true,
    message: "Message delivered securely.",
  });
}