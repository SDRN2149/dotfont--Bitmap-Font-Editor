# DotFont v10 — Unicode Pixel Typeface Editor

Unicode 코드포인트를 중심으로 글리프를 만들고 TTF/OTF로 내보내는 브라우저 기반 픽셀 폰트 에디터입니다.

## 핵심 기능
- Basic Latin (A–Z / a–z), 숫자, 기호, Printable ASCII 프리셋
- 문자 또는 `U+0041` 형식으로 글리프 직접 추가
- `U+2500`–`U+257F`처럼 Unicode 범위 추가 (한 번에 최대 512개)
- PUA `U+E000`–`U+E00F` 빠른 추가
- 문자 / 코드포인트 검색
- 8×8, 12×12, 16×16 픽셀 편집
- 가이드, 실제 글자폭, 글리프별 자간, 최종 Advance 실시간 표시
- 글리프 복사/붙여넣기, 이동, 반전, 삭제
- 사용자 정의 ligature + GSUB `liga` 내장
- TTF / OTF export
- JSON 프로젝트 저장/불러오기
- favicon / PWA manifest 포함

## 실행
`index.html`을 브라우저에서 열면 됩니다.

## Unicode 입력 예
- `A` 또는 `U+0041` → A
- `U+00FE` → þ
- `U+2500` → ─
- `U+E000` → Private Use Area 글리프

## Ligature 예
- `fi` → `ﬁ` (`U+FB01`)
- `->` → `→` (`U+2192`)

TTF/OTF export는 처음 사용할 때 외부 모듈을 불러오기 위해 인터넷 연결이 필요할 수 있습니다.
