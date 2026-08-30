-- NALAMS demo seed for the 9-table schema.
-- Run this after creating: profiles, projects, parcels, landowners,
-- acquisition_cases, compensation, grievances, field_tasks, approvals.

insert into profiles (full_name, email, phone, role, state, district, department) values
('Central Demo Officer', 'central@nalams.demo', '9000000001', 'central', null, null, 'Ministry Demo'),
('AP State Demo Officer', 'state.ap@nalams.demo', '9000000002', 'state', 'Andhra Pradesh', null, 'Revenue Department'),
('Krishna Collector Demo', 'collector.krishna@nalams.demo', '9000000003', 'collector', 'Andhra Pradesh', 'Krishna', 'District Administration'),
('PIA Demo Manager', 'pia@nalams.demo', '9000000004', 'pia', 'Andhra Pradesh', 'Krishna', 'Project Implementing Agency'),
('Field Demo Officer', 'field@nalams.demo', '9000000005', 'field', 'Andhra Pradesh', 'Krishna', 'Survey Team'),
('Citizen Demo', 'citizen@nalams.demo', '9000000006', 'citizen', 'Andhra Pradesh', 'Krishna', null);

insert into projects
(project_code, project_name, project_type, state, district, acquiring_agency, total_land, acquired_land, estimated_cost, status, progress, start_date, target_date)
values
('NALAMS-AP-001', 'NH-16 Highway Expansion', 'Highway', 'Andhra Pradesh', 'Krishna', 'NHAI Demo', 125.50, 82.40, 450000000, 'in_progress', 66, '2026-01-15', '2027-06-30'),
('NALAMS-AP-002', 'Amaravati Ring Road', 'Road', 'Andhra Pradesh', 'Guntur', 'State Infra Demo', 210.00, 92.00, 720000000, 'in_progress', 44, '2026-02-10', '2027-11-30'),
('NALAMS-TS-001', 'Hyderabad Metro Phase 2', 'Metro', 'Telangana', 'Hyderabad', 'Metro Demo Corp', 88.00, 69.00, 980000000, 'in_progress', 78, '2025-12-01', '2027-05-31'),
('NALAMS-MH-001', 'Irrigation Canal Extension', 'Irrigation', 'Maharashtra', 'Nashik', 'Water Resources Demo', 73.00, 28.00, 260000000, 'in_progress', 38, '2026-03-01', '2027-08-30'),
('NALAMS-KA-001', 'Bengaluru Logistics Corridor', 'Industrial Corridor', 'Karnataka', 'Bengaluru Rural', 'Logistics Demo Authority', 156.00, 121.00, 610000000, 'in_progress', 81, '2025-11-20', '2027-02-15');

insert into parcels
(parcel_no, project_id, survey_no, village, mandal, district, state, area, land_type, latitude, longitude, status)
values
('AP-KRI-001', (select id from projects where project_code='NALAMS-AP-001' limit 1), '142/3A', 'Gannavaram', 'Gannavaram', 'Krishna', 'Andhra Pradesh', 2.45, 'Agricultural', 16.5401, 80.8021, 'acquired'),
('AP-KRI-002', (select id from projects where project_code='NALAMS-AP-001' limit 1), '143/2B', 'Gannavaram', 'Gannavaram', 'Krishna', 'Andhra Pradesh', 1.80, 'Residential', 16.5422, 80.7992, 'under_acquisition'),
('AP-GNT-001', (select id from projects where project_code='NALAMS-AP-002' limit 1), '88/1', 'Tadikonda', 'Tadikonda', 'Guntur', 'Andhra Pradesh', 3.10, 'Agricultural', 16.4148, 80.4556, 'identified'),
('TS-HYD-001', (select id from projects where project_code='NALAMS-TS-001' limit 1), '77/4', 'Shamshabad', 'Shamshabad', 'Hyderabad', 'Telangana', 1.25, 'Commercial', 17.2512, 78.4312, 'acquired'),
('MH-NSK-001', (select id from projects where project_code='NALAMS-MH-001' limit 1), 'Gat 41', 'Sinnar', 'Sinnar', 'Nashik', 'Maharashtra', 2.90, 'Agricultural', 19.8450, 73.9980, 'under_acquisition'),
('KA-BLR-001', (select id from projects where project_code='NALAMS-KA-001' limit 1), '56/7', 'Devanahalli', 'Devanahalli', 'Bengaluru Rural', 'Karnataka', 4.20, 'Agricultural', 13.2460, 77.7120, 'acquired');

insert into landowners (parcel_id, owner_name, phone, address, ownership_percentage, verification_status) values
((select id from parcels where parcel_no='AP-KRI-001' limit 1), 'Demo Owner 001', '9111111101', 'Gannavaram, Krishna', 100, 'verified'),
((select id from parcels where parcel_no='AP-KRI-002' limit 1), 'Demo Owner 002', '9111111102', 'Gannavaram, Krishna', 100, 'verified'),
((select id from parcels where parcel_no='AP-GNT-001' limit 1), 'Demo Owner 003', '9111111103', 'Tadikonda, Guntur', 100, 'pending'),
((select id from parcels where parcel_no='TS-HYD-001' limit 1), 'Demo Owner 004', '9111111104', 'Shamshabad, Hyderabad', 100, 'verified'),
((select id from parcels where parcel_no='MH-NSK-001' limit 1), 'Demo Owner 005', '9111111105', 'Sinnar, Nashik', 100, 'verified'),
((select id from parcels where parcel_no='KA-BLR-001' limit 1), 'Demo Owner 006', '9111111106', 'Devanahalli, Bengaluru Rural', 100, 'verified');

