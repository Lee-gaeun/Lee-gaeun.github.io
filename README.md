# Lee-gaeun.github.io

풀스택 개발자 이가은의 포트폴리오 사이트입니다.

🔗 **https://lee-gaeun.github.io**

## 구성

프레임워크 없이 단일 `index.html` 로 만들어졌습니다. (HTML + CSS + 바닐라 JS)

| 파일 | 설명 |
|------|------|
| `index.html` | 포트폴리오 전체 (소개 · 기술 스택 · 프로젝트 4건 · 연락처) |
| `.nojekyll` | GitHub Pages가 파일을 그대로 서빙하도록 하는 표시 파일 |

프로젝트는 목록에서 카드를 클릭하면 상세(담당 역할 · 트러블슈팅 · 성과 · 회고)가 모달로 열립니다.
특정 프로젝트로 바로 링크하려면 `?` 대신 해시를 사용합니다 — 예: `https://lee-gaeun.github.io/#project=pick-n-pay`

## 이미지

스크린샷은 `images/` 폴더에 있고, `index.html` 하단 `projects` 배열의 `images` 에서 참조합니다.

```js
cover: "3-2.png",                                  // 목록 대표 이미지 (생략 시 images[0])
images: [
  { src: "3-1.png", cap: "주소·아파트 검색" },     // cap 은 상세 갤러리 캡션
  { src: "3-2.png", cap: "전세가율 추이 차트" }
]
```

### 단일 파일로 내보내기

`node build-preview.mjs` 를 실행하면 이미지를 data URI 로 인라인한 `_artifact.html` 이 생성됩니다.
폴더 없이 파일 하나만 전달해야 할 때 사용하세요. (배포에는 불필요 — `.gitignore` 처리됨)

## 수정 방법

`index.html` 안의 `projects` 배열만 고치면 프로젝트 내용이 바뀝니다. (파일 하단 `<script>` 참고)

## 배포

`main` 브랜치에 push하면 GitHub Pages가 자동으로 반영합니다.
(저장소 Settings → Pages → Source: `Deploy from a branch` → `main` / `/root`)
