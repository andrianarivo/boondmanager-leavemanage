import { GoogleSpreadsheet } from 'google-spreadsheet'
import { JWT } from 'google-auth-library'
import { parseFloatOrZero } from '@/utils'
import { readFile } from 'fs/promises'
import { AbsencesResponse } from '../../../types'

export const revalidate = 0

// {BASE_URL}/api/resources/{resource_id}/absences_reports
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

  const acquired = parseFloatOrZero(rows[1].get('Janvier'))
  const taken =
    parseFloatOrZero(rows[2].get('Janvier')) +
    parseFloatOrZero(rows[2].get('Février'))
  const balance = acquired - taken

  const data = [
    {
      year: currentYear - 1,
      acquired: acquired,
      taken: taken,
      balance: balance,
    },
  ]

  try {
    const responseJson = await readFile('./simulation.json')
    const response: AbsencesResponse = JSON.parse(responseJson.toString())

    let taken = 0
    response.data.forEach((absenceData) => {
      for (const key in absenceData) {
        absenceData[key].absencesPeriods.forEach((absencePeriod) => {
          if (absencePeriod.title === 'Congés payés') {
            taken += absencePeriod.duration
          }
        })
      }
    })

    const acquired = (new Date().getMonth() + 1) * 1.25
    const balance = acquired - taken

    data.push({
      year: currentYear,
      acquired: acquired,
      taken: taken,
      balance: balance,
    })
  } catch (error) {
    console.error(error)
  }

  return Response.json(data)
}
