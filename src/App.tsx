import { useState } from 'react'
import './App.css'

const CORRECT_PASSWORD = ['warranty', 'lawncare']

type RouteKey = 'examples' | 'process'

type ProcessTabKey = 'moodboard' | 'information-architecture' | 'wireframes' | 'hi-fi-design' | 'user-flows'

type ProcessTabInfo = {
  key: ProcessTabKey
  label: string
  embedUrl: string
  description: string
  logo: 'giftpass' | 'roil'
}

type ExampleTabKey = 'example-video-1' | 'example-video-2'

type ExampleTabInfo = {
  key: ExampleTabKey
  label: string
  videoUrl: string
  description: string
}

const PROCESS_TABS: ProcessTabInfo[] = [
  {
    key: 'moodboard',
    label: 'MOODBOARD',
    embedUrl: 'https://embed.figma.com/design/t2mEO6QVUfP2vRFIzTNKw7/Gift-Pass-Embed?node-id=0-1&embed-host=share',
    description: 'A collection of visual inspiration, color palettes, and design references that guided the aesthetic direction of Gift Pass.',
    logo: 'giftpass'
  },
  {
    key: 'information-architecture',
    label: 'INFORMATION ARCHITECTURE',
    embedUrl: 'https://embed.figma.com/design/t2mEO6QVUfP2vRFIzTNKw7/Gift-Pass-Embed?node-id=1-30&embed-host=share',
    description: 'The structural blueprint showing how content and features are organized within the Gift Pass experience.',
    logo: 'giftpass'
  },
  {
    key: 'wireframes',
    label: 'WIREFRAMES',
    embedUrl: 'https://embed.figma.com/design/t2mEO6QVUfP2vRFIzTNKw7/Gift-Pass-Embed?node-id=1-1593&embed-host=share',
    description: 'Low-fidelity layouts that establish the foundational structure and user flow for Gift Pass screens.',
    logo: 'giftpass'
  },
  {
    key: 'hi-fi-design',
    label: 'HI-FI DESIGN',
    embedUrl: 'https://embed.figma.com/design/t2mEO6QVUfP2vRFIzTNKw7/Gift-Pass-Embed?node-id=2-1654&embed-host=share',
    description: 'Polished, pixel-perfect designs showcasing the final visual direction and UI components for Gift Pass.',
    logo: 'giftpass'
  },
  {
    key: 'user-flows',
    label: 'DATA FLOWS',
    embedUrl: 'https://embed.figma.com/board/8WJf9UKzZ98dHXNZscAYE9/Flow?node-id=0-1&embed-host=share',
    description: 'Detailed diagrams mapping out the data flow and control flow of the Roil application.',
    logo: 'roil'
  }
]

const EXAMPLE_TABS: ExampleTabInfo[] = [
  {
    key: 'example-video-1',
    label: 'Bond Trading Platform',
    videoUrl: 'https://jrwt-examples.s3.ap-southeast-1.amazonaws.com/JRWT-Example1.mp4',
    description: 'Platform built for a finance client to trade bonds.'
  },
  {
    key: 'example-video-2',
    label: 'Advertising Platform',
    videoUrl: 'https://jrwt-examples.s3.ap-southeast-1.amazonaws.com/JRWT-Example2.mp4',
    description: 'Platform built for a client to manage outdoor advertising campaigns.'
  }
]

