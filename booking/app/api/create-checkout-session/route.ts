import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Ensure correct API version
});

export async function POST(req: Request) {
  try {
    const { priceId, email, serviceName, meetingTime } = await req.json();

    if (!priceId || !email || !serviceName || !meetingTime) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/stripe/success?session_id={CHECKOUT_SESSION_ID}&customerEmail=${encodeURIComponent(email)}&serviceName=${encodeURIComponent(serviceName)}&meetingTime=${encodeURIComponent(meetingTime)}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ id: session.id });  // Return session ID to client
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return new NextResponse(JSON.stringify({ error: 'Error creating checkout session' }), { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2024-06-20', // Adjust to your Stripe API version
// });

// export async function POST(req: Request) {
//   try {
//     // Destructure priceId, email, serviceName, and meetingTime from the request body
//     const { priceId, email, serviceName, meetingTime } = await req.json();

//     if (!priceId || !email || !serviceName || !meetingTime) {
//       return NextResponse.json({ error: 'Missing required parameters: priceId, email, serviceName, or meetingTime' }, { status: 400 });
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       customer_email: email,
//       line_items: [
//         { price: priceId, quantity: 1 },
//       ],
//       mode: 'payment',
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/stripe/success?session_id={CHECKOUT_SESSION_ID}&customerEmail=${encodeURIComponent(email)}&serviceName=${encodeURIComponent(serviceName)}&meetingTime=${encodeURIComponent(meetingTime)}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//     });

//     return NextResponse.json({ sessionId: session.id });
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     return new NextResponse(JSON.stringify({ error: 'Error creating checkout session' }), { status: 500 });
//   }
// }



// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2022-11-15',
// });

// export async function POST(req) {
//   try {
//     const { priceId, email } = await req.json();

//     // If priceId or email is missing, throw an error
//     if (!priceId || !email) {
//       return NextResponse.json(
//         { error: 'Missing required parameters: priceId or email' },
//         { status: 400 }
//       );
//     }

//     // Create a checkout session with Stripe
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       customer_email: email,
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/stripe/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//     });

//     return NextResponse.json({ id: session.id });
//   } catch (error) {
//     console.error('Error creating checkout session:', error);

//     // Respond with a meaningful error message
//     return new NextResponse(
//       JSON.stringify({ error: 'Error creating checkout session', details: error.message }),
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: '2022-11-15',
// });

// export async function POST(req) {
//   try {
//     const { priceId, email, serviceName, mentorName, meetingTime } = await req.json();

//     // Validate that all necessary parameters are provided
//     if (!priceId || !email || !serviceName || !mentorName || !meetingTime) {
//       return NextResponse.json(
//         { error: 'Missing required parameters' },
//         { status: 400 }
//       );
//     }

//     // Create the Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       customer_email: email,
//       line_items: [
//         {
//           price: priceId, // Ensure this is the correct price ID from Stripe
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/confirmation?serviceName=${encodeURIComponent(serviceName)}&mentorName=${encodeURIComponent(mentorName)}&meetingTime=${encodeURIComponent(meetingTime)}&customerEmail=${encodeURIComponent(email)}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//     });

//     return NextResponse.json({ id: session.id });
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     return new NextResponse(
//       JSON.stringify({ error: 'Error creating checkout session', details: error.message }),
//       { status: 500 }
//     );
//   }
// }


