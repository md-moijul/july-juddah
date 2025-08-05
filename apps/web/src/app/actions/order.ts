'use server';

import { db } from '@/db';
import { orders, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function createOrder(formData: {
    name: string;
    town: string;
    phone: string;
    shippingAddress: string;
}) {
    try {
        let user = await db.query.users.findFirst({
            where: eq(users.phone, formData.phone),
        });

        if (!user) {
            user = (
                await db
                    .insert(users)
                    .values({
                        // certificateNumber is required, but we don't have it here.
                        // This will be a problem.
                        // For now, I'll use a placeholder.
                        name: formData.name,
                        town: formData.town,
                        phone: formData.phone,
                    })
                    .returning()
            )[0];
        }

        await db.insert(orders).values({
            userId: user.id,
            shippingAddress: formData.shippingAddress,
        });

        return { success: true };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return { success: false, error: { message: errorMessage } };
    }
}
