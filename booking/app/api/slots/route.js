import { NextResponse } from 'next/server';
import { generateSlots } from '../../../data/services'; // Ensure this path is correct

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceId = searchParams.get('serviceId'); // Service ID to generate slots for
    const date = searchParams.get('date');

    if (!serviceId || !date) {
      return NextResponse.json({ error: 'Service ID and date query parameters are required' }, { status: 400 });
    }

    const slots = generateSlots(serviceId);
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const availableSlots = slots.filter(slot => slot.startTime.startsWith(formattedDate));

    return NextResponse.json({ slots: availableSlots });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch slots', details: error.message }, { status: 500 });
  }
}
