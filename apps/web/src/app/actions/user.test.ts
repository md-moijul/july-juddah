import { createUser } from './user';
import { db } from '@/db';
import { users } from '@/db/schema';

// Mock the entire db module
jest.mock('@/db');

// Cast the imported db to its mocked type to get type safety and auto-completion
const mockedDb = db as jest.Mocked<typeof db>;

describe('createUser', () => {
    beforeEach(() => {
        // Resets all mocks before each test, clearing implementations and return values
        jest.resetAllMocks();
    });

    it('should return success true and a userId of 1000 when the users table is empty', async () => {
        // Arrange
        const name = 'Jane Doe';
        const town = 'Another Town';
        const phone = '0987654321';

        // Mock the sequence of db calls
        (mockedDb.query.users.findFirst as jest.Mock).mockResolvedValue(undefined); // No existing user
        (mockedDb.select as jest.Mock).mockReturnValue({
            from: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue([]), // No max ID found (empty table)
        });
        (mockedDb.insert as jest.Mock).mockReturnValue({
            values: jest.fn().mockResolvedValue({}),
        } as unknown);

        // Act
        const result = await createUser(name, town, phone);

        // Assert
        expect(result.success).toBe(true);
        expect(result.userId).toBe(1000);
        expect(mockedDb.insert).toHaveBeenCalledWith(users);
        expect(mockedDb.insert(users).values).toHaveBeenCalledWith(expect.objectContaining({
            id: 1000,
            name,
            town,
            phone,
        }));
    });

    it('should return success true and an incremented userId when the users table is not empty', async () => {
        // Arrange
        const name = 'Alice Smith';
        const town = 'Testville';
        const phone = '1122334455';
        const existingMaxId = 1005;

        // Mock the sequence of db calls
        (mockedDb.query.users.findFirst as jest.Mock).mockResolvedValue(undefined); // No existing user
        (mockedDb.select as jest.Mock).mockReturnValue({
            from: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue([{ id: existingMaxId }]), // Max ID found
        });
        (mockedDb.insert as jest.Mock).mockReturnValue({
            values: jest.fn().mockResolvedValue({}),
        } as unknown);

        // Act
        const result = await createUser(name, town, phone);

        // Assert
        expect(result.success).toBe(true);
        expect(result.userId).toBe(existingMaxId + 1);
        expect(mockedDb.insert).toHaveBeenCalledWith(users);
        expect(mockedDb.insert(users).values).toHaveBeenCalledWith(expect.objectContaining({
            id: existingMaxId + 1,
            name,
            town,
            phone,
        }));
    });

    it('should return success false if name is missing', async () => {
        const result = await createUser('', 'Anytown', '1234567890');
        expect(result.success).toBe(false);
        expect(result.error).toBe('Name is required.');
    });

    it('should return success false if town is missing', async () => {
        const result = await createUser('John Doe', '', '1234567890');
        expect(result.success).toBe(false);
        expect(result.error).toBe('Town is required.');
    });

    it('should return success false if phone is invalid', async () => {
        const result = await createUser('John Doe', 'Anytown', 'invalid-phone');
        expect(result.success).toBe(false);
        expect(result.error).toBe('Valid phone number is required.');
    });

    it('should return success false if phone number already exists', async () => {
        // Arrange
        const phone = '1234567890';
        (mockedDb.query.users.findFirst as jest.Mock).mockResolvedValue({ phone: phone });

        // Act
        const result = await createUser('John Doe', 'Anytown', phone);

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toBe('This phone number has already been used to generate a certificate.');
    });

    it('should return success false on database error', async () => {
        // Arrange
        (mockedDb.query.users.findFirst as jest.Mock).mockResolvedValue(undefined);
        (mockedDb.select as jest.Mock).mockReturnValue({
            from: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue([]),
        });
        // Mock the insert call to throw an error
        (mockedDb.insert as jest.Mock).mockImplementation(() => {
            throw new Error('Database error');
        });

        // Act
        const result = await createUser('John Doe', 'Anytown', '1234567890');

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toBe('Failed to create user due to a server error.');
    });
});