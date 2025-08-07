
// apps/web/src/services/certificateService.ts

export interface CertificateData {
    fullName: string;
    location: string;
}

export async function generateCertificatePdf(data: CertificateData): Promise<Blob> {
    const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate PDF: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.blob();
}

export async function generateCertificateImage(data: CertificateData): Promise<ArrayBuffer> {
    // In a real application, this would call a backend service
    // that generates the image and returns its binary data.
    // For now, we'll simulate a response.
    // Simulate a simple 1x1 transparent PNG for demonstration
    const dummyPng = new Uint8Array([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
        0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
        0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
        0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
        0x42, 0x60, 0x82,
    ]);
    return dummyPng.buffer;
}
