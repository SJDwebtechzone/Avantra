const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { pool, initializeDatabase } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// In-Memory Data Store for Consultancy Portal Engagements
const engagementsData = [
  {
    id: 'ADV-2026-089',
    title: 'US-India Cross-Border Tax & Corporate Legal Advisory',
    category: 'Legal & Tax Consulting',
    lead: 'David Chen, Senior Advisory Partner',
    status: 'Active',
    progress: 78,
    budget: '$340,000',
    lastUpdate: '2 hours ago'
  },
  {
    id: 'ADV-2026-074',
    title: 'Fintech Regulatory Compliance & Licensing Strategy',
    category: 'Financial Solutions Consulting',
    lead: 'Anand Siddapa, Managing Partner',
    status: 'In Review',
    progress: 92,
    budget: '$520,000',
    lastUpdate: 'Yesterday'
  },
  {
    id: 'ADV-2026-061',
    title: 'Cross-Border Corporate Restructuring & Operations Model',
    category: 'Management Consulting',
    lead: 'Priya Sharma, Senior Strategy Partner',
    status: 'Active',
    progress: 64,
    budget: '$280,000',
    lastUpdate: '3 days ago'
  },
  {
    id: 'ADV-2026-042',
    title: 'Enterprise AI Governance & Strategic Risk Framework',
    category: 'Technology Strategy Consulting',
    lead: 'Marcus Vance, Tech Strategy Principal',
    status: 'Completed',
    progress: 100,
    budget: '$450,000',
    lastUpdate: '1 week ago'
  }
];

const specialistsData = [
  { name: 'Aarav Mehta', role: 'Senior Strategy Consultant', location: 'Bengaluru, IN', status: 'Active Mandate', experience: '11 Yrs' },
  { name: 'Sarah Jenkins', role: 'Corporate Tax Structuring & Advisory Partner', location: 'New York, US', status: 'Advisory Lead', experience: '14 Yrs' },
  { name: 'Vikram Kulkarni', role: 'Digital Transformation & Enterprise Practice Lead', location: 'Bengaluru, IN', status: 'Engaged', experience: '12 Yrs' },
  { name: 'Elena Rostova', role: 'Regulatory Affairs & Cross-Border Governance Director', location: 'Chicago, US', status: 'Active Mandate', experience: '9 Yrs' }
];

const auditLogsData = [
  { time: '14:22 UTC', event: 'Q3 Financial Advisory Summary & Roadmap Finalized', user: 'Sarah Thornton', ip: 'Verified Milestone' },
  { time: '11:05 UTC', event: 'Cross-Border Entity Structuring Legal Brief Delivered', user: 'Anand Siddapa', ip: 'Executive Review' },
  { time: '09:40 UTC', event: 'Operations Diagnostic & Process Strategy Briefing Dispatched', user: 'Priya Sharma', ip: 'Client Sign-off' },
  { time: 'Yesterday', event: 'Executive Board Advisory Presentation Signed', user: 'Sarah Thornton', ip: 'Milestone Completed' }
];

const enquiriesStore = [];

