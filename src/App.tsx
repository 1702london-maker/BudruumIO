import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from 'framer-motion'
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
  TrendingUp,
  Users,
  WalletCards,
  Zap,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import './App.css'

type ModuleKey = 'control' | 'people' | 'time' | 'compliance' | 'accounts' | 'bureau'
type DrawerData = {
  title: string
  kicker: string
  body: string
  items: string[]
  action: string
}

const modules: Array<{ key: ModuleKey; label: string; icon: typeof LayoutDashboard; note: string }> = [
  { key: 'control',    label: 'Payroll Control', icon: Gauge,       note: 'End-to-end monthly run' },
  { key: 'people',     label: 'People OS',        icon: Users,       note: 'HR records and documents' },
  { key: 'time',       label: 'Time + Location',  icon: Clock3,      note: 'Rota, geofence, attendance' },
  { key: 'compliance', label: 'Compliance Hub',   icon: ShieldCheck, note: 'Documents, training, HMRC' },
  { key: 'accounts',   label: 'Accounting',       icon: ReceiptText, note: 'Journals and liabilities' },
  { key: 'bureau',     label: 'Bureau Portal',    icon: Building2,   note: 'Multi-client operations' },
]

const payrollSteps = [
  { label: 'People changes', value: '12 ready',  state: 'complete' },
  { label: 'Time approved',  value: '96.4%',     state: 'complete' },
  { label: 'Payroll calc',   value: 'Reviewing', state: 'active' },
  { label: 'HMRC FPS',       value: 'Queued',    state: 'waiting' },
  { label: 'Pay + post',     value: 'Locked',    state: 'waiting' },
]

const employees = [
  { name: 'Amara Cole',    role: 'Operations Lead',   gross: '3,850.00', net: '2,891.44', flag: 'Bonus variance' },
  { name: 'Kyle Welding',  role: 'Field Technician',  gross: '2,740.00', net: '2,109.16', flag: 'Overtime approved' },
  { name: 'Teni Adebayo',  role: 'Customer Success',  gross: '3,120.00', net: '2,365.72', flag: 'No issue' },
  { name: 'Ellis Daniel',  role: 'Accountant',        gross: '4,450.00', net: '3,287.90', flag: 'Tax code changed' },
]

const bureauClients = [
  ['Aster Foods',    'FPS due today',       'Ready',  '96 employees'],
  ['Northline Care', 'Awaiting approval',   'Client', '42 employees'],
  ['Juno Retail',    'Timesheets missing',  'Risk',   '18 employees'],
  ['Hale Studios',   'PAYE payment due',    'Action', '11 employees'],
]

/* ─── Animated counter ─────────────────────────────────────── */
function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { damping: 22, stiffness: 80 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (inView) mv.set(value)
  }, [inView, mv, value])

  useEffect(() => spring.on('change', v => setDisplay(Math.round(v).toLocaleString())), [spring])

  return <span ref={ref}>{prefix}{display}{suffix}</span>
}

/* ─── Floating orb ─────────────────────────────────────────── */
function Orb({ className }: { className: string }) {
  return <div className={`orb ${className}`} aria-hidden />
}

