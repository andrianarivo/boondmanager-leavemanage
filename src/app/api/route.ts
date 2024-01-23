import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import { auth } from '@/auth'

export async function GET(req: Request, res: Response) {
  const sheetId = '1qk8Zh5cf_h1koHUjiGZ5FJjjt_dS-4jvceUxqsf07UI'
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth)
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]
  const rows = await sheet.getRows()

  const data = [
    {
      year: 2023,
      acquired: 4,
      taken: 4,
      balance: 0,
    },
    {
      year: 2024,
      acquired: 4,
      taken: 4,
      balance: 0,
    },
  ]
  return Response.json(data)
}
