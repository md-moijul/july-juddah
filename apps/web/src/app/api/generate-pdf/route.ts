
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { generateUniqueCertificateNumber } from '@/lib/certificateUtils';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fullName, location } = body;

        if (!fullName || !location) {
            return NextResponse.json({ error: 'Missing fullName or location' }, { status: 400 });
        }

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();

        const pages = pdfDoc.addPage();
        const firstPage = pages;

        // Embed fonts (placeholders for Lora and Inter)
        // You would need to load your font files here, e.g.,
        // const fontBytesLora = readFileSync(join(process.cwd(), 'public', 'fonts', 'Lora-Regular.ttf'));
        // const fontLora = await pdfDoc.embedFont(fontBytesLora);
        // const fontBytesInter = readFileSync(join(process.cwd(), 'public', 'fonts', 'Inter-Regular.ttf'));
        // const fontInter = await pdfDoc.embedFont(fontBytesInter);

        // For now, using StandardFonts as a placeholder
        const fontLora = await pdfDoc.embedFont(StandardFonts.TimesRoman); // Using TimesRoman as a placeholder for a more decorative font. For a true cursive font, you would need to provide the font file.
        const fontInter = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontMonospace = await pdfDoc.embedFont(StandardFonts.Courier);

        // Generate unique certificate number
        const certificateNumber = await generateUniqueCertificateNumber();

        // Draw dynamic text onto the PDF
        // User's Name
        firstPage.drawText(fullName, {
            x: 150,
            y: 800,
            font: fontLora,
            size: 80,
            color: rgb(0.5137, 0.3529, 0.1647), // Converted from hex #835A2A
        });

        // Descriptive text with line breaks and color
        const descriptiveText = `This certificate acknowledges your outstanding contribution and dedication during the July Student Revelation in ${location}. Your perticipation was essential to its success.`;

        const words = descriptiveText.split(' ');
        let currentLine = '';
        const lines = [];
        const breakWords = ["outstanding", "Student", "was"];

        for (let i = 0; i < words.length; i++) {
            currentLine += words[i] + ' ';
            if (breakWords.includes(words[i]) || i === words.length - 1) {
                lines.push(currentLine.trim());
                currentLine = '';
            }
        }

        const textColor = rgb(0.435, 0.416, 0.357); // Converted from hex #6F6A5B
        const fontSize = 38;
        const lineHeight = 54; // Approximate line height for 12pt font
        let currentY = 670; // Starting Y coordinate

        for (const line of lines) {
            firstPage.drawText(line, {
                x: 140,
                y: currentY,
                font: fontInter,
                size: fontSize,
                color: textColor,
            });
            currentY -= lineHeight;
        }

        // Certificate Number
        firstPage.drawText(certificateNumber, {
            x: 140,
            y: 180,
            font: fontMonospace,
            size: 40,
            color: rgb(0, 0, 0),
        });

        // Mocking database insertion for now
        console.log('Mocking database insertion for certificate:', { fullName, location, certificateNumber });

        const pdfBytes = await pdfDoc.save();

        return new NextResponse(pdfBytes, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="certificate_${fullName.replace(/ /g, '_')}.pdf"`,
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