/* ─── App Shell ────────────────────────────────────────────── */
function App() {
  const [active, setActive] = useState<ModuleKey>('control')
  const [surface, setSurface] = useState<'site' | 'app'>('site')
  const [drawer, setDrawer] = useState<DrawerData | null>(null)

  const ActiveIcon = modules.find(m => m.key === active)?.icon ?? Gauge
  const openDrawer = (data: DrawerData) => setDrawer(data)

  if (surface === 'site') return <MarketingSite onOpenApp={() => setSurface('app')} />

  return (
    <main className="app-shell">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="brand-lockup">
          <motion.div className="brand-mark" whileHover={{ scale: 1.08, rotate: 3 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Fingerprint size={22} />
          </motion.div>
          <div>
            <strong>budruumOS</strong>
            <span>HR, payroll and compliance</span>
          </div>
        </div>

        <button className="surface-switch" type="button" onClick={() => setSurface('site')}>← View website</button>

        <nav className="module-nav" aria-label="Product modules">
          {modules.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.button
                className={active === item.key ? 'module-button active' : 'module-button'}
                key={item.key}
                onClick={() => setActive(item.key)}
                type="button"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.055, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: 3 }}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {active === item.key && <motion.i layoutId="nav-dot" transition={{ type: 'spring', stiffness: 340, damping: 28 }} />}
              </motion.button>
            )
          })}
        </nav>

        <motion.div
          className="ai-brief"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Sparkles size={18} />
          <p>AI detected 3 payroll anomalies before HMRC submission.</p>
          <button type="button" onClick={() => openDrawer(drawerContent.anomalies)}>Review</button>
        </motion.div>
      </aside>

      {/* ── Workspace ── */}
      <section className="workspace">
        <header className="topbar">
          <motion.div className="search-box" whileFocus={{ scale: 1.01 }}>
            <Search size={16} />
            <span>Search employee, FPS, payslip, client...</span>
            <kbd><Command size={12} /> K</kbd>
          </motion.div>
          <div className="topbar-actions">
            <motion.button type="button" aria-label="Messages" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}><MessageSquareText size={18} /></motion.button>
            <motion.button type="button" aria-label="Notifications" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}><Bell size={18} /></motion.button>
          </div>
        </header>

        <motion.section
          className="hero-band"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-copy">
            <span className="eyebrow"><ActiveIcon size={14} /> July 2026 payroll workspace</span>
            <h1>Payroll control room</h1>
            <p>People changes, timesheets, PAYE, payments and accounting journals are ready for review.</p>
          </div>
          <div className="metric-strip">
            <Metric label="Payroll value"   value="£184,920" tone="blue"  num={184920} prefix="£" />
            <Metric label="HMRC liability"  value="£38,244"  tone="rose"  num={38244}  prefix="£" />
            <Metric label="Net pay batch"   value="£126,706" tone="green" num={126706} prefix="£" />
          </div>
        </motion.section>

        <div className="ecosystem-switcher" aria-label="Ecosystem switcher">
          {modules.map(item => (
            <button
              key={item.key}
              className={active === item.key ? 'switch-pill active' : 'switch-pill'}
              onClick={() => setActive(item.key)}
              type="button"
            >
              <span className="switch-icon"><item.icon size={14} /></span>
              <span>{item.label}</span>
              {active === item.key && <motion.i layoutId="switch-active" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.section
            key={active}
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="content-grid"
          >
            {active === 'control'    && <ControlRoom    openDrawer={openDrawer} />}
            {active === 'people'     && <PeopleOS       openDrawer={openDrawer} />}
            {active === 'time'       && <TimeLocation   openDrawer={openDrawer} />}
            {active === 'compliance' && <Compliance     openDrawer={openDrawer} />}
            {active === 'accounts'   && <Accounting     openDrawer={openDrawer} />}
            {active === 'bureau'     && <Bureau         openDrawer={openDrawer} />}
          </motion.section>
        </AnimatePresence>
      </section>

      <DetailDrawer data={drawer} onClose={() => setDrawer(null)} />
    </main>
  )
}

/* ─── Metric card ──────────────────────────────────────────── */
function Metric({ label, tone, num, prefix }: { label: string; value: string; tone: string; num: number; prefix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { damping: 22, stiffness: 70 })
  const [display, setDisplay] = useState('0')

  useEffect(() => { if (inView) mv.set(num) }, [inView, mv, num])
  useEffect(() => spring.on('change', v => setDisplay(Math.round(v).toLocaleString())), [spring])

  return (
    <motion.div
      ref={ref}
      className={`metric ${tone}`}
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.03 }}
    >
      <span>{label}</span>
      <strong>{prefix}{display}</strong>
    </motion.div>
  )
}

