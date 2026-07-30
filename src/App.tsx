import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  Banknote,
  Bell,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleX,
  CircleDollarSign,
  Clock3,
  Command,
  FileCheck2,
  FileText,
  Fingerprint,
  Gauge,
  GraduationCap,
  Landmark,
  LayoutDashboard,
  MapPin,
  MessageSquareText,
  ReceiptText,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  WalletCards,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import './App.css'

type ModuleKey = 'control' | 'people' | 'time' | 'compliance' | 'accounts' | 'bureau'
type DrawerData = {
  title: string
  kicker: string
  body: string
  items: string[]
  action: string
}

const modules: Array<{
  key: ModuleKey
  label: string
  icon: typeof LayoutDashboard
  note: string
}> = [
  { key: 'control', label: 'Payroll Control', icon: Gauge, note: 'End-to-end monthly run' },
  { key: 'people', label: 'People OS', icon: Users, note: 'HR records and documents' },
  { key: 'time', label: 'Time + Location', icon: Clock3, note: 'Rota, geofence, attendance' },
  { key: 'compliance', label: 'Compliance Hub', icon: ShieldCheck, note: 'Documents, training, HMRC' },
  { key: 'accounts', label: 'Accounting', icon: ReceiptText, note: 'Journals and liabilities' },
  { key: 'bureau', label: 'Bureau Portal', icon: Building2, note: 'Multi-client operations' },
]

const payrollSteps = [
  { label: 'People changes', value: '12 ready', state: 'complete' },
  { label: 'Time approved', value: '96.4%', state: 'complete' },
  { label: 'Payroll calc', value: 'Reviewing', state: 'active' },
  { label: 'HMRC FPS', value: 'Queued', state: 'waiting' },
  { label: 'Pay + post', value: 'Locked', state: 'waiting' },
]

const employees = [
  { name: 'Amara Cole', role: 'Operations Lead', gross: '3,850.00', net: '2,891.44', flag: 'Bonus variance' },
  { name: 'Kyle Welding', role: 'Field Technician', gross: '2,740.00', net: '2,109.16', flag: 'Overtime approved' },
  { name: 'Teni Adebayo', role: 'Customer Success', gross: '3,120.00', net: '2,365.72', flag: 'No issue' },
  { name: 'Ellis Daniel', role: 'Accountant', gross: '4,450.00', net: '3,287.90', flag: 'Tax code changed' },
]

const bureauClients = [
  ['Aster Foods', 'FPS due today', 'Ready', '96 employees'],
  ['Northline Care', 'Awaiting approval', 'Client', '42 employees'],
  ['Juno Retail', 'Timesheets missing', 'Risk', '18 employees'],
  ['Hale Studios', 'PAYE payment due', 'Action', '11 employees'],
]

