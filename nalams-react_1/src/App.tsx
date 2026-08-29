import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

import CentralDashboard from './pages/central/Dashboard'
import CentralStates from './pages/central/States'

import StateDashboard from './pages/state/Dashboard'
import StateDistricts from './pages/state/Districts'

import CollectorDashboard from './pages/collector/Dashboard'
import CollectorMap from './pages/collector/Map'
import CollectorApprovals from './pages/collector/Approvals'
import CollectorParcel from './pages/collector/Parcel'

import PiaDashboard from './pages/pia/Dashboard'
import PiaProjects from './pages/pia/Projects'
import PiaLand from './pages/pia/Land'
import PiaLandowners from './pages/pia/Landowners'
import PiaDocuments from './pages/pia/Documents'
import PiaGrievances from './pages/pia/Grievances'

import FieldDashboard from './pages/field/Dashboard'
import FieldInspection from './pages/field/Inspection'
import FieldMap from './pages/field/Map'

import MyLands from './pages/citizen/MyLands'
import CitizenTimeline from './pages/citizen/Timeline'
import CitizenCompensation from './pages/citizen/Compensation'
import CitizenDocuments from './pages/citizen/Documents'
import CitizenNotifications from './pages/citizen/Notifications'
import CitizenGrievance from './pages/citizen/Grievance'

import ComingSoon from './components/ComingSoon'

const CENTRAL_NAV = [
  { label: 'Command Center', to: '/central' },
  { label: 'State Performance', to: '/central/states' },
  { label: 'National GIS', to: '/central/gis' },
  { label: 'Budget Oversight', to: '/central/budget' },
  { label: 'Policy Compliance', to: '/central/compliance' },
  { label: 'Integration Hub', to: '/central/integration' },
]
const STATE_NAV = [
  { label: 'State Command Center', to: '/state' },
  { label: 'District Performance', to: '/state/districts' },
  { label: 'State GIS', to: '/state/gis' },
  { label: 'State Budget', to: '/state/budget' },
]
const COLLECTOR_NAV = [
  { label: 'Command Center', to: '/collector' },
  { label: 'GIS Acquisition Map', to: '/collector/map' },
  { label: 'Pending Approvals', to: '/collector/approvals' },
  { label: 'Budget Tracker', to: '/collector/budget' },
  { label: 'Alerts & Disputes', to: '/collector/alerts' },
  { label: 'District Analytics', to: '/collector/analytics' },
]

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Central Government */}
      <Route path="/central" element={<CentralDashboard />} />
      <Route path="/central/states" element={<CentralStates />} />
      <Route path="/central/gis" element={<ComingSoon portalLabel="Central Government" portalHome="/central" navItems={CENTRAL_NAV} title="National GIS Overview" description="India map with state grades, cross-state project corridors, and dispute heat map." />} />
      <Route path="/central/budget" element={<ComingSoon portalLabel="Central Government" portalHome="/central" navItems={CENTRAL_NAV} title="Central Budget & Financial Oversight" description="Allocation vs. release vs. utilization per state, with milestone-based fund triggers." />} />
      <Route path="/central/compliance" element={<ComingSoon portalLabel="Central Government" portalHome="/central" navItems={CENTRAL_NAV} title="Policy Compliance Monitor" description="LARR Act 2013 compliance tracking — SIA, hearings, R&R, compensation timelines." />} />
      <Route path="/central/integration" element={<ComingSoon portalLabel="Central Government" portalHome="/central" navItems={CENTRAL_NAV} title="Integration Hub" description="Per-state adapter status connecting 28 different land record systems into one standard." />} />

      {/* State Government */}
      <Route path="/state" element={<StateDashboard />} />
      <Route path="/state/districts" element={<StateDistricts />} />
      <Route path="/state/gis" element={<ComingSoon portalLabel="State Government" portalHome="/state" navItems={STATE_NAV} title="State GIS Overview" description="State map with district-level grading and project corridors." />} />
      <Route path="/state/budget" element={<ComingSoon portalLabel="State Government" portalHome="/state" navItems={STATE_NAV} title="State Budget Tracker" description="Central allocation vs. utilization, drilled down to each district." />} />

      {/* District / Collector */}
      <Route path="/collector" element={<CollectorDashboard />} />
      <Route path="/collector/map" element={<CollectorMap />} />
      <Route path="/collector/approvals" element={<CollectorApprovals />} />
      <Route path="/collector/parcel" element={<CollectorParcel />} />
      <Route path="/collector/parcel/:id" element={<CollectorParcel />} />
      <Route path="/collector/budget" element={<ComingSoon portalLabel="District / Collector" portalHome="/collector" navItems={COLLECTOR_NAV} title="Compensation & Budget Tracker" description="District budget utilization, per-project breakdown, and R&R status." />} />
      <Route path="/collector/alerts" element={<ComingSoon portalLabel="District / Collector" portalHome="/collector" navItems={COLLECTOR_NAV} title="Alerts & Dispute Management" description="Auto-generated deadline, fairness, and grievance-escalation alerts." />} />
      <Route path="/collector/analytics" element={<ComingSoon portalLabel="District / Collector" portalHome="/collector" navItems={COLLECTOR_NAV} title="District Analytics" description="Acquisition velocity, average time per stage, and officer performance." />} />

      {/* Project Implementing Agency */}
      <Route path="/pia" element={<PiaDashboard />} />
      <Route path="/pia/projects" element={<PiaProjects />} />
      <Route path="/pia/land" element={<PiaLand />} />
      <Route path="/pia/landowners" element={<PiaLandowners />} />
      <Route path="/pia/documents" element={<PiaDocuments />} />
      <Route path="/pia/grievances" element={<PiaGrievances />} />

      {/* Field Officer */}
      <Route path="/field" element={<FieldDashboard />} />
      <Route path="/field/inspection" element={<FieldInspection />} />
      <Route path="/field/map" element={<FieldMap />} />

      {/* Citizen / Landowner */}
      <Route path="/citizen" element={<MyLands />} />
      <Route path="/citizen/timeline" element={<CitizenTimeline />} />
      <Route path="/citizen/compensation" element={<CitizenCompensation />} />
      <Route path="/citizen/documents" element={<CitizenDocuments />} />
      <Route path="/citizen/notifications" element={<CitizenNotifications />} />
      <Route path="/citizen/grievance" element={<CitizenGrievance />} />
    </Routes>
  )
}
