import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nodePath = process.env.NODE_PATH?.split(":").find(Boolean);
const { chromium } = nodePath
  ? require(path.join(nodePath, "playwright"))
  : require("playwright");

const root = process.cwd();
const assetsDir = path.join(root, "assets");
const tmpDir = path.join(root, ".asset-render");

fs.mkdirSync(assetsDir, { recursive: true });
fs.mkdirSync(tmpDir, { recursive: true });

const baseCss = `
  *{box-sizing:border-box}
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","Pretendard","Noto Sans KR",sans-serif;background:#141019;color:#17121D}
  .canvas{width:var(--w);height:var(--h);position:relative;overflow:hidden;background:linear-gradient(135deg,#160820 0%,#27103a 48%,#4B1D78 100%)}
  .grain{position:absolute;inset:0;opacity:.08;background-image:radial-gradient(rgba(255,255,255,.8) 1px,transparent 1px);background-size:7px 7px}
  .orb{position:absolute;border-radius:50%;filter:blur(35px);opacity:.55}
  .o1{width:360px;height:360px;background:#A855F7;right:-90px;top:-80px}
  .o2{width:300px;height:300px;background:#F5D0FE;left:-90px;bottom:-110px;opacity:.22}
  .frame{position:absolute;inset:54px;border:1px solid rgba(255,255,255,.14);border-radius:34px;background:rgba(255,255,255,.08);box-shadow:0 40px 110px rgba(0,0,0,.32);backdrop-filter:blur(16px);padding:34px}
  .top{display:flex;justify-content:space-between;align-items:center;margin-bottom:26px;color:#EEE9F4}
  .brand{display:flex;align-items:center;gap:12px;font-weight:800;font-size:24px;letter-spacing:-.04em}
  .mark{width:38px;height:38px;border-radius:13px;border:1px solid rgba(245,208,254,.4);display:grid;place-items:center;background:linear-gradient(145deg,#4B1D78,#A855F7)}
  .mark:before{content:"";width:17px;height:11px;border:4px solid #F5D0FE;border-top:0;border-radius:0 0 16px 16px;display:block}
  .pill{border:1px solid rgba(245,208,254,.26);border-radius:999px;padding:9px 14px;color:#DCCEF0;font-size:14px;font-weight:700;background:rgba(255,255,255,.06)}
  .grid{display:grid;gap:18px}
  .card{background:#fff;border-radius:22px;padding:24px;box-shadow:0 24px 50px rgba(0,0,0,.14)}
  .darkcard{background:#21122f;color:#EEE9F4;border:1px solid rgba(245,208,254,.18)}
  h1,h2,h3,p{margin:0;letter-spacing:-.03em}
  h1{font-size:54px;line-height:1.04;color:#fff}
  h2{font-size:30px;line-height:1.16}
  h3{font-size:20px;margin-bottom:10px}
  p{color:#6A6175;font-weight:600;line-height:1.45}
  .darkcard p{color:#B4A9C4}
  .metric{font-size:52px;font-weight:900;color:#4B1D78;line-height:1}
  .darkcard .metric{color:#F5D0FE}
  .label{font-size:13px;color:#887C98;font-weight:800;margin-bottom:8px}
  .chart{height:120px;display:flex;align-items:end;gap:10px;margin-top:18px}
  .bar{flex:1;border-radius:10px 10px 4px 4px;background:linear-gradient(180deg,#A855F7,#4B1D78)}
  .bar.soft{background:linear-gradient(180deg,#F5D0FE,#C084FC)}
  .row{display:flex;justify-content:space-between;gap:20px;border-top:1px solid #ECE7F2;padding-top:13px;margin-top:13px;font-size:15px;font-weight:800;color:#4a4356}
  .chip{display:inline-flex;border-radius:999px;background:#F2EEF9;color:#4B1D78;padding:7px 12px;font-weight:800;font-size:13px;margin:0 7px 7px 0}
`;