function App() {
  const [active, setActive] = useState<ModuleKey>('control')
  const [surface, setSurface] = useState<'site' | 'app'>('site')
  const [drawer, setDrawer] = useState<DrawerData | null>(null)
  const ActiveIcon = useMemo(() => modules.find((item) => item.key === active)?.icon ?? Gauge, [active])
  const openDrawer = (data: DrawerData) => setDrawer(data)

  if (surface === 'site') {
    return <MarketingSite onOpenApp={() => setSurface('app')} />
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark">
            <Fingerprint size={22} />
          </div>
          <div>
            <strong>budruumOS</strong>
            <span>HR, payroll and compliance</span>
          </div>
        </div>

        <button className="surface-switch" type="button" onClick={() => setSurface('site')}>
          View website
        </button>

        <nav className="module-nav" aria-label="Product modules">
          {modules.map((item) => {
            const Icon = item.icon
            return (
              <button
                className={active === item.key ? 'module-button active' : 'module-button'}
                key={item.key}
                onClick={() => setActive(item.key)}
                type="button"
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {active === item.key && <motion.i layoutId="nav-dot" />}
              </button>
            )
          })}
        </nav>

        <div className="ai-brief">
          <Sparkles size={18} />
          <p>AI detected 3 payroll anomalies before HMRC submission.</p>
          <button type="button" onClick={() => openDrawer(drawerContent.anomalies)}>Review</button>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="search-box">
            <Search size={17} />
            <span>Search employee, FPS, payslip, client, document...</span>
            <kbd><Command size={12} /> K</kbd>
          </div>
          <div className="topbar-actions">
            <button type="button" aria-label="Messages"><MessageSquareText size={18} /></button>
            <button type="button" aria-label="Notifications"><Bell size={18} /></button>
          </div>
        </header>

        <section className="hero-band">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className="eyebrow"><ActiveIcon size={15} /> July 2026 payroll workspace</span>
            <h1>Payroll control room</h1>
            <p>People changes, timesheets, PAYE, payments and accounting journals are ready for review.</p>
          </motion.div>
          <div className="metric-strip">
            <Metric label="Payroll value" value="£184,920" tone="blue" />
            <Metric label="HMRC liability" value="£38,244" tone="rose" />
            <Metric label="Net pay batch" value="£126,706" tone="green" />
          </div>
        </section>

        <div className="ecosystem-switcher" aria-label="Ecosystem switcher">
          {modules.map((item) => (
            <button
              key={item.key}
              className={active === item.key ? 'switch-pill active' : 'switch-pill'}
              onClick={() => setActive(item.key)}
              type="button"
            >
              <span className="switch-icon"><item.icon size={15} /></span>
              <span>{item.label}</span>
              {active === item.key && <motion.i layoutId="switch-active" />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.section
            key={active}
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: 0.32 }}
            className="content-grid"
          >
            {active === 'control' && <ControlRoom openDrawer={openDrawer} />}
            {active === 'people' && <PeopleOS openDrawer={openDrawer} />}
            {active === 'time' && <TimeLocation openDrawer={openDrawer} />}
            {active === 'compliance' && <Compliance openDrawer={openDrawer} />}
            {active === 'accounts' && <Accounting openDrawer={openDrawer} />}
            {active === 'bureau' && <Bureau openDrawer={openDrawer} />}
          </motion.section>
        </AnimatePresence>
      </section>
      <DetailDrawer data={drawer} onClose={() => setDrawer(null)} />
    </main>
  )
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <motion.div className={`metric ${tone}`} whileHover={{ y: -3 }}>
      <span>{label}</span>
      <strong>{value}</strong>
    </motion.div>
  )
}

function MarketingSite({ onOpenApp }: { onOpenApp: () => void }) {
  return (
    <main className="site-shell">
      <header className="site-nav">
        <div className="site-brand">
          <div className="brand-mark"><Fingerprint size={22} /></div>
          <strong>budruumOS</strong>
        </div>
        <nav>
          <a href="#platform">Platform</a>
          <a href="#compliance">Compliance</a>
          <a href="#accountants">Accountants</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <button className="site-nav-cta" type="button" onClick={onOpenApp}>Open dashboard</button>
      </header>

      <section className="site-hero">
        <div className="site-hero-copy">
          <span className="eyebrow"><Sparkles size={15} /> Payroll, HR and compliance</span>
          <h1>One place to run the business side of employing people.</h1>
          <p>
            Payroll runs, employee records, compliance documents, training, HMRC duties and
            accounting journals, connected for small businesses and accountants.
          </p>
          <div className="site-cta-row">
            <button className="primary-action" type="button" onClick={onOpenApp}>Explore dashboard</button>
            <a href="#platform">See modules</a>
          </div>
        </div>
        <motion.div className="site-product-card" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mini-topbar">
            <span />
            <span />
            <span />
          </div>
          <div className="mini-control">
            <strong>July payroll ready</strong>
            <em>4 checks remaining</em>
          </div>
          <div className="mini-flow">
            {['HR', 'Time', 'PAYE', 'Pay', 'Post'].map((item, index) => (
              <span className={index < 3 ? 'done' : ''} key={item}>{item}</span>
            ))}
          </div>
          <div className="mini-ledger">
            <span>HMRC liability <b>£38,244</b></span>
            <span>Net pay batch <b>£126,706</b></span>
            <span>Journal status <b>Ready</b></span>
          </div>
        </motion.div>
      </section>

      <section className="site-switcher">
        {['Payroll', 'HR', 'Compliance docs', 'Training', 'HMRC', 'Accounting'].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </section>

      <section className="site-section" id="platform">
        <div className="section-title">
          <span className="eyebrow">Platform</span>
          <h2>Every people action flows into payroll and compliance.</h2>
        </div>
        <div className="site-feature-grid">
          <Feature icon={Users} title="People OS" copy="Employee records, contracts, right-to-work, onboarding and payroll setup as one source of truth." />
          <Feature icon={Clock3} title="Time and rota" copy="Shifts, timesheets, overtime, absence and geofence attendance ready for payroll approval." />
          <Feature icon={ShieldCheck} title="Compliance hub" copy="Policies, acknowledgements, training certificates, audit trails and employment evidence." />
          <Feature icon={Landmark} title="HMRC PAYE" copy="FPS, EPS, PAYE liabilities, payment reminders and year-end payroll duties in one workflow." />
          <Feature icon={ReceiptText} title="Accounting" copy="Payroll journals, PAYE liabilities, pension liabilities, cost centres and bank matching." />
          <Feature icon={Building2} title="Bureau portal" copy="Client approvals, deadline board, evidence sharing and multi-company accountant operations." />
        </div>
      </section>

      <section className="site-band" id="compliance">
        <div>
          <span className="eyebrow">Compliance documents + training</span>
          <h2>Compliance is not a folder. It is a live evidence system.</h2>
          <p>Policies, signed acknowledgements, mandatory courses, certificates and renewal deadlines sit together so employers can prove what happened, when, and who approved it.</p>
        </div>
        <div className="evidence-stack">
          <span><FileCheck2 size={18} /> Handbook v4 acknowledged by 94%</span>
          <span><GraduationCap size={18} /> Health & safety training: 11 overdue</span>
          <span><ShieldCheck size={18} /> Right-to-work evidence: 2 expiring</span>
        </div>
      </section>

      <section className="site-section" id="accountants">
        <div className="section-title">
          <span className="eyebrow">For accountants</span>
          <h2>A bureau command centre for every client payroll.</h2>
        </div>
        <div className="accountant-board">
          {bureauClients.map(([name, status, type, size]) => (
            <div key={name}>
              <strong>{name}</strong>
              <span>{status}</span>
              <em>{type}</em>
              <small>{size}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="site-final" id="pricing">
        <h2>Start with the dashboard prototype. Then wire the real engine.</h2>
        <p>Local frontend first. Supabase schema second. GitHub third. Vercel only when the product shape is worth shipping.</p>
        <button className="primary-action" type="button" onClick={onOpenApp}>Open dashboard</button>
      </section>
    </main>
  )
}

function Feature({ icon: Icon, title, copy }: { icon: typeof Activity; title: string; copy: string }) {
  return (
    <motion.article className="site-feature" whileHover={{ y: -5 }}>
      <Icon size={22} />
      <h3>{title}</h3>
      <p>{copy}</p>
    </motion.article>
  )
}

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <article className={`panel ${className}`}>{children}</article>
}

const drawerContent = {
  anomalies: {
    kicker: 'Pre-run review',
    title: 'Payroll anomalies',
    body: 'These checks should be cleared before payslips, FPS submission and payment approvals are released.',
    items: ['Kyle Welding has overtime 42% above last month', 'Ellis Daniel imported a new tax code from HMRC', 'Amara Cole has a bonus variance over the approval threshold'],
    action: 'Clear checks',
  },
  approveRun: {
    kicker: 'Payroll approval',
    title: 'Approve July payroll run',
    body: 'Approval locks gross-to-net results and enables HMRC FPS preparation, BACS release and accounting journal posting.',
    items: ['128 employees included', '4 payslips held for review', 'PAYE liability calculated at £38,244'],
    action: 'Approve and lock',
  },
  hmrc: {
    kicker: 'HMRC workflow',
    title: 'Submit FPS and initiate PAYE payment',
    body: 'The platform guides the employer through RTI submission, liability confirmation and HMRC payment initiation from the same monthly run.',
    items: ['FPS draft ready', 'EPS not required this month', 'PAYE payment due 22 Aug 2026'],
    action: 'Prepare submission',
  },
  training: {
    kicker: 'Training compliance',
    title: 'Mandatory training tracker',
    body: 'Training belongs in Compliance Hub because certificates, deadlines and policy acknowledgements become legal evidence.',
    items: ['Health & safety: 11 overdue', 'GDPR refresher: due in 14 days', 'Fire safety certificates: 92% complete'],
    action: 'Assign refresher',
  },
  journal: {
    kicker: 'Accounting close',
    title: 'Payroll journal preview',
    body: 'This turns the payroll run into accounting entries with liabilities and cost centres prepared for Sage/Xero-style posting.',
    items: ['Debit wages expense £184,920', 'Credit PAYE liability £24,806', 'Credit net wages payable £126,706'],
    action: 'Post journal',
  },
  client: {
    kicker: 'Bureau operations',
    title: 'Client payroll room',
    body: 'Accountants need one place to chase approvals, review exceptions and send client-facing evidence without exporting files.',
    items: ['8 client approvals waiting', '3 risk alerts need review', '14 open client queries'],
    action: 'Open client room',
  },
} satisfies Record<string, DrawerData>

function ControlRoom({ openDrawer }: { openDrawer: (data: DrawerData) => void }) {
  return (
    <>
      <Panel className="wide">
        <div className="panel-head">
          <div>
            <span className="section-kicker">July payroll run</span>
            <h2>Control room</h2>
          </div>
          <button className="primary-action" type="button" onClick={() => openDrawer(drawerContent.approveRun)}>Approve run <ChevronRight size={17} /></button>
        </div>
        <div className="pipeline">
          {payrollSteps.map((step, index) => (
            <motion.div
              className={`pipeline-step ${step.state}`}
              key={step.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.07 }}
            >
              <span>{index + 1}</span>
              <div>
                <strong>{step.label}</strong>
                <small>{step.value}</small>
              </div>
            </motion.div>
          ))}
        </div>
        <EmployeeTable openDrawer={openDrawer} />
      </Panel>
      <Panel>
        <h2>Smart checks</h2>
        <ul className="check-list">
          <li><button type="button" onClick={() => openDrawer(drawerContent.anomalies)}><ShieldCheck size={18} /> Tax code K475X requires approval</button></li>
          <li><button type="button" onClick={() => openDrawer(drawerContent.anomalies)}><Activity size={18} /> Overtime 42% above last month</button></li>
          <li><button type="button" onClick={() => openDrawer(drawerContent.approveRun)}><FileCheck2 size={18} /> 4 payslips ready to release</button></li>
        </ul>
      </Panel>
      <Panel className="pay-stack">
        <h2>One-click close</h2>
        <ActionRow icon={Landmark} label="Submit FPS to HMRC" value="OAuth ready" onClick={() => openDrawer(drawerContent.hmrc)} />
        <ActionRow icon={WalletCards} label="Initiate PAYE payment" value="£38,244" onClick={() => openDrawer(drawerContent.hmrc)} />
        <ActionRow icon={Banknote} label="Release BACS batch" value="£126,706" onClick={() => openDrawer(drawerContent.approveRun)} />
        <ActionRow icon={ReceiptText} label="Post journal" value="Sage/Xero style" onClick={() => openDrawer(drawerContent.journal)} />
      </Panel>
    </>
  )
}

function EmployeeTable({ openDrawer }: { openDrawer: (data: DrawerData) => void }) {
  return (
    <div className="data-table">
      {employees.map((person) => (
        <button
          className="data-row"
          key={person.name}
          type="button"
          onClick={() => openDrawer({
            kicker: 'Employee payroll detail',
            title: person.name,
            body: `${person.role} payroll record for the July 2026 run, including gross pay, net pay, anomalies and audit evidence.`,
            items: [`Gross pay £${person.gross}`, `Net pay £${person.net}`, person.flag],
            action: 'Open employee record',
          })}
        >
          <div>
            <strong>{person.name}</strong>
            <span>{person.role}</span>
          </div>
          <span>£{person.gross}</span>
          <span>£{person.net}</span>
          <em>{person.flag}</em>
        </button>
      ))}
    </div>
  )
}

function PeopleOS({ openDrawer }: { openDrawer: (data: DrawerData) => void }) {
  return (
    <>
      <Panel className="wide profile-panel">
        <div className="employee-card">
          <div className="avatar">AC</div>
          <div>
            <span className="section-kicker">Employee source of truth</span>
            <h2>Amara Cole</h2>
            <p>Contract, bank details, right-to-work, tax setup, pension and leave history all feed payroll automatically.</p>
          </div>
        </div>
        <div className="profile-grid">
          <ActionRow icon={FileText} label="Contract signed" value="Version 3" onClick={() => openDrawer(drawerContent.training)} />
          <ActionRow icon={ShieldCheck} label="Right-to-work" value="Valid until 2028" onClick={() => openDrawer(drawerContent.training)} />
          <ActionRow icon={CircleDollarSign} label="Salary change" value="Pending approval" onClick={() => openDrawer(drawerContent.approveRun)} />
          <ActionRow icon={CalendarDays} label="Maternity leave" value="Payroll impact ready" onClick={() => openDrawer(drawerContent.approveRun)} />
        </div>
      </Panel>
      <Panel>
        <h2>Employee documents</h2>
        <div className="doc-stack">
          <span>Contract and offer letter <b>Signed</b></span>
          <span>Bank and tax details <b>Complete</b></span>
          <span>Personal document requests <b>2</b></span>
        </div>
      </Panel>
      <Panel>
        <h2>Onboarding flow</h2>
        <div className="flow-map">
          {['Offer', 'Contract', 'PAYE', 'Pension', 'First payroll'].map((item) => <span key={item}>{item}</span>)}
        </div>
      </Panel>
    </>
  )
}

function TimeLocation({ openDrawer }: { openDrawer: (data: DrawerData) => void }) {
  return (
    <>
      <Panel className="wide schedule-panel">
        <div className="panel-head">
          <div>
            <span className="section-kicker">Rota, shifts and timesheets</span>
            <h2>Approved hours become payroll inputs</h2>
          </div>
          <button
            className="ghost-action"
            type="button"
            onClick={() => openDrawer({
              kicker: 'Time and location controls',
              title: 'Geofence attendance',
              body: 'Location tracking should be policy-controlled and only active during shifts, with manager approval and auditable employee consent.',
              items: ['2 active sites', 'QR fallback enabled', '5-minute rounding rule active'],
              action: 'Configure geofence',
            })}
          ><MapPin size={16} /> View map</button>
        </div>
        <div className="rota-grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, index) => (
            <motion.div className="shift-cell" key={day} whileHover={{ scale: 1.03 }}>
              <strong>{day}</strong>
              <span>{index % 2 ? '09:00-17:30' : '08:00-16:00'}</span>
              <em>{index === 2 ? 'Overtime' : 'Approved'}</em>
            </motion.div>
          ))}
        </div>
      </Panel>
      <Panel className="map-panel">
        <h2>Geofence policy</h2>
        <div className="map-visual">
          <span className="pin one" />
          <span className="pin two" />
          <span className="radius" />
        </div>
        <p>Location capture is approval-based, time-limited and auditable.</p>
      </Panel>
      <Panel>
        <h2>Timesheet rules</h2>
        <ActionRow icon={Check} label="Auto-rounding" value="5 min" />
        <ActionRow icon={Clock3} label="Late start alerts" value="On" />
        <ActionRow icon={Activity} label="Payroll exceptions" value="3" />
      </Panel>
    </>
  )
}

