import { NextRequest, NextResponse } from 'next/server';
import { generateCertificateImage } from '@/services/certificateService';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  const district = searchParams.get('district');

  if (!name || !district) {
    return NextResponse.json({ error: 'Name and district are required' }, { status: 400 });
  }

  try {
    const imageBuffer = await generateCertificateImage({ fullName: name, location: district });
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    console.error('Error generating certificate image:', error);
    return NextResponse.json({ error: 'Failed to generate certificate image' }, { status: 500 });
  }
}
