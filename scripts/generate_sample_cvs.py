"""Generate the fictional PDF/DOCX resumes used by the TalentLens demo."""
from pathlib import Path
from textwrap import wrap
from zipfile import ZIP_DEFLATED, ZipFile
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1] / "public" / "sample-cvs"
ROOT.mkdir(parents=True, exist_ok=True)

CANDIDATES = [
    {
        "file": "candidate-01-llm-engineer.pdf",
        "format": "pdf",
        "lines": [
            "CANDIDATE 01 | APPLIED AI / LLM ENGINEER",
            "Bengaluru, Karnataka | Relevant experience: 4.5 years",
            "PROFILE",
            "Applied AI engineer building Python services and production LLM features.",
            "Owns retrieval quality, latency and evaluation from prototype through release.",
            "SKILLS",
            "Python, LLMs, RAG, LangChain, FAISS, prompt engineering, evaluation,",
            "FastAPI, REST APIs, Docker, AWS, CloudWatch, CI/CD",
            "EXPERIENCE",
            "Applied AI Engineer | fictional product studio | 2022 - present",
            "Built a retrieval-augmented support assistant over 40,000 knowledge articles.",
            "Designed ingestion, chunking, embeddings, FAISS retrieval and reranking.",
            "Deployed Python and FastAPI services on AWS; containerized with Docker.",
            "Created 180-question evaluation set; improved grounded answer rate from 71% to 89%.",
            "Added citation checks, prompt-injection tests, latency dashboards and fallbacks.",
            "PROJECT",
            "Released a multilingual FAQ assistant to 2,300 internal users; tracked adoption.",
            "EDUCATION",
            "B.E. Computer Science | fictional institute | 2021",
        ],
    },
    {
        "file": "candidate-02-applied-ai-engineer.docx",
        "format": "docx",
        "lines": [
            "CANDIDATE 02 | APPLIED AI ENGINEER",
            "Bengaluru, Karnataka | Relevant experience: 3 years",
            "SUMMARY",
            "Software engineer focused on practical LLM applications and retrieval systems.",
            "SKILLS",
            "Python, LLM APIs, RAG, LlamaIndex, Chroma, prompt engineering, FastAPI,",
            "REST APIs, AWS, Docker, pytest, test-set evaluation",
            "EXPERIENCE",
            "AI Engineer | fictional SaaS team | 2023 - present",
            "Built a document Q&A feature using LlamaIndex, embeddings and ChromaDB.",
            "Wrote FastAPI endpoints and asynchronous ingestion jobs in Python.",
            "Deployed a customer-support pilot on AWS with Docker and CI checks.",
            "Compared retrieval settings on a 60-query test set; documented failure cases.",
            "Partnered with support and product teams to turn call themes into prompts.",
            "PROJECT",
            "Built a policy search assistant with source citations and human feedback controls.",
            "EDUCATION",
            "B.Sc. Information Technology | fictional institute | 2022",
        ],
    },
    {
        "file": "candidate-03-ml-engineer.pdf",
        "format": "pdf",
        "lines": [
            "CANDIDATE 03 | MACHINE LEARNING ENGINEER",
            "Hyderabad, Telangana; open to Bengaluru | Relevant experience: 5.5 years",
            "PROFILE",
            "ML engineer with strong applied NLP and cloud delivery experience.",
            "SKILLS",
            "Python, PyTorch, LLMs, RAG, embeddings, FAISS, Azure, FastAPI, Docker,",
            "model evaluation, SQL, MLflow, monitoring",
            "EXPERIENCE",
            "Machine Learning Engineer | fictional analytics company | 2020 - present",
            "Built text classification and semantic retrieval services for enterprise users.",
            "Prototyped RAG over technical manuals using Azure embeddings and FAISS.",
            "Shipped a Python/FastAPI inference service; added Docker and MLflow tracking.",
            "Measured precision, recall and response time on a held-out benchmark.",
            "Set up model monitoring and retraining alerts for a document pipeline.",
            "PROJECT",
            "Developed a grounded answer demo with references; pilot adoption was 140 users.",
            "EDUCATION",
            "M.Sc. Data Science | fictional institute | 2020",
        ],
    },
    {
        "file": "candidate-04-python-engineer.docx",
        "format": "docx",
        "lines": [
            "CANDIDATE 04 | PYTHON ENGINEER",
            "Bengaluru, Karnataka | Relevant experience: 3.5 years",
            "SUMMARY",
            "Backend engineer who has built an internal retrieval prototype with an LLM API.",
            "SKILLS",
            "Python, LLM APIs, RAG, FAISS, vector search, prompt engineering, FastAPI,",
            "REST APIs, AWS, Docker, PostgreSQL",
            "LEARNING NOTE",
            "LangChain tutorials only; no hands-on project or production use of LangChain.",
            "EXPERIENCE",
            "Backend Engineer | fictional workflow company | 2022 - present",
            "Built Python APIs for a workflow product and containerized them with Docker.",
            "Prototyped semantic search over 3,000 internal FAQ entries using FAISS.",
            "Connected a hosted LLM API to the retrieval flow; shared a demo with 12 colleagues.",
            "Added prompt templates and a small manual review checklist for answers.",
            "No production launch, offline evaluation set or LLM monitoring ownership yet.",
            "EDUCATION",
            "B.E. Information Science | fictional institute | 2021",
        ],
    },
    {
        "file": "candidate-05-junior-ai-engineer.pdf",
        "format": "pdf",
        "lines": [
            "CANDIDATE 05 | JUNIOR AI ENGINEER",
            "Mysuru, Karnataka; open to relocate to Bengaluru | Relevant experience: 2 years",
            "PROFILE",
            "Early-career developer with project work in Python, NLP and generative AI.",
            "SKILLS",
            "Python, LLM APIs, RAG, Chroma, prompt design, REST APIs, Azure, Docker,",
            "pandas, scikit-learn, Git",
            "EXPERIENCE",
            "Software Developer | fictional technology lab | 2024 - present",
            "Implemented Python data-cleaning scripts and REST endpoints for an NLP tool.",
            "Built a small RAG demo over public documentation using Chroma and embeddings.",
            "Tested prompt variations with a 20-question checklist; summarized gaps for mentor.",
            "Used Azure app services for a classroom demo; no production LLM system ownership.",
            "PROJECT",
            "Created a retrieval chatbot with source links as a capstone project.",
            "EDUCATION",
            "B.Tech. Computer Science | fictional institute | 2024",
        ],
    },
]


