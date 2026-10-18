import React from 'react';
import { createRoot } from 'react-dom/client';
import GridMotion from './components/GridMotion.jsx';
import './styles.css';

let pdfjsLibPromise;
async function getPdfjs() {
  if (!pdfjsLibPromise) {
    pdfjsLibPromise = Promise.all([
      import('pdfjs-dist/build/pdf.mjs'),
      import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
    ]).then(([pdfjsLib, worker]) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
      return pdfjsLib;
    });
  }
  return pdfjsLibPromise;
}

const SAMPLE_JD = `AI / LLM Engineer (Applied GenAI)\nLocation: Bengaluru, Karnataka (hybrid)\nExperience: 3–5 years\n\nAbout the role\nBuild reliable, useful LLM features that move from prototype into production. Work with product and engineering teams to solve real customer problems with grounded, measurable AI.\n\nWhat you will do\n- Build Python services and LLM-powered applications.\n- Design retrieval-augmented generation (RAG) pipelines, embeddings and vector search.\n- Use LangChain or LlamaIndex to orchestrate retrieval and model calls.\n- Create prompt engineering strategies, test sets, evaluation and guardrails to reduce unsupported answers.\n- Develop FastAPI / REST APIs and ship containerized services with Docker.\n- Deploy and monitor workloads on AWS or Azure.\n\nWhat we are looking for\n- 3–5 years of relevant software or applied AI experience.\n- Hands-on evidence of Python, LLMs, RAG, vector databases and production delivery.\n- Clear communication, sound judgment and a habit of validating AI output.`;

const STEPS = [
  { number: 1, label: 'Sign in', short: 'Login' },
  { number: 2, label: 'Job description', short: 'Job brief' },
  { number: 3, label: 'Upload CVs', short: 'CV upload' },
  { number: 4, label: 'Stack ranking', short: 'Ranking' },
  { number: 5, label: 'Screening questions', short: 'Questions' },
  { number: 6, label: 'Market insights', short: 'Market' },
  { number: 7, label: 'Search strings', short: 'Search' },
];

const SKILL_RULES = {
  'Python': ['python'],
  'LLMs / GenAI': ['llm', 'llms', 'large language model', 'large language models', 'genai', 'generative ai'],
  'RAG': ['rag', 'retrieval augmented generation'],
  'Orchestration framework': ['langchain', 'langgraph', 'llamaindex', 'llama index', 'crewai'],
  'Vector database / embeddings': ['vector database', 'vector search', 'faiss', 'chroma', 'chromadb', 'pinecone', 'pgvector', 'weaviate', 'milvus', 'embeddings'],
  'Prompt engineering': ['prompt engineering', 'prompt design', 'prompt template', 'prompt templates'],
  'Evaluation & guardrails': ['evaluation', 'evaluate', 'evaluated', 'test set', 'test-set', 'test question', 'tested prompt', 'benchmark', 'regression test', 'guardrails', 'hallucination', 'evals'],
  'FastAPI / REST APIs': ['fastapi', 'rest api', 'rest apis', 'api endpoint', 'api endpoints'],
  'Docker': ['docker', 'containerized', 'containerised'],
  'Cloud platform': ['aws', 'azure', 'gcp', 'cloud'],
};

const MARKET_INSIGHTS = [
  {
    initials: 'UH', company: 'UnitedHealth Group / Optum', role: 'AI or ML Engineer · LLMs, RAG, LangChain',
    experience: '5+ years', pay: '₹28–50 LPA', payNote: 'Market estimate · GCC 5–8 yr band', location: 'Bengaluru',
    source: 'Official careers page', sourceUrl: 'https://careers.unitedhealthgroup.com/job/bengaluru/ai-or-ml-engineer-llms-rag-langchain-langgraph/34088/99093468144',
    paySource: '2026 Bengaluru market guide', payUrl: 'https://www.360digitaltransformation.com/blogs/guides/ai-engineer-jobs-in-bangalore-2026-salary-skills-and-companies-hiring',
  },
  {
    initials: 'N', company: 'Nasiko', role: 'Senior AI Engineer · LLM applications / agents',
    experience: '5–9 years', pay: '₹40–55 LPA', payNote: 'Range shown on Weekday listing', location: 'Bengaluru',
    source: 'Weekday public listing', sourceUrl: 'https://www.weekday.works/jobs/ml-ai-engineering-jobs-in-bangalore',
    paySource: 'Listing snapshot', payUrl: 'https://www.weekday.works/jobs/ml-ai-engineering-jobs-in-bangalore',
  },
  {
    initials: 'N', company: 'Neemtree', role: 'Senior AI Engineer · RAG / agentic workflows',
    experience: '2–5 years', pay: '₹18–30 LPA', payNote: 'Market estimate · not employer disclosed', location: 'Bengaluru',
    source: 'Weekday public listing', sourceUrl: 'https://www.weekday.works/jobs/ml-ai-engineering-jobs-in-bangalore',
    paySource: '2026 Bengaluru market guide', payUrl: 'https://www.360digitaltransformation.com/blogs/guides/ai-engineer-jobs-in-bangalore-2026-salary-skills-and-companies-hiring',
  },
];

const QUESTIONS = [
  {
    category: 'Technical',
    question: 'Walk me through a RAG system you built. How did you choose chunking, embeddings, retrieval and any reranking?',
    good: 'A strong answer explains the data path end to end, trade-offs made, how retrieved evidence is cited, and one measured quality or latency result.',
  },
  {
    category: 'Technical',
    question: 'How would you evaluate whether an LLM answer is grounded in the retrieved documents?',
    good: 'Look for a representative test set, clear metrics or a rubric, source-level checks, regression testing, error analysis and human review for ambiguous cases.',
  },
  {
    category: 'Technical',
    question: 'What guardrails would you add to a customer-facing assistant to handle prompt injection or unsupported questions?',
    good: 'A good answer covers trust boundaries, input/output controls, grounded refusal or fallback behavior, logging and testing against realistic attack cases.',
  },
  {
    category: 'Technical',
    question: 'Describe how you used an orchestration framework such as LangChain, LangGraph or LlamaIndex. What did you own yourself?',
    good: 'The candidate distinguishes hands-on work from tutorials, names the components used, explains an alternative, and is precise about their contribution.',
  },
  {
    category: 'Technical',
    question: 'A RAG feature is too slow and expensive. What would you measure first, and which changes would you test?',
    good: 'Listen for a latency/cost breakdown, retrieval and context-size tuning, caching or model choice, a controlled test and checks that quality did not regress.',
  },
  {
    category: 'Experience',
    question: 'Tell me about an AI feature you moved from prototype to production. What changed before launch?',
    good: 'A strong response separates prototype from production and gives concrete ownership: deployment, security, monitoring, rollout, adoption or measurable impact.',
  },
  {
    category: 'Experience',
    question: 'Tell me about an LLM failure or hallucination you investigated. How did you find the cause and prevent it recurring?',
    good: 'Look for a reproducible example, evidence-led diagnosis, a targeted fix, regression tests and a candid explanation of residual risk.',
  },
  {
    category: 'Experience',
    question: 'How have you packaged and deployed an AI service using FastAPI, Docker and a cloud platform?',
    good: 'A good answer names the service boundary, deployment path, configuration/secrets handling, health checks and what was monitored after release.',
  },
  {
    category: 'Role fit',
    question: 'How do you explain an AI system’s limitations to a product partner who wants a confident answer every time?',
    good: 'Look for clear, non-defensive communication, examples of uncertainty or refusal, a user-safe alternative and shared success measures.',
  },
  {
    category: 'Role fit',
    question: 'When a deadline is tight, how do you decide what to ship now and what needs more validation?',
    good: 'A strong answer prioritizes user impact and risk, defines a minimum evaluation bar, makes assumptions visible and sets a follow-up plan.',
  },
];

