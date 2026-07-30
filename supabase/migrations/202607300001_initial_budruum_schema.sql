create extension if not exists "pgcrypto";

create table public.organisations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  hmrc_paye_reference text,
  accounting_provider text,
  created_at timestamptz not null default now()
);

create table public.employees (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  full_name text not null,
  role_title text,
  employment_status text not null default 'active',
  tax_code text,
  national_insurance_number text,
  annual_salary numeric(12, 2),
  created_at timestamptz not null default now()
);

create table public.payroll_runs (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  period_label text not null,
  status text not null default 'draft',
  gross_total numeric(12, 2) not null default 0,
  net_total numeric(12, 2) not null default 0,
  hmrc_liability numeric(12, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table public.payroll_run_items (
  id uuid primary key default gen_random_uuid(),
  payroll_run_id uuid not null references public.payroll_runs(id) on delete cascade,
  employee_id uuid not null references public.employees(id) on delete cascade,
  gross_pay numeric(12, 2) not null default 0,
  net_pay numeric(12, 2) not null default 0,
  flags text[] not null default '{}'
);

create table public.compliance_documents (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  title text not null,
  document_type text not null,
  version text,
  status text not null default 'draft',
  due_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.training_courses (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  title text not null,
  mandatory boolean not null default false,
  renewal_months integer,
  created_at timestamptz not null default now()
);

create table public.training_assignments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.training_courses(id) on delete cascade,
  employee_id uuid not null references public.employees(id) on delete cascade,
  status text not null default 'assigned',
  due_at timestamptz,
  completed_at timestamptz
);

create table public.timesheets (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid not null references public.organisations(id) on delete cascade,
  employee_id uuid not null references public.employees(id) on delete cascade,
  work_date date not null,
  hours numeric(5, 2) not null default 0,
  status text not null default 'draft',
  source text not null default 'manual'
);

create table public.bureau_clients (
  id uuid primary key default gen_random_uuid(),
  bureau_organisation_id uuid not null references public.organisations(id) on delete cascade,
  client_organisation_id uuid not null references public.organisations(id) on delete cascade,
  status text not null default 'active',
  created_at timestamptz not null default now()
);
