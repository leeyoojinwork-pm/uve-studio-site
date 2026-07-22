# Vessel AX Studio - 랜딩 사이트

AX 실행 파트너 스튜디오의 홈페이지 + 문의(AX 진단) 페이지. 정적 사이트(HTML/CSS/JS 단일 파일, 빌드 불필요).

> 현재 버전은 이미지 목업 1차 개선본입니다. 성과 사례 수치는 서비스 이해를 돕는 예시이며, 파일럿 완료 후 실측 데이터로 교체합니다.

## 파일 구조
```
index.html      홈 (Hero → 문제 → 프로세스 → 대표아이템 → 패키지 → 성과사례 → AX진단 → FAQ → CTA)
contact.html    AX 진단 신청 폼 (2단: 신뢰·프로세스 + 폼)
assets/
  uve-mark.svg                 Vessel 로고 마크
  favicon.svg                  파비콘
  hero-ax-report.png           히어로 리포트 목업
  case-sales-dashboard.png     영업 사례 대시보드 목업
  case-cs-dashboard.png        CS 사례 대시보드 목업
  case-knowledge-dashboard.png 문서 검색 사례 대시보드 목업
  contact-report-preview.png   문의 페이지 리포트 목업
scripts/
  render-visual-assets.mjs     PNG 목업 렌더링 스크립트
```
`index-v4.html`은 작업 원본(dev). 배포에는 `index.html`만 사용(.gitignore로 dev 제외).

## 디자인 시스템
- **폰트**: Pretendard(헤드 800 / 본문 500·Medium) + JetBrains Mono(라벨). 숫자는 Pretendard tabular. 참고: 스파르타 내일배움캠프의 웨이트 위계.
- **컬러**: 메인 `#4B1D78`, 포인트 `#A855F7`, 하이라이트 `#F5D0FE`, 다크 `#141019`, 앰버(다크 강조) `#FFC94D`. 가상 예시 면책 문구는 핑크 `#DB2777`.
- **모션**: 다크 헤더(nav+티커+히어로 통일), 히어로 로고 모션(회전 링 + 철학 키워드 드리프트), 스크롤 리빌, 클라이언트 로고 마퀴, 플로팅 CTA. `prefers-reduced-motion` 존중.
- **로고**: Vessel 마크. U 형태의 그릇에서 스파크가 떠오르는 형태. "교육을 담아 성과로."

## 인터랙션
- **AX 진단 ROI 계산기**(index): 부서·인원·반복시간·자동화 비율 입력 → 예상 월 절감 비용/시간 + 추천 패키지 실시간 산출. 시간당 인건비는 40,000원 가정(UI 비노출).
- **문의 폼**(contact): 문의 유형 칩(AX 진단/패키지 상담/제안서 요청) + 조직 정보. `?type=` 파라미터로 유형 프리셀렉트.

## 로컬 확인
빌드 불필요. `index.html`을 브라우저로 열면 됩니다. (또는 `python3 -m http.server`)

## 배포 (GitHub Pages)
```bash
# 이 폴더는 git 초기화·커밋 완료. GitHub에 빈 repo 생성 후:
git remote add origin https://github.com/<계정>/<repo>.git
git branch -M main
git push -u origin main
# GitHub → Settings → Pages → Source: main / root → 저장
```
대안: Netlify(폴더 드래그&드롭) / Vercel(import repo) 로도 즉시 배포.

## 오픈 전 TODO
- [ ] 문의 폼 전송 엔드포인트 연결 (현재 데모 alert → Formspree/Tally 등)
- [ ] 성과 사례를 실측·실명 데이터로 교체 (G2)
- [ ] 메타/OG 태그 보강
- [ ] 실제 제품/현장 사진 또는 Figma 일러스트 확보 시 PNG 목업 교체
- [ ] 패키지 가격 확정 반영 (G0)

## 제작
Claude(Cowork). 레퍼런스: Anthropic frontend-design 스킬, nbcamp.spartaclub.kr(폰트/레이아웃), flex.team·사방넷·herue-lab(문의폼), herue-lab(헤더 모션).
