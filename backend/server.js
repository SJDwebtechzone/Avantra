const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// In-Memory Data Store
const engagementsData = [
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

const specialistsData = [
  { name: 'Aarav Mehta', role: 'Senior Regulatory Paralegal', location: 'Bangalore, IN', status: 'Assigned', experience: '8 Yrs' },
  { name: 'Sarah Jenkins', role: 'Corporate Tax Structuring Specialist', location: 'New York, US', status: 'Deployed', experience: '12 Yrs' },
  { name: 'Vikram Kulkarni', role: 'Enterprise Cloud Architect', location: 'Bengaluru, IN', status: 'Deployed', experience: '10 Yrs' },
  { name: 'Elena Rostova', role: 'Cross-Border Compliance Auditor', location: 'Chicago, US', status: 'Assigned', experience: '7 Yrs' }
];

const auditLogsData = [
  { time: '14:22 UTC', event: 'Q3 Financial Advisory Summary downloaded', user: 'Eleanor Vance', ip: '192.168.1.104' },
  { time: '11:05 UTC', event: 'SOC2 Type II Compliance Certificate Verified', user: 'System Automated', ip: 'Internal Gateway' },
  { time: '09:40 UTC', event: 'Paralegal Roster #42 Expanded (+4 Team Members)', user: 'Priya Sharma', ip: '10.0.4.12' },
  { time: 'Yesterday', event: 'Encrypted Board Briefing Signed via SSL Gateway', user: 'Eleanor Vance', ip: '192.168.1.104' }
];

const enquiriesStore = [];

// API Routes

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Avantra Strategic Intelligence Backend API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Authentication Endpoint
app.post('/api/login', (req, res) => {
  const { email, password, roleType } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Determine user profile based on roleType or email domain
  let user;
  if (roleType === 'advisor' || email.includes('avantra.com')) {
    user = {
      name: 'Anand Siddapa',
      role: 'Managing Partner & Executive Advisor',
      email: email,
      company: 'Avantra Leadership Council',
      avatar: 'AS',
      type: 'advisor',
      token: 'avantra_advisor_token_' + Date.now()
    };
  } else {
    user = {
      name: 'Eleanor Vance',
      role: 'Chief Strategy Officer & VP',
      email: email,
      company: 'Acme Global Enterprises',
      avatar: 'EV',
      type: 'client',
      token: 'avantra_client_token_' + Date.now()
    };
  }

  res.json({
    success: true,
    message: 'Authentication successful',
    user
  });
});

// Dashboard Metrics & Engagements Endpoint
app.get('/api/dashboard', (req, res) => {
  res.json({
    success: true,
    metrics: {
      activeEngagementsCount: engagementsData.length,
      deployedTalentCount: 128,
      portfolioValuation: '$4.82M USD',
      complianceScore: '99.4%'
    },
    engagements: engagementsData,
    specialists: specialistsData,
    auditLogs: auditLogsData
  });
});

// Enquire / Consultation Form Submission Endpoint
app.post('/api/enquire', (req, res) => {
  const { name, email, company, practice, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required fields.' });
  }

  const newEnquiry = {
    id: 'ENQ-' + Date.now(),
    name,
    email,
    company: company || 'N/A',
    practice: practice || 'General Advisory',
    message: message || '',
    submittedAt: new Date().toISOString()
  };

  enquiriesStore.push(newEnquiry);
  console.log('New Consultation Enquiry Received:', newEnquiry);

  res.json({
    success: true,
    message: 'Thank you. Your consultation request has been logged with Avantra Senior Advisors.',
    enquiryId: newEnquiry.id
  });
});

// Services Endpoint
app.get('/api/services', (req, res) => {
  res.json({
    success: true,
    practices: [
      { id: 'paralegal', title: 'Paralegal Services', region: 'US & India' },
      { id: 'finance', title: 'Financial Solutions', region: 'Global' },
      { id: 'technology', title: 'Technology Solutions', region: 'US & India' },
      { id: 'staffing', title: 'Specialized Staffing', region: 'Global' }
    ]
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`  AVANTRA BACKEND API SERVER RUNNING ON PORT ${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
