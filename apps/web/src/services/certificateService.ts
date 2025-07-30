
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
