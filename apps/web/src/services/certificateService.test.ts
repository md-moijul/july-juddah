import { generateCertificatePdf } from "./certificateService";

describe('generateCertificatePdf', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a Blob on successful PDF generation', async () => {
    const mockBlob = new Blob(['test pdf content'], { type: 'application/pdf' });
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      statusText: 'OK',
      blob: () => Promise.resolve(mockBlob),
    });

    const data = { fullName: 'John Doe', location: 'New York' };
    const result = await generateCertificatePdf(data);

    expect(global.fetch).toHaveBeenCalledWith(
      '/api/generate-pdf',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    expect(result).toEqual(mockBlob);
  });

  it('should throw an error on failed PDF generation', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      text: () => Promise.resolve('Something went wrong'),
    });

    const data = { fullName: 'John Doe', location: 'New York' };
    await expect(generateCertificatePdf(data)).rejects.toThrow(
      'Failed to generate PDF: 500 Internal Server Error - Something went wrong'
    );
  });
});