function page(width, height, body) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>:root{--w:${width}px;--h:${height}px}${baseCss}</style></head><body>${body}</body></html>`;
}

const assets = [
  {
    name: "hero-ax-report.png",
    width: 1200,
    height: 900,
    html: page(1200, 900, `
      <div class="canvas"><div class="orb o1"></div><div class="orb o2"></div><div class="grain"></div>
        <div class="frame">
          <div class="top"><div class="brand"><span class="mark"></span>Vessel AX Report</div><div class="pill">2주 PoC 결과 미리보기</div></div>
          <div class="grid" style="grid-template-columns:1.05fr .95fr">
            <div>
              <h1>교육 이후<br>업무 변화가<br>숫자로 남습니다</h1>
              <div class="card" style="margin-top:34px">
                <div class="label">추천 시작점</div>
                <h2>보고서 자동화 AX</h2>
                <p style="margin-top:8px">반복 보고 업무를 표준 템플릿과 Agent로 전환</p>
                <div style="margin-top:22px"><span class="chip">HR 보고용</span><span class="chip">Before/After</span><span class="chip">사용률 리포트</span></div>
              </div>
            </div>
            <div class="grid">
              <div class="card darkcard">
                <div class="label" style="color:#B4A9C4">예상 월 절감 비용</div>
                <div class="metric">₩8.7M</div>
                <div class="chart"><div class="bar soft" style="height:38%"></div><div class="bar soft" style="height:54%"></div><div class="bar" style="height:72%"></div><div class="bar" style="height:92%"></div></div>
              </div>
              <div class="card">
                <h3>PoC 진행 상태</h3>
                <div class="row"><span>진단</span><span>완료</span></div>
                <div class="row"><span>워크숍</span><span>완료</span></div>
                <div class="row"><span>현업 테스트</span><span>진행 중</span></div>
                <div class="row"><span>성과 리포트</span><span>D-3</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>`),
  },
  {
    name: "case-sales-dashboard.png",
    width: 960,
    height: 620,
    html: casePage("영업 리드 리서치 Agent", "미팅 준비 시간을 줄이고 접점 수를 늘린 사례", "122h", "월 절감 시간", "2.4x", "접점 수 증가", ["타겟 기업 조사", "제안 메모", "후속 메일"]),
  },
  {
    name: "case-cs-dashboard.png",
    width: 960,
    height: 620,
    html: casePage("CS 답변 초안 자동화", "문의 유형 분류와 답변 초안을 표준화한 사례", "-71%", "응대 시간", "88%", "4주 후 사용률", ["문의 분류", "답변 초안", "품질 기준"]),
  },
  {
    name: "case-knowledge-dashboard.png",
    width: 960,
    height: 620,
    html: casePage("사내문서 검색 Agent", "규정과 매뉴얼 검색 시간을 줄인 사례", "1분", "규정 확인 시간", "90건", "반복 문의 감소", ["근거 답변", "권한 범위", "검색 로그"]),
  },
  {
    name: "contact-report-preview.png",
    width: 900,
    height: 700,
    html: page(900, 700, `
      <div class="canvas"><div class="orb o1"></div><div class="grain"></div>
        <div class="frame" style="inset:46px">
          <div class="top"><div class="brand"><span class="mark"></span>AX 진단 리포트</div><div class="pill">24시간 내 회신</div></div>
          <div class="grid" style="grid-template-columns:1fr 1fr">
            <div class="card darkcard">
              <div class="label" style="color:#B4A9C4">자동화 기회 Top 3</div>
              <h2>보고서 작성<br>리드 조사<br>회의록 정리</h2>
            </div>
            <div class="card">
              <div class="label">추천 시작점</div>
              <div class="metric" style="font-size:42px">AX Workflow</div>
              <p style="margin-top:12px">부서 단위 반복 업무를 2주 PoC로 검증</p>
            </div>
            <div class="card" style="grid-column:1 / -1">
              <h3>예상 효과 요약</h3>
              <div class="row"><span>월 절감 시간</span><span>125.1h</span></div>
              <div class="row"><span>우선 부서</span><span>보고/기획</span></div>
              <div class="row"><span>다음 액션</span><span>30분 무료 상담</span></div>
              <div class="chart"><div class="bar soft" style="height:42%"></div><div class="bar" style="height:62%"></div><div class="bar" style="height:88%"></div><div class="bar soft" style="height:70%"></div><div class="bar" style="height:95%"></div></div>
            </div>
          </div>
        </div>
      </div>`),
  },
];

function casePage(title, desc, metric1, label1, metric2, label2, chips) {
  return page(960, 620, `
    <div class="canvas"><div class="orb o1"></div><div class="grain"></div>
      <div class="frame" style="inset:42px">
        <div class="top"><div class="brand"><span class="mark"></span>${title}</div><div class="pill">PoC 결과</div></div>
        <div class="grid" style="grid-template-columns:1.1fr .9fr">
          <div class="card">
            <div class="label">성과 요약</div>
            <h2>${desc}</h2>
            <div style="margin-top:24px">${chips.map((c) => `<span class="chip">${c}</span>`).join("")}</div>
            <div class="chart"><div class="bar soft" style="height:35%"></div><div class="bar soft" style="height:48%"></div><div class="bar" style="height:76%"></div><div class="bar" style="height:92%"></div></div>
          </div>
          <div class="grid">
            <div class="card darkcard"><div class="label" style="color:#B4A9C4">${label1}</div><div class="metric">${metric1}</div></div>
            <div class="card"><div class="label">${label2}</div><div class="metric" style="font-size:44px">${metric2}</div><p>현업 테스트 기준</p></div>
          </div>
        </div>
      </div>
    </div>`);
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
