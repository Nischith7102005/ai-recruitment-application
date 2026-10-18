# TalentLens — AI Recruitment Workflow Prototype

A browser-based prototype that walks a recruiter through the seven requested steps: demo sign-in, JD intake, multi-CV upload, evidence-based ranking, phone-screen questions, hiring-market context, and Naukri/LinkedIn search strings. The sign-in hero also mounts React Bits’ `GridMotion` as a small React island over the existing Vite/vanilla-JS workflow; its tiles use local recruiting-themed text, so no remote image requests are needed.

> **Transparency note:** this is a self-contained demonstration, not a live LLM product. PDF/DOCX extraction happens in the browser (PDF.js + Mammoth); JD parsing and candidate scoring use a deterministic local heuristic so the demo works without API keys and CV text never leaves the browser. Do not present the scores as an AI model’s judgment or as a hiring decision.

## Run it

```bash
npm install
npm run dev
```

Open the local Vite URL (normally `http://localhost:5173`). The dev server is configured to bind to `0.0.0.0` for preview use. No account or credentials are required: use **Continue in demo mode**, or enter any email and password on the sign-in screen.

To create a production build:

```bash
npm run build
npm run preview
```

## ShipStatic deployment

This PR intentionally does not add a GitHub Actions workflow. From a network-enabled shell, build and deploy the static output with:

```bash
npm ci && npm run build && npx -y @shipstatic/ship ./dist
```

An anonymous ShipStatic deployment is public and expires after three days unless claimed. The CLI returns a live URL and claim link; open the claim link to keep the deployment on a free ShipStatic account. No ShipStatic token is needed for this one-off deploy.

## Demo walkthrough

1. **Sign in** — continue in demo mode.
2. **Job description** — choose **Use fictional sample JD**, then **Analyze brief**. The extracted role, skills, experience and location are editable before continuing.
3. **Upload CVs** — choose **Load 5 fictional sample CVs**. The app reads three PDFs and two DOCX files and shows the count.
4. **Stack ranking** — review the ranked candidates, evidence, matched/missing skill signals and reason for each score. Click **Exclude unsupported match** to correct the deliberate LangChain keyword false positive in Candidate 04; the score recalculates.
5. **Screening questions** — review ten technical, experience and role-fit questions, each with a good-answer guide.
6. **Market insights** — see similar public hiring signals, experience and location, with linked sources and clear salary-estimate labels.
7. **Search strings** — copy Boolean and plain-language strings for both Naukri and LinkedIn. The prototype does not log into or scrape either service.

The five sample resumes are fictional, contain no real people or contact details, and are stored under `public/sample-cvs/`. Regenerate them with:

```bash
python3 scripts/generate_sample_cvs.py
```

## Ranking and fairness

The demo assigns a score out of 100 from the evidence in the resume text:

- Required-skill evidence: **55%**
- Stated experience compared with the JD minimum: **20%**
- Applied delivery evidence (production/rollout/monitoring vs. pilot/prototype): **20%**
- Role alignment: **5%**

The scorer does not use candidate names, age, gender, photos, marital status or location. The sample CVs use neutral candidate IDs. Scores, extracted text and job requirements should still be checked by a recruiter; missing evidence is not proof that a candidate lacks a skill.

Candidate 04 intentionally contains the line “LangChain tutorials only; no hands-on project or production use of LangChain.” The initial keyword pass counts the term. The visible review flag lets the recruiter reject that unsupported proficiency signal, removes it from the matched skills and recalculates the score. This is the workflow’s built-in example of checking and correcting an output.

## Market information and caveats

The market panel is a dated snapshot, not a live feed. It links to a UnitedHealth Group careers posting, Weekday public listing pages for Nasiko and Neemtree, and a broad Bengaluru AI-engineering market guide. Compensation is labelled as a listing range or a non-employer-confirmed estimate; the market guide is not company-specific. Listings and compensation can change—verify them at the source before using them. The app does not log in to, scrape, or access private data from LinkedIn or Naukri.

## Recording the assignment demo

A suggested narration and timing for a recording under seven minutes is in [`docs/recording-script.md`](docs/recording-script.md). Record the live app with your own screen recorder and voice, and share the resulting link using the submission channel requested by the assessor. The recording deadline stated in the brief was **11 October 2026, 4:00 PM IST**; it has passed as of **18 October 2026**.
