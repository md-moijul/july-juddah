'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
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