// ==========================================
// Health & Diagnostic Routes
// ==========================================
app.get('/api/health', async (req, res) => {
  try {
    const dbTest = await pool.query('SELECT NOW()');
    res.json({
      status: 'ONLINE',
      service: 'Avantra Executive Intelligence Backend API',
      database: 'PostgreSQL CONNECTED',
      dbTimestamp: dbTest.rows[0].now,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.json({
      status: 'DEGRADED',
      service: 'Avantra Executive Intelligence Backend API',
      database: 'PostgreSQL DISCONNECTED',
      error: err.message,
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  }
});

// ==========================================
// Authentication Endpoint (Single Admin Only - PostgreSQL Backed)
// Initial credentials: username: 'admin', password: 'avantra2026'
// When password is changed via reset, the new password is saved to PostgreSQL
// and immediately becomes the ONLY active password. All others become invalid.
// ==========================================
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Username and password are required.' });
    }

    const inputId = email.trim().toLowerCase();
    const inputPass = password.trim();

    // Query admin_auth from PostgreSQL database
    const dbRes = await pool.query(
      'SELECT * FROM admin_auth WHERE LOWER(username) = $1 OR LOWER(email) = $1 LIMIT 1',
      [inputId]
    );

    const adminUser = dbRes.rows[0];

    // Only matches the single admin with their current active password
    if (!adminUser || adminUser.password !== inputPass) {
      return res.status(401).json({
        success: false,
        error: 'Invalid username or password. Please check your credentials and try again.'
      });
    }

    return res.json({
      success: true,
      message: 'Authentication successful',
      user: {
        name: 'Admin',
        role: 'System Administrator',
        email: adminUser.email,
        company: 'Avantra Consulting LLP',
        avatar: 'AD',
        type: 'advisor',
        token: 'avantra_admin_token_' + Date.now()
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, error: 'Internal server authentication error.' });
  }
});

// Password Reset / Recovery Email Endpoint
app.post('/api/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email address is required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Verify email belongs to admin in PostgreSQL
    const dbRes = await pool.query(
      'SELECT * FROM admin_auth WHERE LOWER(email) = $1 LIMIT 1',
      [normalizedEmail]
    );

    if (dbRes.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No account found with that email address. Please check and try again.'
      });
    }

    const resetToken = 'rst_' + Math.random().toString(36).substring(2, 12) + Date.now().toString(36);
    
    // Save token with 1-hour expiration in PostgreSQL
    await pool.query(
      "UPDATE admin_auth SET reset_token = $1, reset_token_expiry = NOW() + INTERVAL '1 hour', updated_at = NOW() WHERE LOWER(email) = $2",
      [resetToken, normalizedEmail]
    );

    const resetLink = `http://localhost:3000/login?reset_token=${resetToken}&email=${encodeURIComponent(normalizedEmail)}`;

    const smtpUser = process.env.SMTP_USER || 'ramyiezhil.1010@gmail.com';
    const smtpPass = (process.env.SMTP_PASS || '').replace(/\s/g, '');

    if (smtpPass) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      await transporter.sendMail({
        from: `"Avantra Consulting" <${smtpUser}>`,
        to: normalizedEmail,
        subject: 'Avantra Consulting Portal - Password Recovery Link',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
            <div style="margin-bottom: 24px;">
              <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #0A3A40; background-color: #CEE7EA; padding: 4px 8px; border-radius: 4px;">
                SECURITY PROTOCOL
              </span>
            </div>
            <h2 style="color: #02060c; margin-top: 0; margin-bottom: 8px; font-size: 22px; font-weight: 600;">Reset Your Avantra Portal Password</h2>
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
              A password reset request was initiated for your corporate administrator account (<strong>${normalizedEmail}</strong>). Click the button below to set a new password:
            </p>
            <div style="margin-bottom: 28px;">
              <a href="${resetLink}" style="background-color: #02060c; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 10px; font-weight: 600; font-size: 13px; display: inline-block; letter-spacing: 0.05em; text-transform: uppercase;">
                Reset Password →
              </a>
            </div>
            <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin-bottom: 20px;">
              Or copy and paste this recovery URL directly into your browser:<br/>
              <a href="${resetLink}" style="color: #0284c7; word-break: break-all;">${resetLink}</a>
            </p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #94a3b8; font-size: 11px; margin: 0;">
              &copy; ${new Date().getFullYear()} Avantra Consulting LLP · Confidential & Proprietary · Solutioning Together
            </p>
          </div>
        `
      });

      console.log(`Password reset email sent via Gmail SMTP to: ${normalizedEmail}`);
      return res.json({
        success: true,
        emailSent: true,
        message: `Recovery email has been dispatched to ${normalizedEmail}!`,
        resetLink,
        token: resetToken
      });
    } else {
      console.log(`SMTP_PASS not provided. Simulating reset link for: ${normalizedEmail}`);
      return res.json({
        success: true,
        emailSent: false,
        message: `Direct recovery link generated for ${normalizedEmail}:`,
        resetLink,
        token: resetToken
      });
    }
  } catch (error) {
    console.error('Password reset handler error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Set New Password Endpoint (Confirms reset and makes new password the ONLY active one)
app.post('/api/reset-password', async (req, res) => {
  try {
    const { token, email, newPassword } = req.body;
    if (!token || !email || !newPassword) {
      return res.status(400).json({ success: false, error: 'Token, email, and new password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanToken = token.trim();
    const cleanNewPass = newPassword.trim();

    if (cleanNewPass.length < 4) {
      return res.status(400).json({ success: false, error: 'Password must be at least 4 characters long.' });
    }

    // Verify token from database
    const checkRes = await pool.query(
      'SELECT * FROM admin_auth WHERE LOWER(email) = $1 AND reset_token = $2 AND (reset_token_expiry IS NULL OR reset_token_expiry > NOW()) LIMIT 1',
      [cleanEmail, cleanToken]
    );

    if (checkRes.rows.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid or expired password reset link. Please request a new recovery link.'
      });
    }

    // Update password to newPassword and invalidate token
    await pool.query(
      'UPDATE admin_auth SET password = $1, reset_token = NULL, reset_token_expiry = NULL, updated_at = NOW() WHERE LOWER(email) = $2',
      [cleanNewPass, cleanEmail]
    );

    console.log(`Admin password updated successfully in PostgreSQL for ${cleanEmail}. Old passwords are now invalid.`);

    return res.json({
      success: true,
      message: 'Password updated successfully! You can now log in with your new password.'
    });
  } catch (error) {
    console.error('Password reset handler error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// Admin Credentials Settings Endpoints
// ==========================================
app.get('/api/admin/credentials', async (req, res) => {
  try {
    const dbRes = await pool.query('SELECT id, username, email, updated_at FROM admin_auth LIMIT 1');
    if (dbRes.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Admin account not found.' });
    }
    const admin = dbRes.rows[0];
    res.json({
      success: true,
      username: admin.username,
      email: admin.email,
      updatedAt: admin.updated_at
    });
  } catch (err) {
    console.error('Error fetching admin credentials:', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve admin details.' });
  }
});

app.put('/api/admin/credentials', async (req, res) => {
  try {
    const { currentPassword, newUsername, newPassword, newEmail } = req.body;

    if (!currentPassword) {
      return res.status(400).json({ success: false, error: 'Current password is required to authorize changes.' });
    }

    // 1. Verify current credentials against PostgreSQL
    const dbRes = await pool.query('SELECT * FROM admin_auth LIMIT 1');
    if (dbRes.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Admin account not found in database.' });
    }

    const admin = dbRes.rows[0];
    if (admin.password !== currentPassword.trim()) {
      return res.status(401).json({ success: false, error: 'Current password is incorrect. Verification failed.' });
    }

    // 2. Prepare updates
    const targetUsername = newUsername && newUsername.trim() ? newUsername.trim() : admin.username;
    const targetPassword = newPassword && newPassword.trim() ? newPassword.trim() : admin.password;
    const targetEmail = newEmail && newEmail.trim() ? newEmail.trim().toLowerCase() : admin.email;

    if (newPassword && newPassword.trim().length < 6) {
      return res.status(400).json({ success: false, error: 'New password must be at least 6 characters long.' });
    }

    // 3. Update PostgreSQL
    await pool.query(
      `UPDATE admin_auth 
       SET username = $1, password = $2, email = $3, reset_token = NULL, reset_token_expiry = NULL, updated_at = NOW() 
       WHERE id = $4`,
      [targetUsername, targetPassword, targetEmail, admin.id]
    );

    console.log(`Admin credentials updated successfully in PostgreSQL: Username=${targetUsername}, Email=${targetEmail}`);

    res.json({
      success: true,
      message: 'Credentials updated successfully. Your new username and password are now active in PostgreSQL.',
      username: targetUsername,
      email: targetEmail
    });
  } catch (err) {
    console.error('Error updating admin credentials:', err);
    res.status(500).json({ success: false, error: err.message || 'Failed to update credentials.' });
  }
});

// Dashboard Metrics Endpoint
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
app.post('/api/enquire', async (req, res) => {
  const { name, email, company, phone, services, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email are required fields.' });
  }

  const servicesList = Array.isArray(services) 
    ? services 
    : (services ? [services] : ['General Consultation']);

  let dbId = null;
  try {
    const insertRes = await pool.query(
      `INSERT INTO enquiries (name, company, email, phone, services, message, email_sent)
       VALUES ($1, $2, $3, $4, $5, $6, false)
       RETURNING id`,
      [
        name.trim(),
        (company || '').trim(),
        email.trim(),
        (phone || '').trim(),
        servicesList,
        (message || '').trim()
      ]
    );
    dbId = insertRes.rows[0].id;
  } catch (dbErr) {
    console.error('Error saving enquiry to PostgreSQL:', dbErr.message);
  }

  // Target notification email
  const recipientEmail = 'ramyiezhil.1010@gmail.com';
  const smtpUser = process.env.SMTP_USER || 'ramyiezhil.1010@gmail.com';
  const smtpPass = (process.env.SMTP_PASS || '').replace(/\s/g, '');

  let emailSent = false;
  if (smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const formattedServices = servicesList
        .map(s => `<li style="margin-bottom: 6px; font-weight: 500; color: #02060c;">${s}</li>`)
        .join('');

      const mailOptions = {
        from: `"Avantra Consultation Portal" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: `"${name}" <${email}>`,
        subject: `New Client Enquiry: ${name} (${company || 'Individual'})`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 620px; margin: 0 auto; padding: 32px 24px; border: 1px solid #e2e8f0; border-radius: 14px; background-color: #ffffff; color: #0f172a;">
            <div style="border-bottom: 2px solid #CEE7EA; padding-bottom: 16px; margin-bottom: 24px;">
              <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #0A3A40; background-color: #CEE7EA; padding: 4px 10px; border-radius: 4px;">
                NEW CLIENT ENQUIRY
              </span>
              <h2 style="color: #02060c; margin-top: 14px; margin-bottom: 4px; font-size: 22px; font-weight: 600;">
                Consultation Brief Received
              </h2>
              <p style="color: #64748b; font-size: 13px; margin: 0;">
                Submitted via Avantra Consulting Platform · ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST
              </p>
            </div>

            <!-- Client Information Table -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tbody>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; font-size: 13px; font-weight: 600; color: #475569; width: 140px;">Full Name</td>
                  <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #02060c;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; font-size: 13px; font-weight: 600; color: #475569;">Company Name</td>
                  <td style="padding: 10px 0; font-size: 14px; color: #02060c;">${company || 'N/A'}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; font-size: 13px; font-weight: 600; color: #475569;">Work Email</td>
                  <td style="padding: 10px 0; font-size: 14px; color: #0284c7;"><a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 10px 0; font-size: 13px; font-weight: 600; color: #475569;">Phone Number</td>
                  <td style="padding: 10px 0; font-size: 14px; color: #02060c;">${phone || 'Not provided'}</td>
                </tr>
              </tbody>
            </table>

            <!-- Services Section -->
            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 10px;">
                Requested Services:
              </h3>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                ${formattedServices}
              </ul>
            </div>

            <!-- Scope / Message Section -->
            <div style="margin-bottom: 28px;">
              <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 10px;">
                Work Scope &amp; Brief:
              </h3>
              <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.65; color: #1e293b; white-space: pre-wrap;">
${message}
              </div>
            </div>

            <!-- Action Button to reply -->
            <div style="margin-bottom: 28px;">
              <a href="mailto:${email}?subject=${encodeURIComponent('Re: Avantra Consulting - Consultation Request')}" style="background-color: #02060c; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 13px; display: inline-block;">
                Reply Directly to ${name} →
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
            <p style="color: #94a3b8; font-size: 11px; margin: 0;">
              This notification was generated automatically by the Avantra Consulting web portal.
            </p>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      emailSent = true;
      console.log(`Enquiry email successfully dispatched to ${recipientEmail}`);

      if (dbId) {
        await pool.query('UPDATE enquiries SET email_sent = true WHERE id = $1', [dbId]);
      }
    } catch (mailErr) {
      console.error('Error dispatching enquiry email via Gmail SMTP:', mailErr);
    }
  } else {
    console.warn(`SMTP_PASS missing. Simulated enquiry email delivery to ${recipientEmail}`);
  }

  res.json({
    success: true,
    message: 'Thank you. Your consultation request has been received and routed to our team.',
    emailSent,
    enquiryId: dbId || ('ENQ-' + Date.now())
  });
});

