
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, location } = body;

    if (!fullName || !location) {
      return NextResponse.json({ error: 'Missing fullName or location' }, { status: 400 });
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    page.drawText('Certificate of Achievement', {
        x: 50,
        y: 750,
        font: titleFont,
        size: 30,
        color: rgb(0, 0.53, 0.71),
    });

    page.drawText('This certifies that', {
        x: 50,
        y: 650,
        font,
        size: 20,
    });

    page.drawText(fullName, {
        x: 50,
        y: 550,
        font: titleFont,
        size: 40,
        color: rgb(0.96, 0.4, 0.22),
    });

    page.drawText(`Has successfully completed the course in ${location}.`, {
        x: 50,
        y: 450,
        font,
        size: 20,
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="certificate.pdf"',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
