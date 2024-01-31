import { readFile } from 'fs/promises'
import { AbsencesResponse } from '../../types'

export default async function getCurrentLeaves() {
  try {
    const currentYear = new Date().getFullYear()
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

    return {
      year: currentYear,
      acquired: acquired,
      taken: taken,
      balance: balance,
    }
  } catch (error) {
    console.error(error)
  }
}
