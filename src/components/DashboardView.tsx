import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Sparkles, 
  Briefcase, 
  Newspaper, 
  DollarSign, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Search, 
  RefreshCw, 
  LogOut, 
  Check, 
  X, 
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  User,
  Mail
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

type TabKey = 'pricing' | 'articles' | 'updates' | 'case_studies' | 'news' | 'settings';

// Interfaces for the 5 dynamic sections
export interface PricingPlan {
  id: string;
  dbId?: number;
  number: string;
  title: string;
  subtitle?: string;
  priceStructure: string;
  priceNote?: string;
  description: string;
  roles: string[];
  whatsIncluded?: string[];
  bestFit: string[];
}

export interface ArticleItem {
  id: string;
  dbId?: number;
  number: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  content?: string;
}

export interface UpdateItem {
  id: string;
  dbId?: number;
  title: string;
  date: string;
  category: string;
  content: string;
  linkText?: string;
  linkHref?: string;
}

export interface CaseStudyItem {
  id: string;
  dbId?: number;
  slug: string;
  title: string;
  client: string;
  category: string;
  challenge: string;
  solution: string;
  outcome: string;
  metrics?: string;
  date: string;
}

export interface NewsItem {
  id: string;
  dbId?: number;
  title: string;
  date: string;
  category: string;
  content: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ user: _user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('pricing');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic state for each of the 5 sections
  const [pricingList, setPricingList] = useState<PricingPlan[]>([]);
  const [articlesList, setArticlesList] = useState<ArticleItem[]>([]);
  const [updatesList, setUpdatesList] = useState<UpdateItem[]>([]);
  const [caseStudiesList, setCaseStudiesList] = useState<CaseStudyItem[]>([]);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [pricingForm, setPricingForm] = useState({
    number: '',
    title: '',
    subtitle: '',
    priceStructure: '',
    priceNote: '',
    description: '',
    roles: '',
    whatsIncluded: '',
    bestFit: ''
  });

  const [articleForm, setArticleForm] = useState({
    number: '',
    slug: '',
    title: '',
    category: '',
    readTime: '',
    excerpt: '',
    content: ''
  });

  const [updateForm, setUpdateForm] = useState({
    title: '',
    date: '',
    category: '',
    content: '',
    linkText: '',
    linkHref: ''
  });

  const [caseStudyForm, setCaseStudyForm] = useState({
    slug: '',
    title: '',
    client: '',
    category: '',
    challenge: '',
    solution: '',
    outcome: '',
    metrics: '',
    date: ''
  });

  const [newsForm, setNewsForm] = useState({
    title: '',
    date: '',
    category: '',
    content: ''
  });


  // Settings Form State
  const [settingsUsername, setSettingsUsername] = useState('admin');
  const [settingsEmail, setSettingsEmail] = useState('ramyiezhil.1010@gmail.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState('');
  const [settingsError, setSettingsError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchCredentials = async () => {
    try {
      const res = await fetch('/api/admin/credentials');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setSettingsUsername(json.username);
          setSettingsEmail(json.email);
          if (json.updatedAt) setLastUpdated(new Date(json.updatedAt).toLocaleString());
        }
      }
    } catch (err) {
      console.error('Error fetching admin credentials:', err);
    }
  };

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsError('');
    setSettingsSuccess('');

    if (!currentPassword) {
      setSettingsError('Please enter your current password to authorize this update.');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setSettingsError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setSettingsError('New password and confirmation password do not match.');
      return;
    }

    setSettingsLoading(true);

    try {
      const response = await fetch('/api/admin/credentials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newUsername: settingsUsername,
          newPassword: newPassword || undefined,
          newEmail: settingsEmail
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSettingsSuccess(data.message || 'Credentials updated successfully in PostgreSQL!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setLastUpdated(new Date().toLocaleString());
        showToast('Admin credentials updated successfully');
      } else {
        setSettingsError(data.error || 'Failed to update credentials.');
      }
    } catch (err: any) {
      setSettingsError('Network error connecting to backend: ' + err.message);
    } finally {
      setSettingsLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch all 5 sections from backend
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [pRes, aRes, uRes, cRes, nRes] = await Promise.all([
        fetch('/api/pricing'),
        fetch('/api/articles'),
        fetch('/api/updates'),
        fetch('/api/case-studies'),
        fetch('/api/news')
      ]);

      if (pRes.ok) {
        const pJson = await pRes.json();
        if (pJson.success) setPricingList(pJson.data);
      }
      if (aRes.ok) {
        const aJson = await aRes.json();
        if (aJson.success) setArticlesList(aJson.data);
      }
      if (uRes.ok) {
        const uJson = await uRes.json();
        if (uJson.success) setUpdatesList(uJson.data);
      }
      if (cRes.ok) {
        const cJson = await cRes.json();
        if (cJson.success) setCaseStudiesList(cJson.data);
      }
      if (nRes.ok) {
        const nJson = await nRes.json();
        if (nJson.success) setNewsList(nJson.data);
      }
    } catch (err) {
      console.error('Error fetching dashboard dynamic data:', err);
      showToast('Error syncing with PostgreSQL');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    fetchCredentials();
  }, []);

