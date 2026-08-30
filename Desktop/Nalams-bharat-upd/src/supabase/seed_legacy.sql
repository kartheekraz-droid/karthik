-- Synthetic demo data only. No record below represents a real person or case.
truncate table public.documents, public.grievances, public.compensation, public.field_tasks,
  public.approval_queue, public.parcels, public.landowners, public.projects,
  public.district_metrics, public.state_metrics restart identity cascade;

insert into public.state_metrics
(state, integration, active_projects, acres_cleared_q3, avg_days, dispute_rate, budget_utilization, grade, lat, lng) values
('Karnataka','Connected',41,6200,38,4.1,97.2,'A',15.3173,75.7139),
('Andhra Pradesh','Connected',33,5100,44,6.0,92.5,'A',15.9129,79.7400),
('Telangana','Connected',29,4300,47,7.2,88.0,'B',18.1124,79.0193),
('Maharashtra','Connected',52,4800,61,9.8,72.0,'B',19.7515,75.7139),
('Uttar Pradesh','In Progress',60,3900,70,12.4,58.0,'C',26.8467,80.9462),
('West Bengal','In Progress',24,2100,78,14.9,51.0,'C',22.9868,87.8550),
('Bihar','Not Started',18,900,96,18.6,40.0,'D',25.0961,85.3131);

insert into public.district_metrics
(state, district, active_projects, acres_cleared_q3, avg_days, dispute_rate, budget_utilization, grade, lat, lng) values
('Maharashtra','Pune',12,1450,41,5.2,94.0,'A',18.5204,73.8567),
('Maharashtra','Nagpur',9,980,52,8.1,81.0,'B',21.1458,79.0882),
('Maharashtra','Nashik',7,640,58,10.4,69.0,'B',19.9975,73.7898),
('Maharashtra','Aurangabad',6,410,74,15.0,52.0,'C',19.8762,75.3433);

insert into public.projects
(id,name,state,district,implementing_agency,parcels,acquired,pending,status,budget_inr_crore) values
('PRJ-NH48','NH-48 widening','Maharashtra','Pune','National Highways Demo Authority',47,30,17,'On Track',680.00),
('PRJ-METRO2','Hyderabad Metro Phase 2','Telangana','Hyderabad','Metro Demo Corporation',122,95,27,'On Track',2450.00),
('PRJ-CANAL','Irrigation canal extension','Maharashtra','Nashik','Water Resources Demo Agency',33,12,21,'Delayed',410.00),
('PRJ-RING','Smart city ring road','Maharashtra','Nagpur','Urban Infra Demo Agency',58,14,44,'Critical',925.00);

insert into public.landowners (id,name,phone,village,district,state) values
('OWN-001','Suresh Patil','+91-9000000001','Wadgaon','Pune','Maharashtra'),
('OWN-002','Anita Deshmukh','+91-9000000002','Wadgaon','Pune','Maharashtra'),
('OWN-003','Ramesh Kale','+91-9000000003','Sinnar','Nashik','Maharashtra'),
('OWN-004','Fatima Sheikh','+91-9000000004','Hadapsar','Pune','Maharashtra');

insert into public.parcels
(id,survey_no,village,district,state,project_id,landowner_id,area_ha,lat,lng,status,stage) values
('PAR-112','Gat 112','Wadgaon','Pune','Maharashtra','PRJ-NH48','OWN-001',1.24,18.565,73.790,'Dispute Raised','Objection window'),
('PAR-204','Gat 204','Wadgaon','Pune','Maharashtra','PRJ-NH48','OWN-002',0.88,18.570,73.800,'Compensation Calculated','Compensation award'),
('PAR-041','Gat 41','Sinnar','Nashik','Maharashtra','PRJ-CANAL','OWN-003',2.15,19.850,74.000,'Under Survey','Survey complete'),
('PAR-077','Gat 77','Hadapsar','Pune','Maharashtra','PRJ-NH48','OWN-004',0.62,18.508,73.925,'Payment Released','Payment released'),
('PAR-088','Gat 88','Bhugaon','Pune','Maharashtra','PRJ-RING',null,3.45,18.501,73.750,'Under Survey','SIA pending');

insert into public.approval_queue (parcel_id,stage,days_pending,risk_score,status) values
('PAR-112','Objection window',14,8,'Pending'),
('PAR-204','Compensation award',6,3,'Pending'),
('PAR-088','SIA pending',22,9,'Escalated'),
('PAR-041','Survey complete',2,2,'Pending');

insert into public.field_tasks (parcel_id,status,notes) values
('PAR-112','Escalated','Boundary/ownership objection requires collector review.'),
('PAR-088','Pending Visit','Verify boundary markers and land classification.'),
('PAR-041','Visited — Awaiting Decision','Inspection completed; documents uploaded.');

insert into public.compensation
(parcel_id,market_value_inr,multiplier,solatium_inr,total_award_inr,payment_status,payment_date) values
('PAR-204',4200000,2.00,4200000,12600000,'Approved',null),
('PAR-077',3500000,2.00,3500000,10500000,'Released','2026-08-12');
