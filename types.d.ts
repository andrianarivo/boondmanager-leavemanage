export interface Leave {
  year: number
  acquired: number
  taken: number
  balance: number
}

export interface AbsencesPeriods {
  id: string
  startDate: string
  endDate: string
  duration: number
  title: string
  workUnitType: WorkUnitType
}

export interface AbsencesData {
  creationDate: string
  state: AbsenceState
  absencesPeriods: AbsencesPeriods[]
}

export interface AbsencesResponse {
  meta: Record<string, any>
  data: AbsencesData[]
}

export enum AbsenceState {
  SAVED_AND_NO_VALIDATION = 'savedAndNoValidation',
  WAITING_FOR_VALIDATION = 'waitingForValidation',
  VALIDATED = 'validated',
  REJECTED = 'rejected',
}

export interface WorkUnitType {
  reference: number
  activityType: ActivityType
  name: string
}

export enum ActivityType {
  PRODUCTION = 'production',
  ABSENCE = 'absence',
  INTERNAL = 'internal',
  EXCEPTIONAL_TIME = 'exceptionalTime',
  EXCEPTIONAL_CALENDAR = 'exceptionalCalendar',
}