def pdf_escape(text: str) -> str:
    return text.replace("\\", "\\\\").replace("(", "\\(").replace(")", "\\)")


def make_pdf(path: Path, lines: list[str]) -> None:
    # A compact, standards-compliant one-page PDF using built-in Helvetica.
    commands = ["BT", "/F1 10 Tf", "50 748 Td", "14 TL"]
    for i, original in enumerate(lines):
        wrapped = wrap(original, width=94, break_long_words=False, break_on_hyphens=False) or [""]
        for line in wrapped:
            if i == 0:
                commands.append(f"({pdf_escape(line)}) Tj")
            else:
                commands.extend(["T*", f"({pdf_escape(line)}) Tj"])
    commands.append("ET")
    stream = "\n".join(commands).encode("latin-1", errors="replace")
    objects = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
        b"<< /Length " + str(len(stream)).encode() + b" >>\nstream\n" + stream + b"\nendstream",
    ]
    output = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    for number, obj in enumerate(objects, start=1):
        offsets.append(len(output))
        output.extend(f"{number} 0 obj\n".encode())
        output.extend(obj)
        output.extend(b"\nendobj\n")
    xref_offset = len(output)
    output.extend(f"xref\n0 {len(objects) + 1}\n".encode())
    output.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        output.extend(f"{offset:010d} 00000 n \n".encode())
    output.extend(f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\nstartxref\n{xref_offset}\n%%EOF\n".encode())
    path.write_bytes(output)


def make_docx(path: Path, lines: list[str]) -> None:
    paragraphs = []
    for index, line in enumerate(lines):
        # Keep the demo CV readable and easy for browser-side DOCX extraction.
        bold = index == 0 or line in {"SUMMARY", "SKILLS", "LEARNING NOTE", "EXPERIENCE", "PROJECT", "EDUCATION"}
        run_props = "<w:rPr><w:b/></w:rPr>" if bold else ""
        paragraphs.append(
            f"<w:p><w:r>{run_props}<w:t xml:space=\"preserve\">{escape(line)}</w:t></w:r></w:p>"
        )
    document = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        '<w:body>' + "".join(paragraphs) +
        '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr>'
        '</w:body></w:document>'
    )
    content_types = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
        '</Types>'
    )
    root_rels = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>'
        '</Relationships>'
    )
    with ZipFile(path, "w", ZIP_DEFLATED) as zf:
        zf.writestr("[Content_Types].xml", content_types)
        zf.writestr("_rels/.rels", root_rels)
        zf.writestr("word/document.xml", document)


for candidate in CANDIDATES:
    out = ROOT / candidate["file"]
    if candidate["format"] == "pdf":
        make_pdf(out, candidate["lines"])
    else:
        make_docx(out, candidate["lines"])
    print(f"created {out.relative_to(ROOT.parent.parent)}")
