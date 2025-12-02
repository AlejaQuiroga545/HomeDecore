import { NextRequest, NextResponse } from 'next/server'

// Create PayPal order
export async function POST(request: NextRequest) {
  try {
    const { items, total } = await request.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Items are required' },
        { status: 400 }
      )
    }

    if (!total || total <= 0) {
      return NextResponse.json(
        { error: 'Total must be greater than 0' },
        { status: 400 }
      )
    }

    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET
    const PAYPAL_API_URL = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com'

    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      return NextResponse.json(
        { error: 'PayPal configuration is missing' },
        { status: 500 }
      )
    }

    // Get access token
    const tokenResponse = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    })

    if (!tokenResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to get PayPal access token' },
        { status: 500 }
      )
    }

    const { access_token } = await tokenResponse.json()

    // Create order
    const orderResponse = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: total.toFixed(2),
            },
            description: `HomeDecor purchase - ${items.length} item(s)`,
            items: items.map((item: any) => ({
              name: item.name,
              quantity: item.quantity.toString(),
              unit_amount: {
                currency_code: 'USD',
                value: item.price.toFixed(2),
              },
            })),
          },
        ],
      }),
    })

    if (!orderResponse.ok) {
      const errorData = await orderResponse.json()
      return NextResponse.json(
        { error: errorData.message || 'Failed to create PayPal order' },
        { status: 500 }
      )
    }

    const orderData = await orderResponse.json()

    return NextResponse.json({ orderId: orderData.id })
  } catch (error: any) {
    console.error('Error creating PayPal order:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create PayPal order' },
      { status: 500 }
    )
  }
}