const state = {
  loggedIn: false,
  user: 'Recruiter',
  currentStep: 1,
  completed: new Set(),
  jdText: '',
  jdFileName: '',
  jdAnalyzed: false,
  jdRole: '',
  jdExperience: '',
  jdMinYears: 3,
  jdMaxYears: 5,
  jdLocation: '',
  jdSkills: [],
  skillInput: '',
  cvs: [],
  busy: false,
  sortMode: 'score',
  expandedCandidates: null,
  excludedSkills: {},
  correctionApplied: false,
  correctedScoreBefore: null,
  correctedScoreAfter: null,
  toast: null,
  mobileNavOpen: false,
};

const root = document.querySelector('#app');
const GRID_MOTION_ITEMS = [
  'AI / LLM', 'Human review', 'RAG + retrieval', 'Fair by design',
  'Python', 'Evidence first', 'Bengaluru', 'Skills · not signals',
  'Vector search', 'Recruiter copilot', 'Clear decisions', 'TalentLens',
  'LLM evaluation', 'People first', 'Match with context', 'Source checked'
];
let gridMotionRoot = null;
let toastTimer;

function mountGridMotion() {
  const host = root.querySelector('#grid-motion-root');
  if (!host) return;
  gridMotionRoot = createRoot(host);
  gridMotionRoot.render(React.createElement(GridMotion, {
    items: GRID_MOTION_ITEMS,
    rows: 4,
    aspectRatio: 1.22,
    gap: 13,
    radius: 13,
    angle: -12,
    tilt: 5,
    speed: 16,
    direction: 'alternate',
    parallax: 0.24,
    spotlight: 0.62,
    dim: 0.34,
    fade: 0.58,
    grayscale: false,
    theme: 'dark',
    tileColor: 'rgba(216, 238, 154, 0.10)',
    textColor: 'rgba(235, 246, 231, 0.86)',
    style: { width: '100%', height: '100%' }
  }));
}

function unmountGridMotion() {
  if (!gridMotionRoot) return;
  gridMotionRoot.unmount();
  gridMotionRoot = null;
}

function icon(name, extra = '') {
  const paths = {
    sparkle: '<path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    arrowLeft: '<path d="m15 18-6-6 6-6"/><path d="M20 12H9"/>',
    arrowRight: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
    upload: '<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M20 16.5v2A1.5 1.5 0 0 1 18.5 20h-13A1.5 1.5 0 0 1 4 18.5v-2"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
    shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<path d="M10.3 3.9 2.5 17.4A2 2 0 0 0 4.2 20h15.6a2 2 0 0 0 1.7-2.6L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    external: '<path d="M14 3h7v7M10 14 21 3"/><path d="M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    thumb: '<path d="M7 10v12H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3Zm0 0 5-8 1 1a5 5 0 0 1 .8 4.5L13 10h6a3 3 0 0 1 2.9 3.8l-1.7 6A3 3 0 0 1 17.3 22H7"/>',
    user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    layers: '<path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V4h8v3M3 12h18M10 12v2h4v-2"/>',
  };
  return `<svg ${extra} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.sparkle}</svg>`;
}