/* ─── Marketing Site ───────────────────────────────────────── */
function MarketingSite({ onOpenApp }: { onOpenApp: () => void }) {
  const switchItems = ['Payroll', 'HR', 'Compliance docs', 'Training', 'HMRC', 'Accounting', 'Privacy', 'Terms']

  return (
    <main className="site-shell">
      {/* Ambient orbs */}
      <Orb className="orb-1" />
      <Orb className="orb-2" />
      <Orb className="orb-3" />

      {/* ── Nav ── */}
      <motion.header
        className="site-nav"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="site-brand">
          <motion.div className="brand-mark" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Fingerprint size={22} />
          </motion.div>
          <strong>budruumOS</strong>
        </div>
        <nav>
          {['Platform', 'Compliance', 'Accountants', 'Pricing'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >{item}</motion.a>
          ))}
        </nav>
        <motion.button
          className="site-nav-cta"
          type="button"
          onClick={onOpenApp}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
        >Open dashboard</motion.button>
      </motion.header>

      {/* Floating side button */}
      <motion.button
        className="side-dashboard-button"
        type="button"
        onClick={onOpenApp}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.05, x: -3 }}
        whileTap={{ scale: 0.96 }}
      >
        <LayoutDashboard size={16} />
        <span>Open dashboard</span>
      </motion.button>

      {/* ── Hero ── */}
      <section className="site-hero">
        <div className="site-hero-copy">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Zap size={13} />
            <span>Payroll · HR · Compliance · HMRC · Accounting</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            One place to run the business side of employing people.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            Payroll runs, employee records, compliance documents, training, HMRC duties and
            accounting journals — connected for UK small businesses and accountants.
          </motion.p>

          <motion.div
            className="site-cta-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
          >
            <motion.button
              className="primary-action hero-cta"
              type="button"
              onClick={onOpenApp}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.96 }}
            >
              Explore dashboard <ChevronRight size={16} />
            </motion.button>
            <a href="#platform" className="ghost-link">See modules →</a>
          </motion.div>

          {/* Live stat strip */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            <div className="hero-stat">
              <strong><AnimatedCounter value={128} />+</strong>
              <span>employees handled</span>
            </div>
            <div className="hero-stat-div" />
            <div className="hero-stat">
              <strong>£<AnimatedCounter value={184920} /></strong>
              <span>payroll value</span>
            </div>
            <div className="hero-stat-div" />
            <div className="hero-stat">
              <strong><AnimatedCounter value={99} />%</strong>
              <span>RTI on time</span>
            </div>
          </motion.div>
        </div>

        {/* Product card */}
        <motion.div
          className="site-product-card"
          initial={{ opacity: 0, y: 44, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -8, rotate: -0.5 }}
        >
          <div className="mini-topbar">
            <span className="dot red" /><span className="dot amber" /><span className="dot green" />
            <span className="mini-title">budruumOS — July payroll</span>
          </div>

          <div className="mini-control">
            <div>
              <strong>July payroll ready</strong>
              <em>4 smart checks remaining</em>
            </div>
            <motion.span
              className="mini-badge"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >Live</motion.span>
          </div>

          <div className="mini-flow">
            {['HR', 'Time', 'PAYE', 'Pay', 'Post'].map((item, index) => (
              <motion.span
                className={index < 3 ? 'done' : ''}
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.08 }}
              >{item}</motion.span>
            ))}
          </div>

          <div className="mini-ledger">
            {[
              ['HMRC liability', '£38,244'],
              ['Net pay batch',  '£126,706'],
              ['Journal status', 'Ready'],
            ].map(([label, val], i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.09 }}
              >
                {label} <b>{val}</b>
              </motion.span>
            ))}
          </div>

          {/* Floating glow */}
          <div className="card-glow" aria-hidden />
        </motion.div>
      </section>

      {/* ── Ticker strip ── */}
      <div className="ticker-strip" aria-hidden>
        <div className="ticker-track">
          {[...Array(3)].flatMap((_, rep) =>
            ['Payroll automation', 'RTI submission', 'HMRC PAYE', 'Right-to-work', 'Training compliance',
             'Bureau operations', 'Accounting journals', 'Pension auto-enrolment', 'BACS payments']
              .map((item, i) => <span key={`${rep}-${i}`}><TrendingUp size={12} /> {item}</span>)
          )}
        </div>
      </div>

      {/* ── Feature Grid ── */}
      <section className="site-section" id="platform">
        <div className="section-title">
          <motion.span
            className="eyebrow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >Platform</motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >Every people action flows into payroll and compliance.</motion.h2>
        </div>
        <div className="site-feature-grid">
          {[
            { icon: Users,       title: 'People OS',      copy: 'Employee records, contracts, right-to-work, onboarding and payroll setup as one source of truth.', color: '#2563eb' },
            { icon: Clock3,      title: 'Time and rota',  copy: 'Shifts, timesheets, overtime, absence and geofence attendance ready for payroll approval.', color: '#7c3aed' },
            { icon: ShieldCheck, title: 'Compliance hub', copy: 'Policies, acknowledgements, training certificates, audit trails and employment evidence.', color: '#0f9f8e' },
            { icon: Landmark,    title: 'HMRC PAYE',      copy: 'FPS, EPS, PAYE liabilities, payment reminders and year-end payroll duties in one workflow.', color: '#dc2626' },
            { icon: ReceiptText, title: 'Accounting',     copy: 'Payroll journals, PAYE liabilities, pension liabilities, cost centres and bank matching.', color: '#d97706' },
            { icon: Building2,   title: 'Bureau portal',  copy: 'Client approvals, deadline board, evidence sharing and multi-company accountant operations.', color: '#123c69' },
          ].map((f, i) => (
            <Feature key={f.title} icon={f.icon} title={f.title} copy={f.copy} color={f.color} index={i} />
          ))}
        </div>
      </section>

      {/* ── Compliance band ── */}
      <section className="site-band" id="compliance">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">Compliance documents + training</span>
          <h2>Compliance is not a folder. It is a live evidence system.</h2>
          <p>Policies, signed acknowledgements, mandatory courses, certificates and renewal deadlines sit together so employers can prove what happened, when, and who approved it.</p>
        </motion.div>
        <div className="evidence-stack">
          {[
            { icon: FileCheck2,   text: 'Handbook v4 acknowledged by 94%',        pct: 94 },
            { icon: GraduationCap, text: 'Health & safety training: 11 overdue',   pct: 78 },
            { icon: ShieldCheck,  text: 'Right-to-work evidence: 2 expiring',       pct: 92 },
          ].map(({ icon: Icon, text, pct }, i) => (
            <motion.span
              key={text}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ x: 4 }}
            >
              <Icon size={17} /> {text}
              <span className="progress-pill">
                <motion.span
                  className="progress-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 + 0.3, duration: 0.8, ease: 'easeOut' }}
                />
              </span>
            </motion.span>
          ))}
        </div>
      </section>

      {/* ── Bureau board ── */}
      <section className="site-section" id="accountants">
        <div className="section-title">
          <motion.span className="eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>For accountants</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }}>
            A bureau command centre for every client payroll.
          </motion.h2>
        </div>
        <div className="accountant-board">
          {bureauClients.map(([name, status, type, size], i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <span className={`client-badge ${type.toLowerCase()}`}>{type}</span>
              <strong>{name}</strong>
              <span>{status}</span>
              <small>{size}</small>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="site-final" id="pricing">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >Start with the dashboard prototype.<br />Then wire the real engine.</motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
        >Local frontend first. Supabase schema second. GitHub third. Vercel only when the product shape is worth shipping.</motion.p>
        <motion.button
          className="primary-action hero-cta"
          type="button"
          onClick={onOpenApp}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.96 }}
        >Open dashboard <ChevronRight size={16} /></motion.button>
      </section>

      <section className="legal-strip" id="privacy">
        <strong>Privacy</strong>
        <span>budruumOS will treat employee, payroll and compliance records as sensitive business data by design.</span>
      </section>
      <section className="legal-strip" id="terms">
        <strong>Terms</strong>
        <span>Platform terms will define employer responsibilities, payroll approvals, audit logs and third-party service connections.</span>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <div className="brand-mark"><Fingerprint size={18} /></div>
          <strong>budruumOS</strong>
        </div>
        <section className="site-switcher footer-switcher" aria-label="budruumOS platform areas">
          {switchItems.map(item => (
            <a href={item === 'Privacy' ? '#privacy' : item === 'Terms' ? '#terms' : '#platform'} key={item}>{item}</a>
          ))}
        </section>
      </footer>
    </main>
  )
}

