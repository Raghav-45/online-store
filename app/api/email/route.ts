import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { ReceiptEmail } from '@/emails/receipt'

const resend = new Resend(process.env.resend_api_key)

export async function POST(request: NextRequest) {
  const { order } = await request.json()
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'adi4545aditya@gmail.com',
    subject: 'Your Order Is On Its Way! Track It Now',
    react: ReceiptEmail({ order }),
  })

  return NextResponse.json({
    status: 'Ok',
  })
}