function Compliance({ openDrawer }: { openDrawer: (data: DrawerData) => void }) {
  return (
    <>
      <Panel className="wide">
        <div className="panel-head">
          <div>
            <span className="section-kicker">Compliance operating system</span>
            <h2>Company policies, mandatory training, HMRC duties and evidence in one hub</h2>
          </div>
          <button className="primary-action" type="button" onClick={() => openDrawer(drawerContent.training)}>Publish policy</button>
        </div>
        <div className="compliance-board">
          <motion.button type="button" whileHover={{ y: -4 }} onClick={() => openDrawer(drawerContent.training)}>
            <FileCheck2 size={22} />
            <strong>Compliance documents</strong>
            <span>Handbook, policies, contracts, right-to-work evidence and signed acknowledgements.</span>
            <em>94% acknowledged</em>
          </motion.button>
          <motion.button type="button" whileHover={{ y: -4 }} onClick={() => openDrawer(drawerContent.training)}>
            <GraduationCap size={22} />
            <strong>Training</strong>
            <span>Mandatory courses, refreshers, certificates, manager assignments and overdue alerts.</span>
            <em>11 overdue</em>
          </motion.button>
          <motion.button type="button" whileHover={{ y: -4 }} onClick={() => openDrawer(drawerContent.hmrc)}>
            <Landmark size={22} />
            <strong>HMRC and payroll duties</strong>
            <span>FPS, EPS, PAYE payment reminders, pension duties and year-end evidence.</span>
            <em>FPS draft ready</em>
          </motion.button>
        </div>
      </Panel>
      <Panel>
        <h2>Compliance calendar</h2>
        <ActionRow icon={CalendarDays} label="RTI deadline" value="31 Jul" />
        <ActionRow icon={WalletCards} label="PAYE payment" value="22 Aug" />
        <ActionRow icon={FileText} label="Handbook review" value="7 Aug" />
        <ActionRow icon={GraduationCap} label="Health & safety training" value="11 overdue" />
      </Panel>
      <Panel>
        <h2>Evidence trail</h2>
        <ul className="timeline">
          <li>Policy v4 issued to all employees</li>
          <li>Training reminder sent to field team</li>
          <li>FPS recalculated after overtime update</li>
        </ul>
      </Panel>
    </>
  )
}

