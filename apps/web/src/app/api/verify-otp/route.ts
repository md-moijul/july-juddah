import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { otp } = await request.json();

  console.log(`Mock API: Verifying OTP ${otp}`);

  // Simulate a delay to mimic API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Hardcoded OTP for demonstration purposes
  const hardcodedOtp = '123456';

  if (otp === hardcodedOtp) {
    return NextResponse.json({ success: true, message: 'OTP verified successfully' });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid OTP.' }, { status: 401 });
  }
}