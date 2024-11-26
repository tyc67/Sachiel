import { Logging } from '@google-cloud/logging'
import { GCP_PROJECT_ID, GCP_LOG_NAME } from '@/constants/config'
import { NextResponse } from 'next/server'

const loggingClient = new Logging({
  projectId: GCP_PROJECT_ID,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const log = loggingClient.log(GCP_LOG_NAME)
    const metadata = {
      resource: { type: 'global' },
      severity: 'INFO',
    }
    const entry = log.entry(metadata, body)
    await log.write(entry)
    return NextResponse.json({ message: 'Log recorded successfully' })
  } catch (error) {
    console.error('Error writing log:', error)
    return NextResponse.json({ message: 'Failed to record log', error })
  }
}
