import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  ArrowLeft,
  X,
  ShieldCheck,
  Scale,
  TrendingUp,
  Users2,
  KeyRound
} from 'lucide-react';
import { SEO } from '../components/SEO';
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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successBanner, setSuccessBanner] = useState('');

  // Forgot Password State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotResponse, setForgotResponse] = useState<{ emailSent?: boolean; message?: string; resetLink?: string; token?: string } | null>(null);

  // Reset Password State (when opening link from email or modal)
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  // Authenticated State
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  // Auto-detect reset link from email URL query params (?reset_token=...&email=...)
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('reset_token');
      const email = searchParams.get('email');
      if (token && email) {
        setResetToken(token);
        setResetEmail(email);
        setShowResetModal(true);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessBanner('');

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setErrorMessage('Please enter both your username and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanUsername,
          password: cleanPassword
        })
      });
      const data = await response.json();
      setIsLoading(false);

      if (response.ok && data.success && data.user) {
        // Valid credentials — grant access
        setCurrentUser(data.user);
      } else {
        // Invalid credentials — show backend error
        setErrorMessage(data.error || 'Invalid username or password. Please try again.');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Unable to connect to the server. Please try again later.');
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotError('');
    setForgotLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });
      const data = await res.json();
      setForgotLoading(false);
      if (!res.ok || !data.success) {
        // Backend rejected the email (not registered or server error)
        setForgotError(data.error || 'No account found with that email address. Please check and try again.');
        return;
      }
      setForgotResponse(data);
      if (data.token) {
        setResetToken(data.token);
      }
      setResetEmail(forgotEmail);
      setForgotSent(true);
    } catch (err) {
      setForgotLoading(false);
      setForgotError('Could not reach the server. Please try again later.');
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');

    const cleanPass = newPassword.trim();
    const cleanConfirm = confirmPassword.trim();

    if (!cleanPass || !cleanConfirm) {
      setResetError('Please enter and confirm your new password.');
      return;
    }

    if (cleanPass !== cleanConfirm) {
      setResetError('Passwords do not match.');
      return;
    }

    if (cleanPass.length < 4) {
      setResetError('Password must be at least 4 characters long.');
      return;
    }

    setResetLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: resetToken,
          email: resetEmail,
          newPassword: cleanPass
        })
      });
      const data = await res.json();
      setResetLoading(false);

      if (!res.ok || !data.success) {
        setResetError(data.error || 'Failed to update password. Please request a new recovery link.');
        return;
      }

      setResetSuccessMessage('Password changed successfully! Your new password is now active.');
      // Remove query parameters from URL
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (err) {
      setResetLoading(false);
      setResetError('Could not reach server. Please try again.');
    }
  };

  // If authenticated, render full Executive Consulting Dashboard View
  if (currentUser) {
    return <DashboardView user={currentUser} onLogout={() => setCurrentUser(null)} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#EDF5F6] text-[#0F172A] flex flex-col justify-between font-sans selection:bg-[#CEE7EA]">
      <SEO 
        title="Portal Login | Avantra Consulting"
        description="Secure client and administrator authentication portal for Avantra Consulting."
      />
      {/* Top Header */}
      <header className="w-full px-6 sm:px-10 py-5 flex items-center justify-between">
        <a href="/" className="inline-flex items-center transition-opacity hover:opacity-90" aria-label="Avantra Consulting LLP">
          <img
            src="/avantra-logo.svg"
            alt="Avantra Consulting LLP"
            className="h-8 sm:h-9 w-auto object-contain"
          />
        </a>

        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#02060c] transition-colors bg-white/70 hover:bg-white px-3.5 py-1.5 rounded-lg border border-slate-200/80 shadow-xs"
        >
          <ArrowLeft size={14} /> Back to Website
        </a>
      </header>

      {/* Main Executive Consulting Split Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden grid lg:grid-cols-[1.1fr_1fr]">
          
          {/* Left Column: Dedicated Consulting Brand Panel */}
          <div className="bg-[#02060c] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle consulting grid background glow */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#198afa]/15 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#CEE7EA]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="mono text-[10px] uppercase tracking-[0.2em] font-semibold text-[#CEE7EA] bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                  CONSULTANCY PORTAL
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-normal tracking-tight leading-[1.15] text-white">
                Global Advisory &amp;<br />
                <span className="font-serif italic text-[#CEE7EA]">Operational Excellence.</span>
              </h1>

              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
                Empowering international corporate practices, legal firms, and growing enterprises through specialized solutions and dedicated execution.
              </p>

              {/* 3 Consulting Practice Pillars */}
              <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-white/10 text-[#CEE7EA] shrink-0 mt-0.5">
                    <Scale size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Legal Support &amp; LPO</h4>
                    <p className="text-[11px] text-slate-400">Paralegal workflows, regulatory compliance &amp; file preparation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-white/10 text-[#CEE7EA] shrink-0 mt-0.5">
                    <TrendingUp size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Financial &amp; Month-End Controls</h4>
                    <p className="text-[11px] text-slate-400">Structured 5-day closes, reporting packs &amp; reconciliation.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-white/10 text-[#CEE7EA] shrink-0 mt-0.5">
                    <Users2 size={15} />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Remote Staffing &amp; Coordination</h4>
                    <p className="text-[11px] text-slate-400">Dedicated operational talent seamlessly embedded in your firm.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Credential Motto */}
            <div className="relative z-10 pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Avantra Consulting LLP</span>
              <span className="text-[#CEE7EA] italic font-serif">solutioning together</span>
            </div>
          </div>

          {/* Right Column: Clean Consulting Login Form */}
          <div className="p-8 sm:p-12 flex flex-col justify-between bg-white">
            <div>
              <div className="mb-6">
                <span className="mono text-[10px] uppercase tracking-[0.14em] font-semibold text-[#0A3A40] bg-[#CEE7EA]/60 px-2.5 py-0.5 rounded">
                  PORTAL AUTHENTICATION
                </span>
                <h2 className="text-2xl font-semibold text-slate-900 mt-2 tracking-tight">
                  Sign In
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your credentials to access the Avantra consulting management portal.
                </p>
              </div>

              {successBanner && (
                <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                  <span className="font-medium">{successBanner}</span>
                </div>
              )}

              {errorMessage && (
                <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 flex items-center gap-2">
                  <X size={15} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Username
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      required
                      placeholder="Enter admin username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (errorMessage) setErrorMessage('');
                        if (successBanner) setSuccessBanner('');
                      }}
                      className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50/60 pl-10 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#02060c] focus:outline-none focus:ring-2 focus:ring-[#02060c]/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgotModal(true);
                        setForgotSent(false);
                        setForgotError('');
                      }}
                      className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMessage) setErrorMessage('');
                        if (successBanner) setSuccessBanner('');
                      }}
                      className="h-11 w-full rounded-xl border border-slate-300 bg-slate-50/60 pl-10 pr-10 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-[#02060c] focus:outline-none focus:ring-2 focus:ring-[#02060c]/10 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-[#02060c] focus:ring-[#02060c] accent-[#02060c]"
                    />
                    <span>Remember me on this workstation</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-3 w-full h-11 rounded-xl bg-[#02060c] hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow-md disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In to Portal</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Enterprise Security Badge */}
            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck size={14} className="text-emerald-600 shrink-0" />
              <span>Encrypted Session · Avantra Governance Standards</span>
            </div>
          </div>

        </div>
      </main>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => { setShowForgotModal(false); setForgotSent(false); }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X size={18} />
            </button>

            {!forgotSent ? (
              <>
                <div className="flex items-center gap-2 text-[#0A3A40] mb-2">
                  <ShieldCheck size={20} className="text-emerald-600" />
                  <span className="mono text-[10px] uppercase tracking-wider font-semibold">SECURITY PROTOCOL</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Reset Portal Password</h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Enter your registered administrator email to receive secure password recovery instructions.
                </p>

                <form onSubmit={handleForgotSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Registered Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="admin@avantraconsulting.com"
                      value={forgotEmail}
                      onChange={(e) => { setForgotEmail(e.target.value); setForgotError(''); }}
                      className="h-10 w-full rounded-xl border border-slate-300 bg-slate-50 px-3 text-xs text-slate-900 focus:bg-white focus:border-[#02060c] focus:outline-none"
                    />
                    {forgotError && (
                      <div style={{marginTop:'8px', display:'flex', alignItems:'flex-start', gap:'6px', background:'#fef2f2', border:'1px solid #fecaca', borderRadius:'8px', padding:'8px 12px'}}>
                        <span style={{color:'#dc2626', fontSize:'12px'}}>&#9888;</span>
                        <p style={{color:'#dc2626', fontSize:'12px', margin:0, lineHeight:'1.4'}}>{forgotError}</p>
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="w-full h-10 rounded-xl bg-[#02060c] hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {forgotLoading ? <span>Dispatching...</span> : <span>Send Recovery Link</span>}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-4 text-center">
                <CheckCircle2 size={44} className="mx-auto text-emerald-600 mb-3" />
                <h3 className="text-lg font-semibold text-slate-900">
                  {forgotResponse?.emailSent ? 'Recovery Email Sent!' : 'Reset Link Generated!'}
                </h3>
                <p className="mt-2 text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  {forgotResponse?.message || `A verification link has been generated for ${forgotEmail}.`}
                </p>

                {forgotResponse?.resetLink && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-left">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                      Direct Recovery URL:
                    </span>
                    <a
                      href={forgotResponse.resetLink}
                      onClick={(e) => {
                        e.preventDefault();
                        if (forgotResponse?.token) setResetToken(forgotResponse.token);
                        setResetEmail(forgotEmail);
                        setShowForgotModal(false);
                        setShowResetModal(true);
                      }}
                      className="text-xs text-blue-600 hover:underline break-all font-mono cursor-pointer"
                    >
                      {forgotResponse.resetLink}
                    </a>
                  </div>
                )}

                <div className="mt-5 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (forgotResponse?.token) setResetToken(forgotResponse.token);
                      setResetEmail(forgotEmail);
                      setShowForgotModal(false);
                      setShowResetModal(true);
                    }}
                    className="rounded-xl bg-[#02060c] hover:bg-slate-800 px-4 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    Proceed to Reset →
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowForgotModal(false); setForgotSent(false); setForgotResponse(null); }}
                    className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    Return to Sign In
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reset Password Modal (Direct Password Set) */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => { 
                setShowResetModal(false); 
                setResetError(''); 
                setResetSuccessMessage(''); 
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X size={18} />
            </button>

            {!resetSuccessMessage ? (
              <>
                <div className="flex items-center gap-2 text-[#0A3A40] mb-2">
                  <KeyRound size={20} className="text-[#0A3A40]" />
                  <span className="mono text-[10px] uppercase tracking-wider font-semibold">AUTHENTICATION UPDATE</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">Set New Administrator Password</h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                  Enter your new password for administrator access. Once changed, this will be your only active password.
                </p>

                {resetError && (
                  <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 flex items-center gap-2">
                    <X size={15} className="shrink-0" />
                    <span>{resetError}</span>
                  </div>
                )}

                <form onSubmit={handleResetSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => { setNewPassword(e.target.value); setResetError(''); }}
                        className="h-10 w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-10 text-xs text-slate-900 focus:bg-white focus:border-[#02060c] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                      >
                        {showNewPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        required
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value); setResetError(''); }}
                        className="h-10 w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-10 text-xs text-slate-900 focus:bg-white focus:border-[#02060c] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full h-11 rounded-xl bg-[#02060c] hover:bg-slate-800 text-white text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
                  >
                    {resetLoading ? <span>Updating Password...</span> : <span>Save & Activate New Password</span>}
                  </button>
                </form>
              </>
            ) : (
              <div className="py-4 text-center">
                <CheckCircle2 size={46} className="mx-auto text-emerald-600 mb-3" />
                <h3 className="text-lg font-semibold text-slate-900">Password Updated Successfully!</h3>
                <p className="mt-2 text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Your new password is now active in the database. All previous passwords are now invalid.
                </p>

                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowResetModal(false);
                      setResetSuccessMessage('');
                      setUsername('admin');
                      setPassword('');
                      setSuccessBanner('Password changed successfully! Please log in with your new password.');
                    }}
                    className="rounded-xl bg-[#02060c] hover:bg-slate-800 px-6 py-2.5 text-xs font-semibold text-white transition-colors"
                  >
                    Sign In with New Password →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Line */}
      <footer className="w-full py-4 text-center text-[11px] text-slate-500 font-mono">
        &copy; {new Date().getFullYear()} Avantra Consulting LLP. All Rights Reserved. · Confidential &amp; Proprietary
      </footer>
    </div>
  );
};
