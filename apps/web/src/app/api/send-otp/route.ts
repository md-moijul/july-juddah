import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { phoneNumber } = await request.json();

  console.log(`Mock API: Sending OTP to ${phoneNumber}`);

  // Simulate a delay to mimic API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real application, you would integrate with an SMS service here
  // and generate a real OTP.

  return NextResponse.json({ success: true, message: 'OTP sent successfully' });
}