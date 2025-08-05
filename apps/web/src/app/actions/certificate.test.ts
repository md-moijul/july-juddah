import { createCertificate } from './certificate';
import { mockClear, mockFindFirst, mockInsert, mockValues } from '@/db';
import { users } from '@/db/schema';

jest.mock('@/db', () => {
    const mockValues = jest.fn();
    const mockInsert = jest.fn(() => ({
        values: mockValues,
    }));
    const mockFindFirst = jest.fn();

    return {
        __esModule: true,
        db: {
            insert: mockInsert,
            query: {
                users: {
                    findFirst: mockFindFirst,
                },
            },
        },
        mockInsert,
        mockValues,
        mockFindFirst,
        mockClear: () => {
            mockInsert.mockClear();
            mockValues.mockClear();
            mockFindFirst.mockClear();
        },
    };
});

// Mock the fetch function
global.fetch = jest.fn();

describe('createCertificate', () => {
    beforeEach(() => {
        mockClear();
        (global.fetch as jest.Mock).mockClear();
    });

    it('should return success true and a certificate number on successful creation', async () => {
        // Arrange
        const name = 'John Doe';
        const town = 'Anytown';
        const phone = '1234567890';

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({ success: true }),
        });

        mockFindFirst.mockResolvedValueOnce(undefined);
        mockValues.mockResolvedValueOnce({});

        // Act
        const result = await createCertificate(name, town, phone);

        // Assert
        expect(result.success).toBe(true);
        expect(result.certificateNumber).toBeDefined();
        expect(mockInsert).toHaveBeenCalledWith(users);
        expect(mockValues).toHaveBeenCalledWith(expect.objectContaining({
            name,
            town,
            phone,
        }));
    });

    it('should return success false and an error message if name is missing', async () => {
        // Arrange
        const name = '';
        const town = 'Anytown';
        const phone = '1234567890';

        // Act
        const result = await createCertificate(name, town, phone);

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toBe('Name is required.');
    });

    it('should return success false and an error message if town is missing', async () => {
        // Arrange
        const name = 'John Doe';
        const town = '';
        const phone = '1234567890';

        // Act
        const result = await createCertificate(name, town, phone);

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toBe('Town is required.');
    });

    it('should return success false and an error message if phone is invalid', async () => {
        // Arrange
        const name = 'John Doe';
        const town = 'Anytown';
        const phone = 'invalid-phone';

        // Act
        const result = await createCertificate(name, town, phone);

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toBe('Valid phone number is required.');
    });


    it('should return success false and an error message if phone number already exists', async () => {
        // Arrange
        const name = 'John Doe';
        const town = 'Anytown';
        const phone = '1234567890';

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({ success: true }),
        });

        mockFindFirst.mockResolvedValueOnce({ phone: phone });

        // Act
        const result = await createCertificate(name, town, phone);

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toBe('This phone number has already been used to generate a certificate.');
    });

    it('should return success false and an error message on database error', async () => {
        // Arrange
        const name = 'John Doe';
        const town = 'Anytown';
        const phone = '1234567890';

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            json: () => Promise.resolve({ success: false }),
        });

        mockFindFirst.mockResolvedValueOnce(undefined);
        mockValues.mockImplementationOnce(() => {
            throw new Error('Database error');
        });

        // Act
        const result = await createCertificate(name, town, phone);

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toBe('Failed to create certificate due to a server error.');
    });
});