const PUBLIC_DASHBOARD_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Irvington UFSD — November 2025 Financial Dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0d1b2a;
    --navy-mid: #1a2d42;
    --navy-light: #243d57;
    --gold: #c8963e;
    --gold-light: #e6b86a;
    --cream: #f5f0e8;
    --cream-dark: #ede6d6;
    --green: #2a7a5b;
    --green-light: #3aa878;
    --red: #b84c4c;
    --text-main: #1a1a2e;
    --text-muted: #5a6575;
    --border: #ddd6c8;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--text-main);
    min-height: 100vh;
  }

  /* HEADER */
  header {
    background: var(--navy);
    padding: 36px 48px;
    position: relative;
    overflow: hidden;
  }
  header::before {
    content: '';
    position: absolute;
    top: -60px; right: -60px;
    width: 240px; height: 240px;
    border: 2px solid rgba(200,150,62,0.18);
    border-radius: 50%;
    pointer-events: none;
  }
  header::after {
    content: '';
    position: absolute;
    top: -20px; right: 20px;
    width: 140px; height: 140px;
    border: 2px solid rgba(200,150,62,0.10);
    border-radius: 50%;
    pointer-events: none;
  }
  .header-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 8px;
  }
  .header-title {
    font-family: 'DM Serif Display', serif;
    font-size: 32px;
    color: #fff;
    line-height: 1.2;
    margin-bottom: 4px;
  }
  .header-sub {
    font-size: 14px;
    color: rgba(255,255,255,0.5);
    font-weight: 300;
  }
  .header-badge {
    position: absolute;
    top: 36px; right: 48px;
    background: rgba(200,150,62,0.15);
    border: 1px solid var(--gold);
    color: var(--gold-light);
    font-size: 12px;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 20px;
    letter-spacing: 0.5px;
    z-index: 1;
  }
  .header-download {
    position: absolute;
    top: 84px; right: 48px;
    font-size: 12px;
    color: rgba(255,255,255,0.8);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    z-index: 1;
  }
  .header-download:hover { color: #fff; }
  .header-download svg {
    width: 14px;
    height: 14px;
    display: block;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.8;
  }

  /* LAYOUT */
  main {
    max-width: 1280px;
    margin: 0 auto;
    padding: 40px 48px 60px;
  }

  .section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 18px;
    color: var(--navy);
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--gold);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .section-title span {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  /* KPI CARDS */
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 40px;
  }
  .kpi-card {
    background: var(--navy);
    border-radius: 12px;
    padding: 28px 24px;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.5s ease both;
  }
  .kpi-card:nth-child(2) { animation-delay: 0.08s; }
  .kpi-card:nth-child(3) { animation-delay: 0.16s; }
  .kpi-card:nth-child(4) { animation-delay: 0.24s; }
  .kpi-card::after {
    content: '';
    position: absolute;
    bottom: -30px; right: -30px;
    width: 100px; height: 100px;
    border-radius: 50%;
    background: rgba(200,150,62,0.07);
  }
  .kpi-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 12px;
  }
  .kpi-value {
    font-family: 'DM Serif Display', serif;
    font-size: 26px;
    color: #fff;
    line-height: 1;
    margin-bottom: 8px;
  }
  .kpi-delta {
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .kpi-delta.up { color: var(--green-light); }
  .kpi-delta.neutral { color: rgba(255,255,255,0.45); }
  .kpi-delta.warn { color: #e8a84c; }

  /* FUND BREAKDOWN */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
    margin-bottom: 40px;
  }
  .three-col {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 28px;
    margin-bottom: 40px;
  }

  .card {
    background: #fff;
    border-radius: 12px;
    padding: 28px;
    border: 1px solid var(--border);
    animation: fadeUp 0.5s ease both;
  }
  .card-title {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 22px;
  }

  /* FUND TABLE */
  .fund-row {
    display: flex;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--cream-dark);
    gap: 14px;
  }
  .fund-row:last-child { border-bottom: none; }
  .fund-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .fund-name {
    font-size: 14px;
    font-weight: 500;
    flex: 1;
    color: var(--text-main);
  }
  .fund-val {
    font-size: 14px;
    font-weight: 600;
    color: var(--navy);
    text-align: right;
    min-width: 110px;
  }
  .fund-bar-wrap {
    width: 90px;
    height: 6px;
    background: var(--cream-dark);
    border-radius: 3px;
    overflow: hidden;
  }
  .fund-bar {
    height: 100%;
    border-radius: 3px;
    transition: width 1s ease;
  }

  /* REVENUE PROGRESS */
  .rev-row {
    margin-bottom: 18px;
  }
  .rev-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;
  }
  .rev-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-main);
  }
  .rev-pct {
    font-size: 13px;
    font-weight: 700;
    color: var(--navy);
  }
  .rev-track {
    height: 8px;
    background: var(--cream-dark);
    border-radius: 4px;
    overflow: hidden;
  }
  .rev-fill {
    height: 100%;
    border-radius: 4px;
    background: linear-gradient(90deg, var(--navy-light), var(--gold));
    transition: width 1.2s cubic-bezier(.16,1,.3,1);
  }
  .rev-amounts {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }
  .rev-sub {
    font-size: 11px;
    color: var(--text-muted);
  }

  /* EXPENDITURE CATEGORIES */
  .exp-row {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid var(--cream-dark);
    gap: 12px;
  }
  .exp-row:last-child { border-bottom: none; }
  .exp-cat {
    font-size: 13px;
    font-weight: 500;
    flex: 1;
  }
  .exp-actual {
    font-size: 13px;
    font-weight: 700;
    color: var(--navy);
    min-width: 90px;
    text-align: right;
  }
  .exp-remain {
    font-size: 12px;
    color: var(--text-muted);
    min-width: 50px;
    text-align: right;
  }
  .exp-bar-wrap {
    width: 80px;
    height: 6px;
    background: var(--cream-dark);
    border-radius: 3px;
    overflow: hidden;
  }
  .exp-bar {
    height: 100%;
    border-radius: 3px;
    background: linear-gradient(90deg, var(--navy-mid), var(--green));
  }

  /* HIGHLIGHTS BOX */
  .highlight-item {
    display: flex;
    gap: 14px;
    padding: 14px 0;
    border-bottom: 1px solid var(--cream-dark);
    align-items: flex-start;
  }
  .highlight-item:last-child { border-bottom: none; }
  .highlight-icon {
    width: 36px; height: 36px;
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }
  .highlight-text {
    font-size: 13px;
    line-height: 1.6;
    color: var(--text-main);
  }
  .highlight-text strong { color: var(--navy); }

  /* RECEIPTS vs EXPENDITURES */
  .summary-compare {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-top: 4px;
  }
  .compare-block {
    background: var(--cream);
    border-radius: 10px;
    padding: 18px;
  }
  .compare-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 8px;
    color: var(--text-muted);
  }
  .compare-val {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    color: var(--navy);
  }
  .compare-sub {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 4px;
  }

  /* BANK BALANCE */
  .bank-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 11px 0;
    border-bottom: 1px solid var(--cream-dark);
  }
  .bank-row:last-child { border-bottom: none; }
  .bank-name { font-size: 14px; font-weight: 500; }
  .bank-val { font-size: 14px; font-weight: 700; color: var(--navy); }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .card:nth-child(1) { animation-delay: 0.1s; }
  .card:nth-child(2) { animation-delay: 0.2s; }

  /* FOOTER */
  footer {
    background: var(--navy);
    color: rgba(255,255,255,0.4);
    text-align: center;
    font-size: 12px;
    padding: 20px 48px;
    letter-spacing: 0.5px;
  }
  footer strong { color: var(--gold); }

  @media (max-width: 900px) {
    main { padding: 24px 20px; }
    .kpi-grid { grid-template-columns: 1fr 1fr; }
    .two-col, .three-col { grid-template-columns: 1fr; }
    header { padding: 24px 20px; }
    .header-badge { display: none; }
    .header-download {
      position: static;
      margin-top: 10px;
    }
  }