  // Open Create Modal
  const handleOpenCreate = () => {
    setModalMode('create');
    setEditingId(null);
    if (activeTab === 'pricing') {
      setPricingForm({
        number: `0${pricingList.length + 1}`,
        title: '',
        subtitle: '',
        priceStructure: '',
        priceNote: '',
        description: '',
        roles: '',
        whatsIncluded: '',
        bestFit: ''
      });
    } else if (activeTab === 'articles') {
      setArticleForm({
        number: `${articlesList.length + 1}`,
        slug: '',
        title: '',
        category: 'Legal Support',
        readTime: '5 min',
        excerpt: '',
        content: ''
      });
    } else if (activeTab === 'updates') {
      setUpdateForm({
        title: '',
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        category: 'Service Update',
        content: '',
        linkText: '',
        linkHref: ''
      });
    } else if (activeTab === 'case_studies') {
      setCaseStudyForm({
        slug: '',
        title: '',
        client: '',
        category: 'Finance & Legal',
        challenge: '',
        solution: '',
        outcome: '',
        metrics: '',
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
    } else if (activeTab === 'news') {
      setNewsForm({
        title: '',
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        category: 'Company News',
        content: ''
      });
    }
    setModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: any) => {
    setModalMode('edit');
    setEditingId(item.id);
    if (activeTab === 'pricing') {
      setPricingForm({
        number: item.number || '',
        title: item.title || '',
        subtitle: item.subtitle || '',
        priceStructure: item.priceStructure || '',
        priceNote: item.priceNote || '',
        description: item.description || '',
        roles: (item.roles || []).join('\n'),
        whatsIncluded: (item.whatsIncluded || []).join('\n'),
        bestFit: (item.bestFit || []).join('\n')
      });
    } else if (activeTab === 'articles') {
      setArticleForm({
        number: item.number || '',
        slug: item.slug || '',
        title: item.title || '',
        category: item.category || '',
        readTime: item.readTime || '',
        excerpt: item.excerpt || '',
        content: item.content || ''
      });
    } else if (activeTab === 'updates') {
      setUpdateForm({
        title: item.title || '',
        date: item.date || '',
        category: item.category || '',
        content: item.content || '',
        linkText: item.linkText || '',
        linkHref: item.linkHref || ''
      });
    } else if (activeTab === 'case_studies') {
      setCaseStudyForm({
        slug: item.slug || '',
        title: item.title || '',
        client: item.client || '',
        category: item.category || '',
        challenge: item.challenge || '',
        solution: item.solution || '',
        outcome: item.outcome || '',
        metrics: item.metrics || '',
        date: item.date || ''
      });
    } else if (activeTab === 'news') {
      setNewsForm({
        title: item.title || '',
        date: item.date || '',
        category: item.category || '',
        content: item.content || ''
      });
    }
    setModalOpen(true);
  };

  // Save (Create or Update)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let endpoint = '';
      let method = modalMode === 'create' ? 'POST' : 'PUT';
      let payload: any = {};

      if (activeTab === 'pricing') {
        endpoint = modalMode === 'create' ? '/api/pricing' : `/api/pricing/${editingId}`;
        payload = {
          number: pricingForm.number,
          title: pricingForm.title,
          subtitle: pricingForm.subtitle,
          priceStructure: pricingForm.priceStructure,
          priceNote: pricingForm.priceNote,
          description: pricingForm.description,
          roles: pricingForm.roles.split('\n').map(s => s.trim()).filter(Boolean),
          whatsIncluded: pricingForm.whatsIncluded.split('\n').map(s => s.trim()).filter(Boolean),
          bestFit: pricingForm.bestFit.split('\n').map(s => s.trim()).filter(Boolean)
        };
      } else if (activeTab === 'articles') {
        endpoint = modalMode === 'create' ? '/api/articles' : `/api/articles/${editingId}`;
        payload = {
          number: articleForm.number,
          slug: articleForm.slug || articleForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          title: articleForm.title,
          category: articleForm.category,
          readTime: articleForm.readTime,
          excerpt: articleForm.excerpt,
          content: articleForm.content
        };
      } else if (activeTab === 'updates') {
        endpoint = modalMode === 'create' ? '/api/updates' : `/api/updates/${editingId}`;
        payload = {
          title: updateForm.title,
          date: updateForm.date,
          category: updateForm.category,
          content: updateForm.content,
          linkText: updateForm.linkText || null,
          linkHref: updateForm.linkHref || null
        };
      } else if (activeTab === 'case_studies') {
        endpoint = modalMode === 'create' ? '/api/case-studies' : `/api/case-studies/${editingId}`;
        payload = {
          slug: caseStudyForm.slug || caseStudyForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          title: caseStudyForm.title,
          client: caseStudyForm.client,
          category: caseStudyForm.category,
          challenge: caseStudyForm.challenge,
          solution: caseStudyForm.solution,
          outcome: caseStudyForm.outcome,
          metrics: caseStudyForm.metrics,
          date: caseStudyForm.date
        };
      } else if (activeTab === 'news') {
        endpoint = modalMode === 'create' ? '/api/news' : `/api/news/${editingId}`;
        payload = {
          title: newsForm.title,
          date: newsForm.date,
          category: newsForm.category,
          content: newsForm.content
        };
      }

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Request failed');
      }

      showToast(`Record ${modalMode === 'create' ? 'created' : 'updated'} successfully in PostgreSQL.`);
      setModalOpen(false);
      fetchAllData();
    } catch (err: any) {
      console.error('Error saving item:', err);
      showToast(err.message || 'Error saving record');
    }
  };

  // Delete Record
  const handleDelete = async (id: string) => {
    try {
      let endpoint = '';
      if (activeTab === 'pricing') endpoint = `/api/pricing/${id}`;
      else if (activeTab === 'articles') endpoint = `/api/articles/${id}`;
      else if (activeTab === 'updates') endpoint = `/api/updates/${id}`;
      else if (activeTab === 'case_studies') endpoint = `/api/case-studies/${id}`;
      else if (activeTab === 'news') endpoint = `/api/news/${id}`;

      const res = await fetch(endpoint, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete item');

      showToast('Record deleted from PostgreSQL.');
      setDeleteConfirmId(null);
      fetchAllData();
    } catch (err: any) {
      console.error('Error deleting item:', err);
      showToast(err.message || 'Error deleting record');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#1E293B] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-950 text-white px-4 py-3 shadow-xl text-sm animate-fade-in font-medium">
          <Check size={18} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin CMS Top Navigation */}
      <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/95 backdrop-blur-md px-4 sm:px-6 md:px-8 py-3.5 shadow-sm">
        <div className="w-full flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href="/" className="inline-flex items-center transition-opacity hover:opacity-90" aria-label="Avantra Consulting LLP">
              <img
                src="/avantra-logo.svg"
                alt="Avantra Consulting LLP"
                className="h-8 sm:h-9 w-auto object-contain max-w-[200px] sm:max-w-[260px]"
              />
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg px-3 py-1.5 font-medium transition-colors bg-white hover:bg-slate-50"
            >
              <span>View Live Site</span>
              <ExternalLink size={12} />
            </a>

            <div className="h-4 w-px bg-slate-200" />

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg px-3.5 py-1.5 transition-colors shadow-sm"
              title="Sign Out"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main CMS Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Banner with 5 Sections Navigation */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight">
                Dynamic Content Management
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Manage the 5 live dynamic sections across Avantra Consulting powered by PostgreSQL.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={fetchAllData}
                disabled={loading}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg px-3 py-2 font-medium bg-white hover:bg-slate-50 transition-colors"
                title="Refresh from PostgreSQL"
              >
                <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
                <span>Refresh</span>
              </button>

              {activeTab !== 'settings' && (
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#02060c] hover:bg-slate-800 px-4 py-2 rounded-lg transition-colors shadow-sm"
              >
                <Plus size={15} />
                <span>
                  Add {activeTab === 'pricing' ? 'Pricing Plan' : activeTab === 'articles' ? 'Article' : activeTab === 'updates' ? 'Update' : activeTab === 'case_studies' ? 'Case Study' : 'News'}
                </span>
              </button>
              )}
            </div>
          </div>

          {/* 5 Dynamic Sections Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <button
              onClick={() => { setActiveTab('pricing'); setSearchTerm(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'pricing'
                  ? 'bg-[#02060c] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <DollarSign size={15} />
              <span>1. Pricing Plans</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'pricing' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {pricingList.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('articles'); setSearchTerm(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'articles'
                  ? 'bg-[#02060c] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <FileText size={15} />
              <span>2. Articles</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'articles' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {articlesList.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('updates'); setSearchTerm(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'updates'
                  ? 'bg-[#02060c] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Sparkles size={15} />
              <span>3. Updates</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'updates' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {updatesList.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('case_studies'); setSearchTerm(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'case_studies'
                  ? 'bg-[#02060c] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Briefcase size={15} />
              <span>4. Case Studies</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'case_studies' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {caseStudiesList.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('news'); setSearchTerm(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'news'
                  ? 'bg-[#02060c] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Newspaper size={15} />
              <span>5. News</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'news' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {newsList.length}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setSearchTerm(''); fetchCredentials(); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#02060c] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <KeyRound size={15} />
              <span>6. Admin Security</span>
            </button>

          </div>
        </div>

        {/* Search Bar for Current Section */}
        {activeTab !== 'settings' && (
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab.replace('_', ' ')}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02060c]/20 focus:border-[#02060c] text-slate-800"
            />
          </div>
          <a
            href={
              activeTab === 'pricing' ? '/pricing' :
              activeTab === 'articles' ? '/articles' :
              activeTab === 'updates' ? '/updates' :
              activeTab === 'case_studies' ? '/case-studies' : '/news'
            }
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-medium"
          >
            <span>Open live /{activeTab === 'case_studies' ? 'case-studies' : activeTab} page</span>
            <ArrowUpRight size={13} />
          </a>
        </div>
        )}

        {/* SECTION 1: PRICING PLANS */}
        {activeTab === 'pricing' && (
          <div className="space-y-6">
            {pricingList
              .filter(p => !searchTerm || p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((plan) => {
                const isPlan01 = plan.number === '01' || plan.id === 'full-time-remote';
                const isPlan02 = plan.number === '02' || plan.id === 'virtual-assistant';
                const isPlan03 = plan.number === '03' || plan.id === 'operations-coordinator';

                return (
                  <div key={plan.id} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm hover:border-slate-300 transition-all">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
                      <div>
                        <span className="serif text-3xl font-normal text-[#1a8af9]">{plan.number}</span>
                        <h3 className="text-xl font-semibold text-slate-900 mt-0.5">{plan.title}</h3>
                        {plan.subtitle && (
                          <p className="font-mono text-xs uppercase tracking-wider text-[#1a8af9] mt-1 font-semibold">
                            {plan.subtitle}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl border border-[#abd4fe] bg-[#e9f4ff] px-5 py-3 text-right shadow-xs min-w-[210px]">
                          <span className="block text-[10px] uppercase tracking-[0.14em] text-[#50636b] font-mono font-medium">
                            {plan.priceStructure.toLowerCase() === 'custom' ? 'PRICING STRUCTURE' : (plan.priceNote || 'ESTIMATED MONTHLY SALARY')}
                          </span>
                          <span className="serif text-2xl font-normal text-[#1a8af9] leading-tight block my-0.5">
                            {plan.priceStructure}
                          </span>
                          {plan.priceStructure.toLowerCase() === 'custom' && (
                            <span className="block text-[11px] text-[#50636b] font-sans">
                              {plan.priceNote || 'Based on role, experience & location'}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-1 border-l border-slate-100 pl-3">
                          <button
                            onClick={() => handleOpenEdit(plan)}
                            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Plan"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(plan.id)}
                            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete Plan"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[14px] leading-relaxed text-slate-600 max-w-[900px] mb-5">
                      {plan.description}
                    </p>

                    {/* Plan 01 specific Banner */}
                    {isPlan01 && (
                      <div className="rounded-xl border border-[#CCE8F4] bg-[#E8F4FA]/80 p-4 mb-6">
                        <h4 className="font-semibold text-sm text-[#0F172A] mb-1 flex items-center gap-2">
                          <ShieldCheck size={16} className="text-[#1a8af9] shrink-0" />
                          <span>Build long-term remote teams, without the overhead</span>
                        </h4>
                        <p className="text-xs text-[#475569] leading-relaxed">
                          We handle sourcing, vetting, and onboarding so you can build a stable, integrated remote team — not a rotating cast of contractors.
                        </p>
                      </div>
                    )}

                    {/* Pills Section */}
                    {isPlan01 && (
                      <div className="mb-6 border-b border-slate-100 pb-5">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#1a8af9] font-semibold block mb-2">
                          ROLES WE PLACE
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {(plan.roles || []).map((r, i) => (
                            <span key={i} className="rounded-lg border border-[#BCE1E8] bg-[#E5F3F6] px-3 py-1 text-xs text-[#0A3A40] font-medium">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {isPlan02 && (
                      <div className="grid gap-6 md:grid-cols-2 mb-6 border-b border-slate-100 pb-5">
                        <div>
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#1a8af9] font-semibold block mb-2">
                            WHO IT'S BUILT FOR
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {["eCommerce", "Real Estate", "Customer Support", "Busy Founders"].map((item) => (
                              <span key={item} className="rounded-lg border border-[#BCE1E8] bg-[#E5F3F6] px-3 py-1 text-xs text-[#0A3A40] font-medium">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#1a8af9] font-semibold block mb-2">
                            ROLES AVAILABLE
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {(plan.roles || []).map((r, i) => (
                              <span key={i} className="rounded-lg border border-[#BCE1E8] bg-[#E5F3F6] px-3 py-1 text-xs text-[#0A3A40] font-medium">
                                {r}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {isPlan03 && (
                      <div className="mb-6 border-b border-slate-100 pb-5">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#1a8af9] font-semibold block mb-2">
                          WHO IT'S BUILT FOR
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {(plan.roles || []).map((r, i) => (
                            <span key={i} className="rounded-lg border border-[#BCE1E8] bg-[#E5F3F6] px-3 py-1 text-xs text-[#0A3A40] font-medium">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Generic custom plan pills if not 01/02/03 */}
                    {!isPlan01 && !isPlan02 && !isPlan03 && plan.roles && plan.roles.length > 0 && (
                      <div className="mb-6 border-b border-slate-100 pb-5">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#1a8af9] font-semibold block mb-2">
                          ROLES &amp; SCOPE
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {plan.roles.map((r, i) => (
                            <span key={i} className="rounded-lg border border-[#BCE1E8] bg-[#E5F3F6] px-3 py-1 text-xs text-[#0A3A40] font-medium">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Features section */}
                    {isPlan01 && (
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#1a8af9] font-semibold block mb-2.5">
                            WHAT'S INCLUDED
                          </span>
                          <ul className="space-y-2">
                            {(plan.whatsIncluded || []).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-[#334155]">
                                <Check size={15} className="text-[#1a8af9] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[#1a8af9] font-semibold block mb-2.5">
                            BEST FIT FOR
                          </span>
                          <ul className="space-y-2">
                            {(plan.bestFit || []).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-[#334155]">
                                <Check size={15} className="text-[#334155] shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {isPlan02 && (
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#1a8af9] font-semibold block mb-2.5">
                          BEST FIT FOR
                        </span>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {(plan.bestFit || []).map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-[#334155]">
                              <Check size={15} className="text-[#1a8af9] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {isPlan03 && (
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-[#1a8af9] font-semibold block mb-2.5">
                          BEST FIT FOR
                        </span>
                        <div className="grid gap-2.5 sm:grid-cols-2">
                          {(plan.bestFit || []).map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-[#334155]">
                              <Check size={15} className="text-[#334155] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {!isPlan01 && !isPlan02 && !isPlan03 && (
                      <div className="grid gap-6 md:grid-cols-2">
                        {plan.whatsIncluded && plan.whatsIncluded.length > 0 && (
                          <div>
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[#1a8af9] font-semibold block mb-2.5">
                              WHAT'S INCLUDED
                            </span>
                            <ul className="space-y-2">
                              {plan.whatsIncluded.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-[#334155]">
                                  <Check size={15} className="text-[#1a8af9] shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {plan.bestFit && plan.bestFit.length > 0 && (
                          <div>
                            <span className="font-mono text-[11px] uppercase tracking-wider text-[#1a8af9] font-semibold block mb-2.5">
                              BEST FIT FOR
                            </span>
                            <ul className="space-y-2">
                              {plan.bestFit.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-[#334155]">
                                  <Check size={15} className="text-[#334155] shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        )}

        {/* SECTION 2: ARTICLES */}
        {activeTab === 'articles' && (
          <div className="space-y-4">
            {articlesList
              .filter(a => !searchTerm || a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.category.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((art) => (
                <div key={art.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                        #{art.number}
                      </span>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{art.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                          <span className="bg-[#CEE7EA]/40 text-[#0A3A40] px-2 py-0.5 rounded font-medium">{art.category}</span>
                          <span>•</span>
                          <span>{art.readTime}</span>
                          <span>•</span>
                          <span className="font-mono text-slate-400">/{art.slug}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`/articles/${art.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Article Page"
                      >
                        <ExternalLink size={15} />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(art)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Article"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(art.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Article"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              ))}
          </div>
        )}

        {/* SECTION 3: UPDATES */}
        {activeTab === 'updates' && (
          <div className="space-y-4">
            {updatesList
              .filter(u => !searchTerm || u.title.toLowerCase().includes(searchTerm.toLowerCase()) || u.content.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((upd) => (
                <div key={upd.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                        <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">{upd.category}</span>
                        <span>•</span>
                        <span>{upd.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">{upd.title}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(upd)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Update"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(upd.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Update"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    {upd.content}
                  </p>

                  {upd.linkText && upd.linkHref && (
                    <div className="text-xs text-blue-600 font-medium inline-flex items-center gap-1">
                      <span>Linked action: {upd.linkText}</span>
                      <span className="text-slate-400 font-mono">({upd.linkHref})</span>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* SECTION 4: CASE STUDIES */}
        {activeTab === 'case_studies' && (
          <div className="space-y-4">
            {caseStudiesList
              .filter(c => !searchTerm || c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.client.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((cs) => (
                <div key={cs.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="bg-[#CEE7EA]/50 text-[#0A3A40] font-semibold px-2 py-0.5 rounded">{cs.category}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-700">{cs.client}</span>
                        <span>•</span>
                        <span>{cs.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">{cs.title}</h3>
                      {cs.metrics && (
                        <span className="inline-block mt-1 text-xs font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-medium">
                          {cs.metrics}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`/case-studies/${cs.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Case Study"
                      >
                        <ExternalLink size={15} />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(cs)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Case Study"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(cs.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Case Study"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="font-semibold text-slate-700 block mb-1">Challenge</span>
                      <p className="text-slate-600 line-clamp-3">{cs.challenge}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="font-semibold text-slate-700 block mb-1">Solution</span>
                      <p className="text-slate-600 line-clamp-3">{cs.solution}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="font-semibold text-slate-700 block mb-1">Outcome</span>
                      <p className="text-slate-600 line-clamp-3">{cs.outcome}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* SECTION 5: NEWS */}
        {activeTab === 'news' && (
          <div className="space-y-4">
            {newsList
              .filter(n => !searchTerm || n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.content.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((news) => (
                <div key={news.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-all">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded">{news.category}</span>
                        <span>•</span>
                        <span>{news.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">{news.title}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(news)}
                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit News"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(news.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete News"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {news.content}
                  </p>
                </div>
              ))}
          </div>
        )}

        {/* SECTION 6: ADMIN SECURITY & CREDENTIALS */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-slate-100 text-[#02060c] rounded-xl">
                    <KeyRound size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Admin Account &amp; Credentials</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Change your administrator login username and password. Changes update PostgreSQL instantly.
                    </p>
                  </div>
                </div>
                {lastUpdated && (
                  <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                    Updated: {lastUpdated}
                  </span>
                )}
              </div>

              {settingsSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 animate-fade-in">
                  <Check size={18} className="text-emerald-600 shrink-0" />
                  <span className="font-medium">{settingsSuccess}</span>
                </div>
              )}

              {settingsError && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3 animate-fade-in">
                  <AlertCircle size={18} className="text-rose-600 shrink-0" />
                  <span className="font-medium">{settingsError}</span>
                </div>
              )}

              <form onSubmit={handleUpdateCredentials} className="space-y-6">
                {/* Section 1: Username & Email */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                    1. Account Identity
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Username <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={settingsUsername}
                          onChange={(e) => setSettingsUsername(e.target.value)}
                          placeholder="e.g. admin"
                          className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02060c]/20 focus:border-[#02060c] text-slate-800 font-medium"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">This is what you enter to sign into the dashboard.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Recovery Email Address
                      </label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="email"
                          value={settingsEmail}
                          onChange={(e) => setSettingsEmail(e.target.value)}
                          placeholder="ramyiezhil.1010@gmail.com"
                          className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02060c]/20 focus:border-[#02060c] text-slate-800 font-medium"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Used for password recovery links &amp; client notifications.</p>
                    </div>
                  </div>
                </div>

                {/* Section 2: Current Password Authorization */}
                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
                    2. Security Authorization
                  </h4>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Current Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative max-w-md">
                      <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showCurrentPass ? 'text' : 'password'}
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Enter current password to authorize changes"
                        className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02060c]/20 focus:border-[#02060c] text-slate-800"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showCurrentPass ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">Required to confirm you own this account.</p>
                  </div>
                </div>

                {/* Section 3: New Password */}
                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
                    3. Set New Password (Optional)
                  </h4>
                  <p className="text-xs text-slate-500 mb-3">Leave these fields empty if you only want to change your username or email.</p>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type={showNewPass ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02060c]/20 focus:border-[#02060c] text-slate-800"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showNewPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type={showConfirmPass ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-enter new password"
                          className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#02060c]/20 focus:border-[#02060c] text-slate-800"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showConfirmPass ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-[12px] text-slate-500 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-600 shrink-0" />
                    <span>Changes take effect immediately. Old credentials are permanently overwritten.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={settingsLoading}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm text-white bg-[#02060c] hover:bg-slate-800 transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {settingsLoading ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>Saving Changes...</span>
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        <span>Update Credentials</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-sm w-full shadow-2xl animate-fade-in">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <AlertCircle size={22} />
              <h4 className="font-semibold text-base text-slate-900">Confirm Deletion</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-5">
              Are you sure you want to delete this record from PostgreSQL? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal (Create or Edit) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full shadow-2xl animate-fade-in my-8 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
              <h3 className="font-semibold text-base text-slate-900">
                {modalMode === 'create' ? 'Add New' : 'Edit'}{' '}
                {activeTab === 'pricing' ? 'Pricing Plan' : activeTab === 'articles' ? 'Article' : activeTab === 'updates' ? 'Update' : activeTab === 'case_studies' ? 'Case Study' : 'News'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
              {/* Pricing Form Fields */}
              {activeTab === 'pricing' && (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Number (e.g. 01)</label>
                      <input
                        type="text"
                        required
                        value={pricingForm.number}
                        onChange={(e) => setPricingForm({ ...pricingForm, number: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">Plan Title</label>
                      <input
                        type="text"
                        required
                        value={pricingForm.title}
                        onChange={(e) => setPricingForm({ ...pricingForm, title: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                        placeholder="e.g. Full-Time Remote Employees"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subtitle / Tagline</label>
                    <input
                      type="text"
                      value={pricingForm.subtitle}
                      onChange={(e) => setPricingForm({ ...pricingForm, subtitle: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                      placeholder="e.g. Transparent pricing, built around the hire"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Pricing Structure</label>
                      <input
                        type="text"
                        required
                        value={pricingForm.priceStructure}
                        onChange={(e) => setPricingForm({ ...pricingForm, priceStructure: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                        placeholder="e.g. Custom or $500–$900 USD"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Price Note / Label</label>
                      <input
                        type="text"
                        value={pricingForm.priceNote}
                        onChange={(e) => setPricingForm({ ...pricingForm, priceNote: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                        placeholder="e.g. Estimated Monthly Salary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      value={pricingForm.description}
                      onChange={(e) => setPricingForm({ ...pricingForm, description: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Roles We Place (one per line)</label>
                    <textarea
                      rows={3}
                      value={pricingForm.roles}
                      onChange={(e) => setPricingForm({ ...pricingForm, roles: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono text-xs"
                      placeholder="Paralegal and Secretarial&#10;Book-keeping&#10;Accountant"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">What's Included (one per line)</label>
                      <textarea
                        rows={4}
                        value={pricingForm.whatsIncluded}
                        onChange={(e) => setPricingForm({ ...pricingForm, whatsIncluded: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono text-xs"
                        placeholder="End-to-end recruitment&#10;Pre-vetted candidate shortlists"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Best Fit For (one per line)</label>
                      <textarea
                        rows={4}
                        value={pricingForm.bestFit}
                        onChange={(e) => setPricingForm({ ...pricingForm, bestFit: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono text-xs"
                        placeholder="Companies hiring long-term remote talent&#10;Legal and operational roles"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Articles Form Fields */}
              {activeTab === 'articles' && (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Number (e.g. 1)</label>
                      <input
                        type="text"
                        required
                        value={articleForm.number}
                        onChange={(e) => setArticleForm({ ...articleForm, number: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">Article Title</label>
                      <input
                        type="text"
                        required
                        value={articleForm.title}
                        onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        required
                        value={articleForm.category}
                        onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                        placeholder="e.g. Legal Support, Remote Staffing"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Read Time</label>
                      <input
                        type="text"
                        value={articleForm.readTime}
                        onChange={(e) => setArticleForm({ ...articleForm, readTime: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                        placeholder="e.g. 5 min"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Slug (URL path)</label>
                    <input
                      type="text"
                      value={articleForm.slug}
                      onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono text-xs"
                      placeholder="leave empty to generate from title"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Excerpt</label>
                    <textarea
                      rows={3}
                      required
                      value={articleForm.excerpt}
                      onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Full Article Content (Optional Markdown/HTML)</label>
                    <textarea
                      rows={4}
                      value={articleForm.content}
                      onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono text-xs"
                    />
                  </div>
                </>
              )}

              {/* Updates Form Fields */}
              {activeTab === 'updates' && (
                <>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Update Title</label>
                    <input
                      type="text"
                      required
                      value={updateForm.title}
                      onChange={(e) => setUpdateForm({ ...updateForm, title: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        required
                        value={updateForm.category}
                        onChange={(e) => setUpdateForm({ ...updateForm, category: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Date</label>
                      <input
                        type="text"
                        required
                        value={updateForm.date}
                        onChange={(e) => setUpdateForm({ ...updateForm, date: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Update Content</label>
                    <textarea
                      rows={4}
                      required
                      value={updateForm.content}
                      onChange={(e) => setUpdateForm({ ...updateForm, content: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Action Link Text (Optional)</label>
                      <input
                        type="text"
                        value={updateForm.linkText}
                        onChange={(e) => setUpdateForm({ ...updateForm, linkText: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                        placeholder="e.g. Read full announcement →"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Action Link URL (Optional)</label>
                      <input
                        type="text"
                        value={updateForm.linkHref}
                        onChange={(e) => setUpdateForm({ ...updateForm, linkHref: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                        placeholder="e.g. /get-started"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Case Studies Form Fields */}
              {activeTab === 'case_studies' && (
                <>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Case Study Title</label>
                    <input
                      type="text"
                      required
                      value={caseStudyForm.title}
                      onChange={(e) => setCaseStudyForm({ ...caseStudyForm, title: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Client Name / Type</label>
                      <input
                        type="text"
                        required
                        value={caseStudyForm.client}
                        onChange={(e) => setCaseStudyForm({ ...caseStudyForm, client: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                        placeholder="e.g. Global FinTech Operator"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        required
                        value={caseStudyForm.category}
                        onChange={(e) => setCaseStudyForm({ ...caseStudyForm, category: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                        placeholder="e.g. Finance & Legal"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Date / Period</label>
                      <input
                        type="text"
                        required
                        value={caseStudyForm.date}
                        onChange={(e) => setCaseStudyForm({ ...caseStudyForm, date: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                        placeholder="e.g. Q3 2026"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Key Metrics Highlight</label>
                      <input
                        type="text"
                        value={caseStudyForm.metrics}
                        onChange={(e) => setCaseStudyForm({ ...caseStudyForm, metrics: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono text-xs"
                        placeholder="e.g. 90-Day Clearance · $180k Saved"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Slug (URL identifier)</label>
                      <input
                        type="text"
                        value={caseStudyForm.slug}
                        onChange={(e) => setCaseStudyForm({ ...caseStudyForm, slug: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono text-xs"
                        placeholder="leave empty to generate"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">The Challenge</label>
                    <textarea
                      rows={2}
                      required
                      value={caseStudyForm.challenge}
                      onChange={(e) => setCaseStudyForm({ ...caseStudyForm, challenge: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">The Solution</label>
                    <textarea
                      rows={2}
                      required
                      value={caseStudyForm.solution}
                      onChange={(e) => setCaseStudyForm({ ...caseStudyForm, solution: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">The Outcome</label>
                    <textarea
                      rows={2}
                      required
                      value={caseStudyForm.outcome}
                      onChange={(e) => setCaseStudyForm({ ...caseStudyForm, outcome: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    />
                  </div>
                </>
              )}

              {/* News Form Fields */}
              {activeTab === 'news' && (
                <>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">News Headline</label>
                    <input
                      type="text"
                      required
                      value={newsForm.title}
                      onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Category</label>
                      <input
                        type="text"
                        required
                        value={newsForm.category}
                        onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                        placeholder="e.g. Company News, Partnerships"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Date</label>
                      <input
                        type="text"
                        required
                        value={newsForm.date}
                        onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">News Story / Content</label>
                    <textarea
                      rows={5}
                      required
                      value={newsForm.content}
                      onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#02060c] hover:bg-slate-800 rounded-lg shadow-sm"
                >
                  {modalMode === 'create' ? 'Publish to PostgreSQL' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