/* ─── Feature card ─────────────────────────────────────────── */
function Feature({ icon: Icon, title, copy, color, index }: {
  icon: typeof Activity; title: string; copy: string; color: string; index: number
}) {
  return (
    <motion.article
      className="site-feature"
      style={{ '--accent': color } as React.CSSProperties}
      initial={{ opacity: 0, y: 32, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, scale: 1.015 }}
    >
      <div className="feature-icon-wrap" style={{ background: `${color}15`, color }}>
        <Icon size={22} />
      </div>
      <h3>{title}</h3>
      <p>{copy}</p>
    </motion.article>
  )
}

/* ─── Panel ────────────────────────────────────────────────── */
function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.article
      className={`panel ${className}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.article>
  )
}

/* ─── Drawer content ───────────────────────────────────────── */
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

/* ─── Dashboard modules ────────────────────────────────────── */
function ControlRoom({ openDrawer }: { openDrawer: (d: DrawerData) => void }) {
  return (
    <>
      <Panel className="wide">
        <div className="panel-head">
          <div>
            <span className="section-kicker">July payroll run</span>
            <h2>Control room</h2>
          </div>
          <motion.button
            className="primary-action"
            type="button"
            onClick={() => openDrawer(drawerContent.approveRun)}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >Approve run <ChevronRight size={16} /></motion.button>
        </div>
        <div className="pipeline">
          {payrollSteps.map((step, i) => (
            <motion.div
              className={`pipeline-step ${step.state}`}
              key={step.label}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.38 }}
            >
              <span>{i + 1}</span>
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
          <li><button type="button" onClick={() => openDrawer(drawerContent.anomalies)}><ShieldCheck size={17} /> Tax code K475X requires approval</button></li>
          <li><button type="button" onClick={() => openDrawer(drawerContent.anomalies)}><Activity size={17} /> Overtime 42% above last month</button></li>
          <li><button type="button" onClick={() => openDrawer(drawerContent.approveRun)}><FileCheck2 size={17} /> 4 payslips ready to release</button></li>
        </ul>
      </Panel>
      <Panel className="pay-stack">
        <h2>One-click close</h2>
        <ActionRow icon={Landmark}    label="Submit FPS to HMRC"   value="OAuth ready" onClick={() => openDrawer(drawerContent.hmrc)} />
        <ActionRow icon={WalletCards} label="Initiate PAYE payment" value="£38,244"    onClick={() => openDrawer(drawerContent.hmrc)} />
        <ActionRow icon={Banknote}    label="Release BACS batch"    value="£126,706"   onClick={() => openDrawer(drawerContent.approveRun)} />
        <ActionRow icon={ReceiptText} label="Post journal"          value="Sage/Xero"  onClick={() => openDrawer(drawerContent.journal)} />
      </Panel>
    </>
  )
}

function EmployeeTable({ openDrawer }: { openDrawer: (d: DrawerData) => void }) {
  return (
    <div className="data-table">
      {employees.map((person, i) => (
        <motion.button
          className="data-row"
          key={person.name}
          type="button"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06 + 0.2 }}
          whileHover={{ x: 4, backgroundColor: '#eef5ff' }}
          onClick={() => openDrawer({
            kicker: 'Employee payroll detail',
            title: person.name,
            body: `${person.role} payroll record for the July 2026 run, including gross pay, net pay, anomalies and audit evidence.`,
            items: [`Gross pay £${person.gross}`, `Net pay £${person.net}`, person.flag],
            action: 'Open employee record',
          })}
        >
          <div><strong>{person.name}</strong><span>{person.role}</span></div>
          <span>£{person.gross}</span>
          <span>£{person.net}</span>
          <em>{person.flag}</em>
        </motion.button>
      ))}
    </div>
  )
}

function PeopleOS({ openDrawer }: { openDrawer: (d: DrawerData) => void }) {
  return (
    <>
      <Panel className="wide profile-panel">
        <div className="employee-card">
          <motion.div className="avatar" whileHover={{ scale: 1.08, rotate: 3 }}>AC</motion.div>
          <div>
            <span className="section-kicker">Employee source of truth</span>
            <h2>Amara Cole</h2>
            <p>Contract, bank details, right-to-work, tax setup, pension and leave history all feed payroll automatically.</p>
          </div>
        </div>
        <div className="profile-grid">
          <ActionRow icon={FileText}        label="Contract signed"   value="Version 3"          onClick={() => openDrawer(drawerContent.training)} />
          <ActionRow icon={ShieldCheck}     label="Right-to-work"     value="Valid until 2028"   onClick={() => openDrawer(drawerContent.training)} />
          <ActionRow icon={CircleDollarSign} label="Salary change"    value="Pending approval"   onClick={() => openDrawer(drawerContent.approveRun)} />
          <ActionRow icon={CalendarDays}    label="Maternity leave"   value="Payroll impact ready" onClick={() => openDrawer(drawerContent.approveRun)} />
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
          {['Offer', 'Contract', 'PAYE', 'Pension', 'First payroll'].map((item, i) => (
            <motion.span key={item} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}>{item}</motion.span>
          ))}
        </div>
      </Panel>
    </>
  )
}

function TimeLocation({ openDrawer }: { openDrawer: (d: DrawerData) => void }) {
  return (
    <>
      <Panel className="wide schedule-panel">
        <div className="panel-head">
          <div>
            <span className="section-kicker">Rota, shifts and timesheets</span>
            <h2>Approved hours become payroll inputs</h2>
          </div>
          <button className="ghost-action" type="button" onClick={() => openDrawer({ kicker: 'Time and location', title: 'Geofence attendance', body: 'Location tracking is policy-controlled and only active during shifts.', items: ['2 active sites', 'QR fallback enabled', '5-minute rounding rule'], action: 'Configure geofence' })}>
            <MapPin size={15} /> View map
          </button>
        </div>
        <div className="rota-grid">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
            <motion.div className="shift-cell" key={day} whileHover={{ scale: 1.04, y: -4 }}>
              <strong>{day}</strong>
              <span>{i % 2 ? '09:00–17:30' : '08:00–16:00'}</span>
              <em>{i === 2 ? 'Overtime' : 'Approved'}</em>
            </motion.div>
          ))}
        </div>
      </Panel>
      <Panel className="map-panel">
        <h2>Geofence policy</h2>
        <div className="map-visual">
          <span className="pin one" /><span className="pin two" /><span className="radius" />
        </div>
        <p>Location capture is approval-based, time-limited and auditable.</p>
      </Panel>
      <Panel>
        <h2>Timesheet rules</h2>
        <ActionRow icon={Check}    label="Auto-rounding"     value="5 min" />
        <ActionRow icon={Clock3}   label="Late start alerts"  value="On" />
        <ActionRow icon={Activity} label="Payroll exceptions" value="3" />
      </Panel>
    </>
  )
}

function Compliance({ openDrawer }: { openDrawer: (d: DrawerData) => void }) {
  return (
    <>
      <Panel className="wide">
        <div className="panel-head">
          <div>
            <span className="section-kicker">Compliance operating system</span>
            <h2>Policies, training, HMRC duties and evidence</h2>
          </div>
          <motion.button className="primary-action" type="button" onClick={() => openDrawer(drawerContent.training)} whileHover={{ scale: 1.04 }}>Publish policy</motion.button>
        </div>
        <div className="compliance-board">
          {[
            { icon: FileCheck2,    label: 'Compliance documents', copy: 'Handbook, policies, contracts, right-to-work and signed acknowledgements.', stat: '94% acknowledged' },
            { icon: GraduationCap, label: 'Training',             copy: 'Mandatory courses, refreshers, certificates and overdue alerts.',               stat: '11 overdue' },
            { icon: Landmark,      label: 'HMRC and payroll',     copy: 'FPS, EPS, PAYE reminders, pension duties and year-end evidence.',               stat: 'FPS draft ready' },
          ].map(({ icon: Icon, label, copy, stat }, i) => (
            <motion.button
              key={label}
              type="button"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => openDrawer(i === 2 ? drawerContent.hmrc : drawerContent.training)}
            >
              <Icon size={22} />
              <strong>{label}</strong>
              <span>{copy}</span>
              <em>{stat}</em>
            </motion.button>
          ))}
        </div>
      </Panel>
      <Panel>
        <h2>Compliance calendar</h2>
        <ActionRow icon={CalendarDays} label="RTI deadline"           value="31 Jul" />
        <ActionRow icon={WalletCards}  label="PAYE payment"           value="22 Aug" />
        <ActionRow icon={FileText}     label="Handbook review"        value="7 Aug" />
        <ActionRow icon={GraduationCap} label="Health & safety"       value="11 overdue" />
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

function Accounting({ openDrawer }: { openDrawer: (d: DrawerData) => void }) {
  return (
    <>
      <Panel className="wide">
        <div className="panel-head">
          <div>
            <span className="section-kicker">Sage/Xero-style accounting layer</span>
            <h2>Payroll journals without spreadsheet exports</h2>
          </div>
          <motion.button className="primary-action" type="button" onClick={() => openDrawer(drawerContent.journal)} whileHover={{ scale: 1.04 }}>Post journal</motion.button>
        </div>
        <div className="journal">
          {[
            ['Wages expense',     'Debit',  '£184,920'],
            ['PAYE liability',    'Credit', '£24,806'],
            ['Pension liability', 'Credit', '£11,933'],
            ['Net wages payable', 'Credit', '£126,706'],
          ].map(([account, type, amount], i) => (
            <motion.div key={account} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
              <span>{account}</span><em>{type}</em><strong>{amount}</strong>
            </motion.div>
          ))}
        </div>
      </Panel>
      <Panel>
        <h2>Cost centres</h2>
        <div className="bars">
          {[['Operations', '82%'], ['Sales', '64%'], ['Admin', '48%']].map(([label, w], i) => (
            <motion.span
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              style={{ '--w': w } as React.CSSProperties}
            >{label}</motion.span>
          ))}
        </div>
      </Panel>
      <Panel>
        <h2>Bank matching</h2>
        <ActionRow icon={Banknote}    label="Net wages batch"   value="Matched" />
        <ActionRow icon={Landmark}    label="HMRC payment"      value="Scheduled" />
        <ActionRow icon={ReceiptText} label="Pension direct debit" value="Expected" />
      </Panel>
    </>
  )
}

function Bureau({ openDrawer }: { openDrawer: (d: DrawerData) => void }) {
  return (
    <>
      <Panel className="wide">
        <div className="panel-head">
          <div>
            <span className="section-kicker">Accountant command centre</span>
            <h2>Manage every client payroll from one risk board</h2>
          </div>
          <motion.button className="primary-action" type="button" onClick={() => openDrawer(drawerContent.client)} whileHover={{ scale: 1.04 }}>Open client room</motion.button>
        </div>
        <div className="client-board">
          {bureauClients.map(([name, status, type, size], i) => (
            <motion.button
              className="client-row"
              key={name}
              type="button"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ x: 6 }}
              onClick={() => openDrawer(drawerContent.client)}
            >
              <strong>{name}</strong><span>{status}</span><em>{type}</em><small>{size}</small>
            </motion.button>
          ))}
        </div>
      </Panel>
      <Panel>
        <h2>Client approvals</h2>
        <ActionRow icon={FileCheck2}      label="Payroll sign-offs" value="8 waiting" />
        <ActionRow icon={MessageSquareText} label="Open queries"    value="14" />
        <ActionRow icon={ShieldCheck}     label="Risk alerts"       value="3" />
      </Panel>
      <Panel>
        <h2>White-label ops</h2>
        <p className="plain-copy">Branded client portals, shared evidence, locked audit trails and accountant notes.</p>
      </Panel>
    </>
  )
}

/* ─── Action Row ───────────────────────────────────────────── */
function ActionRow({ icon: Icon, label, value, onClick }: { icon: typeof Activity; label: string; value: string; onClick?: () => void }) {
  const content = <><Icon size={17} /><span>{label}</span><strong>{value}</strong></>
  if (onClick) return <button className="action-row action-button" type="button" onClick={onClick}>{content}</button>
  return <div className="action-row">{content}</div>
}

/* ─── Detail Drawer ────────────────────────────────────────── */
function DetailDrawer({ data, onClose }: { data: DrawerData | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {data && (
        <>
          <motion.button
            className="drawer-scrim"
            type="button"
            aria-label="Close"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className="detail-drawer"
            initial={{ x: 440, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 440, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          >
            <button className="drawer-close" type="button" onClick={onClose} aria-label="Close">
              <CircleX size={18} />
            </button>
            <span className="section-kicker">{data.kicker}</span>
            <h2>{data.title}</h2>
            <p>{data.body}</p>
            <div className="drawer-list">
              {data.items.map((item, i) => (
                <motion.span key={item} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                  {item}
                </motion.span>
              ))}
            </div>
            <motion.button
              className="primary-action drawer-action"
              type="button"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >{data.action}</motion.button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

export default App
