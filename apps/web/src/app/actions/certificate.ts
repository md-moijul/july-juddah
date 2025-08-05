'use server';

import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';

type ActionResult = {
    success: boolean;
    certificateNumber?: string;
    error?: string;
};

export async function createCertificate(
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
    // Basic phone number validation (e.g., check if it's not empty and contains only digits)
    if (!phone || !/^[0-9]+$/.test(phone)) {
        return { success: false, error: 'Valid phone number is required.' };
    }

    // Check if user with phone number already exists
    const existingUser = await db.query.users.findFirst({
        where: eq(users.phone, phone),
    });

    if (existingUser) {
        return { success: false, error: 'This phone number has already been used to generate a certificate.' };
    }

    // Generate unique certificate number
    const certificateNumber = uuidv4();

    // Insert new user record
    try {
        await db.insert(users).values({
            name,
            town,
            phone,
        });
        return { success: true, certificateNumber };
    } catch (_) {
        return { success: false, error: 'Failed to create certificate due to a server error.' };
    }
}
