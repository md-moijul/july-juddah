
import { POST } from './route';
import { NextRequest } from 'next/server';
import { PDFDocument } from 'pdf-lib';

jest.mock('next/server', () => ({
  NextRequest: class extends Request {},
  NextResponse: class extends Response {
    static json(data, init) {
      return new Response(JSON.stringify(data), init);
    }
  },
}));

describe('POST /api/generate-pdf', () => {
  it('should return a PDF on success', async () => {
    const req = new NextRequest('http://localhost/api/generate-pdf', {
      method: 'POST',
      body: JSON.stringify({ fullName: 'John Doe', location: 'New York' }),
    });
    const res = await POST(req);

    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toBe('application/pdf');

    const pdfBytes = await res.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);
    expect(pdfDoc.getPageCount()).toBe(1);
  });

  it('should return 400 if fullName is missing', async () => {
    const req = new NextRequest('http://localhost/api/generate-pdf', {
      method: 'POST',
      body: JSON.stringify({ location: 'New York' }),
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe('Missing fullName or location');
  });

  it('should return 400 if location is missing', async () => {
    const req = new NextRequest('http://localhost/api/generate-pdf', {
      method: 'POST',
      body: JSON.stringify({ fullName: 'John Doe' }),
    });
    const res = await POST(req);

    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe('Missing fullName or location');
  });
});
