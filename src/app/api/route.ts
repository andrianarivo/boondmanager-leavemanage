import getAccumulatedLeaves from '@/utils/getAccumulatedLeaves'
import getCurrentLeaves from '@/utils/getCurrentLeaves'

export const revalidate = 0

// {BASE_URL}/api/resources/{resource_id}/absences_reports
export async function GET() {
  try {
    const accumultatedLeaves = await getAccumulatedLeaves()
    const currentLeaves = await getCurrentLeaves()
    const data = [accumultatedLeaves, currentLeaves]
    return Response.json(data)
  } catch (error) {
    console.error(error)
  }
}
