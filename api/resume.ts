import type { VercelRequest, VercelResponse } from "@vercel/node";
import PDFDocument from "pdfkit";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Anicrypt_Malachy_Resume.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(24)
      .text("ANICRYPT MALACHY", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(15)
      .text("React.js • Solidity • Python Developer", {
        align: "center",
      });

    doc.moveDown();

    doc.fontSize(11);

    doc.text("Email: malaniefiok@gmail.com");
    doc.text("Phone: +2348143551135");
    doc.text("Location: Uyo, Akwa Ibom State, Nigeria");

    doc.moveDown();

    doc.fontSize(16).text("Professional Summary");

    doc.moveDown(0.5);

    doc.fontSize(11).text(
      "Self-taught Frontend Developer specializing in React.js, blockchain development, Node.js, Python automation, and modern web technologies."
    );

    doc.moveDown();

    doc.fontSize(16).text("Skills");

    doc.moveDown(0.5);

    doc.fontSize(11);

    doc.text("• React");
    doc.text("• TypeScript");
    doc.text("• JavaScript");
    doc.text("• Solidity");
    doc.text("• Python");
    doc.text("• Node.js");
    doc.text("• Express");
    doc.text("• Tailwind CSS");
    doc.text("• Git");
    doc.text("• Firebase");

    doc.moveDown();

    doc.fontSize(16).text("Links");

    doc.moveDown(0.5);

    doc.fontSize(11);

    doc.text("GitHub: https://github.com/Aniefiok-Malachy");
    doc.text("Portfolio: https://anicrypt.site");

    doc.end();
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Unable to generate PDF.",
    });
  }
}