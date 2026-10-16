import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  FileText, 
  Download, 
  Search, 
  Bell, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Sparkles,
  Shield,
  Briefcase
} from 'lucide-react';

interface UserData {
  name: string;
  role: string;
  email: string;
  company: string;
  avatar: string;
  type: 'client' | 'advisor';
}

interface DashboardViewProps {
  user: UserData;
  onLogout: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'engagements' | 'allocation' | 'talent' | 'audit'>('engagements');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const engagements = [
    {
      id: 'ENG-2026-089',
      title: 'US-India Cross-Border Tax & Legal Alignment',
      category: 'Legal & Advisory',
      lead: 'David Chen, Senior Counsel',
      status: 'Active',
      progress: 78,
      budget: '$340,000',
      lastUpdate: '2 hours ago'
    },
    {
      id: 'ENG-2026-074',
      title: 'Fintech Platform Regulatory Compliance Audit',
      category: 'Financial Solutions',
      lead: 'Anand Siddapa, Managing Partner',
      status: 'In Review',
      progress: 92,
      budget: '$520,000',
      lastUpdate: 'Yesterday'
    },
    {
      id: 'ENG-2026-061',
      title: 'Enterprise Paralegal Staffing Roster (Q3)',
      category: 'Staffing & Talent',
      lead: 'Priya Sharma, Talent Director',
      status: 'Active',
      progress: 64,
      budget: '$210,000',
      lastUpdate: '3 days ago'
    },
    {
      id: 'ENG-2026-042',
      title: 'AI Governance & Risk Assessment Framework',
      category: 'Technology Solutions',
      lead: 'Marcus Vance, Tech Principal',
      status: 'Completed',
      progress: 100,
      budget: '$450,000',
      lastUpdate: '1 week ago'
    }
  ];

  const specialists = [
    { name: 'Aarav Mehta', role: 'Senior Regulatory Paralegal', location: 'Bangalore, IN', status: 'Assigned', experience: '8 Yrs' },
    { name: 'Sarah Jenkins', role: 'Corporate Tax Structuring Specialist', location: 'New York, US', status: 'Deployed', experience: '12 Yrs' },
    { name: 'Vikram Kulkarni', role: 'Enterprise Cloud Architect', location: 'Bengaluru, IN', status: 'Deployed', experience: '10 Yrs' },
    { name: 'Elena Rostova', role: 'Cross-Border Compliance Auditor', location: 'Chicago, US', status: 'Assigned', experience: '7 Yrs' }
  ];

  const auditLogs = [
    { time: '14:22 UTC', event: 'Q3 Financial Advisory Summary downloaded', user: user.name, ip: '192.168.1.104' },
    { time: '11:05 UTC', event: 'SOC2 Type II Compliance Certificate Verified', user: 'System Automated', ip: 'Internal Gateway' },
    { time: '09:40 UTC', event: 'Paralegal Roster #42 Expanded (+4 Team Members)', user: 'Priya Sharma', ip: '10.0.4.12' },
    { time: 'Yesterday', event: 'Encrypted Board Briefing Signed via SSL Gateway', user: user.name, ip: '192.168.1.104' }
  ];