insert into acquisition_cases
(case_no, parcel_id, project_id, stage, status, notification_date, award_date, remarks)
values
('LA-AP-2026-001', (select id from parcels where parcel_no='AP-KRI-001' limit 1), (select id from projects where project_code='NALAMS-AP-001' limit 1), 'compensation', 'in_progress', '2026-03-10', '2026-07-20', 'Award approved'),
('LA-AP-2026-002', (select id from parcels where parcel_no='AP-KRI-002' limit 1), (select id from projects where project_code='NALAMS-AP-001' limit 1), 'valuation', 'pending', '2026-04-12', null, 'Valuation under review'),
('LA-AP-2026-003', (select id from parcels where parcel_no='AP-GNT-001' limit 1), (select id from projects where project_code='NALAMS-AP-002' limit 1), 'survey', 'pending', null, null, 'Initial survey'),
('LA-TS-2026-001', (select id from parcels where parcel_no='TS-HYD-001' limit 1), (select id from projects where project_code='NALAMS-TS-001' limit 1), 'completed', 'completed', '2026-01-15', '2026-05-15', 'Possession transferred'),
('LA-MH-2026-001', (select id from parcels where parcel_no='MH-NSK-001' limit 1), (select id from projects where project_code='NALAMS-MH-001' limit 1), 'verification', 'pending', '2026-05-01', null, 'Ownership verification'),
('LA-KA-2026-001', (select id from parcels where parcel_no='KA-BLR-001' limit 1), (select id from projects where project_code='NALAMS-KA-001' limit 1), 'compensation', 'in_progress', '2026-02-22', '2026-06-30', 'Payment released');

insert into compensation
(case_id, landowner_id, market_value, compensation_amount, payment_status, payment_date, transaction_ref)
values
((select id from acquisition_cases where case_no='LA-AP-2026-001' limit 1), (select id from landowners where owner_name='Demo Owner 001' limit 1), 1200000, 1850000, 'approved', null, null),
((select id from acquisition_cases where case_no='LA-AP-2026-002' limit 1), (select id from landowners where owner_name='Demo Owner 002' limit 1), 900000, 1420000, 'pending', null, null),
((select id from acquisition_cases where case_no='LA-TS-2026-001' limit 1), (select id from landowners where owner_name='Demo Owner 004' limit 1), 2100000, 3100000, 'paid', '2026-06-01', 'DEMO-TXN-001'),
((select id from acquisition_cases where case_no='LA-KA-2026-001' limit 1), (select id from landowners where owner_name='Demo Owner 006' limit 1), 1750000, 2520000, 'paid', '2026-07-12', 'DEMO-TXN-002');

insert into grievances
(grievance_no, citizen_id, parcel_id, category, description, status, priority, assigned_to, resolution)
values
('GRV-2026-001', (select id from profiles where email='citizen@nalams.demo' limit 1), (select id from parcels where parcel_no='AP-KRI-001' limit 1), 'Compensation', 'Demo request for clarification on compensation calculation.', 'under_review', 'medium', (select id from profiles where email='collector.krishna@nalams.demo' limit 1), null),
('GRV-2026-002', (select id from profiles where email='citizen@nalams.demo' limit 1), (select id from parcels where parcel_no='AP-KRI-002' limit 1), 'Land measurement', 'Demo request to verify the recorded parcel measurement.', 'open', 'high', (select id from profiles where email='collector.krishna@nalams.demo' limit 1), null);

insert into field_tasks
(parcel_id, officer_id, task_type, description, status, priority, assigned_date, due_date, remarks)
values
((select id from parcels where parcel_no='AP-KRI-002' limit 1), (select id from profiles where email='field@nalams.demo' limit 1), 'Site Inspection', 'Verify boundary markers and current land use.', 'assigned', 'high', current_date, current_date + 5, null),
((select id from parcels where parcel_no='AP-GNT-001' limit 1), (select id from profiles where email='field@nalams.demo' limit 1), 'Survey Verification', 'Validate survey number and land extent.', 'visited', 'medium', current_date - 3, current_date + 2, 'Field visit completed; decision pending'),
((select id from parcels where parcel_no='MH-NSK-001' limit 1), (select id from profiles where email='field@nalams.demo' limit 1), 'Ownership Verification', 'Verify documents with the recorded landowner.', 'escalated', 'high', current_date - 8, current_date - 1, 'Ownership mismatch requires collector review');

insert into approvals
(case_id, approval_type, requested_by, assigned_to, status, remarks, requested_at)
values
((select id from acquisition_cases where case_no='LA-AP-2026-001' limit 1), 'Compensation Approval', (select id from profiles where email='pia@nalams.demo' limit 1), (select id from profiles where email='collector.krishna@nalams.demo' limit 1), 'pending', null, now() - interval '6 days'),
((select id from acquisition_cases where case_no='LA-AP-2026-002' limit 1), 'Valuation Approval', (select id from profiles where email='pia@nalams.demo' limit 1), (select id from profiles where email='collector.krishna@nalams.demo' limit 1), 'pending', null, now() - interval '14 days'),
((select id from acquisition_cases where case_no='LA-MH-2026-001' limit 1), 'Verification Review', (select id from profiles where email='pia@nalams.demo' limit 1), null, 'pending', null, now() - interval '22 days');
