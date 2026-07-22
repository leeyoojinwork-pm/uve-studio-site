import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nodePath = process.env.NODE_PATH?.split(":").find(Boolean);
const { chromium } = nodePath ? require(path.join(nodePath, "playwright")) : require("playwright");

const root = process.cwd();
const assetsDir = path.join(root, "assets");
const tmpDir = path.join(root, ".asset-render");

fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

const css = `
  *{box-sizing:border-box}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Pretendard","Noto Sans KR",sans-serif;background:#f6f3fb;color:#191420}
  .canvas{width:var(--w);height:var(--h);position:relative;overflow:hidden;background:#f6f3fb}
  .canvas:before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,rgba(75,29,120,.08),transparent 44%),radial-gradient(42% 52% at 92% 8%,rgba(168,85,247,.12),transparent 60%)}
  .sheet{position:absolute;inset:44px;border-radius:24px;background:#fff;border:1px solid #e8e1f0;box-shadow:0 26px 70px rgba(45,25,67,.12);padding:34px}
  .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:28px}
  .brand{display:flex;gap:12px;align-items:center;font-size:22px;font-weight:850;letter-spacing:-.04em}
  .mark{width:34px;height:34px;border-radius:12px;background:#4B1D78;display:grid;place-items:center}
  .mark:before{content:"";width:14px;height:9px;border:4px solid #F5D0FE;border-top:0;border-radius:0 0 14px 14px;display:block}
  .pill{font-size:13px;font-weight:800;color:#4B1D78;background:#f2eef9;border:1px solid #e3d6f0;border-radius:999px;padding:8px 13px}
  h1,h2,h3,p{margin:0;letter-spacing:-.035em;word-break:keep-all}
  h1{font-size:48px;line-height:1.12}
  h2{font-size:29px;line-height:1.24}
  h3{font-size:19px;line-height:1.34}
  p{color:#6A6175;font-size:15px;font-weight:600;line-height:1.5}
  .sub{margin-top:12px}
  .grid{display:grid;gap:18px}
  .card{border:1px solid #ebe5f2;border-radius:18px;background:#fff;padding:22px}
  .soft{background:#fbf9fe}
  .dark{background:#191420;color:#f4edf8;border-color:#2f213d}
  .label{font-size:12px;font-weight:850;color:#8a7a9d;margin-bottom:7px;letter-spacing:-.01em}
  .metric{font-size:42px;font-weight:900;color:#4B1D78;letter-spacing:-.05em;line-height:1}
  .dark .metric{color:#F5D0FE}
  .row{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:center;border-top:1px solid #eee7f4;padding-top:12px;margin-top:12px;font-size:14px;font-weight:750;color:#45394f}
  .tag{display:inline-flex;border-radius:999px;background:#f2eef9;color:#4B1D78;padding:7px 11px;font-size:12px;font-weight:850;margin:0 7px 7px 0}
  .barline{height:9px;border-radius:999px;background:#eee8f5;overflow:hidden}
  .barline span{display:block;height:100%;border-radius:inherit;background:#4B1D78}
  .docline{height:10px;border-radius:99px;background:#ece6f3;margin-top:12px}
  .docline.short{width:62%}
  .docline.mid{width:78%}
  .mini-table{border:1px solid #eee7f4;border-radius:14px;overflow:hidden;margin-top:18px}
  .mini-table div{display:grid;grid-template-columns:1fr 90px;border-top:1px solid #eee7f4;padding:11px 13px;font-size:13px;font-weight:750}
  .mini-table div:first-child{border-top:0;background:#fbf9fe;color:#8a7a9d}
`;

