import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import { parseFloatOrZero } from '@/utils'

export async function GET() {
  const sheetId = '1qk8Zh5cf_h1koHUjiGZ5FJjjt_dS-4jvceUxqsf07UI'
  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  const currentYear = new Date().getFullYear()

  const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth)
  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]
  const rows = await sheet.getRows()

  const acquired1 = parseFloatOrZero(rows[1].get('Janvier'))
  const taken1 =
    parseFloatOrZero(rows[2].get('Janvier')) +
    parseFloatOrZero(rows[2].get('Février'))
  const balance1 = acquired1 - taken1

  const data = [
    {
      year: currentYear - 1,
      acquired: acquired1,
      taken: taken1,
      balance: balance1,
    },
    {
      year: currentYear,
      acquired: 4,
      taken: 4,
      balance: 0,
    },
  ]
  return Response.json(data)
}