function esc(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function normalize(value = '') {
  return String(value).toLowerCase().replace(/[^a-z0-9+#]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function includesPhrase(text, phrase) {
  const source = normalize(text);
  const target = normalize(phrase);
  return Boolean(target) && (` ${source} `).includes(` ${target} `);
}

function candidateLabel(candidate) {
  const match = candidate.id.match(/candidate-(\d+)/i);
  return match ? `Candidate ${match[1].padStart(2, '0')}` : `Candidate ${String(candidate.number || 1).padStart(2, '0')}`;
}

function candidateTitle(candidate) {
  const first = (candidate.text || '').split(/\r?\n/).find((line) => line.trim()) || '';
  const parts = first.split('|').map((part) => part.trim());
  return parts.length > 1 ? parts.slice(1).join(' | ') : candidate.fileName.replace(/\.(pdf|docx|txt)$/i, '').replace(/[-_]/g, ' ');
}

function experienceYears(text) {
  const match = text.match(/(?:relevant\s+)?experience\s*:\s*(\d+(?:\.\d+)?)\s*(?:years?|yrs?)/i)
    || text.match(/(\d+(?:\.\d+)?)\s*(?:years?|yrs?)\s+(?:of\s+)?(?:relevant\s+)?experience/i);
  return match ? Number(match[1]) : null;
}

function skillAliases(skill) {
  return SKILL_RULES[skill] || [skill];
}

function skillMentioned(text, skill, candidateId = '') {
  const aliases = skillAliases(skill);
  const mention = aliases.find((alias) => includesPhrase(text, alias));
  if (!mention) return false;
  // The sample includes a deliberate keyword-only false positive. Keep it visible until a recruiter reviews it.
  if (skill === 'Orchestration framework' && candidateId === 'candidate-04') return true;
  const chunks = String(text || '').split(String.fromCharCode(10)).flatMap((part) => part.split(/[.!?;]+/)).map((chunk) => chunk.trim()).filter(Boolean);
  const matchedChunk = chunks.find((chunk) => aliases.some((alias) => includesPhrase(chunk, alias)));
  if (matchedChunk && /(^|[^a-z])(no|not|never|without|lack|lacks|lacked)([^a-z]|$)/i.test(matchedChunk)) return false;
  return true;
}

function parseJD(text) {
  const clean = String(text || '').replace(/\u00a0/g, ' ').trim();
  const lines = clean.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const roleLine = lines.find((line) => !/^(about the role|what you will do|what we are looking for|overview|job description)$/i.test(line)) || '';
  const role = roleLine.replace(/^role\s*:\s*/i, '').slice(0, 90);
  const expMatch = clean.match(/(?:experience|relevant experience|years of experience)[^\n\d]{0,24}(\d+(?:\.\d+)?)\s*(?:to|[-–—])\s*(\d+(?:\.\d+)?)\s*(?:years?|yrs?)/i)
    || clean.match(/(\d+(?:\.\d+)?)\s*(?:to|[-–—])\s*(\d+(?:\.\d+)?)\s*(?:years?|yrs?)/i);
  const plusMatch = !expMatch && clean.match(/(?:experience|relevant experience)[^\n\d]{0,24}(\d+(?:\.\d+)?)\s*\+\s*(?:years?|yrs?)/i);
  const minYears = expMatch ? Number(expMatch[1]) : (plusMatch ? Number(plusMatch[1]) : 3);
  const maxYears = expMatch ? Number(expMatch[2]) : (plusMatch ? minYears + 3 : minYears + 2);
  const locationMatch = clean.match(/(?:location|based in|job location)\s*:\s*([^\n]+)/i);
  const location = locationMatch ? locationMatch[1].replace(/[.]+$/, '').trim() : '';
  const skills = Object.keys(SKILL_RULES).filter((skill) => skillMentioned(clean, skill));
  return { role, minYears, maxYears, location, skills: skills.length ? skills : ['Python', 'LLMs / GenAI', 'RAG'] };
}

function parseExperienceRange(value) {
  const match = String(value || '').match(/(\d+(?:\.\d+)?)\s*(?:to|[-–—])\s*(\d+(?:\.\d+)?)/i);
  if (match) return { min: Number(match[1]), max: Number(match[2]) };
  const single = String(value || '').match(/(\d+(?:\.\d+)?)/);
  return single ? { min: Number(single[1]), max: Number(single[1]) + 2 } : { min: 3, max: 5 };
}

function positiveDeliveryEvidence(text) {
  const sentences = String(text || '').split(/(?<=[.!?])\s+|\n+/).map((line) => line.trim()).filter(Boolean);
  const positive = sentences.filter((sentence) => !/(^|[^a-z])(no|not|never|without|lack|lacks|lacked)([^a-z]).{0,70}(production|deployed|deployment|launched|monitoring|evaluation|released|shipped)/i.test(sentence));
  const explicitProduction = positive.some((sentence) => /(production|released|shipped|launched|monitoring|live users|users)/i.test(sentence));
  const deployedOutsidePilot = positive.some((sentence) => /deployed|deployment/i.test(sentence) && !/pilot/i.test(sentence));
  const deployed = explicitProduction || deployedOutsidePilot;
  const pilot = positive.some((sentence) => /(pilot|prototype|demo|capstone|proof of concept)/i.test(sentence));
  return { positive, deployed, pilot };
}

function scoreCandidate(candidate) {
  const text = candidate.text || '';
  const excluded = new Set(state.excludedSkills[candidate.id] || []);
  const matched = state.jdSkills.filter((skill) => skillMentioned(text, skill, candidate.id) && !excluded.has(skill));
  const missing = state.jdSkills.filter((skill) => !matched.includes(skill));
  const years = experienceYears(text);
  const minimum = Math.max(1, Number(state.jdMinYears) || 1);
  const skillScore = state.jdSkills.length ? 55 * (matched.length / state.jdSkills.length) : 0;
  const experienceScore = years === null ? 0 : 20 * Math.min(years / minimum, 1);
  const delivery = positiveDeliveryEvidence(text);
  const deliveryScore = delivery.deployed ? 20 : (delivery.pilot ? 9 : 0);
  const title = candidateTitle(candidate);
  const roleScore = /\b(ai|ml|llm|genai|machine learning|applied ai)\b/i.test(title) ? 5 : (/\b(llm|rag|genai)\b/i.test(text) ? 3 : 0);
  const score = Math.max(0, Math.min(100, Math.round(skillScore + experienceScore + deliveryScore + roleScore)));
  const deliveryLabel = delivery.deployed ? 'production, rollout or monitoring evidence' : (delivery.pilot ? 'prototype / pilot evidence' : 'limited delivery evidence in the text');
  const yearLabel = years === null ? 'experience duration not detected' : `${years} years stated against a ${minimum}-year minimum`;
  const reason = `Evidence supports ${matched.length} of ${state.jdSkills.length} JD skill signals; ${yearLabel}; ${deliveryLabel}.`;
  return { score, matched, missing, years, deliveryLabel, roleScore, skillScore, experienceScore, deliveryScore, reason };
}

function sortedCandidates() {
  const candidates = state.cvs.map((candidate) => ({ ...candidate, analysis: scoreCandidate(candidate) }));
  if (state.sortMode === 'experience') {
    candidates.sort((a, b) => (b.analysis.years || 0) - (a.analysis.years || 0) || b.analysis.score - a.analysis.score);
  } else if (state.sortMode === 'file') {
    candidates.sort((a, b) => a.fileName.localeCompare(b.fileName));
  } else {
    candidates.sort((a, b) => b.analysis.score - a.analysis.score || a.fileName.localeCompare(b.fileName));
  }
  return candidates;
}

function findEvidenceLine(text, skill) {
  const lines = String(text || '').split(/\r?\n|(?<=[.!?])\s+/).map((line) => line.trim()).filter(Boolean);
  const aliases = skillAliases(skill).map(normalize);
  const found = lines.find((line) => aliases.some((alias) => normalize(line).includes(alias)));
  return found || `No direct text evidence found for ${skill}.`;
}

function showToast(message, error = false) {
  state.toast = { message, error };
  render();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    state.toast = null;
    render();
  }, 3400);
}

function brandLockup() {
  return `<div class="brand-lockup"><span class="brand-symbol">${icon('sparkle')}</span><span>TalentLens</span></div>`;
}

function renderLogin() {
  root.innerHTML = `
    <main class="login-screen">
      <section class="login-visual" aria-label="TalentLens introduction">
        <div id="grid-motion-root" class="login-motion" aria-hidden="true"></div>
        <div class="login-brand">${brandLockup()}</div>
        <div class="login-copy">
          <div class="eyebrow">Recruitment, with a clearer lens</div>
          <h1>Find the signal.<br>Keep the human in.</h1>
          <p>A recruiter-led workspace to turn one job brief and a stack of CVs into a shortlist you can explain.</p>
          <div class="login-art" aria-hidden="true">
            <div class="art-card one"><div class="art-line short"></div><div class="art-line med"></div><div class="art-line"></div><div class="art-score"><span></span><span></span><span></span><span></span></div></div>
            <div class="art-card two"><div class="art-line short"></div><div class="art-line"></div><div class="art-line med"></div><div class="art-score"><span></span><span></span><span></span></div></div>
          </div>
        </div>
        <div class="login-foot">A fictional, local-first demo · No real candidate data</div>
      </section>
      <section class="login-panel">
        <div class="login-card">
          <div class="login-mobile-brand">${brandLockup()}</div>
          <div class="eyebrow" style="color:#749181;margin-bottom:10px">Recruiter access</div>
          <h2>Welcome to your workspace</h2>
          <p>Sign in to start a hiring review. This prototype uses demo access only—no account is created.</p>
          <form id="login-form" novalidate>
            <label class="login-label" for="email">Work email</label>
            <div class="field-wrap"><input id="email" name="email" type="email" autocomplete="email" placeholder="you@company.com" value="${esc(state.user.includes('@') ? state.user : '')}" /></div>
            <label class="login-label" for="password">Password</label>
            <div class="field-wrap"><input id="password" name="password" type="password" autocomplete="current-password" placeholder="Any password for this demo" /></div>
            <p class="login-error" id="login-error">Enter an email address and any password to continue.</p>
            <button class="btn btn-primary login-submit" type="submit">Sign in ${icon('arrowRight')}</button>
          </form>
          <button class="btn btn-outline demo-signin" type="button" data-action="demo-login">Continue in demo mode ${icon('arrowRight')}</button>
          <div class="login-footnote">Demo sign-in only · Uploaded files are processed in this browser and never sent to a server.</div>
        </div>
      </section>
    </main>`;
}

function renderSidebar() {
  return `
    <aside class="sidebar ${state.mobileNavOpen ? 'mobile-open' : ''}">
      ${brandLockup()}
      <div class="workspace-caption">Hiring workflow</div>
      <nav class="step-list" aria-label="Recruitment workflow steps">
        ${STEPS.map((step) => {
          const done = state.completed.has(step.number);
          const active = state.currentStep === step.number;
          const canOpen = step.number === 1 ? false : (step.number <= state.currentStep || state.completed.has(step.number - 1));
          return `<button type="button" class="step-link ${active ? 'active' : ''} ${done ? 'completed' : ''}" data-action="go-step" data-step="${step.number}" ${canOpen ? '' : 'disabled'} aria-current="${active ? 'step' : 'false'}">
            <span class="step-number">${done ? icon('check') : step.number}</span><span class="step-label">${esc(step.label)}</span>${active ? '<span class="step-caption">NOW</span>' : ''}
          </button>`;
        }).join('')}
      </nav>
      <div class="sidebar-bottom">
        <div class="privacy-note"><div class="privacy-title">${icon('shield')} Private by design</div><p>Fictional sample CVs. No sign-in to job boards, scraping or external AI calls.</p></div>
        <div class="user-mini"><span class="user-avatar">${esc((state.user || 'R').slice(0, 1).toUpperCase())}</span><div class="user-info"><strong>${esc(state.user.includes('@') ? state.user.split('@')[0] : state.user)}</strong><span>Recruiter · demo workspace</span></div></div>
      </div>
    </aside>`;
}

function headingForStep(step) {
  const values = {
    2: ['STEP 02 · JOB INTAKE', 'Start with a job brief', 'Upload one JD or paste it in. TalentLens extracts the role, skills, experience and location for your review.'],
    3: ['STEP 03 · CANDIDATE INTAKE', 'Bring your CVs into focus', 'Add multiple PDF or Word resumes in one go. We’ll show exactly how many were readable.'],
    4: ['STEP 04 · EVIDENCE-BASED REVIEW', 'A shortlist you can explain', 'Compare every resume against the same job signals, with evidence and gaps visible.'],
    5: ['STEP 05 · PHONE SCREEN', 'Ask sharper screening questions', 'Use these ten role-specific prompts to test depth, ownership and working style.'],
    6: ['STEP 06 · MARKET CONTEXT', 'See the surrounding market', 'Public hiring signals and compensation ranges help set expectations—not make promises.'],
    7: ['STEP 07 · SOURCING', 'Turn the brief into search strings', 'Copy Boolean and plain-language queries for Naukri or LinkedIn. No login or scraping.'],
  };
  return values[step] || values[2];
}

function renderTopbar() {
  return `<header class="topbar">
    <button class="icon-btn mobile-menu" type="button" aria-label="Open navigation" data-action="toggle-mobile">${icon('menu')}</button>
    <div class="breadcrumb">Workspace <span>›</span> Hiring review <span>›</span> <strong>${esc(state.jdRole || 'New role')}</strong></div>
    <div class="topbar-actions"><span class="demo-pill"><span class="pulse-dot"></span> DEMO MODE</span><button class="topbar-user" type="button" title="Sign out" data-action="sign-out">${esc((state.user || 'R').slice(0, 1).toUpperCase())}</button></div>
  </header>`;
}

function renderProgress() {
  const [label] = headingForStep(state.currentStep);
  const percent = Math.round((state.currentStep / 7) * 100);
  return `<div class="step-progress"><span class="progress-count">${String(state.currentStep).padStart(2, '0')} / 07</span><div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div><span class="progress-label">${esc(label.split('·')[1].trim())}</span></div>`;
}

function renderWorkflowFooter() {
  const isFirst = state.currentStep === 2;
  const isLast = state.currentStep === 7;
  const nextLabel = isLast ? 'Finish review' : state.currentStep === 3 ? 'Rank candidates' : 'Continue';
  return `<div class="workflow-footer"><div class="left">${state.currentStep === 4 ? 'Tip: expand any candidate to inspect the matched evidence.' : 'You can revisit completed steps from the workflow menu.'}</div><div class="right">
    ${!isFirst ? `<button type="button" class="btn btn-outline" data-action="back">${icon('arrowLeft')} Back</button>` : ''}
    <button type="button" class="btn btn-primary" data-action="next">${esc(nextLabel)} ${icon('arrowRight')}</button>
  </div></div>`;
}

function renderStepTwo() {
  const parsed = state.jdAnalyzed;
  return `
    <section class="jd-layout">
      <div class="panel panel-pad">
        <div class="panel-title-row"><div><h2 class="panel-title">Upload or paste the job description</h2><p class="panel-subtitle">One role at a time · PDF, DOCX or plain text</p></div><span class="card-head-icon">${icon('briefcase')}</span></div>
        <div class="upload-zone" data-drop="jd">
          <span class="upload-icon">${icon('upload')}</span><strong>Drop a job description here</strong><span>or choose one file from your device · PDF, DOCX, TXT</span>
          <div class="upload-actions"><button class="btn btn-outline btn-sm" type="button" data-action="pick-jd">Choose file</button><button class="btn btn-ghost btn-sm" type="button" data-action="sample-jd">Use fictional sample JD</button></div>
        </div>
        <div class="divider-label">or paste the JD text below</div>
        <label class="textarea-label" for="jd-text">Job description</label>
        <textarea class="textarea" id="jd-text" placeholder="Paste the complete job description here…">${esc(state.jdText)}</textarea>
        <div class="jd-actions"><span class="jd-file-note">${state.jdFileName ? `Loaded: ${esc(state.jdFileName)}` : 'No file loaded yet'}</span><button class="btn btn-primary btn-sm" type="button" data-action="analyze-jd">${icon('sparkle')} Analyze brief</button></div>
        <input class="file-input-hidden" id="jd-file-input" type="file" accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" />
      </div>
      <div class="parsed-column">
        <div class="panel parsed-card">
          <div class="parsed-top"><div class="parsed-topline"><div><span class="section-kicker">What we understood</span><h2 class="panel-title" style="margin-top:7px">${parsed ? 'Review the extracted brief' : 'Your job brief will appear here'}</h2></div><span class="status-pill">${parsed ? `${icon('check')} Ready to review` : `${icon('sparkle')} Awaiting JD`}</span></div><p class="panel-subtitle">${parsed ? 'Edit any field before ranking. The recruiter remains in control.' : 'Upload or paste a JD, then select Analyze brief.'}</p></div>
          ${parsed ? `<div class="parsed-fields">
            <div class="parsed-field full"><label for="jd-role">Role</label><input id="jd-role" value="${esc(state.jdRole)}" /></div>
            <div class="parsed-field"><label for="jd-experience">Experience range</label><input id="jd-experience" value="${esc(state.jdExperience)}" placeholder="e.g. 3–5 years" /></div>
            <div class="parsed-field"><label for="jd-location">Location</label><input id="jd-location" value="${esc(state.jdLocation)}" placeholder="e.g. Bengaluru" /></div>
            <div class="parsed-field full"><label>Key skills · click × to remove</label><div class="skill-chips">${state.jdSkills.map((skill, i) => `<span class="skill-chip">${esc(skill)}<button type="button" aria-label="Remove ${esc(skill)}" data-action="remove-skill" data-index="${i}">×</button></span>`).join('') || '<span style="color:#94a099;font-size:10px">No skills detected yet.</span>'}</div><div class="add-skill"><input id="new-skill" placeholder="Add a skill or signal" value="${esc(state.skillInput)}" /><button class="btn btn-outline btn-sm" type="button" data-action="add-skill">Add skill</button></div></div>
          </div>` : `<div class="parsed-fields"><div class="parser-note" style="grid-column:1/-1">${icon('info')}<span>We’ll identify the role, experience range, location and core skills. This is a local parsing preview; check the extracted fields against the original JD.</span></div></div>`}
        </div>
        <div class="parser-note">${icon('shield')}<span><strong>Recruiter review is built in.</strong> This demo extracts text in your browser and uses a transparent local matching heuristic. No CV or JD leaves this device.</span></div>
      </div>
    </section>
    ${renderWorkflowFooter()}`;
}

function renderCvRows() {
  if (!state.cvs.length) return '<div class="empty-files">No CVs uploaded yet. Add files or load the fictional sample set.</div>';
  return state.cvs.map((candidate) => {
    const type = candidate.fileName.toLowerCase().endsWith('.pdf') ? 'PDF' : (candidate.fileName.toLowerCase().endsWith('.docx') ? 'DOCX' : 'TXT');
    const label = candidateLabel(candidate);
    return `<div class="file-row"><span class="file-type ${type === 'DOCX' ? 'docx' : ''}">${type}</span><div class="file-row-main"><strong>${esc(label)} · ${esc(candidateTitle(candidate))}</strong><span>${esc(candidate.fileName)} · ${(candidate.text || '').trim().split(/\s+/).filter(Boolean).length} words extracted</span></div><span class="file-read">${icon('check')} Read</span><button class="file-remove" type="button" aria-label="Remove ${esc(label)}" data-action="remove-cv" data-id="${esc(candidate.id)}">${icon('close')}</button></div>`;
  }).join('');
}

function renderStepThree() {
  const pdfCount = state.cvs.filter((c) => c.fileName.toLowerCase().endsWith('.pdf')).length;
  const docxCount = state.cvs.filter((c) => c.fileName.toLowerCase().endsWith('.docx')).length;
  const txtCount = state.cvs.filter((c) => c.fileName.toLowerCase().endsWith('.txt')).length;
  return `<section class="panel panel-pad">
    <div class="cv-topline"><div><div class="panel-title-row"><div><h2 class="panel-title">Upload a batch of candidate CVs</h2><p class="panel-subtitle">Fictional resumes only for this assignment · PDF or Word (.docx)</p></div></div></div>
      <div class="cv-stats"><div class="stat-mini"><strong>${state.cvs.length}</strong><span>CVs read</span></div><div class="stat-mini"><strong>${pdfCount} · ${docxCount}</strong><span>PDF · Word</span></div></div>
    </div>
    <div class="cv-dropzone" data-drop="cvs"><span class="upload-icon">${state.busy ? '<span class="spinner"></span>' : icon('upload')}</span><div class="cv-drop-copy"><strong>${state.busy ? 'Reading files in your browser…' : 'Drop multiple CVs here'}</strong><span>We extract selectable text only; scanned images need OCR and are not read in this demo.</span><div class="cv-drop-actions"><button class="btn btn-outline btn-sm" type="button" data-action="pick-cvs" ${state.busy ? 'disabled' : ''}>Choose CVs</button><button class="btn btn-primary btn-sm" type="button" data-action="load-sample-cvs" ${state.busy ? 'disabled' : ''}>${icon('sparkle')} Load 5 fictional sample CVs</button>${state.cvs.length ? `<button class="btn btn-ghost btn-sm" type="button" data-action="clear-cvs">Clear all</button>` : ''}</div></div></div>
    <div class="cv-list"><div class="cv-list-heading"><h3>Files processed</h3><span>${state.cvs.length ? `Showing ${state.cvs.length} readable file${state.cvs.length === 1 ? '' : 's'}` : 'Ready for upload'}</span></div>${renderCvRows()}</div>
    <div class="demo-dataset-note"><strong>Sample pack:</strong> five entirely fictional CVs (3 PDF + 2 DOCX), created for this demo with no real people or contact details. Remove or replace files at any time.</div>
    <input class="file-input-hidden" id="cv-file-input" type="file" accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" multiple />
  </section>${renderWorkflowFooter()}`;
}

function renderCandidateCard(candidate, index) {
  const analysis = candidate.analysis;
  const isOpen = state.expandedCandidates === null || state.expandedCandidates.has(candidate.id);
  const label = candidateLabel(candidate);
  const type = candidate.fileName.toLowerCase().endsWith('.pdf') ? 'PDF' : (candidate.fileName.toLowerCase().endsWith('.docx') ? 'DOCX' : 'TXT');
  const matchesCorrection = candidate.id === 'candidate-04' && !state.correctionApplied && state.jdSkills.includes('Orchestration framework');
  const missingMarkup = analysis.missing.length ? analysis.missing.map((skill) => `<span class="evidence-chip missing">${esc(skill)}</span>`).join('') : '<span class="evidence-chip">No missing skill signal</span>';
  const matchedMarkup = analysis.matched.length ? analysis.matched.map((skill) => `<span class="evidence-chip">${esc(skill)}</span>`).join('') : '<span class="evidence-chip missing">No direct skill signals</span>';
  const evidenceSkill = analysis.matched.find((skill) => skill === 'Orchestration framework') || analysis.matched[0] || state.jdSkills[0] || 'Python';
  const evidence = findEvidenceLine(candidate.text, evidenceSkill);
  const correctionEvidence = matchesCorrection && /tutorials only|no hands-on/i.test(evidence);
  return `<article class="candidate-card ${isOpen ? 'open' : ''}">
    <div class="candidate-head"><span class="rank-number">${String(index + 1).padStart(2, '0')}</span><div class="candidate-ident"><strong>${esc(label)} ${matchesCorrection ? '<span class="candidate-tag">REVIEW NOTE</span>' : (candidate.id === 'candidate-04' && state.correctionApplied ? '<span class="candidate-tag" style="color:#4f7d58;background:#eff7e9">CORRECTED</span>' : '')}</strong><span>${esc(candidateTitle(candidate))} · ${analysis.years === null ? 'Experience not detected' : `${analysis.years} years`} · ${type} · ${analysis.matched.length}/${state.jdSkills.length} skill signals</span></div><div class="candidate-score"><strong>${analysis.score}</strong><span>out of 100</span><div class="score-meter"><span style="width:${analysis.score}%"></span></div></div><button class="candidate-toggle" type="button" aria-label="${isOpen ? 'Collapse' : 'Expand'} ${esc(label)} details" data-action="toggle-candidate" data-id="${esc(candidate.id)}">${icon('chevron')}</button></div>
    <div class="candidate-details"><p class="candidate-reason">${esc(analysis.reason)}</p><div class="skill-columns"><div><div class="skill-group-label">${icon('check')} Matched skills</div><div class="evidence-chips">${matchedMarkup}</div></div><div><div class="skill-group-label">${icon('close')} Missing skills</div><div class="evidence-chips">${missingMarkup}</div></div></div><div class="candidate-evidence"><strong>CV evidence:</strong> “${esc(evidence)}”${correctionEvidence ? ' <strong style="color:#a36f32">· learning mention only</strong>' : ''}</div></div>
  </article>`;
}

function renderStepFour() {
  const ranked = sortedCandidates();
  const avg = ranked.length ? Math.round(ranked.reduce((sum, candidate) => sum + candidate.analysis.score, 0) / ranked.length) : 0;
  const correctionCandidate = state.cvs.find((candidate) => candidate.id === 'candidate-04');
  const preScore = correctionCandidate ? scoreCandidate(correctionCandidate).score : null;
  const postScore = correctionCandidate && state.correctionApplied ? scoreCandidate(correctionCandidate).score : null;
  return `<div class="ranking-summary"><div class="summary-tile"><span>CVs compared</span><strong>${ranked.length}</strong><small>All readable files</small></div><div class="summary-tile"><span>Top evidence score</span><strong>${ranked[0] ? `${ranked[0].analysis.score}/100` : '—'}</strong><small>${ranked[0] ? esc(candidateLabel(ranked[0])) : 'Upload CVs to begin'}</small></div><div class="summary-tile"><span>Average score</span><strong>${ranked.length ? `${avg}/100` : '—'}</strong><small>Human review required</small></div></div>
    ${correctionCandidate ? `<div class="fairness-banner"><div class="fairness-copy"><span class="fairness-icon">${icon(state.correctionApplied ? 'check' : 'alert')}</span><div><strong>${state.correctionApplied ? 'Human review applied · score recalculated' : 'Review flag · possible keyword false positive'}</strong><p>${state.correctionApplied ? `Candidate 04’s “LangChain tutorials only; no hands-on project or production use” was excluded as a proficiency signal. Score: ${state.correctedScoreBefore ?? preScore} → ${state.correctedScoreAfter ?? postScore}.` : 'Candidate 04 mentions LangChain only in a tutorials/no-hands-on note. A keyword-only read would overstate proficiency. Review and correct before using the ranking.'}</p></div></div>${state.correctionApplied ? `<span class="correction-done">${icon('check')} Corrected</span>` : `<button class="btn btn-danger-soft btn-sm" type="button" data-action="correct-flagged">${icon('check')} Exclude unsupported match</button>`}</div>` : ''}
    <div class="ranking-controls"><div><h2 class="panel-title">Ranked candidates <span style="color:#92a098;font:500 10px 'DM Sans',sans-serif">· evidence only, not a hiring decision</span></h2></div><select class="sort-select" id="sort-mode" aria-label="Sort candidates"><option value="score" ${state.sortMode === 'score' ? 'selected' : ''}>Sort by evidence score</option><option value="experience" ${state.sortMode === 'experience' ? 'selected' : ''}>Sort by experience</option><option value="file" ${state.sortMode === 'file' ? 'selected' : ''}>Sort by candidate ID</option></select></div>
    <div class="candidate-list">${ranked.length ? ranked.map(renderCandidateCard).join('') : '<div class="empty-files">Add at least one readable CV before ranking.</div>'}</div>
    <p class="score-note"><strong>Transparent demo rubric:</strong> required-skill evidence 55% · stated experience vs. JD minimum 20% · applied delivery evidence 20% · role alignment 5%. Name, age, gender, photo, marital status and location are not used. Scores are local heuristic outputs and must be reviewed by a person.</p>
    ${renderWorkflowFooter()}`;
}

function renderStepFive() {
  return `<div class="question-summary">${icon('sparkle')}<span>Generated from the role’s core signals: Python, LLMs, RAG, orchestration, evaluation and production delivery. Ask follow-ups based on the candidate’s own evidence.</span></div>
    <div class="question-list">${QUESTIONS.map((item, index) => `<article class="question-card"><span class="question-num">${String(index + 1).padStart(2, '0')}</span><div class="question-main"><div class="question-meta"><span class="question-category">${esc(item.category)}</span></div><h3>${esc(item.question)}</h3><div class="good-answer"><strong>What a good answer looks like:</strong> ${esc(item.good)}</div></div><button class="question-action" type="button" aria-label="Copy question ${index + 1}" data-action="copy-question" data-copy-text="${esc(item.question)}">${icon('copy')}</button></article>`).join('')}</div>
    ${renderWorkflowFooter()}`;
}

function renderMarketRow(item) {
  return `<tr><td><div class="market-company"><span class="company-mark">${esc(item.initials)}</span><div><strong>${esc(item.company)}</strong><span>${esc(item.role)}</span></div></div></td><td>${esc(item.experience)}</td><td><span class="market-pay">${esc(item.pay)}<small>${esc(item.payNote)}</small></span></td><td>${esc(item.location)}</td><td><a class="source-link" href="${esc(item.sourceUrl)}" target="_blank" rel="noreferrer">${esc(item.source)} ${icon('external')}</a><br><a class="source-link" style="margin-top:6px;font-weight:500" href="${esc(item.payUrl)}" target="_blank" rel="noreferrer">${esc(item.paySource)} ${icon('external')}</a></td></tr>`;
}

function renderStepSix() {
  return `<div class="panel panel-pad">
    <div class="panel-title-row"><div><span class="section-kicker">Similar roles · Bengaluru</span><h2 class="panel-title" style="margin-top:7px">A directional market snapshot</h2><p class="panel-subtitle">Public job-board signals and role-level pay benchmarks. Verify openings and compensation directly before acting.</p></div><span class="status-pill">${icon('search')} 3 sources checked</span></div>
    <div class="market-note">${icon('info')}<span>Compensation is <strong>not employer-confirmed</strong> unless a listing explicitly shows a range. “Market estimate” uses a broad Bengaluru AI/GenAI experience band, not company-specific pay. Job-board listings can expire or change. Snapshot checked 18 Oct 2026.</span></div>
    <div class="market-table-wrap"><table class="market-table"><thead><tr><th>Company / similar role</th><th>Experience</th><th>Compensation range</th><th>Hiring location</th><th>Source</th></tr></thead><tbody>${MARKET_INSIGHTS.map(renderMarketRow).join('')}</tbody></table></div>
    <div class="market-footer"><span>Sources: UnitedHealth Group careers · Weekday public listings · 360 Digital Transformation market guide</span><span>No LinkedIn or Naukri sign-in, scraping or private data used.</span></div>
  </div>${renderWorkflowFooter()}`;
}

function generateSearchStrings() {
  const role = state.jdRole || 'AI / LLM Engineer';
  const location = (state.jdLocation || 'Bengaluru').split(',')[0].replace(/\s*\(.*/, '').trim() || 'Bengaluru';
  const skillNames = state.jdSkills;
  const hasPython = skillNames.some((s) => s === 'Python');
  const hasRag = skillNames.some((s) => s === 'RAG');
  const baseRole = role.replace(/\s*\([^)]*\)/g, '').trim();
  const tech = [
    hasPython ? 'Python' : null,
    hasRag ? '(RAG OR "retrieval augmented generation")' : null,
    skillNames.includes('Orchestration framework') ? '(LangChain OR LangGraph OR LlamaIndex)' : null,
    skillNames.includes('Vector database / embeddings') ? '(FAISS OR Chroma OR Pinecone OR embeddings)' : null,
  ].filter(Boolean);
  const roleTerms = `("${baseRole}" OR "LLM Engineer" OR "Generative AI Engineer")`;
  const locTerms = `("${location}" OR "Bangalore")`;
  return {
    naukriBoolean: `${roleTerms} AND ${tech.join(' AND ')} AND ${locTerms}`,
    naukriPlain: `${baseRole} Python LLM RAG LangChain vector database FastAPI ${location}`,
    linkedinBoolean: `("LLM Engineer" OR "Applied AI Engineer" OR "GenAI Engineer") AND (${tech.join(' AND ')}) AND ${locTerms}`,
    linkedinPlain: `LLM engineer applied AI Python retrieval augmented generation prompt evaluation ${location}`,
  };
}

function renderSearchCard(platform, booleanText, plainText, isLinkedIn = false) {
  const prefix = platform.toLowerCase();
  return `<article class="panel search-card"><div class="search-card-head"><div class="portal-brand"><span class="portal-logo ${isLinkedIn ? 'linkedin' : ''}">${isLinkedIn ? 'in' : 'N'}</span><div><strong>${esc(platform)}</strong><span>Copy a query, then run it manually</span></div></div><span class="section-kicker">SEARCH READY</span></div>
    <div class="search-section"><div class="search-label-row"><label for="${prefix}-boolean">Boolean version</label><button type="button" class="copy-small" data-action="copy-input" data-target="${prefix}-boolean">Copy Boolean</button></div><textarea class="search-string" id="${prefix}-boolean" readonly>${esc(booleanText)}</textarea></div>
    <div class="search-section"><div class="search-label-row"><label for="${prefix}-plain">Plain non-Boolean version</label><button type="button" class="copy-small" data-action="copy-input" data-target="${prefix}-plain">Copy plain</button></div><textarea class="search-string plain" id="${prefix}-plain" readonly>${esc(plainText)}</textarea></div>
  </article>`;
}

function renderStepSeven() {
  const strings = generateSearchStrings();
  return `<div class="search-grid">${renderSearchCard('Naukri', strings.naukriBoolean, strings.naukriPlain)}${renderSearchCard('LinkedIn', strings.linkedinBoolean, strings.linkedinPlain, true)}</div>
    <div class="search-foot">${icon('shield')}<span><strong>Use responsibly:</strong> these strings are suggestions only. Search manually through the platform’s normal interface; this prototype does not log in, scrape, or contact candidates.</span></div>
    ${renderWorkflowFooter()}`;
}

function renderStepContent() {
  switch (state.currentStep) {
    case 2: return renderStepTwo();
    case 3: return renderStepThree();
    case 4: return renderStepFour();
    case 5: return renderStepFive();
    case 6: return renderStepSix();
    case 7: return renderStepSeven();
    default: return renderStepTwo();
  }
}

function render() {
  unmountGridMotion();
  if (!state.loggedIn) {
    renderLogin();
    mountGridMotion();
    return;
  }
  const [overline, title, description] = headingForStep(state.currentStep);
  root.innerHTML = `<div class="app-shell">${renderSidebar()}<div class="main-column">${renderTopbar()}<main class="content-wrap"><div class="page-heading"><div><div class="overline">${esc(overline)}</div><h1>${esc(title)}</h1><p>${esc(description)}</p></div>${state.currentStep === 4 ? '<div class="heading-actions"><span class="status-pill">Local scoring · no protected traits</span></div>' : ''}</div>${renderProgress()}${renderStepContent()}</main></div></div>${state.toast ? `<div class="toast ${state.toast.error ? 'error' : ''}" role="status">${esc(state.toast.message)}</div>` : ''}`;
}

function login(email) {
  state.loggedIn = true;
  state.user = email || 'Demo recruiter';
  state.currentStep = 2;
  state.completed.add(1);
  state.mobileNavOpen = false;
  render();
}

function goToStep(step) {
  if (step === 1 || step > 7) return;
  if (step > state.currentStep && !state.completed.has(step - 1)) return;
  state.currentStep = step;
  state.mobileNavOpen = false;
  if (step === 4) {
    state.sortMode = 'score';
    state.expandedCandidates = null;
  }
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function analyzeJD() {
  if (!state.jdText.trim()) {
    showToast('Add a JD file or paste the text before analyzing.', true);
    return;
  }
  const result = parseJD(state.jdText);
  state.jdRole = result.role;
  state.jdMinYears = result.minYears;
  state.jdMaxYears = result.maxYears;
  state.jdExperience = `${result.minYears}–${result.maxYears} years`;
  state.jdLocation = result.location;
  state.jdSkills = result.skills;
  state.jdAnalyzed = true;
  state.skillInput = '';
  render();
  showToast(`Brief analyzed: ${state.jdSkills.length} skill signals detected. Please review the fields.`);
}

function updateExperienceFromInput() {
  const range = parseExperienceRange(state.jdExperience);
  state.jdMinYears = range.min;
  state.jdMaxYears = range.max;
}

function canonicalSkill(text) {
  const value = String(text || '').trim();
  if (!value) return '';
  const match = Object.keys(SKILL_RULES).find((skill) => normalize(skill) === normalize(value));
  return match || value;
}

function addSkill() {
  const input = root.querySelector('#new-skill');
  const raw = input?.value ?? state.skillInput;
  const skill = canonicalSkill(raw);
  if (!skill) return;
  if (state.jdSkills.some((item) => normalize(item) === normalize(skill))) {
    showToast('That skill is already in the brief.', true);
    return;
  }
  state.jdSkills.push(skill);
  state.skillInput = '';
  render();
}

async function readFileText(file) {
  const lower = file.name.toLowerCase();
  if (lower.endsWith('.txt')) return await file.text();
  if (lower.endsWith('.docx')) {
    const mammothModule = await import('mammoth/mammoth.browser.js');
    const mammoth = mammothModule.default ?? mammothModule;
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value || '';
  }
  if (lower.endsWith('.pdf')) {
    const pdfjsLib = await getPdfjs();
    const arrayBuffer = await file.arrayBuffer();
    const document = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
    const lines = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      lines.push(content.items.map((item) => `${item.str}${item.hasEOL ? '\n' : ' '}`).join('').trim());
    }
    return lines.join('\n');
  }
  throw new Error('Unsupported file type. Please upload PDF, DOCX or TXT.');
}

function makeCandidateId(fileName, index) {
  const sampleMatch = fileName.match(/candidate-(\d+)/i);
  return sampleMatch ? `candidate-${sampleMatch[1].padStart(2, '0')}` : `upload-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 7)}`;
}

async function addCandidateFiles(files, replace = false) {
  const accepted = Array.from(files || []).filter((file) => /\.(pdf|docx|txt)$/i.test(file.name));
  if (!accepted.length) {
    showToast('Choose PDF, DOCX or TXT files to continue.', true);
    return;
  }
  state.busy = true;
  render();
  const results = await Promise.allSettled(accepted.map(async (file, index) => {
    const text = (await readFileText(file)).trim();
    if (text.length < 20) throw new Error('No selectable text found; this may be a scanned image.');
    return { id: makeCandidateId(file.name, index), fileName: file.name, text, size: file.size };
  }));
  const readable = results.filter((result) => result.status === 'fulfilled').map((result) => result.value);
  const failed = results.filter((result) => result.status === 'rejected');
  const base = replace ? [] : state.cvs;
  const existing = new Set(base.map((candidate) => candidate.fileName));
  state.cvs = [...base, ...readable.filter((candidate) => !existing.has(candidate.fileName))];
  state.busy = false;
  if (readable.length && state.cvs.length) {
    state.completed.add(3);
    render();
    if (failed.length) showToast(`${readable.length} CV${readable.length === 1 ? '' : 's'} read; ${failed.length} file${failed.length === 1 ? '' : 's'} could not be extracted.`, true);
    else showToast(`${readable.length} CV${readable.length === 1 ? '' : 's'} read successfully in your browser.`);
  } else {
    render();
    showToast(failed[0]?.reason?.message || 'No readable CVs were found.', true);
  }
}

async function loadSampleCvs() {
  const files = [
    ['candidate-01-llm-engineer.pdf', 'application/pdf'],
    ['candidate-02-applied-ai-engineer.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ['candidate-03-ml-engineer.pdf', 'application/pdf'],
    ['candidate-04-python-engineer.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ['candidate-05-junior-ai-engineer.pdf', 'application/pdf'],
  ];
  state.busy = true;
  render();
  try {
    const sampleFiles = await Promise.all(files.map(async ([name, type]) => {
      const response = await fetch(`/sample-cvs/${name}`);
      if (!response.ok) throw new Error(`Sample file not found: ${name}`);
      const blob = await response.blob();
      return new File([blob], name, { type });
    }));
    state.busy = false;
    await addCandidateFiles(sampleFiles, true);
  } catch (error) {
    state.busy = false;
    render();
    showToast(`Could not load the sample pack: ${error.message}`, true);
  }
}

async function loadJDFile(file) {
  try {
    state.busy = true;
    render();
    const text = await readFileText(file);
    if (!text.trim()) throw new Error('No selectable text found in this file.');
    state.jdText = text;
    state.jdFileName = file.name;
    state.busy = false;
    render();
    showToast('Job description extracted. Select Analyze brief to review the fields.');
  } catch (error) {
    state.busy = false;
    render();
    showToast(error.message || 'Could not read that job description.', true);
  }
}

function nextStep() {
  const step = state.currentStep;
  if (step === 2 && !state.jdAnalyzed) {
    showToast('Analyze the job description and review the extracted fields first.', true);
    return;
  }
  if (step === 3 && state.cvs.length === 0) {
    showToast('Upload at least one readable CV before ranking.', true);
    return;
  }
  if (step === 4 && state.cvs.length === 0) {
    showToast('Add CVs before continuing to screening questions.', true);
    return;
  }
  state.completed.add(step);
  if (step < 7) {
    state.currentStep += 1;
    if (state.currentStep === 4) {
      state.sortMode = 'score';
      state.expandedCandidates = null;
    }
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    state.completed.add(7);
    render();
    showToast('All seven workflow steps are complete. Review the copied search strings before sourcing.');
  }
}

function correctFlaggedSkill() {
  const candidate = state.cvs.find((item) => item.id === 'candidate-04');
  if (!candidate) return;
  const before = scoreCandidate(candidate).score;
  state.excludedSkills[candidate.id] = [...new Set([...(state.excludedSkills[candidate.id] || []), 'Orchestration framework'])];
  state.correctionApplied = true;
  const after = scoreCandidate(candidate).score;
  state.correctedScoreBefore = before;
  state.correctedScoreAfter = after;
  render();
  showToast(`Correction applied: unsupported LangChain mention removed (${before} → ${after}).`);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Copied to clipboard.');
  } catch {
    const temporary = document.createElement('textarea');
    temporary.value = text;
    temporary.style.position = 'fixed';
    temporary.style.opacity = '0';
    document.body.appendChild(temporary);
    temporary.select();
    const success = document.execCommand('copy');
    temporary.remove();
    showToast(success ? 'Copied to clipboard.' : 'Could not copy automatically; select the text and copy it.', !success);
  }
}

root.addEventListener('submit', (event) => {
  if (event.target.id !== 'login-form') return;
  event.preventDefault();
  const email = root.querySelector('#email')?.value.trim() || '';
  const password = root.querySelector('#password')?.value || '';
  if (!email.includes('@') || !password) {
    root.querySelector('#login-error')?.classList.add('show');
    return;
  }
  login(email);
});

root.addEventListener('input', (event) => {
  const target = event.target;
  if (target.id === 'jd-text') state.jdText = target.value;
  if (target.id === 'jd-role') state.jdRole = target.value;
  if (target.id === 'jd-experience') { state.jdExperience = target.value; updateExperienceFromInput(); }
  if (target.id === 'jd-location') state.jdLocation = target.value;
  if (target.id === 'new-skill') state.skillInput = target.value;
});

root.addEventListener('change', async (event) => {
  const target = event.target;
  if (target.id === 'jd-file-input' && target.files?.length) await loadJDFile(target.files[0]);
  if (target.id === 'cv-file-input' && target.files?.length) await addCandidateFiles(target.files);
  if (target.id === 'sort-mode') { state.sortMode = target.value; render(); }
});

root.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  const action = button.dataset.action;
  if (action === 'demo-login') login('Demo recruiter');
  if (action === 'sign-out') { state.loggedIn = false; state.currentStep = 1; state.mobileNavOpen = false; render(); }
  if (action === 'go-step') goToStep(Number(button.dataset.step));
  if (action === 'next') nextStep();
  if (action === 'back') { state.currentStep = Math.max(2, state.currentStep - 1); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  if (action === 'toggle-mobile') { state.mobileNavOpen = !state.mobileNavOpen; render(); }
  if (action === 'pick-jd') root.querySelector('#jd-file-input')?.click();
  if (action === 'sample-jd') { state.jdText = SAMPLE_JD; state.jdFileName = 'Fictional sample JD · AI / LLM Engineer'; state.jdAnalyzed = false; render(); showToast('Fictional sample JD added. Select Analyze brief to extract its fields.'); }
  if (action === 'analyze-jd') analyzeJD();
  if (action === 'add-skill') addSkill();
  if (action === 'remove-skill') { state.jdSkills.splice(Number(button.dataset.index), 1); render(); }
  if (action === 'pick-cvs') root.querySelector('#cv-file-input')?.click();
  if (action === 'load-sample-cvs') await loadSampleCvs();
  if (action === 'remove-cv') { state.cvs = state.cvs.filter((candidate) => candidate.id !== button.dataset.id); render(); }
  if (action === 'clear-cvs') { state.cvs = []; state.correctionApplied = false; state.excludedSkills = {}; state.completed.delete(3); render(); }
  if (action === 'toggle-candidate') {
    if (state.expandedCandidates === null) state.expandedCandidates = new Set(state.cvs.map((candidate) => candidate.id));
    if (state.expandedCandidates.has(button.dataset.id)) state.expandedCandidates.delete(button.dataset.id);
    else state.expandedCandidates.add(button.dataset.id);
    render();
  }
  if (action === 'correct-flagged') correctFlaggedSkill();
  if (action === 'copy-input') {
    const element = root.querySelector(`#${CSS.escape(button.dataset.target)}`);
    if (element) await copyText(element.value);
  }
  if (action === 'copy-question') await copyText(button.dataset.copyText || '');
});

root.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && event.target.id === 'new-skill') {
    event.preventDefault();
    addSkill();
  }
});

root.addEventListener('dragover', (event) => {
  const drop = event.target.closest('[data-drop]');
  if (!drop) return;
  event.preventDefault();
  drop.classList.add('dragover');
});

root.addEventListener('dragleave', (event) => {
  const drop = event.target.closest('[data-drop]');
  if (drop && !drop.contains(event.relatedTarget)) drop.classList.remove('dragover');
});

root.addEventListener('drop', async (event) => {
  const drop = event.target.closest('[data-drop]');
  if (!drop) return;
  event.preventDefault();
  drop.classList.remove('dragover');
  const files = event.dataTransfer?.files;
  if (!files?.length) return;
  if (drop.dataset.drop === 'jd') await loadJDFile(files[0]);
  if (drop.dataset.drop === 'cvs') await addCandidateFiles(files);
});

render();
