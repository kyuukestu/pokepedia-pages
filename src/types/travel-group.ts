export interface TravelGroup {
  id: string
  name: string
  location: string
  date: string
  activityLevel: string
  objective: string
  intent: string
  color: string
  threadUrl?: string
  contactPerson: {
    name: string
    rpnlink: string
  }
  members: string[]
}