// ==========================================
// Dynamic Section 1: Pricing Plans (PostgreSQL)
// ==========================================
app.get('/api/pricing', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pricing ORDER BY id ASC');
    res.json({
      success: true,
      data: result.rows.map(r => ({
        id: r.plan_key,
        dbId: r.id,
        number: r.number,
        title: r.title,
        subtitle: r.subtitle,
        priceStructure: r.price_structure,
        priceNote: r.price_note,
        description: r.description,
        roles: r.roles || [],
        whatsIncluded: r.whats_included || [],
        bestFit: r.best_fit || []
      }))
    });
  } catch (error) {
    console.error('Error fetching pricing from Postgres:', error);
    res.status(500).json({ success: false, error: 'Database error fetching pricing' });
  }
});

app.post('/api/pricing', async (req, res) => {
  try {
    const { number, title, subtitle, priceStructure, priceNote, description, roles, whatsIncluded, bestFit } = req.body;
    const planKey = 'plan-' + Date.now();
    const result = await pool.query(`
      INSERT INTO pricing (plan_key, number, title, subtitle, price_structure, price_note, description, roles, whats_included, best_fit)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [
      planKey,
      number || '01',
      title,
      subtitle || '',
      priceStructure || 'Custom',
      priceNote || '',
      description || '',
      Array.isArray(roles) ? roles : (roles ? roles.split('\n').filter(Boolean) : []),
      Array.isArray(whatsIncluded) ? whatsIncluded : (whatsIncluded ? whatsIncluded.split('\n').filter(Boolean) : []),
      Array.isArray(bestFit) ? bestFit : (bestFit ? bestFit.split('\n').filter(Boolean) : [])
    ]);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating pricing plan:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/pricing/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { number, title, subtitle, priceStructure, priceNote, description, roles, whatsIncluded, bestFit } = req.body;
    const result = await pool.query(`
      UPDATE pricing SET
        number = COALESCE($1, number),
        title = COALESCE($2, title),
        subtitle = COALESCE($3, subtitle),
        price_structure = COALESCE($4, price_structure),
        price_note = COALESCE($5, price_note),
        description = COALESCE($6, description),
        roles = COALESCE($7, roles),
        whats_included = COALESCE($8, whats_included),
        best_fit = COALESCE($9, best_fit),
        updated_at = CURRENT_TIMESTAMP
      WHERE plan_key = $10 OR id::text = $10
      RETURNING *
    `, [
      number,
      title,
      subtitle,
      priceStructure,
      priceNote,
      description,
      Array.isArray(roles) ? roles : (roles ? roles.split('\n').filter(Boolean) : undefined),
      Array.isArray(whatsIncluded) ? whatsIncluded : (whatsIncluded ? whatsIncluded.split('\n').filter(Boolean) : undefined),
      Array.isArray(bestFit) ? bestFit : (bestFit ? bestFit.split('\n').filter(Boolean) : undefined),
      id
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Pricing plan not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating pricing plan:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/pricing/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM pricing WHERE plan_key = $1 OR id::text = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Pricing plan not found' });
    }
    res.json({ success: true, message: 'Pricing plan deleted successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting pricing plan:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// Dynamic Section 2: Articles (PostgreSQL)
// ==========================================
app.get('/api/articles', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM articles ORDER BY id ASC';
    let params = [];
    if (category && category !== 'All') {
      query = 'SELECT * FROM articles WHERE category = $1 ORDER BY id ASC';
      params = [category];
    }
    const result = await pool.query(query, params);
    res.json({
      success: true,
      data: result.rows.map(r => ({
        id: r.article_key,
        dbId: r.id,
        number: r.number,
        slug: r.slug,
        title: r.title,
        category: r.category,
        readTime: r.read_time,
        excerpt: r.excerpt,
        content: r.content
      }))
    });
  } catch (error) {
    console.error('Error fetching articles from Postgres:', error);
    res.status(500).json({ success: false, error: 'Database error fetching articles' });
  }
});

app.get('/api/articles/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query('SELECT * FROM articles WHERE slug = $1 OR article_key = $1 LIMIT 1', [slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }
    const r = result.rows[0];
    res.json({
      success: true,
      data: {
        id: r.article_key,
        dbId: r.id,
        number: r.number,
        slug: r.slug,
        title: r.title,
        category: r.category,
        readTime: r.read_time,
        excerpt: r.excerpt,
        content: r.content
      }
    });
  } catch (error) {
    console.error('Error fetching article detail:', error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

app.post('/api/articles', async (req, res) => {
  try {
    const { number, slug, title, category, readTime, excerpt, content } = req.body;
    const safeSlug = slug ? slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'art-' + Date.now();
    const articleKey = safeSlug;
    const result = await pool.query(`
      INSERT INTO articles (article_key, number, slug, title, category, read_time, excerpt, content)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [articleKey, number || '1', safeSlug, title, category || 'Consulting', readTime || '5 min', excerpt || '', content || '']);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { number, slug, title, category, readTime, excerpt, content } = req.body;
    const result = await pool.query(`
      UPDATE articles SET
        number = COALESCE($1, number),
        slug = COALESCE($2, slug),
        title = COALESCE($3, title),
        category = COALESCE($4, category),
        read_time = COALESCE($5, read_time),
        excerpt = COALESCE($6, excerpt),
        content = COALESCE($7, content),
        updated_at = CURRENT_TIMESTAMP
      WHERE article_key = $8 OR id::text = $8
      RETURNING *
    `, [number, slug, title, category, readTime, excerpt, content, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM articles WHERE article_key = $1 OR id::text = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Article not found' });
    }
    res.json({ success: true, message: 'Article deleted successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// Dynamic Section 3: Updates (PostgreSQL)
// ==========================================
app.get('/api/updates', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM updates ORDER BY id DESC');
    res.json({
      success: true,
      data: result.rows.map(r => ({
        id: r.update_key,
        dbId: r.id,
        title: r.title,
        date: r.date,
        category: r.category,
        content: r.content,
        linkText: r.link_text,
        linkHref: r.link_href
      }))
    });
  } catch (error) {
    console.error('Error fetching updates from Postgres:', error);
    res.status(500).json({ success: false, error: 'Database error fetching updates' });
  }
});

app.post('/api/updates', async (req, res) => {
  try {
    const { title, date, category, content, linkText, linkHref } = req.body;
    const updateKey = 'upd-' + Date.now();
    const result = await pool.query(`
      INSERT INTO updates (update_key, title, date, category, content, link_text, link_href)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [updateKey, title, date || 'Current', category || 'Service Update', content || '', linkText || null, linkHref || null]);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating update:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/updates/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, category, content, linkText, linkHref } = req.body;
    const result = await pool.query(`
      UPDATE updates SET
        title = COALESCE($1, title),
        date = COALESCE($2, date),
        category = COALESCE($3, category),
        content = COALESCE($4, content),
        link_text = COALESCE($5, link_text),
        link_href = COALESCE($6, link_href),
        updated_at = CURRENT_TIMESTAMP
      WHERE update_key = $7 OR id::text = $7
      RETURNING *
    `, [title, date, category, content, linkText, linkHref, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Update not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating update:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/updates/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM updates WHERE update_key = $1 OR id::text = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Update not found' });
    }
    res.json({ success: true, message: 'Update deleted successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting update:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// Dynamic Section 4: Case Studies (PostgreSQL)
// ==========================================
app.get('/api/case-studies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM case_studies ORDER BY id ASC');
    res.json({
      success: true,
      data: result.rows.map(r => ({
        id: r.case_key,
        dbId: r.id,
        slug: r.slug,
        title: r.title,
        client: r.client,
        category: r.category,
        challenge: r.challenge,
        solution: r.solution,
        outcome: r.outcome,
        metrics: r.metrics,
        date: r.date
      }))
    });
  } catch (error) {
    console.error('Error fetching case studies from Postgres:', error);
    res.status(500).json({ success: false, error: 'Database error fetching case studies' });
  }
});

app.get('/api/case-studies/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query('SELECT * FROM case_studies WHERE slug = $1 OR case_key = $1 LIMIT 1', [slug]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Case study not found' });
    }
    const r = result.rows[0];
    res.json({
      success: true,
      data: {
        id: r.case_key,
        dbId: r.id,
        slug: r.slug,
        title: r.title,
        client: r.client,
        category: r.category,
        challenge: r.challenge,
        solution: r.solution,
        outcome: r.outcome,
        metrics: r.metrics,
        date: r.date
      }
    });
  } catch (error) {
    console.error('Error fetching case study:', error);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

app.post('/api/case-studies', async (req, res) => {
  try {
    const { slug, title, client, category, challenge, solution, outcome, metrics, date } = req.body;
    const safeSlug = slug ? slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'cs-' + Date.now();
    const caseKey = safeSlug;
    const result = await pool.query(`
      INSERT INTO case_studies (case_key, slug, title, client, category, challenge, solution, outcome, metrics, date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `, [caseKey, safeSlug, title, client || 'Enterprise Client', category || 'Advisory', challenge || '', solution || '', outcome || '', metrics || '', date || 'Current']);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating case study:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/case-studies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { slug, title, client, category, challenge, solution, outcome, metrics, date } = req.body;
    const result = await pool.query(`
      UPDATE case_studies SET
        slug = COALESCE($1, slug),
        title = COALESCE($2, title),
        client = COALESCE($3, client),
        category = COALESCE($4, category),
        challenge = COALESCE($5, challenge),
        solution = COALESCE($6, solution),
        outcome = COALESCE($7, outcome),
        metrics = COALESCE($8, metrics),
        date = COALESCE($9, date),
        updated_at = CURRENT_TIMESTAMP
      WHERE case_key = $10 OR id::text = $10
      RETURNING *
    `, [slug, title, client, category, challenge, solution, outcome, metrics, date, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Case study not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating case study:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/case-studies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM case_studies WHERE case_key = $1 OR id::text = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Case study not found' });
    }
    res.json({ success: true, message: 'Case study deleted successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting case study:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// Dynamic Section 5: News (PostgreSQL)
// ==========================================
app.get('/api/news', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM news ORDER BY id ASC');
    res.json({
      success: true,
      data: result.rows.map(r => ({
        id: r.news_key,
        dbId: r.id,
        title: r.title,
        date: r.date,
        category: r.category,
        content: r.content
      }))
    });
  } catch (error) {
    console.error('Error fetching news from Postgres:', error);
    res.status(500).json({ success: false, error: 'Database error fetching news' });
  }
});

app.post('/api/news', async (req, res) => {
  try {
    const { title, date, category, content } = req.body;
    const newsKey = 'news-' + Date.now();
    const result = await pool.query(`
      INSERT INTO news (news_key, title, date, category, content)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [newsKey, title, date || 'Current', category || 'Company News', content || '']);
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error creating news item:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.put('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, category, content } = req.body;
    const result = await pool.query(`
      UPDATE news SET
        title = COALESCE($1, title),
        date = COALESCE($2, date),
        category = COALESCE($3, category),
        content = COALESCE($4, content),
        updated_at = CURRENT_TIMESTAMP
      WHERE news_key = $5 OR id::text = $5
      RETURNING *
    `, [title, date, category, content, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'News item not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error updating news item:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM news WHERE news_key = $1 OR id::text = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'News item not found' });
    }
    res.json({ success: true, message: 'News item deleted successfully', data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting news item:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Initialize database schema and start Express Server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  AVANTRA BACKEND API SERVER RUNNING ON PORT ${PORT}`);
    console.log(`  PostgreSQL Database: ${process.env.DB_NAME || 'avantra_db'}`);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`  Dynamic 5-Section CMS APIs:`);
    console.log(`    - /api/pricing (GET, POST, PUT, DELETE)`);
    console.log(`    - /api/articles (GET, POST, PUT, DELETE)`);
    console.log(`    - /api/updates (GET, POST, PUT, DELETE)`);
    console.log(`    - /api/case-studies (GET, POST, PUT, DELETE)`);
    console.log(`    - /api/news (GET, POST, PUT, DELETE)`);
    console.log(`=======================================================`);
  });
}).catch(err => {
  console.error('Failed to initialize database on server startup:', err);
});
