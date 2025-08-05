import { renderHook, act } from '@testing-library/react';
import { useCertificateDownload } from './useCertificateDownload';
import { generateCertificatePdf } from '@/services/certificateService';

// Mock the generateCertificatePdf service
jest.mock('@/services/certificateService', () => ({
    generateCertificatePdf: jest.fn(),
}));

describe('useCertificateDownload', () => {
    const mockLink = {
        href: '',
        download: '',
        click: jest.fn(),
        remove: jest.fn(),
    };

    const originalCreateElement = document.createElement;

    beforeEach(() => {
        // Arrange: Reset mocks before each test
        (generateCertificatePdf as jest.Mock).mockClear();
        mockLink.click.mockClear();
        mockLink.remove.mockClear();

        // Mock document.createElement specifically for 'a' tags
        jest.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
            if (tagName === 'a') {
                return mockLink as unknown as HTMLElement;
            }
            // For all other tags, use the original implementation
            return originalCreateElement.call(document, tagName);
        });

        Object.defineProperty(window, 'URL', {
            writable: true,
            value: {
                createObjectURL: jest.fn(() => 'blob:mock-url'),
                revokeObjectURL: jest.fn(),
            },
        });
    });

    afterEach(() => {
        // Clean up all mocks
        jest.restoreAllMocks();
    });

    it('should return initial loading and error states', () => {
        // Arrange
        const { result } = renderHook(() => useCertificateDownload());

        // Assert
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(null);
    });

    it('should set isLoading to true during download and false after', async () => {
        // Arrange
        (generateCertificatePdf as jest.Mock).mockResolvedValue(new Blob());
        const { result } = renderHook(() => useCertificateDownload());

        // Act
        let promise: Promise<void>;
        act(() => {
            promise = result.current.downloadCertificate('John Doe', 'District 1');
        });

        // Assert
        expect(result.current.isLoading).toBe(true);

        // Act
        await act(async () => {
            await promise;
        });

        // Assert
        expect(result.current.isLoading).toBe(false);
    });

    it('should call generateCertificatePdf with correct arguments', async () => {
        // Arrange
        (generateCertificatePdf as jest.Mock).mockResolvedValue(new Blob());
        const { result } = renderHook(() => useCertificateDownload());

        // Act
        await act(async () => {
            await result.current.downloadCertificate('Jane Doe', 'District 2');
        });

        // Assert
        expect(generateCertificatePdf).toHaveBeenCalledWith({
            fullName: 'Jane Doe',
            location: 'District 2',
        });
    });

    it('should handle successful PDF download', async () => {
        // Arrange
        const mockBlob = new Blob(['pdf content'], { type: 'application/pdf' });
        (generateCertificatePdf as jest.Mock).mockResolvedValue(mockBlob);

        // Call renderHook *before* spying on appendChild
        const { result } = renderHook(() => useCertificateDownload());

        // NOW, spy on appendChild for this test
        const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation(() => { });

        // Act
        await act(async () => {
            await result.current.downloadCertificate('Test User', 'Test District');
        });

        // Assert
        expect(window.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);
        expect(document.createElement).toHaveBeenCalledWith('a');
        expect(appendChildSpy).toHaveBeenCalledWith(mockLink);
        expect(mockLink.click).toHaveBeenCalled();
        expect(mockLink.remove).toHaveBeenCalled();
        expect(window.URL.revokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
        expect(result.current.error).toBe(null);
    });

    it('should set error state if PDF generation fails', async () => {
        // Arrange
        const errorMessage = 'Failed to generate PDF';
        (generateCertificatePdf as jest.Mock).mockRejectedValue(new Error(errorMessage));
        const { result } = renderHook(() => useCertificateDownload());

        // Act
        await act(async () => {
            await result.current.downloadCertificate('Error User', 'Error District');
        });

        // Assert
        expect(result.current.error).toBe(errorMessage);
        expect(result.current.isLoading).toBe(false);
    });
});