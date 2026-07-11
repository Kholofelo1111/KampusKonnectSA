CREATE TABLE IF NOT EXISTS link_registry (
  id serial PRIMARY KEY,
  key text NOT NULL UNIQUE,
  label text NOT NULL,
  category text NOT NULL,
  url text NOT NULL,
  expected_domain text,
  last_checked_at timestamp,
  last_status_code integer,
  is_healthy boolean NOT NULL DEFAULT true,
  last_error text,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

-- Seeded with the links found broken/wrong-domain this session, so the
-- daily check covers the highest-risk ones from day one. Add the rest of
-- your opportunity URLs here over time via /api/admin/links.
INSERT INTO link_registry (key, label, category, url, expected_domain) VALUES
  ('job:op-sandf-001', 'SANDF MSDS Application Form', 'job', 'https://defenceweb.co.za/wp-content/uploads/sa-defence/sa-defence/SANDF_MSDS_Application_2026_27.pdf', 'defenceweb.co.za'),
  ('bursary:op-burs-005', 'Allan Gray Orbis Foundation Fellowship', 'bursary', 'https://allangrayorbis.org/programmes/fellowship/', 'allangrayorbis.org'),
  ('bursary:motsepe', 'Motsepe Foundation Bursary', 'bursary', 'https://www.motsepefoundation.org/2026-bursary-applications', 'motsepefoundation.org'),
  ('job:op-saps-001', 'SAPS Recruitment', 'job', 'https://www.saps.gov.za/careers/careers.php', 'saps.gov.za'),
  ('learnership:mict', 'MICT SETA Learnerships', 'learnership', 'https://www.mict.org.za/learnerships/', 'mict.org.za'),
  ('learnership:servicesseta', 'ServiceSETA', 'learnership', 'https://www.servicesseta.org.za/', 'servicesseta.org.za'),
  ('job:shoprite', 'Shoprite Holdings Careers', 'job', 'https://www.shopriteholdings.co.za/careers.html', 'shopriteholdings.co.za'),
  ('job:pnp', 'Pick n Pay Careers', 'job', 'https://picknpay.wd3.myworkdayjobs.com/PNP_Careers', 'myworkdayjobs.com'),
  ('job:fidelity', 'Fidelity Services Group Careers', 'job', 'https://fidelityservicesgroup.simplify.hr/', 'simplify.hr'),
  ('job:bidvest', 'Bidvest Facilities Management Careers', 'job', 'https://bidvestfacilitiesmanagement.co.za/careers/', 'bidvestfacilitiesmanagement.co.za'),
  ('job:health', 'Department of Health Vacancies', 'job', 'https://www.health.gov.za/vacancies/', 'health.gov.za'),
  ('job:tshwane', 'City of Tshwane Careers', 'job', 'https://careers.tshwane.gov.za/', 'tshwane.gov.za'),
  ('job:valterra', 'Valterra Platinum Careers', 'job', 'https://www.valterraplatinum.com/careers', 'valterraplatinum.com')
ON CONFLICT (key) DO NOTHING;
