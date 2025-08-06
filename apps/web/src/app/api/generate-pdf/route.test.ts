import { POST } from './route';
import { NextRequest } from 'next/server';
import { PDFDocument } from 'pdf-lib';

// Mock userUtils to ensure a consistent user ID
jest.mock('@/lib/userUtils', () => ({
    generateUniqueUserId: jest.fn().mockResolvedValue('12345678'),
}));

// Mock Next.js server functions correctly
jest.mock('next/server', () => {
    // Helper function to create a response object that mimics the real API
    const createResponse = (body, init) => ({
        status: init?.status,
        // The standard Headers object can be constructed from a plain object,
        // which correctly handles methods like .get() in our tests.
        headers: new Headers(init?.headers),
        json: () => Promise.resolve(body),
    });

    const NextResponseMock = jest.fn(createResponse);
    // Attach the static `json` method to the mock
    NextResponseMock.json = jest.fn(createResponse);

    return {
        NextRequest: jest.fn(),
        NextResponse: NextResponseMock,
    };
});


// Mock PDFDocument for PDF generation
jest.mock('pdf-lib', () => ({
    PDFDocument: {
        create: jest.fn().mockResolvedValue({
            save: jest.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
            addPage: jest.fn().mockReturnValue({
                drawText: jest.fn(),
            }),
            embedFont: jest.fn().mockResolvedValue({
                widthOfTextAtSize: jest.fn().mockReturnValue(100),
                heightAtSize: jest.fn().mockReturnValue(10),
            }),
        }),
    },
    rgb: jest.fn(),
    StandardFonts: {
        TimesRoman: 'TimesRoman',
        Helvetica: 'Helvetica',
        Courier: 'Courier',
    },
}));

describe('POST /api/generate-pdf', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
    });

    it('should return a PDF on successful generation', async () => {
        // Arrange
        const mockRequest = {
            json: jest.fn().mockResolvedValue({ fullName: 'John Doe', location: 'New York' }),
        } as unknown as NextRequest;

        // Act
        const response = await POST(mockRequest);

        // Assert
        expect(response.status).toBe(200);
        expect(response.headers.get('Content-Type')).toBe('application/pdf');
        expect(PDFDocument.create).toHaveBeenCalled();
    });

    it('should return 400 if fullName is missing', async () => {
        // Arrange
        const mockRequest = {
            json: jest.fn().mockResolvedValue({ location: 'New York' }),
        } as unknown as NextRequest;

        // Act
        const response = await POST(mockRequest);
        const body = await response.json();

        // Assert
        expect(response.status).toBe(400);
        expect(body.error).toBe('Missing fullName or location');
    });

    it('should return 400 if location is missing', async () => {
        // Arrange
        const mockRequest = {
            json: jest.fn().mockResolvedValue({ fullName: 'John Doe' }),
        } as unknown as NextRequest;

        // Act
        const response = await POST(mockRequest);
        const body = await response.json();

        // Assert
        expect(response.status).toBe(400);
        expect(body.error).toBe('Missing fullName or location');
    });

    it('should handle errors during PDF generation', async () => {
        // Arrange
        const mockRequest = {
            json: jest.fn().mockResolvedValue({ fullName: 'John Doe', location: 'New York' }),
        } as unknown as NextRequest;
        (PDFDocument.create as jest.Mock).mockRejectedValue(new Error('PDF creation failed'));

        // Act
        const response = await POST(mockRequest);
        const body = await response.json();

        // Assert
        expect(response.status).toBe(500);
        expect(body.error).toBe('Internal Server Error');
    });
});