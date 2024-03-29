import { GoogleSpreadsheet } from 'google-spreadsheet'
import { parseFloatOrZero } from '.'
import { JWT } from 'google-auth-library'

export default async function getAccumulatedLeaves() {
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

  const acquired = parseFloatOrZero(rows[1].get('Janvier'))
  const taken =
    parseFloatOrZero(rows[2].get('Janvier')) +
    parseFloatOrZero(rows[2].get('Février'))
  const balance = acquired - taken

  return {
    year: currentYear - 1,
    acquired: acquired,
    taken: taken,
    balance: balance,
  }
}
