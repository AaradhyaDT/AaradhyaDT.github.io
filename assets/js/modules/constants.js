/* ============================================================
   MODULE: constants.js — aaradhyadt.github.io (v54.5)
   Site constants, social links, icons, and configuration metadata.
   ============================================================ */

/* ── Site constants ─────────────────────────────────────────── */
const SITE = {
  GA4_ID: 'G-P38642CDGB',
  formspreeId: 'xnnjkrrn',
  googleClientId: '21529775347-1g1tg96qa47njo5g6fdhsuh81auqm11v.apps.googleusercontent.com',
  masterEmails: [
    'aaradhyadevtmr@gmail.com', 
    'aaradhya.bei79001@gmail.com', 
    'adtgames2061@gmail.com', 
    'devtamrakaraaradhya83@gmail.com'
  ],
  vipEmails: ['*'], // Add specific VIP emails here, or use '*' to allow any verified Google account
  vipDomains: [],  // e.g. ['ioe.edu.np', 'fusemachines.com'] for automatic domain VIP access
  footerCopy: '© 2026 Aaradhya Dev Tamrakar · KEC, IOE, Tribhuvan University',
  socials: [
    { label: 'GitHub', href: 'https://github.com/AaradhyaDT' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aaradhya-dev-tamrakar' },
    { label: 'X', href: 'https://x.com/AaradhyaDT' },
    { label: 'YouTube', href: 'https://www.youtube.com/@aaradhyadevtamrakar' },
    { label: 'Facebook', href: 'https://www.facebook.com/aaradhyadevtamrakar/' },
    { label: 'Instagram', href: 'https://www.instagram.com/aaradhya_dev_tamrakar/' },
  ],
  navLinks: [
    { label: 'Home', labelShort: 'Home', href: '/index.html', key: '1' },
    { label: 'Projects', labelShort: 'Projects', href: '/projects.html', key: '2' },
    { label: 'Experience', labelShort: 'Experience', href: '/experience.html', key: '3' },
    { label: 'Achievements', labelShort: 'Achievements', href: '/achievements.html', key: '4' },
    { label: 'About', labelShort: 'About', href: '/about.html', key: '5' },
    { label: 'Journey', labelShort: 'Journey', href: '/journey.html', key: '6' },
  ],
};

const SOCIAL_ICONS = {
  GitHub: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
  LinkedIn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" r="2"/></svg>`,
  X: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l16 16M4 20L20 4"/></svg>`,
  YouTube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>`,
  Facebook: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  Instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
};

/* ── Quick-nav ("Explore") card data ──────────────────────────
   Single source of truth for the Explore grid on every page.
   `file` matches location.pathname's basename so the renderer can
   find "this page" and mark it --current. Contact is `showOn:
   ['index.html']` — it only appears in Home's grid; every other
   page relies on the always-visible Connect button instead. */
const QUICK_NAV_PAGES = [
  {
    file: 'index.html', title: 'Home',
    desc: 'BEI IV/II at KEC, IOE. Building intelligent systems across firmware, robotics, and machine learning.',
    cta: 'Back to Home',
  },
  {
    file: 'projects.html', title: 'Projects',
    desc: 'Robotics, embedded ML, and the SPARK fall-detection platform.',
    cta: 'View Projects',
  },
  {
    file: 'experience.html', title: 'Experience',
    desc: 'Fellowships, IEEE leadership, and club roles over the past two years.',
    cta: 'View Timeline',
  },
  {
    file: 'achievements.html', title: 'Achievements',
    desc: 'IEEEXtreme, fellowships, certifications, and competition results.',
    cta: 'View Achievements',
  },
  {
    file: 'about.html', title: 'About',
    desc: 'Bio, technical stack, and the path from firmware to applied ML.',
    cta: 'Read Bio',
  },
  {
    file: 'journey.html', title: 'Journey',
    desc: 'How this site was built — applied skillset behind each milestone, linked to the real commit.',
    cta: 'View Build Log',
  },
  {
    file: 'contact.html', title: 'Contact',
    desc: 'Open to collaborations, research, and internship conversations.',
    cta: 'Get in Touch',
    showOn: ['index.html'],
  },
];

const CMDK_TYPE_LABEL = {
  page: 'Page',
  section: 'Location',
  action: 'Action',
  project: 'Project',
  achievement: 'Achievement'
};

const CMDK_ICONS = {
  page: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 22V12h6v10M3 10l9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
  section: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  action: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  project: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  achievement: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M9 13.5 6 22l6-3 6 3-3-8.5"/></svg>',
};
