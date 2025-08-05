import { generateCertificatePdf } from "./certificateService";

describe('generateCertificatePdf', () => {
    let mockFetch: jest.Mock;

    beforeEach(() => {
        mockFetch = jest.fn();
        global.fetch = mockFetch;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should return a Blob on successful PDF generation', async () => {
        // Arrange
        const mockBlob = new Blob(['test pdf content'], { type: 'application/pdf' });
        mockFetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            statusText: 'OK',
            blob: jest.fn().mockResolvedValue(mockBlob),
        });
        const data = { fullName: 'John Doe', location: 'Dhaka' };

        // Act
        const result = await generateCertificatePdf(data);

        // Assert
        expect(mockFetch).toHaveBeenCalledWith(
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
        // Arrange
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 500,
            statusText: 'Internal Server Error',
            text: jest.fn().mockResolvedValue('Something went wrong'),
        });
        const data = { fullName: 'John Doe', location: 'Dhaka' };

        // Act & Assert
        await expect(generateCertificatePdf(data)).rejects.toThrow(
            'Failed to generate PDF: 500 Internal Server Error - Something went wrong'
        );
    });
});