  const filteredEngagements = engagements.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || e.status.toLowerCase().replace(/\s+/g, '') === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-md bg-gray-900 px-5 py-3 text-sm text-white shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="text-emerald-400" size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[hsl(var(--foreground)/.12)] bg-[hsl(var(--background)/.95)] backdrop-blur-md">
        <div className="container-wide flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              <span className="relative flex h-8 w-8 items-center justify-center border border-current">
                <span className="absolute h-3 w-3 rotate-45 bg-[hsl(var(--accent))]" />
                <span className="relative font-serif text-lg leading-none">A</span>
              </span>
              <span className="text-[13px] font-bold tracking-[0.16em]">AVANTRA</span>
            </a>
            <span className="h-4 w-px bg-[hsl(var(--foreground)/.2)]" />
            <span className="mono text-[11px] uppercase tracking-wider text-[hsl(var(--accent))]">
              {user.type === 'client' ? 'Client Executive Portal' : 'Advisor Command Center'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground)/.4)]" size={15} />
              <input 
                type="text"
                placeholder="Search engagements, reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-64 rounded-md border border-[hsl(var(--foreground)/.15)] bg-[hsl(var(--card))] pl-9 pr-4 text-xs placeholder:text-[hsl(var(--foreground)/.4)] focus:border-[hsl(var(--accent))] focus:outline-none"
              />
            </div>

            <button 
              onClick={() => showToast('No unread critical alerts.')}
              className="relative flex h-9 w-9 items-center justify-center rounded-md border border-[hsl(var(--foreground)/.15)] bg-[hsl(var(--card))] hover:bg-[hsl(var(--muted))]"
            >
              <Bell size={16} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
            </button>

            <div className="flex items-center gap-3 border-l border-[hsl(var(--foreground)/.15)] pl-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--accent)/.15)] font-serif text-sm font-bold text-[hsl(var(--accent))] border border-[hsl(var(--accent)/.3)]">
                {user.avatar}
              </div>
              <div className="hidden flex-col text-left lg:flex">
                <span className="text-xs font-semibold leading-tight">{user.name}</span>
                <span className="text-[10px] text-[hsl(var(--foreground)/.6)]">{user.role}</span>
              </div>
            </div>

            <button 
              onClick={onLogout}
              className="flex items-center gap-2 rounded-md border border-[hsl(var(--foreground)/.18)] px-3 py-1.5 text-xs font-medium hover:border-red-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
              title="Sign Out"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="container-wide py-8">
        {/* Header Welcome Banner */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-xl border border-[hsl(var(--foreground)/.14)] bg-gradient-to-r from-[hsl(var(--card))] via-[hsl(var(--card)/.9)] to-[hsl(var(--accent)/.08)] p-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--accent))]">
              <Sparkles size={14} />
              <span>Avantra Strategic Intelligence</span>
            </div>
            <h1 className="mt-1 text-2xl font-light tracking-tight md:text-3xl">
              Welcome back, <span className="font-semibold text-[hsl(var(--foreground))]">{user.name}</span>
            </h1>
            <p className="mt-1 text-xs text-[hsl(var(--foreground)/.65)]">
              {user.company} &bull; Active Advisory Node: <span className="font-mono text-[hsl(var(--foreground))]">US-IN-GATEWAY-09</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => showToast('Generated Comprehensive Executive Summary PDF')}
              className="primary-button text-xs py-2.5 px-4 flex items-center gap-2"
            >
              <Download size={14} /> Export Executive Summary
            </button>
          </div>
        </div>

        {/* Executive KPI Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-5 transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[hsl(var(--foreground)/.6)]">Active Engagements</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--accent)/.12)] text-[hsl(var(--accent))]">
                <Briefcase size={16} />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-light">14</span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                +18.4% YoY
              </span>
            </div>
            <p className="mt-2 text-[11px] text-[hsl(var(--foreground)/.5)]">4 projects awaiting Q3 sign-off</p>
          </div>

          <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-5 transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[hsl(var(--foreground)/.6)]">Deployed Specialists</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--accent)/.12)] text-[hsl(var(--accent))]">
                <Users size={16} />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-light">128</span>
              <span className="text-xs font-medium text-[hsl(var(--foreground)/.7)]">Legal & Tech Roster</span>
            </div>
            <p className="mt-2 text-[11px] text-[hsl(var(--foreground)/.5)]">US & India Operations Active</p>
          </div>

          <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-5 transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[hsl(var(--foreground)/.6)]">Portfolio Valuation</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--accent)/.12)] text-[hsl(var(--accent))]">
                <TrendingUp size={16} />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-light">$4.82M</span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">USD</span>
            </div>
            <p className="mt-2 text-[11px] text-[hsl(var(--foreground)/.5)]">Quarterly Audit Complete</p>
          </div>

          <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-5 transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-[hsl(var(--foreground)/.6)]">Compliance Score</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--accent)/.12)] text-[hsl(var(--accent))]">
                <ShieldCheck size={16} />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-light">99.4%</span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Verified</span>
            </div>
            <p className="mt-2 text-[11px] text-[hsl(var(--foreground)/.5)]">SOC2 Type II & GDPR Compliant</p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="mb-6 flex border-b border-[hsl(var(--foreground)/.14)] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('engagements')}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'engagements'
                ? 'border-[hsl(var(--accent))] text-[hsl(var(--accent))]'
                : 'border-transparent text-[hsl(var(--foreground)/.6)] hover:text-[hsl(var(--foreground))]'
            }`}
          >
            <Briefcase size={15} /> Active Engagements ({filteredEngagements.length})
          </button>
          <button
            onClick={() => setActiveTab('talent')}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'talent'
                ? 'border-[hsl(var(--accent))] text-[hsl(var(--accent))]'
                : 'border-transparent text-[hsl(var(--foreground)/.6)] hover:text-[hsl(var(--foreground))]'
            }`}
          >
            <Users size={15} /> Deployed Talent Roster
          </button>
          <button
            onClick={() => setActiveTab('allocation')}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'allocation'
                ? 'border-[hsl(var(--accent))] text-[hsl(var(--accent))]'
                : 'border-transparent text-[hsl(var(--foreground)/.6)] hover:text-[hsl(var(--foreground))]'
            }`}
          >
            <Building2 size={15} /> Practice Allocation
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'audit'
                ? 'border-[hsl(var(--accent))] text-[hsl(var(--accent))]'
                : 'border-transparent text-[hsl(var(--foreground)/.6)] hover:text-[hsl(var(--foreground))]'
            }`}
          >
            <Shield size={15} /> Security & Governance Logs
          </button>
        </div>

        {/* Tab 1: Active Engagements */}
        {activeTab === 'engagements' && (
          <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[hsl(var(--foreground)/.12)] p-4 bg-[hsl(var(--muted)/.3)]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground)/.7)]">
                <Filter size={14} /> Filter Status:
              </div>
              <div className="flex flex-wrap gap-2">
                {['all', 'active', 'inreview', 'completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterStatus(st)}
                    className={`rounded-md px-3 py-1 text-xs capitalize transition-colors ${
                      filterStatus === st 
                        ? 'bg-[hsl(var(--accent))] text-white font-bold' 
                        : 'bg-[hsl(var(--background))] border border-[hsl(var(--foreground)/.15)] text-[hsl(var(--foreground)/.7)] hover:bg-[hsl(var(--muted))]'
                    }`}
                  >
                    {st === 'inreview' ? 'In Review' : st}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[hsl(var(--foreground)/.12)] bg-[hsl(var(--muted)/.4)] uppercase tracking-wider text-[hsl(var(--foreground)/.6)] font-mono text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Engagement Code</th>
                    <th className="py-3 px-4">Project Title</th>
                    <th className="py-3 px-4">Practice Domain</th>
                    <th className="py-3 px-4">Lead Advisor</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Progress</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--foreground)/.08)]">
                  {filteredEngagements.map((item) => (
                    <tr key={item.id} className="hover:bg-[hsl(var(--muted)/.3)] transition-colors">
                      <td className="py-4 px-4 font-mono font-medium text-[hsl(var(--accent))]">{item.id}</td>
                      <td className="py-4 px-4 font-semibold max-w-[240px] truncate">{item.title}</td>
                      <td className="py-4 px-4 text-[hsl(var(--foreground)/.7)]">{item.category}</td>
                      <td className="py-4 px-4">{item.lead}</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          item.status === 'Active' 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' 
                            : item.status === 'In Review' 
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30' 
                            : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            item.status === 'Active' ? 'bg-emerald-500' : item.status === 'In Review' ? 'bg-amber-500' : 'bg-blue-500'
                          }`} />
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 w-32">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-full rounded-full bg-[hsl(var(--foreground)/.12)] overflow-hidden">
                            <div 
                              className="h-full bg-[hsl(var(--accent))] rounded-full" 
                              style={{ width: `${item.progress}%` }} 
                            />
                          </div>
                          <span className="mono text-[10px] font-bold">{item.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button 
                          onClick={() => showToast(`Downloaded Briefing for ${item.id}`)}
                          className="inline-flex items-center gap-1 rounded border border-[hsl(var(--foreground)/.15)] px-2.5 py-1 text-[11px] font-semibold hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))]"
                        >
                          <FileText size={12} /> Briefing
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Talent Roster */}
        {activeTab === 'talent' && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {specialists.map((sp) => (
              <div key={sp.name} className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-[hsl(var(--accent)/.12)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[hsl(var(--accent))]">
                      {sp.status}
                    </span>
                    <span className="mono text-[10px] text-[hsl(var(--foreground)/.5)]">{sp.experience} Exp</span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{sp.name}</h3>
                  <p className="mt-1 text-xs text-[hsl(var(--foreground)/.7)]">{sp.role}</p>
                  <p className="mt-2 text-[11px] font-mono text-[hsl(var(--foreground)/.5)]">&bull; {sp.location}</p>
                </div>
                <button 
                  onClick={() => showToast(`Contact request sent to ${sp.name}`)}
                  className="mt-4 w-full rounded border border-[hsl(var(--foreground)/.18)] py-1.5 text-xs font-semibold hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))] transition-colors"
                >
                  Contact Specialist
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Practice Allocation */}
        {activeTab === 'allocation' && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--accent))]">Advisory Resource Allocation</h3>
              <p className="mt-1 text-xs text-[hsl(var(--foreground)/.6)]">Quarterly breakdown of deployed consulting assets across practice lines.</p>
              
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Paralegal & Legal Advisory</span>
                    <span className="mono">38% ($1.83M)</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[hsl(var(--foreground)/.1)] overflow-hidden">
                    <div className="h-full bg-[hsl(var(--accent))] rounded-full" style={{ width: '38%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Financial & Tax Structuring</span>
                    <span className="mono">29% ($1.40M)</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[hsl(var(--foreground)/.1)] overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '29%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Technology & AI Solutions</span>
                    <span className="mono">21% ($1.01M)</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[hsl(var(--foreground)/.1)] overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '21%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Specialized Executive Staffing</span>
                    <span className="mono">12% ($0.58M)</span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-[hsl(var(--foreground)/.1)] overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '12%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--accent))]">Regional Node Operations</h3>
                <p className="mt-1 text-xs text-[hsl(var(--foreground)/.6)]">Active cross-border execution corridors.</p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between rounded-lg border border-[hsl(var(--foreground)/.1)] p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                      <div>
                        <div className="text-xs font-bold">United States Desk</div>
                        <div className="text-[10px] text-[hsl(var(--foreground)/.6)]">Delaware &bull; New York &bull; California</div>
                      </div>
                    </div>
                    <span className="mono text-xs font-semibold">Active (48 Specialists)</span>
                  </div>

                  <div className="flex items-center justify-between rounded-lg border border-[hsl(var(--foreground)/.1)] p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
                      <div>
                        <div className="text-xs font-bold">India Desk</div>
                        <div className="text-[10px] text-[hsl(var(--foreground)/.6)]">Bengaluru &bull; Mumbai &bull; Delhi NCR</div>
                      </div>
                    </div>
                    <span className="mono text-xs font-semibold">Active (80 Specialists)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-[hsl(var(--muted)/.5)] p-4 text-xs">
                <div className="font-semibold text-[hsl(var(--accent))] flex items-center gap-1.5">
                  <ShieldCheck size={14} /> 24/7 Sovereign Audit Protection
                </div>
                <p className="mt-1 text-[11px] text-[hsl(var(--foreground)/.7)]">
                  All cross-border legal and financial filings are synchronized in real-time under strict dual-jurisdiction compliance protocols.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Security Logs */}
        {activeTab === 'audit' && (
          <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[hsl(var(--accent))]">Security & Governance Audit Trail</h3>
              <span className="mono text-xs text-[hsl(var(--foreground)/.5)]">SSL 256-Bit Encrypted Gateway</span>
            </div>

            <div className="space-y-3">
              {auditLogs.map((log, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-[hsl(var(--foreground)/.1)] p-3 text-xs gap-2">
                  <div className="flex items-center gap-3">
                    <Clock size={14} className="text-[hsl(var(--accent))]" />
                    <span className="font-semibold">{log.event}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] text-[hsl(var(--foreground)/.6)]">
                    <span>User: <strong>{log.user}</strong></span>
                    <span className="font-mono bg-[hsl(var(--muted))] px-2 py-0.5 rounded">{log.ip}</span>
                    <span className="mono font-bold text-[hsl(var(--accent))]">{log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
