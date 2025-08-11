import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { generateUniqueUserId } from '@/lib/userUtils';
import path from 'path';
import fs from 'fs/promises';
import * as fontkit from 'fontkit';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fullName, location } = body;

        if (!fullName || !location) {
            return NextResponse.json({ error: 'Missing fullName or location' }, { status: 400 });
        }

        const fontPath = path.join(process.cwd(), 'assets', 'PinyonScript-Regular.ttf');
        const templatePath = path.join(process.cwd(), 'assets', 'template.pdf');

        const [existingPdfBytes, kapakanaFontBytes] = await Promise.all([
            fs.readFile(templatePath),
            fs.readFile(fontPath),
        ]);

        const pdfDoc = await PDFDocument.create();

        // Register fontkit using a type assertion to resolve the mismatch
        pdfDoc.registerFontkit(fontkit as never);

        const [templatePage] = await pdfDoc.embedPdf(existingPdfBytes);
        const page = pdfDoc.addPage([templatePage.width, templatePage.height]);

        page.drawPage(templatePage, {
            ...templatePage.size(),
            x: 0,
            y: 0,
        });

        const kapakanaFont = await pdfDoc.embedFont(kapakanaFontBytes);
        const fontInter = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontMonospace = await pdfDoc.embedFont(StandardFonts.Courier);
        const userId = await generateUniqueUserId();

        // User's Name (using the new custom font)
        page.drawText(fullName, {
            x: 150,
            y: 800,
            font: kapakanaFont,
            size: 120,
            color: rgb(0.5137, 0.3529, 0.1647),
        });

        // Descriptive text
        const descriptiveText = `This certificate acknowledges your outstanding contribution and dedication during the July Student Revelation in ${location}. Your perticipation was essential to its success.`;
        page.drawText(descriptiveText, {
            x: 140,
            y: 670,
            font: fontInter,
            size: 38,
            color: rgb(0.435, 0.416, 0.357),
            lineHeight: 54,
            maxWidth: page.getWidth() - 860,
        });

        // Certificate Number
        page.drawText(`Certificate ID: ${userId}`, {
            x: 140,
            y: 180,
            font: fontMonospace,
            size: 40,
            color: rgb(0, 0, 0),
        });

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