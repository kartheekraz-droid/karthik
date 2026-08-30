import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Blog from './pages/Blog'
import HowToUse from './pages/HowToUse'
import PageLoader from './components/PageLoader'

import CentralDashboard from './pages/central/Dashboard'
import CentralStates from './pages/central/States'
import CentralGis from './pages/central/Gis'

import StateDashboard from './pages/state/Dashboard'
import StateDistricts from './pages/state/Districts'
import StateGis from './pages/state/Gis'

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
import ProtectedRoute from './components/ProtectedRoute'

import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import TermsAndConditions from './pages/legal/TermsAndConditions'
import RefundAndCancellationPolicy from './pages/legal/RefundAndCancellationPolicy'
import AccountDeletionPolicy from './pages/legal/AccountDeletionPolicy'

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
  const [booting, setBooting] = useState(true)
  const [hideLoader, setHideLoader] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const showFor = setTimeout(() => setHideLoader(true), 550)
    const unmountAfter = setTimeout(() => setBooting(false), 1000)
    return () => {
      clearTimeout(showFor)
      clearTimeout(unmountAfter)
    }
  }, [])

  return (
    <>
      {booting && <PageLoader hide={hideLoader} />}
      <div key={pathname} className="route-fade">
        <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login mode="signin" />} />
      <Route path="/signup" element={<Login mode="signup" />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/how-to-use" element={<HowToUse />} />

      {/* Central Government */}
      <Route path="/central" element={<ProtectedRoute role="central"><CentralDashboard /></ProtectedRoute>} />
      <Route path="/central/states" element={<ProtectedRoute role="central"><CentralStates /></ProtectedRoute>} />
      <Route path="/central/gis" element={<ProtectedRoute role="central"><CentralGis /></ProtectedRoute>} />
      <Route path="/central/budget" element={<ProtectedRoute role="central"><ComingSoon portalLabel="Central Government" portalHome="/central" navItems={CENTRAL_NAV} title="Central Budget & Financial Oversight" description="Allocation vs. release vs. utilization per state, with milestone-based fund triggers." /></ProtectedRoute>} />
      <Route path="/central/compliance" element={<ProtectedRoute role="central"><ComingSoon portalLabel="Central Government" portalHome="/central" navItems={CENTRAL_NAV} title="Policy Compliance Monitor" description="LARR Act 2013 compliance tracking — SIA, hearings, R&R, compensation timelines." /></ProtectedRoute>} />
      <Route path="/central/integration" element={<ProtectedRoute role="central"><ComingSoon portalLabel="Central Government" portalHome="/central" navItems={CENTRAL_NAV} title="Integration Hub" description="Per-state adapter status connecting 28 different land record systems into one standard." /></ProtectedRoute>} />

      {/* State Government */}
      <Route path="/state" element={<ProtectedRoute role="state"><StateDashboard /></ProtectedRoute>} />
      <Route path="/state/districts" element={<ProtectedRoute role="state"><StateDistricts /></ProtectedRoute>} />
      <Route path="/state/gis" element={<ProtectedRoute role="state"><StateGis /></ProtectedRoute>} />
      <Route path="/state/budget" element={<ProtectedRoute role="state"><ComingSoon portalLabel="State Government" portalHome="/state" navItems={STATE_NAV} title="State Budget Tracker" description="Central allocation vs. utilization, drilled down to each district." /></ProtectedRoute>} />

      {/* District / Collector */}
      <Route path="/collector" element={<ProtectedRoute role="collector"><CollectorDashboard /></ProtectedRoute>} />
      <Route path="/collector/map" element={<ProtectedRoute role="collector"><CollectorMap /></ProtectedRoute>} />
      <Route path="/collector/approvals" element={<ProtectedRoute role="collector"><CollectorApprovals /></ProtectedRoute>} />
      <Route path="/collector/parcel" element={<ProtectedRoute role="collector"><CollectorParcel /></ProtectedRoute>} />
      <Route path="/collector/parcel/:id" element={<ProtectedRoute role="collector"><CollectorParcel /></ProtectedRoute>} />
      <Route path="/collector/budget" element={<ProtectedRoute role="collector"><ComingSoon portalLabel="District / Collector" portalHome="/collector" navItems={COLLECTOR_NAV} title="Compensation & Budget Tracker" description="District budget utilization, per-project breakdown, and R&R status." /></ProtectedRoute>} />
      <Route path="/collector/alerts" element={<ProtectedRoute role="collector"><ComingSoon portalLabel="District / Collector" portalHome="/collector" navItems={COLLECTOR_NAV} title="Alerts & Dispute Management" description="Auto-generated deadline, fairness, and grievance-escalation alerts." /></ProtectedRoute>} />
      <Route path="/collector/analytics" element={<ProtectedRoute role="collector"><ComingSoon portalLabel="District / Collector" portalHome="/collector" navItems={COLLECTOR_NAV} title="District Analytics" description="Acquisition velocity, average time per stage, and officer performance." /></ProtectedRoute>} />

      {/* Project Implementing Agency */}
      <Route path="/pia" element={<ProtectedRoute role="pia"><PiaDashboard /></ProtectedRoute>} />
      <Route path="/pia/projects" element={<ProtectedRoute role="pia"><PiaProjects /></ProtectedRoute>} />
      <Route path="/pia/land" element={<ProtectedRoute role="pia"><PiaLand /></ProtectedRoute>} />
      <Route path="/pia/landowners" element={<ProtectedRoute role="pia"><PiaLandowners /></ProtectedRoute>} />
      <Route path="/pia/documents" element={<ProtectedRoute role="pia"><PiaDocuments /></ProtectedRoute>} />
      <Route path="/pia/grievances" element={<ProtectedRoute role="pia"><PiaGrievances /></ProtectedRoute>} />

      {/* Field Officer */}
      <Route path="/field" element={<ProtectedRoute role="field"><FieldDashboard /></ProtectedRoute>} />
      <Route path="/field/inspection" element={<ProtectedRoute role="field"><FieldInspection /></ProtectedRoute>} />
      <Route path="/field/map" element={<ProtectedRoute role="field"><FieldMap /></ProtectedRoute>} />

      {/* Citizen / Landowner */}
      <Route path="/citizen" element={<ProtectedRoute role="citizen"><MyLands /></ProtectedRoute>} />
      <Route path="/citizen/timeline" element={<ProtectedRoute role="citizen"><CitizenTimeline /></ProtectedRoute>} />
      <Route path="/citizen/compensation" element={<ProtectedRoute role="citizen"><CitizenCompensation /></ProtectedRoute>} />
      <Route path="/citizen/documents" element={<ProtectedRoute role="citizen"><CitizenDocuments /></ProtectedRoute>} />
      <Route path="/citizen/notifications" element={<ProtectedRoute role="citizen"><CitizenNotifications /></ProtectedRoute>} />
      <Route path="/citizen/grievance" element={<ProtectedRoute role="citizen"><CitizenGrievance /></ProtectedRoute>} />

      {/* Legal / policy pages */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/refund-and-cancellation-policy" element={<RefundAndCancellationPolicy />} />
      <Route path="/account-deletion-policy" element={<AccountDeletionPolicy />} />
        </Routes>
      </div>
    </>
  )
}