function page(width, height, body) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>:root{--w:${width}px;--h:${height}px}${css}</style></head><body>${body}</body></html>`;
}

const assets = [
  {
    name: "hero-ax-report.png",
    width: 1200,
    height: 900,
    html: page(1200, 900, `
      <div class="canvas"><div class="sheet">
        <div class="top"><div class="brand"><span class="mark"></span>Vessel AX Report</div><div class="pill">sample report</div></div>
        <div class="grid" style="grid-template-columns:.95fr 1.05fr;align-items:start">
          <div>
            <h1>교육 이후<br>무엇이 바뀌었는지<br>한 장으로 봅니다</h1>
            <p class="sub">진단, PoC, 사용률, 절감 시간을 HR 보고용 문서로 정리합니다.</p>
            <div class="card soft" style="margin-top:30px">
              <div class="label">추천 시작점</div>
              <h2>보고서 자동화 AX</h2>
              <div style="margin-top:18px"><span class="tag">Before/After</span><span class="tag">사용률</span><span class="tag">운영 리포트</span></div>
            </div>
          </div>
          <div class="grid">
            <div class="card">
              <div class="label">PoC 요약</div>
              <div class="mini-table">
                <div><span>항목</span><span>결과</span></div>
                <div><span>월 절감 시간</span><span>86.9h</span></div>
                <div><span>우선 부서</span><span>보고/기획</span></div>
                <div><span>다음 액션</span><span>2주 PoC</span></div>
              </div>
            </div>
            <div class="grid" style="grid-template-columns:1fr 1fr">
              <div class="card dark"><div class="label">예상 절감</div><div class="metric">₩3.4M</div><p class="sub">월 기준</p></div>
              <div class="card soft"><div class="label">사용률 목표</div><div class="metric">70%</div><p class="sub">4주 후</p></div>
            </div>
            <div class="card">
              <div class="label">진행 상태</div>
              <div class="row"><span>진단</span><span>완료</span></div>
              <div class="row"><span>현업 테스트</span><span>진행</span></div>
              <div class="row"><span>리포트</span><span>D-3</span></div>
            </div>
          </div>
        </div>
      </div></div>`),
  },
  {
    name: "case-sales-dashboard.png",
    width: 960,
    height: 620,
    html: briefPage("영업 리서치 브리프", "미팅 전 조사 시간을 줄인 PoC 기록", "월 122h", "절감 시간", ["타겟 기업 요약", "의사결정자 힌트", "제안 메모 초안"], "영업팀 8명"),
  },
  {
    name: "case-cs-dashboard.png",
    width: 960,
    height: 620,
    html: checklistPage("CS 답변 품질 체크", "답변 초안과 검수 기준을 함께 남긴 사례", "-71%", "응대 시간", ["문의 의도 분류", "금지 표현 검사", "근거 문서 연결"], "CS팀 12명"),
  },
  {
    name: "case-knowledge-dashboard.png",
    width: 960,
    height: 620,
    html: searchPage("사내문서 검색 Agent", "규정과 매뉴얼 근거를 함께 보여주는 PoC", "1분", "규정 확인", ["근거 문서", "권한 범위", "답변 로그"], "행정팀 6명"),
  },
  {
    name: "contact-report-preview.png",
    width: 900,
    height: 700,
    html: page(900, 700, `
      <div class="canvas"><div class="sheet">
        <div class="top"><div class="brand"><span class="mark"></span>AX 진단 리포트</div><div class="pill">상담 후 정리</div></div>
        <div class="grid" style="grid-template-columns:1fr 1fr">
          <div class="card soft">
            <div class="label">자동화 기회 Top 3</div>
            <h2>보고서 작성<br>리드 조사<br>회의록 정리</h2>
            <div class="docline"></div><div class="docline mid"></div><div class="docline short"></div>
          </div>
          <div class="card">
            <div class="label">추천 시작점</div>
            <div class="metric" style="font-size:38px">AX Workflow</div>
            <p class="sub">부서 단위 반복 업무를 2주 PoC로 검증</p>
          </div>
          <div class="card" style="grid-column:1 / -1">
            <div class="label">예상 효과 요약</div>
            <div class="row"><span>월 절감 시간</span><span>125.1h</span></div>
            <div class="row"><span>우선 부서</span><span>보고/기획</span></div>
            <div class="row"><span>다음 액션</span><span>30분 상담</span></div>
            <div style="margin-top:18px"><div class="barline"><span style="width:72%"></span></div></div>
          </div>
        </div>
      </div></div>`),
  },
];

function briefPage(title, desc, metric, label, chips, team) {
  return page(960, 620, `
    <div class="canvas"><div class="sheet">
      <div class="top"><div class="brand"><span class="mark"></span>${title}</div><div class="pill">${team}</div></div>
      <div class="grid" style="grid-template-columns:1fr .82fr">
        <div class="card">
          <div class="label">PoC 기록</div>
          <h2>${desc}</h2>
          <p class="sub">실제 산출물은 리서치 브리프, 제안 메모, 후속 메일 초안으로 정리됩니다.</p>
          <div class="docline"></div><div class="docline mid"></div><div class="docline short"></div>
          <div style="margin-top:22px">${chips.map((c) => `<span class="tag">${c}</span>`).join("")}</div>
        </div>
        <div class="grid">
          <div class="card dark"><div class="label">${label}</div><div class="metric">${metric}</div></div>
          <div class="card soft"><div class="label">접점 수 증가</div><div class="metric" style="font-size:38px">2.4x</div><div class="barline" style="margin-top:18px"><span style="width:76%"></span></div></div>
        </div>
      </div>
    </div></div>`);
}

function checklistPage(title, desc, metric, label, chips, team) {
  return page(960, 620, `
    <div class="canvas"><div class="sheet">
      <div class="top"><div class="brand"><span class="mark"></span>${title}</div><div class="pill">${team}</div></div>
      <div class="grid" style="grid-template-columns:1fr .82fr">
        <div class="card">
          <div class="label">검수 체크리스트</div>
          <h2>${desc}</h2>
          <div class="mini-table">
            <div><span>검수 항목</span><span>상태</span></div>
            <div><span>문의 의도 반영</span><span>통과</span></div>
            <div><span>정책 문서 근거</span><span>확인</span></div>
            <div><span>톤 가이드</span><span>적용</span></div>
          </div>
          <div style="margin-top:18px">${chips.map((c) => `<span class="tag">${c}</span>`).join("")}</div>
        </div>
        <div class="grid">
          <div class="card dark"><div class="label">${label}</div><div class="metric">${metric}</div></div>
          <div class="card soft"><div class="label">4주 후 사용률</div><div class="metric" style="font-size:38px">88%</div><div class="barline" style="margin-top:18px"><span style="width:88%"></span></div></div>
        </div>
      </div>
    </div></div>`);
}

function searchPage(title, desc, metric, label, chips, team) {
  return page(960, 620, `
    <div class="canvas"><div class="sheet">
      <div class="top"><div class="brand"><span class="mark"></span>${title}</div><div class="pill">${team}</div></div>
      <div class="grid" style="grid-template-columns:1fr .82fr">
        <div class="card">
          <div class="label">검색 결과 예시</div>
          <h2>${desc}</h2>
          <div class="card soft" style="margin-top:20px">
            <h3>Q. 교육비 정산 기준은?</h3>
            <p class="sub">답변: 사내 교육 운영 규정 4조와 비용 처리 가이드 2.1을 기준으로 확인합니다.</p>
          </div>
          <div style="margin-top:18px">${chips.map((c) => `<span class="tag">${c}</span>`).join("")}</div>
        </div>
        <div class="grid">
          <div class="card dark"><div class="label">${label}</div><div class="metric">${metric}</div></div>
          <div class="card soft"><div class="label">반복 문의 감소</div><div class="metric" style="font-size:38px">90건</div><div class="barline" style="margin-top:18px"><span style="width:68%"></span></div></div>
        </div>
      </div>
    </div></div>`);
}

const browser = await chromium.launch({ headless: true });
for (const asset of assets) {
  const htmlPath = path.join(tmpDir, asset.name.replace(".png", ".html"));
  fs.writeFileSync(htmlPath, asset.html);
  const pageInstance = await browser.newPage({ viewport: { width: asset.width, height: asset.height }, deviceScaleFactor: 1 });
  await pageInstance.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await pageInstance.screenshot({ path: path.join(assetsDir, asset.name), fullPage: false });
  await pageInstance.close();
  console.log(`rendered ${asset.name}`);
}
await browser.close();
