import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  User, 
  KeyRound, 
  Sparkles,
  ArrowLeft,
  X
} from 'lucide-react';
import { DashboardView } from '../components/DashboardView';

interface UserData {
  name: string;
  role: string;
  email: string;
  company: string;
  avatar: string;
  type: 'client' | 'advisor';
}

export const LoginPage: React.FC = () => {
  const [roleType, setRoleType] = useState<'client' | 'advisor'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Authenticated State
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (roleType === 'client') {
        setCurrentUser({
          name: 'Eleanor Vance',
          role: 'Chief Strategy Officer & VP',
          email: email,
          company: 'Acme Global Enterprises',
          avatar: 'EV',
          type: 'client'
        });
      } else {
        setCurrentUser({
          name: 'Anand Siddapa',
          role: 'Managing Partner & Advisory Director',
          email: email,
          company: 'Avantra Consulting Practice',
          avatar: 'AS',
          type: 'advisor'
        });
      }
    }, 800);
  };

  const handleQuickDemoClient = () => {
    setEmail('eleanor.vance@acmeglobal.com');
    setPassword('••••••••••••');
    setRoleType('client');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentUser({
        name: 'Eleanor Vance',
        role: 'Chief Strategy Officer',
        email: 'eleanor.vance@acmeglobal.com',
        company: 'Acme Global Enterprises',
        avatar: 'EV',
        type: 'client'
      });
    }, 600);
  };

  const handleQuickDemoAdvisor = () => {
    setEmail('anand.siddapa@avantra.com');
    setPassword('••••••••••••');
    setRoleType('advisor');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setCurrentUser({
        name: 'Anand Siddapa',
        role: 'Managing Partner & Executive Advisor',
        email: 'anand.siddapa@avantra.com',
        company: 'Avantra Leadership Council',
        avatar: 'AS',
        type: 'advisor'
      });
    }, 600);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
  };

  // If authenticated, render full Executive Dashboard View
  if (currentUser) {
    return <DashboardView user={currentUser} onLogout={() => setCurrentUser(null)} />;
  }

  return (
    <div className="relative min-h-screen w-full bg-[hsl(var(--background))] text-[hsl(var(--foreground))] flex flex-col justify-between overflow-x-hidden">
      {/* Background Subtle Grid Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[hsl(var(--accent)/.08)] via-transparent to-transparent pointer-events-none" />

      {/* Header Bar */}
      <header className="relative z-20 container-wide flex h-20 items-center justify-between">
        <a href="/" className="flex items-center gap-3 group">
          <span className="relative flex h-9 w-9 items-center justify-center border border-current transition-transform group-hover:scale-105">
            <span className="absolute h-3.5 w-3.5 rotate-45 bg-[hsl(var(--accent))]" />
            <span className="relative font-serif text-xl leading-none">A</span>
          </span>
          <span className="text-[14px] font-bold tracking-[0.18em]">AVANTRA</span>
        </a>

        <a 
          href="/" 
          className="flex items-center gap-2 text-xs font-semibold text-[hsl(var(--foreground)/.7)] hover:text-[hsl(var(--accent))] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Public Website
        </a>
      </header>

      {/* Main Login Split Hero Layout */}
      <main className="relative z-10 container-wide flex-1 grid items-center gap-12 py-8 lg:grid-cols-12">
        
        {/* Left Side: Brand & Visual Intelligence */}
        <div className="lg:col-span-6 flex flex-col justify-center max-w-[560px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--accent)/.3)] bg-[hsl(var(--accent)/.08)] px-3.5 py-1 text-[11px] font-semibold text-[hsl(var(--accent))] uppercase tracking-wider mb-6 w-fit">
            <ShieldCheck size={14} /> 256-Bit SSL Encrypted Gateway
          </div>

          <h1 className="text-4xl sm:text-5xl font-light tracking-tight leading-[1.1]">
            Executive <span className="serif italic text-[hsl(var(--secondary))]">Portal</span> &amp; Strategic Intelligence
          </h1>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[hsl(var(--foreground)/.68)]">
            Single secure gateway for enterprise client executives, legal counsels, and Avantra senior advisors across the United States and India.
          </p>

          {/* Mini Feature Highlights */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card)/.7)] p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--accent)/.12)] text-[hsl(var(--accent))]">
                  <Building2 size={16} />
                </span>
                <div>
                  <div className="text-xs font-bold">Cross-Border Roster</div>
                  <div className="text-[11px] text-[hsl(var(--foreground)/.6)]">Real-time Legal &amp; Tech Talent</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card)/.7)] p-4 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[hsl(var(--accent)/.12)] text-[hsl(var(--accent))]">
                  <Sparkles size={16} />
                </span>
                <div>
                  <div className="text-xs font-bold">Audit & Governance</div>
                  <div className="text-[11px] text-[hsl(var(--foreground)/.6)]">Verified SOC2 &amp; GDPR Logs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mt-8 rounded-xl border border-[hsl(var(--accent)/.25)] bg-[hsl(var(--card))] p-4 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--accent))] mb-2 flex items-center gap-1.5">
              <KeyRound size={14} /> Instant Preview Access:
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={handleQuickDemoClient}
                className="flex-1 rounded border border-[hsl(var(--foreground)/.15)] bg-[hsl(var(--background))] px-3 py-2 text-xs font-semibold hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))] transition-colors text-left flex items-center justify-between group"
              >
                <span>Demo Client Login</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={handleQuickDemoAdvisor}
                className="flex-1 rounded border border-[hsl(var(--foreground)/.15)] bg-[hsl(var(--background))] px-3 py-2 text-xs font-semibold hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))] transition-colors text-left flex items-center justify-between group"
              >
                <span>Demo Advisor Login</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Unique Premium Glassmorphic Login Form Card */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="w-full max-w-[440px] rounded-2xl border border-[hsl(var(--foreground)/.18)] bg-[hsl(var(--card))] p-8 shadow-2xl backdrop-blur-xl relative">
            
            {/* Top Role Selector Tabs */}
            <div className="mb-6 flex rounded-lg border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--muted)/.5)] p-1">
              <button
                type="button"
                onClick={() => setRoleType('client')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-xs font-bold transition-all ${
                  roleType === 'client'
                    ? 'bg-[hsl(var(--accent))] text-white shadow-sm'
                    : 'text-[hsl(var(--foreground)/.65)] hover:text-[hsl(var(--foreground))]'
                }`}
              >
                <Building2 size={14} /> Client Portal
              </button>
              <button
                type="button"
                onClick={() => setRoleType('advisor')}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md py-2.5 text-xs font-bold transition-all ${
                  roleType === 'advisor'
                    ? 'bg-[hsl(var(--accent))] text-white shadow-sm'
                    : 'text-[hsl(var(--foreground)/.65)] hover:text-[hsl(var(--foreground))]'
                }`}
              >
                <User size={14} /> Executive Advisor
              </button>
            </div>

            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold tracking-tight">
                {roleType === 'client' ? 'Enterprise Client Gateway' : 'Executive Advisor Console'}
              </h2>
              <p className="mt-1 text-xs text-[hsl(var(--foreground)/.6)]">
                {roleType === 'client' 
                  ? 'Access audit logs, advisory reports, and staffing rosters.' 
                  : 'Manage active engagements, paralegals, and client accounts.'}
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-500 flex items-center gap-2">
                <X size={14} className="shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground)/.7)] mb-1.5">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground)/.4)]" size={16} />
                  <input
                    type="email"
                    required
                    placeholder={roleType === 'client' ? 'exec@company.com' : 'advisor@avantra.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full rounded-lg border border-[hsl(var(--foreground)/.16)] bg-[hsl(var(--background))] pl-10 pr-4 text-xs placeholder:text-[hsl(var(--foreground)/.35)] focus:border-[hsl(var(--accent))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--accent))]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground)/.7)]">
                    Passcode / Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-[11px] font-semibold text-[hsl(var(--accent))] hover:underline"
                  >
                    Forgot passcode?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground)/.4)]" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 w-full rounded-lg border border-[hsl(var(--foreground)/.16)] bg-[hsl(var(--background))] pl-10 pr-10 text-xs placeholder:text-[hsl(var(--foreground)/.35)] focus:border-[hsl(var(--accent))] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--accent))]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[hsl(var(--foreground)/.4)] hover:text-[hsl(var(--foreground))]"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-[hsl(var(--foreground)/.7)] select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-[hsl(var(--foreground)/.3)] accent-[hsl(var(--accent))]"
                  />
                  <span>Keep session secure</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full primary-button py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <span>Authenticate &amp; Enter Dashboard</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-[hsl(var(--foreground)/.1)] text-center text-[11px] text-[hsl(var(--foreground)/.5)]">
              Protected by Avantra Sovereign Security Protocols.
            </div>
          </div>
        </div>

      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-xl border border-[hsl(var(--foreground)/.2)] bg-[hsl(var(--card))] p-6 shadow-2xl relative">
            <button
              onClick={() => { setShowForgotModal(false); setForgotSent(false); }}
              className="absolute right-4 top-4 text-[hsl(var(--foreground)/.5)] hover:text-[hsl(var(--foreground))]"
            >
              <X size={18} />
            </button>

            {!forgotSent ? (
              <>
                <h3 className="text-lg font-semibold">Reset Gateway Passcode</h3>
                <p className="mt-1 text-xs text-[hsl(var(--foreground)/.65)]">
                  Enter your registered corporate email address to receive an encrypted security link.
                </p>

                <form onSubmit={handleForgotSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[hsl(var(--foreground)/.7)] mb-1">
                      Corporate Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.name@company.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="h-10 w-full rounded-md border border-[hsl(var(--foreground)/.18)] bg-[hsl(var(--background))] px-3 text-xs focus:border-[hsl(var(--accent))] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full primary-button py-2.5 text-xs font-bold uppercase tracking-wider"
                  >
                    Send Security Instructions
                  </button>
                </form>
              </>
            ) : (
              <div className="py-4 text-center">
                <CheckCircle2 size={40} className="mx-auto text-emerald-500 mb-3" />
                <h3 className="text-lg font-semibold">Instructions Sent</h3>
                <p className="mt-1 text-xs text-[hsl(var(--foreground)/.7)]">
                  We have dispatched a single-use passcode reset link to <strong>{forgotEmail}</strong>.
                </p>
                <button
                  onClick={() => { setShowForgotModal(false); setForgotSent(false); }}
                  className="mt-5 rounded border border-[hsl(var(--foreground)/.2)] px-4 py-2 text-xs font-semibold hover:bg-[hsl(var(--muted))]"
                >
                  Return to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Line */}
      <footer className="relative z-20 border-t border-[hsl(var(--foreground)/.1)] py-4 text-center text-[11px] text-[hsl(var(--foreground)/.45)]">
        &copy; {new Date().getFullYear()} Avantra Consulting LLC. All Rights Reserved &bull; US &amp; India Sovereign Enterprise Portal
      </footer>
    </div>
  );
};
