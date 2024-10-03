// app/api/get-stripe-session/[sessionId]/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export async function GET(req: Request, { params }: { params: { sessionId: string } }) {
  const { sessionId } = params;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Assuming serviceName and meetingTime are stored in Stripe session metadata
    const serviceName = session.metadata?.serviceName || 'No service name available';
    const meetingTime = session.metadata?.meetingTime || 'No meeting time available';

    return NextResponse.json({
      customer_email: session.customer_email,
      serviceName,
      meetingTime,
    });
  } catch (error) {
    console.error('Error retrieving session from Stripe:', error);
    return NextResponse.json({ error: 'Error retrieving session' }, { status: 500 });
  }
}
