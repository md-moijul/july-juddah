'use server';

import { db } from '@/db';
import { users, orders } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { eq, desc } from 'drizzle-orm';

type ActionResult = {
    success: boolean;
    userId?: number;
    error?: string;
};

export async function createUser(
    name: string,
    town: string,
    phone: string,
): Promise<ActionResult> {
    // Input validation
    if (!name || name.trim() === '') {
        return { success: false, error: 'Name is required.' };
    }
    if (!town || town.trim() === '') {
        return { success: false, error: 'Town is required.' };
    }
    if (!phone || !/^[0-9]+$/.test(phone)) {
        return { success: false, error: 'Valid phone number is required.' };
    }

    try {
        // Check if user with phone number already exists
        const existingUser = await db.query.users.findFirst({
            where: eq(users.phone, phone),
        });

        if (existingUser) {
            return { success: false, error: 'This phone number has already been used to generate a certificate.' };
        }

        // Find the current maximum ID to determine the next sequential ID
        const maxIdResult = await db.select({ id: users.id }).from(users).orderBy(desc(users.id)).limit(1);

        let newUserId: number;
        if (maxIdResult && maxIdResult.length > 0 && maxIdResult[0].id) {
            newUserId = maxIdResult[0].id + 1;
        } else {
            newUserId = 1000; // Starting ID if table is empty
        }

        // Insert new user record
        await db.insert(users).values({
            id: newUserId,
            name,
            town,
            phone,
        });

        return { success: true, userId: newUserId };
    } catch (_) {
        return { success: false, error: 'Failed to create user due to a server error.' };
    }
}

export async function createOrder({
    name,
    town,
    phone,
    shippingAddress,
}: {
    name: string;
    town: string;
    phone: string;
    shippingAddress: string;
}) {

    try {
        const result = await db.transaction(async (tx) => {
            let user = await tx.query.users.findFirst({
                where: eq(users.phone, phone),
            });

            if (!user) {
                // If user does not exist, create a new one
                const maxIdResult = await tx.select({ id: users.id }).from(users).orderBy(desc(users.id)).limit(1);
                let newUserId: number;
                if (maxIdResult && maxIdResult.length > 0 && maxIdResult[0].id) {
                    newUserId = maxIdResult[0].id + 1;
                } else {
                    newUserId = 1000; // Starting ID if table is empty
                }

                await tx.insert(users).values({
                    id: newUserId,
                    name,
                    town,
                    phone,
                });

                user = { id: newUserId, name, town, phone, isOtpVerified: false, referrerId: null }; // Create a user object for the transaction
            }

            if (!user) {
                tx.rollback();
                return { success: false, error: 'Failed to retrieve or create user.' };
            }

            const [newOrder] = await tx.insert(orders).values({
                userId: user.id,
                shippingAddress,
            }).returning();

            return { success: true, order: newOrder };
        });
        return result;
    } catch (error) {
        console.error("Error creating order:", error);
        return { success: false, error: 'Failed to create order due to a server error.' };
    }
}

export async function getUserById(userId: string) {
    try {
        const user = await db.query.users.findFirst({
            where: eq(users.id, parseInt(userId)),
        });
        return user || null;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        return null;
    }
}