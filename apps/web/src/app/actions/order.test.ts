import { createOrder } from './order';
import { mockClear, mockFindFirst, mockInsert, mockReturning, mockValues } from '@/db';
import { users, orders } from '@/db/schema';
import { eq } from 'drizzle-orm';

jest.mock('@/db', () => {
    const mockValues = jest.fn();
    const mockReturning = jest.fn();
    const mockInsert = jest.fn(() => ({
        values: mockValues,
        returning: mockReturning,
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
        mockReturning,
        mockFindFirst,
        mockClear: () => {
            mockInsert.mockClear();
            mockValues.mockClear();
            mockReturning.mockClear();
            mockFindFirst.mockClear();
        },
    };
});

describe('createOrder', () => {
    beforeEach(() => {
        mockClear();
    });

    it('should create an order for an existing user', async () => {
        // Arrange
        const formData = {
            name: 'John Doe',
            town: 'Anytown',
            phone: '1234567890',
            shippingAddress: '123 Main St',
        };
        const existingUser = { id: 1, name: 'John Doe', town: 'Anytown', phone: '1234567890' };

        mockFindFirst.mockResolvedValueOnce(existingUser);
        mockValues.mockResolvedValueOnce({}); // For the orders insert

        // Act
        const result = await createOrder(formData);

        // Assert
        expect(result.success).toBe(true);
        expect(mockFindFirst).toHaveBeenCalledWith({
            where: eq(users.phone, formData.phone),
        });
        expect(mockInsert).toHaveBeenCalledWith(orders);
        expect(mockValues).toHaveBeenCalledWith({
            userId: existingUser.id,
            shippingAddress: formData.shippingAddress,
        });
    });

    it('should create a new user and then create an order', async () => {
        // Arrange
        const formData = {
            name: 'Jane Doe',
            town: 'Othertown',
            phone: '0987654321',
            shippingAddress: '456 Oak Ave',
        };
        const newUser = { id: 2, name: 'Jane Doe', town: 'Othertown', phone: '0987654321', };

        mockFindFirst.mockResolvedValueOnce(undefined);
        // Correctly mock the chained call for user creation
        mockValues.mockReturnValueOnce({
            returning: mockReturning,
        });
        mockReturning.mockResolvedValueOnce([newUser]);

        // Mock the second call to .values() for the order insert
        mockValues.mockResolvedValueOnce({});

        // Act
        const result = await createOrder(formData);

        // Assert
        expect(result.success).toBe(true);
        expect(mockFindFirst).toHaveBeenCalledWith({
            where: eq(users.phone, formData.phone),
        });
        // Check user insert call
        expect(mockInsert).toHaveBeenCalledWith(users);
        expect(mockValues).toHaveBeenCalledWith(expect.objectContaining({
            name: formData.name,
            town: formData.town,
            phone: formData.phone,
        }));
        // Check order insert call
        expect(mockInsert).toHaveBeenCalledWith(orders);
        expect(mockValues).toHaveBeenCalledWith({
            userId: newUser.id,
            shippingAddress: formData.shippingAddress,
        });
    });

    it('should return success false and an error message on database error during user creation', async () => {
        // Arrange
        const formData = {
            name: 'John Doe',
            town: 'Anytown',
            phone: '1234567890',
            shippingAddress: '123 Main St',
        };

        mockFindFirst.mockResolvedValueOnce(undefined);
        mockInsert.mockImplementationOnce(() => {
            throw new Error('User DB error');
        });

        // Act
        const result = await createOrder(formData);

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toEqual({ message: 'User DB error' });
    });

    it('should return success false and an error message on database error during order creation', async () => {
        // Arrange
        const formData = {
            name: 'John Doe',
            town: 'Anytown',
            phone: '1234567890',
            shippingAddress: '123 Main St',
        };
        const existingUser = { id: 1, name: 'John Doe', town: 'Anytown', phone: '1234567890' };

        mockFindFirst.mockResolvedValueOnce(existingUser);
        mockValues.mockImplementationOnce(() => {
            throw new Error('Order DB error');
        });

        // Act
        const result = await createOrder(formData);

        // Assert
        expect(result.success).toBe(false);
        expect(result.error).toEqual({ message: 'Order DB error' });
    });
});