</style>
</head>
<body>

<header>
  <div class="header-label">Financial Dashboard</div>
  <div class="header-title">Irvington Union Free School District</div>
  <div class="header-sub">Treasurer's Report — November 2025 &nbsp;·&nbsp; Certified by Evan Gross, Treasurer</div>
  <div class="header-badge">FY 2025–26</div>
  <a class="header-download" href="/Treasurer%27s%20Report%20-%20November%202025.pdf" download="Treasurer's Report - November 2025.pdf">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h7l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M13 3v5h5" />
    </svg>
    Download PDF
  </a>
</header>

<main>

  <!-- KPI ROW -->
  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-label">Ending Cash Balance</div>
      <div class="kpi-value">$36.61M</div>
      <div class="kpi-delta up">↑ $2.67M vs Nov 2024</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Total Receipts (Nov)</div>
      <div class="kpi-value">$2.91M</div>
      <div class="kpi-delta neutral">Across all funds</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">Total Expenditures (Nov)</div>
      <div class="kpi-value">$6.29M</div>
      <div class="kpi-delta warn">Incl. $1.01M bond payment</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-label">YTD Revenue Received</div>
      <div class="kpi-value">92.9%</div>
      <div class="kpi-delta up">↑ $73.57M of $79.15M budget</div>
    </div>
  </div>

  <!-- FUND BALANCES + RECEIPTS vs EXPENDITURES -->
  <div class="two-col">
    <div class="card">
      <div class="card-title">Ending Cash Balance by Fund</div>
      <div class="fund-row">
        <div class="fund-dot" style="background:#0d1b2a"></div>
        <div class="fund-name">General Fund</div>
        <div class="fund-bar-wrap"><div class="fund-bar" style="background:#0d1b2a;width:97%"></div></div>
        <div class="fund-val">$35,447,374</div>
      </div>
      <div class="fund-row">
        <div class="fund-dot" style="background:#2a7a5b"></div>
        <div class="fund-name">Capital Fund</div>
        <div class="fund-bar-wrap"><div class="fund-bar" style="background:#2a7a5b;width:100%"></div></div>
        <div class="fund-val">$381,976</div>
      </div>
      <div class="fund-row">
        <div class="fund-dot" style="background:#c8963e"></div>
        <div class="fund-name">Misc. Special Revenue</div>
        <div class="fund-bar-wrap"><div class="fund-bar" style="background:#c8963e;width:100%"></div></div>
        <div class="fund-val">$487,897</div>
      </div>
      <div class="fund-row">
        <div class="fund-dot" style="background:#6b8cae"></div>
        <div class="fund-name">School Lunch</div>
        <div class="fund-bar-wrap"><div class="fund-bar" style="background:#6b8cae;width:75%"></div></div>
        <div class="fund-val">$276,102</div>
      </div>
      <div class="fund-row">
        <div class="fund-dot" style="background:#b84c4c"></div>
        <div class="fund-name">Special Aid</div>
        <div class="fund-bar-wrap"><div class="fund-bar" style="background:#b84c4c;width:5%"></div></div>
        <div class="fund-val">$20,245</div>
      </div>
      <div style="margin-top:16px;padding-top:14px;border-top:2px solid var(--navy);display:flex;justify-content:space-between;align-items:center">
        <div style="font-size:13px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px">Total</div>
        <div style="font-family:'DM Serif Display',serif;font-size:22px;color:var(--navy)">$36,613,593</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">November Cash Flow Summary</div>
      <div class="summary-compare">
        <div class="compare-block">
          <div class="compare-label">Opening Balance</div>
          <div class="compare-val">$39.99M</div>
          <div class="compare-sub">All funds combined</div>
        </div>
        <div class="compare-block">
          <div class="compare-label">Closing Balance</div>
          <div class="compare-val">$36.61M</div>
          <div class="compare-sub">All funds combined</div>
        </div>
      </div>
      <div style="margin-top:20px">
        <div class="bank-row">
          <div class="bank-name">Total Receipts</div>
          <div class="bank-val" style="color:var(--green)">+ $2,908,804</div>
        </div>
        <div class="bank-row">
          <div class="bank-name">Total Expenditures</div>
          <div class="bank-val" style="color:var(--red)">− $6,289,223</div>
        </div>
        <div class="bank-row">
          <div class="bank-name">Net Monthly Change</div>
          <div class="bank-val" style="color:var(--red)">− $3,380,419</div>
        </div>
      </div>
      <div style="margin-top:20px">
        <div class="card-title" style="margin-bottom:12px">Bank Balance Breakdown</div>
        <div class="bank-row">
          <div class="bank-name">Checking Accounts</div>
          <div class="bank-val">$2,537,842</div>
        </div>
        <div class="bank-row">
          <div class="bank-name">Investments</div>
          <div class="bank-val">$34,075,751</div>
        </div>
      </div>
    </div>
  </div>

  <!-- REVENUE REPORT -->
  <div class="section-title">General Fund Revenue <span>July 1 – November 30, 2025</span></div>
  <div class="two-col" style="margin-bottom:40px">
    <div class="card">
      <div class="card-title">Revenue by Category — % of Budget Received</div>
      
      <div class="rev-row">
        <div class="rev-header">
          <div class="rev-name">Real Property Taxes</div>
          <div class="rev-pct">100.0%</div>
        </div>
        <div class="rev-track"><div class="rev-fill" style="width:100%"></div></div>
        <div class="rev-amounts">
          <div class="rev-sub">Received: $66,695,472</div>
          <div class="rev-sub">Budget: $66,695,472</div>
        </div>
      </div>
      
      <div class="rev-row">
        <div class="rev-header">
          <div class="rev-name">School Tax Relief (STAR & PILOT)</div>
          <div class="rev-pct">98.8%</div>
        </div>
        <div class="rev-track"><div class="rev-fill" style="width:98.8%"></div></div>
        <div class="rev-amounts">
          <div class="rev-sub">Received: $1,275,275</div>
          <div class="rev-sub">Budget: $1,290,730</div>
        </div>
      </div>
      
      <div class="rev-row">
        <div class="rev-header">
          <div class="rev-name">Miscellaneous Sources</div>
          <div class="rev-pct">95.7%</div>
        </div>
        <div class="rev-track"><div class="rev-fill" style="width:95.7%"></div></div>
        <div class="rev-amounts">
          <div class="rev-sub">Received: $190,508</div>
          <div class="rev-sub">Budget: $198,980</div>
        </div>
      </div>
      
      <div class="rev-row">
        <div class="rev-header">
          <div class="rev-name">State & Federal Aid</div>
          <div class="rev-pct">55.9%</div>
        </div>
        <div class="rev-track"><div class="rev-fill" style="width:55.9%;background: linear-gradient(90deg, #c8963e, #e8c46a)"></div></div>
        <div class="rev-amounts">
          <div class="rev-sub">Received: $4,537,436</div>
          <div class="rev-sub">Budget: $8,115,091</div>
        </div>
      </div>
      
      <div class="rev-row">
        <div class="rev-header">
          <div class="rev-name">Use of Money & Property</div>
          <div class="rev-pct">46.9%</div>
        </div>
        <div class="rev-track"><div class="rev-fill" style="width:46.9%;background: linear-gradient(90deg, #c8963e, #e8c46a)"></div></div>
        <div class="rev-amounts">
          <div class="rev-sub">Received: $576,625</div>
          <div class="rev-sub">Budget: $1,230,127</div>
        </div>
      </div>
      
      <div class="rev-row">
        <div class="rev-header">
          <div class="rev-name">Other Tax Items (Sales Tax)</div>
          <div class="rev-pct">26.8%</div>
        </div>
        <div class="rev-track"><div class="rev-fill" style="width:26.8%;background: linear-gradient(90deg, #b84c4c, #d46a6a)"></div></div>
        <div class="rev-amounts">
          <div class="rev-sub">Received: $267,948</div>
          <div class="rev-sub">Budget: $1,000,000</div>
        </div>
      </div>
      
      <div class="rev-row">
        <div class="rev-header">
          <div class="rev-name">Day School Tuition</div>
          <div class="rev-pct">4.6%</div>
        </div>
        <div class="rev-track"><div class="rev-fill" style="width:4.6%;background: linear-gradient(90deg, #b84c4c, #d46a6a)"></div></div>
        <div class="rev-amounts">
          <div class="rev-sub">Received: $25,225</div>
          <div class="rev-sub">Budget: $551,000</div>
        </div>
      </div>

      <div style="margin-top:18px;padding-top:14px;border-top:2px solid var(--navy);display:flex;justify-content:space-between;align-items:center">
        <div style="font-size:13px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px">Overall Total</div>
        <div>
          <div style="font-family:'DM Serif Display',serif;font-size:22px;color:var(--navy);text-align:right">$73,568,490</div>
          <div style="font-size:12px;color:var(--text-muted);text-align:right">92.9% of $79,153,900 budget</div>
        </div>
      </div>
    </div>

    <!-- HIGHLIGHTS -->
    <div class="card">
      <div class="card-title">Monthly Financial Highlights</div>
      <div class="highlight-item">
        <div class="highlight-icon" style="background:#e8f4ee">💰</div>
        <div class="highlight-text">November overall cash position was <strong>$36.61 million</strong>, approximately <strong>$2.67M higher</strong> than November 2024 — a healthy cash flow position for this time of year.</div>
      </div>
      <div class="highlight-item">
        <div class="highlight-icon" style="background:#fef4e8">🏛️</div>
        <div class="highlight-text">Real Property & Other Taxes included <strong>3rd quarter 2025 sales tax of $267,948</strong> from Westchester County and a <strong>$1,770,866 tax payment</strong> from the Town of Greenburgh for October collections.</div>
      </div>
      <div class="highlight-item">
        <div class="highlight-icon" style="background:#e8eef6">📋</div>
        <div class="highlight-text">State & Federal Aid included final BOCES aid 24-25 payment of <strong>$441,526</strong>, VLT Lottery aid of <strong>$34,959</strong>, and ESSA Grant Drawdown of <strong>$15,542</strong>.</div>
      </div>
      <div class="highlight-item">
        <div class="highlight-icon" style="background:#e8f4ee">📈</div>
        <div class="highlight-text">District has earned <strong>$398,243 in interest earnings</strong> through November. Working with NYCLASS to maximize investment opportunities as rates remain relatively high.</div>
      </div>
      <div class="highlight-item">
        <div class="highlight-icon" style="background:#fef4e8">🏗️</div>
        <div class="highlight-text">Bond principal and interest payments of <strong>$1,007,375</strong> were included among November expenditures alongside normal payroll and warrants.</div>
      </div>
      <div class="highlight-item">
        <div class="highlight-icon" style="background:#f6e8e8">📊</div>
        <div class="highlight-text">YTD General Fund expenditures total <strong>$24,488,980</strong>. Including encumbrances, <strong>9% of the budget remains unspent</strong> — typical for this point in the year.</div>
      </div>
    </div>
  </div>

  <!-- EXPENDITURE BREAKDOWN -->
  <div class="section-title">Expenditure Budget vs. Actuals <span>YTD through November 30, 2025</span></div>
  <div class="two-col">
    <div class="card">
      <div class="card-title">Spending by Category — Actual vs. Budget</div>
      
      <div class="exp-row">
        <div class="exp-cat"><strong>Instruction</strong></div>
        <div class="exp-actual">$11,122,491</div>
        <div class="exp-remain" style="color:var(--green)">11% left</div>
        <div class="exp-bar-wrap"><div class="exp-bar" style="width:89%"></div></div>
      </div>
      <div class="exp-row">
        <div class="exp-cat" style="font-size:12px;color:var(--text-muted);padding-left:14px">↳ Salaries</div>
        <div class="exp-actual" style="font-size:12px">$9,440,587</div>
        <div class="exp-remain">7% left</div>
        <div class="exp-bar-wrap"><div class="exp-bar" style="width:93%"></div></div>
      </div>
      <div class="exp-row">
        <div class="exp-cat" style="font-size:12px;color:var(--text-muted);padding-left:14px">↳ Special Ed Tuitions</div>
        <div class="exp-actual" style="font-size:12px">$172,275</div>
        <div class="exp-remain">36% left</div>
        <div class="exp-bar-wrap"><div class="exp-bar" style="width:64%"></div></div>
      </div>

      <div class="exp-row" style="margin-top:4px">
        <div class="exp-cat"><strong>Benefits</strong></div>
        <div class="exp-actual">$6,127,337</div>
        <div class="exp-remain" style="color:var(--green)">5% left</div>
        <div class="exp-bar-wrap"><div class="exp-bar" style="width:95%"></div></div>
      </div>
      <div class="exp-row">
        <div class="exp-cat" style="font-size:12px;color:var(--text-muted);padding-left:14px">↳ Health Insurance</div>
        <div class="exp-actual" style="font-size:12px">$4,644,860</div>
        <div class="exp-remain">7% left</div>
        <div class="exp-bar-wrap"><div class="exp-bar" style="width:93%"></div></div>
      </div>

      <div class="exp-row" style="margin-top:4px">
        <div class="exp-cat"><strong>General Support</strong></div>
        <div class="exp-actual">$3,193,506</div>
        <div class="exp-remain" style="color:var(--green)">8% left</div>
        <div class="exp-bar-wrap"><div class="exp-bar" style="width:92%"></div></div>
      </div>

      <div class="exp-row">
        <div class="exp-cat"><strong>Debt Service</strong></div>
        <div class="exp-actual">$1,210,166</div>
        <div class="exp-remain">0% left</div>
        <div class="exp-bar-wrap"><div class="exp-bar" style="width:100%;background:linear-gradient(90deg,#b84c4c,#d46a6a)"></div></div>
      </div>

      <div class="exp-row">
        <div class="exp-cat"><strong>Facilities & Operations</strong></div>
        <div class="exp-actual">$1,964,011</div>
        <div class="exp-remain" style="color:var(--green)">20% left</div>
        <div class="exp-bar-wrap"><div class="exp-bar" style="width:80%"></div></div>
      </div>

      <div class="exp-row">
        <div class="exp-cat"><strong>Transportation</strong></div>
        <div class="exp-actual">$871,469</div>
        <div class="exp-remain">0% left</div>
        <div class="exp-bar-wrap"><div class="exp-bar" style="width:100%;background:linear-gradient(90deg,#b84c4c,#d46a6a)"></div></div>
      </div>

      <div style="margin-top:16px;padding-top:14px;border-top:2px solid var(--navy);display:flex;justify-content:space-between;align-items:center">
        <div>
          <div style="font-size:13px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px">YTD Total Expenditures</div>
          <div style="font-size:12px;color:var(--text-muted);margin-top:2px">Adjusted budget: $81,546,965</div>
        </div>
        <div style="text-align:right">
          <div style="font-family:'DM Serif Display',serif;font-size:22px;color:var(--navy)">$24,488,980</div>
          <div style="font-size:12px;color:var(--green);font-weight:600">9% of budget remaining</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Unencumbered Budget Remaining</div>
      <div style="display:flex;flex-direction:column;gap:12px">
        
        <div style="background:var(--cream);border-radius:8px;padding:16px">
          <div style="font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Transfers to Special Aid/Capital</div>
          <div style="font-family:'DM Serif Display',serif;font-size:20px;color:var(--navy)">$80,000</div>
          <div style="font-size:12px;color:var(--green);font-weight:600">100% remaining</div>
        </div>

        <div style="background:var(--cream);border-radius:8px;padding:16px">
          <div style="font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Instruction Unencumbered</div>
          <div style="font-family:'DM Serif Display',serif;font-size:20px;color:var(--navy)">$4,623,791</div>
          <div style="font-size:12px;color:var(--text-muted)">Outstanding encumbrances: $27,078,629</div>
        </div>

        <div style="background:var(--cream);border-radius:8px;padding:16px">
          <div style="font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Benefits Unencumbered</div>
          <div style="font-family:'DM Serif Display',serif;font-size:20px;color:var(--navy)">$1,032,663</div>
          <div style="font-size:12px;color:var(--text-muted)">Outstanding encumbrances: $12,552,425</div>
        </div>

        <div style="background:var(--cream);border-radius:8px;padding:16px">
          <div style="font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--text-muted);margin-bottom:6px">Facilities Unencumbered</div>
          <div style="font-family:'DM Serif Display',serif;font-size:20px;color:var(--navy)">$1,228,696</div>
          <div style="font-size:12px;color:var(--text-muted)">Outstanding encumbrances: $2,813,735</div>
        </div>

        <div style="background:var(--navy);border-radius:8px;padding:16px">
          <div style="font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:6px">Total Unencumbered Balance</div>
          <div style="font-family:'DM Serif Display',serif;font-size:26px;color:#fff">$7,384,165</div>
          <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:2px">9% of $81.5M adjusted budget</div>
        </div>
      </div>
    </div>
  </div>