function Accounting({ openDrawer }: { openDrawer: (data: DrawerData) => void }) {
  return (
    <>
      <Panel className="wide">
        <div className="panel-head">
          <div>
            <span className="section-kicker">Sage/Xero-style accounting layer</span>
            <h2>Payroll journals without spreadsheet exports</h2>
          </div>
          <button className="primary-action" type="button" onClick={() => openDrawer(drawerContent.journal)}>Post journal</button>
        </div>
        <div className="journal">
          {[
            ['Wages expense', 'Debit', '£184,920'],
            ['PAYE liability', 'Credit', '£24,806'],
            ['Pension liability', 'Credit', '£11,933'],
            ['Net wages payable', 'Credit', '£126,706'],
          ].map(([account, type, amount]) => (
            <div key={account}>
              <span>{account}</span>
              <em>{type}</em>
              <strong>{amount}</strong>
            </div>
          ))}
        </div>
      </Panel>
      <Panel>
        <h2>Cost centres</h2>
        <div className="bars">
          <span style={{ '--w': '82%' } as React.CSSProperties}>Operations</span>
          <span style={{ '--w': '64%' } as React.CSSProperties}>Sales</span>
          <span style={{ '--w': '48%' } as React.CSSProperties}>Admin</span>
        </div>
      </Panel>
      <Panel>
        <h2>Bank matching</h2>
        <ActionRow icon={Banknote} label="Net wages batch" value="Matched" />
        <ActionRow icon={Landmark} label="HMRC payment" value="Scheduled" />
        <ActionRow icon={ReceiptText} label="Pension direct debit" value="Expected" />
      </Panel>
    </>
  )
}

