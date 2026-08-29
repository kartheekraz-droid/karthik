// Mock/demo data shared across portal dashboards.
// Replace each of these with a `supabase.from(...).select(...)` call — the
// shapes here match the suggested tables in `src/lib/supabaseClient.ts`.

export interface StatePerformance {
  state: string
  integration: 'Connected' | 'In Progress' | 'Not Started'
  activeProjects: number
  acresClearedQ3: number
  avgDays: number
  disputeRate: string
  budgetUtilization: string
  grade: 'A' | 'B' | 'C' | 'D'
}

export const STATE_PERFORMANCE: StatePerformance[] = [
  { state: 'Karnataka', integration: 'Connected', activeProjects: 41, acresClearedQ3: 6200, avgDays: 38, disputeRate: '4.1%', budgetUtilization: '97.2%', grade: 'A' },
  { state: 'Andhra Pradesh', integration: 'Connected', activeProjects: 33, acresClearedQ3: 5100, avgDays: 44, disputeRate: '6.0%', budgetUtilization: '92.5%', grade: 'A' },
  { state: 'Telangana', integration: 'Connected', activeProjects: 29, acresClearedQ3: 4300, avgDays: 47, disputeRate: '7.2%', budgetUtilization: '88.0%', grade: 'B' },
  { state: 'Maharashtra', integration: 'Connected', activeProjects: 52, acresClearedQ3: 4800, avgDays: 61, disputeRate: '9.8%', budgetUtilization: '72.0%', grade: 'B' },
  { state: 'Uttar Pradesh', integration: 'In Progress', activeProjects: 60, acresClearedQ3: 3900, avgDays: 70, disputeRate: '12.4%', budgetUtilization: '58.0%', grade: 'C' },
  { state: 'West Bengal', integration: 'In Progress', activeProjects: 24, acresClearedQ3: 2100, avgDays: 78, disputeRate: '14.9%', budgetUtilization: '51.0%', grade: 'C' },
  { state: 'Bihar', integration: 'Not Started', activeProjects: 18, acresClearedQ3: 900, avgDays: 96, disputeRate: '18.6%', budgetUtilization: '40.0%', grade: 'D' },
]

export interface DistrictPerformance {
  district: string
  activeProjects: number
  acresClearedQ3: number
  avgDays: number
  disputeRate: string
  budgetUtilization: string
  grade: 'A' | 'B' | 'C' | 'D'
}

export const DISTRICT_PERFORMANCE: DistrictPerformance[] = [
  { district: 'Pune', activeProjects: 12, acresClearedQ3: 1450, avgDays: 41, disputeRate: '5.2%', budgetUtilization: '94.0%', grade: 'A' },
  { district: 'Nagpur', activeProjects: 9, acresClearedQ3: 980, avgDays: 52, disputeRate: '8.1%', budgetUtilization: '81.0%', grade: 'B' },
  { district: 'Nashik', activeProjects: 7, acresClearedQ3: 640, avgDays: 58, disputeRate: '10.4%', budgetUtilization: '69.0%', grade: 'B' },
  { district: 'Aurangabad', activeProjects: 6, acresClearedQ3: 410, avgDays: 74, disputeRate: '15.0%', budgetUtilization: '52.0%', grade: 'C' },
]

export interface ApprovalFile {
  project: string
  surveyNo: string
  owner: string
  stage: string
  daysPending: number
  riskScore: number
}

export const APPROVAL_QUEUE: ApprovalFile[] = [
  { project: 'NH-48 widening', surveyNo: 'Gat 112', owner: 'Suresh Patil', stage: 'Objection window', daysPending: 14, riskScore: 8 },
  { project: 'NH-48 widening', surveyNo: 'Gat 204', owner: 'Anita Deshmukh', stage: 'Compensation award', daysPending: 6, riskScore: 3 },
  { project: 'Metro Phase 2', surveyNo: 'Gat 88', owner: 'Forest belt (4 parcels)', stage: 'SIA pending', daysPending: 22, riskScore: 9 },
  { project: 'Irrigation canal', surveyNo: 'Gat 41', owner: 'Ramesh Kale', stage: 'Survey complete', daysPending: 2, riskScore: 2 },
]

export function riskTone(score: number): 'green' | 'saffron' | 'red' {
  if (score <= 3) return 'green'
  if (score <= 6) return 'saffron'
  return 'red'
}

export interface PiaProject {
  name: string
  district: string
  parcels: number
  acquired: number
  pending: number
  status: 'On Track' | 'Delayed' | 'Critical'
}

export const PIA_PROJECTS: PiaProject[] = [
  { name: 'NH-48 widening', district: 'Pune', parcels: 47, acquired: 30, pending: 17, status: 'On Track' },
  { name: 'Hyderabad Metro Phase 2', district: 'Hyderabad', parcels: 122, acquired: 95, pending: 27, status: 'On Track' },
  { name: 'Irrigation canal extension', district: 'Nashik', parcels: 33, acquired: 12, pending: 21, status: 'Delayed' },
  { name: 'Smart city ring road', district: 'Nagpur', parcels: 58, acquired: 14, pending: 44, status: 'Critical' },
]

export interface Landowner {
  name: string
  village: string
  surveyNo: string
  project: string
  status: 'Under Survey' | 'Compensation Calculated' | 'Payment Released' | 'Dispute Raised'
}

export const LANDOWNERS: Landowner[] = [
  { name: 'Suresh Patil', village: 'Wadgaon', surveyNo: 'Gat 112', project: 'NH-48 widening', status: 'Dispute Raised' },
  { name: 'Anita Deshmukh', village: 'Wadgaon', surveyNo: 'Gat 204', project: 'NH-48 widening', status: 'Compensation Calculated' },
  { name: 'Ramesh Kale', village: 'Sinnar', surveyNo: 'Gat 41', project: 'Irrigation canal extension', status: 'Under Survey' },
  { name: 'Fatima Sheikh', village: 'Hadapsar', surveyNo: 'Gat 77', project: 'NH-48 widening', status: 'Payment Released' },
]

export interface FieldTask {
  surveyNo: string
  village: string
  project: string
  status: 'Pending Visit' | 'Visited — Awaiting Decision' | 'Escalated'
}

export const FIELD_QUEUE: FieldTask[] = [
  { surveyNo: 'Gat 112', village: 'Wadgaon', project: 'NH-48 widening', status: 'Escalated' },
  { surveyNo: 'Gat 88', village: 'Bhugaon', project: 'Metro Phase 2', status: 'Pending Visit' },
  { surveyNo: 'Gat 41', village: 'Sinnar', project: 'Irrigation canal extension', status: 'Visited — Awaiting Decision' },
]

export interface CitizenParcel {
  surveyNo: string
  village: string
  project: string
  status: 'Under Survey' | 'Compensation Calculated' | 'Payment Released' | 'Dispute Raised'
}

export const CITIZEN_PARCELS: CitizenParcel[] = [
  { surveyNo: 'Gat 112', village: 'Wadgaon', project: 'NH-48 widening', status: 'Dispute Raised' },
  { surveyNo: 'Gat 77', village: 'Hadapsar', project: 'NH-48 widening', status: 'Payment Released' },
]