</main>

<footer>
  <strong>Irvington Union Free School District</strong> &nbsp;·&nbsp; Treasurer's Report — November 2025 &nbsp;·&nbsp; Certified by Evan Gross, Treasurer &nbsp;·&nbsp; Reviewed by Assistant Superintendent of Business
</footer>

</body>
</html>
`

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('giftpass_auth') === 'true'
  })
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [activeRoute, setActiveRoute] = useState<RouteKey>('examples')
  const [activeProcessTab, setActiveProcessTab] = useState<ProcessTabKey>('moodboard')
  const [activeExampleTab, setActiveExampleTab] = useState<ExampleTabKey>('example-video-1')
  const isPublicRoute = window.location.pathname === '/board-ai-example' || window.location.pathname === '/board-ai-example/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (CORRECT_PASSWORD.includes(password)) {
      sessionStorage.setItem('giftpass_auth', 'true')
      setIsAuthenticated(true)
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
    }
  }

  if (!isAuthenticated && !isPublicRoute) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-logo">
            <img src="/jrw-logo.svg" alt="JRW" className="login-logo-img" />
          </div>
          <h1 className="login-title">JRWT Examples</h1>
          <p className="login-subtitle">Enter password to view examples and process work</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="password-input"
              autoFocus
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">
              Unlock
            </button>
          </form>
        </div>
        <div className="login-backdrop"></div>
      </div>
    )
  }

  const currentProcessTab = PROCESS_TABS.find(tab => tab.key === activeProcessTab) || PROCESS_TABS[0]
  const currentExampleTab = EXAMPLE_TABS.find(tab => tab.key === activeExampleTab) || EXAMPLE_TABS[0]

  if (isPublicRoute) {
    return (
      <iframe
        title="Irvington UFSD — November 2025 Financial Dashboard"
        srcDoc={PUBLIC_DASHBOARD_HTML}
        style={{ width: '100%', height: '100vh', border: 'none' }}
      />
    )
  }

  return (
    <div className="page-container">
      <header className="header">
        <div className="header-logo">
          <img src="/jrw-logo.svg" alt="JRW" className="header-logo-img" />
        </div>
        <nav className="header-nav">
          <button
            type="button"
            className={`tab-pill ${activeRoute === 'examples' ? 'active' : ''}`}
            onClick={() => setActiveRoute('examples')}
          >
            Examples
          </button>
          <button
            type="button"
            className={`tab-pill ${activeRoute === 'process' ? 'active' : ''}`}
            onClick={() => setActiveRoute('process')}
          >
            Process
          </button>
        </nav>
      </header>

      <main className="main-content">
        {activeRoute === 'examples' ? (
          <>
            <section className="intro-section">
              <h1 className="page-title">JRWT Examples</h1>
              <p className="intro-text">
                A curated set of video examples that highlight storytelling, flow, and visual polish.
                Select a video to preview the placeholder walkthroughs.
              </p>
            </section>

            <nav className="tab-navigation">
              {EXAMPLE_TABS.map(tab => (
                <button
                  key={tab.key}
                  className={`tab-pill ${activeExampleTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveExampleTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <section className="tab-description">
              <p className="tab-description-text">{currentExampleTab.description}</p>
            </section>

            <section className="video-section">
              <video
                key={activeExampleTab}
                className="video-embed"
                src={currentExampleTab.videoUrl}
                controls
                autoPlay
                muted
                playsInline
                preload="metadata"
              />
            </section>
          </>
        ) : (
          <>
            <section className="intro-section">
              <h1 className="page-title">JRWT Process</h1>
              <p className="intro-text">
                This page features selected designs and diagrams from the JRWT design and development process.
                Select an asset to view the embedded Figma files. You can zoom in and pan the page to get a better look.
              </p>
            </section>

            <nav className="tab-navigation">
              {PROCESS_TABS.map(tab => (
                <button
                  key={tab.key}
                  className={`tab-pill ${activeProcessTab === tab.key ? 'active' : ''}`}
                  onClick={() => setActiveProcessTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            <section className="tab-description">
              <img 
                src={currentProcessTab.logo === 'giftpass' ? '/gp-logo.svg' : '/roil-logo.svg'} 
                alt={currentProcessTab.logo === 'giftpass' ? 'Gift Pass' : 'Roil'} 
                className={`tab-logo ${currentProcessTab.logo === 'roil' ? 'roil-logo' : ''}`}
              />
              <p className="tab-description-text">{currentProcessTab.description}</p>
            </section>

            <section className="figma-section">
              <iframe
                key={activeProcessTab}
                src={currentProcessTab.embedUrl}
                style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
                width="100%"
                height="800"
                allowFullScreen
                title={`Gift Pass - ${currentProcessTab.label}`}
              />
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default App