function Bureau({ openDrawer }: { openDrawer: (data: DrawerData) => void }) {
  return (
    <>
      <Panel className="wide">
        <div className="panel-head">
          <div>
            <span className="section-kicker">Accountant command centre</span>
            <h2>Manage every client payroll from one risk board</h2>
          </div>
          <button className="primary-action" type="button" onClick={() => openDrawer(drawerContent.client)}>Open client room</button>
        </div>
        <div className="client-board">
          {bureauClients.map(([name, status, type, size]) => (
            <motion.button className="client-row" key={name} whileHover={{ x: 6 }} type="button" onClick={() => openDrawer(drawerContent.client)}>
              <strong>{name}</strong>
              <span>{status}</span>
              <em>{type}</em>
              <small>{size}</small>
            </motion.button>
          ))}
        </div>
      </Panel>
      <Panel>
        <h2>Client approvals</h2>
        <ActionRow icon={FileCheck2} label="Payroll sign-offs" value="8 waiting" />
        <ActionRow icon={MessageSquareText} label="Open queries" value="14" />
        <ActionRow icon={ShieldCheck} label="Risk alerts" value="3" />
      </Panel>
      <Panel>
        <h2>White-label ops</h2>
        <p className="plain-copy">Branded client portals, shared evidence, locked audit trails and accountant notes.</p>
      </Panel>
    </>
  )
}

function ActionRow({ icon: Icon, label, value, onClick }: { icon: typeof Activity; label: string; value: string; onClick?: () => void }) {
  const content = (
    <>
      <Icon size={18} />
      <span>{label}</span>
      <strong>{value}</strong>
    </>
  )

  if (onClick) {
    return <button className="action-row action-button" type="button" onClick={onClick}>{content}</button>
  }

  return (
    <div className="action-row">
      {content}
    </div>
  )
}

function DetailDrawer({ data, onClose }: { data: DrawerData | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {data && (
        <>
          <motion.button
            className="drawer-scrim"
            type="button"
            aria-label="Close detail drawer"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="detail-drawer"
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 420, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          >
            <button className="drawer-close" type="button" onClick={onClose} aria-label="Close">
              <CircleX size={19} />
            </button>
            <span className="section-kicker">{data.kicker}</span>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
            <div className="drawer-list">
              {data.items.map((item) => <span key={item}>{item}</span>)}
            </div>
            <button className="primary-action drawer-action" type="button">{data.action}</button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default App
